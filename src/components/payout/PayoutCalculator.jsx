import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { calculatePayout, compareManagementPayouts } from '../../lib/payoutCalculator'
import { getPlatformPreset, PLATFORM_PRESETS } from '../../lib/payoutPresets'
import { COUNTRIES, US_STATES, findVerifiedTaxRate } from '../../lib/payoutTaxes'
import { COPY, localizePayoutError } from './payoutCopy'
import PayoutEducation from './PayoutEducation'
import './payout.css'

const INITIAL = {
  mode: 'rate', nightlyRate: '250', nights: '3', cleaningFee: '75', otherFees: '0',
  targetPayout: '250', platformFee: '15.5', guestFeeRate: '0', processingFee: '0', fixedProcessingFee: '0',
  taxRate: '', taxRemitter: 'unsure', managementRate: '0', managementBasis: 'accommodation',
  platformBasis: 'subtotal', processingBasis: 'guestTotal',
  taxableComponents: ['accommodation', 'cleaning', 'other'],
}
const CHANNELS = ['airbnb', 'vrbo', 'booking', 'expedia', 'google', 'direct']
const CURRENCIES = ['USD', 'MXN', 'HNL', 'CAD', 'GBP', 'EUR']

function money(value, currency, language) {
  if (!Number.isFinite(Number(value))) return '—'
  try {
    return new Intl.NumberFormat(language === 'es' ? 'es' : 'en', {
      style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2,
    }).format(Number(value))
  } catch {
    return `${currency} ${Number(value).toFixed(2)}`
  }
}
function percent(value) {
  const n = Number(value)
  return Number.isFinite(n) ? `${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}%` : '—'
}
function InputField({ id, label, value, onChange, type = 'number', step = '0.01', min = '0', hint, error, wide = false, placeholder = '0', readOnly = false }) {
  return <div className={`payout-field${wide ? ' payout-field--wide' : ''}`}>
    <div className="payout-label-row"><label htmlFor={id}>{label}</label></div>
    <input id={id} className="payout-input" type={type} inputMode={type === 'number' ? 'decimal' : undefined}
      value={value} onChange={onChange} step={step} min={min} placeholder={placeholder} readOnly={readOnly}
      aria-invalid={!!error} aria-describedby={[hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined} />
    {hint && <span className="payout-hint" id={`${id}-hint`}>{hint}</span>}
    {error && <p className="payout-error" id={`${id}-error`} role="alert">{error}</p>}
  </div>
}
function SelectField({ id, label, value, onChange, children, wide = false }) {
  return <div className={`payout-field${wide ? ' payout-field--wide' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <select id={id} className="payout-select" value={value} onChange={onChange}>{children}</select>
  </div>
}
function Line({ label, value, emphasis = false, muted = false, tax = false }) {
  return <div className={`payout-ledger__row${emphasis ? ' payout-ledger__row--emphasis' : ''}${muted ? ' payout-ledger__row--muted' : ''}${tax ? ' payout-ledger__row--tax' : ''}`}><span>{label}</span><strong>{value}</strong></div>
}
function localizedPlatformLabel(preset, spanish) {
  if (!preset) return spanish ? 'Canal personalizado' : 'Custom Channel'
  if (spanish && preset.id === 'direct') return 'Reserva directa'
  if (spanish && preset.id === 'custom') return 'Canal personalizado'
  return preset.label
}

export default function PayoutCalculator() {
  const { language } = useLanguage()
  const spanish = language === 'es'
  const t = COPY[spanish ? 'es' : 'en']
  const [input, setInput] = useState(INITIAL)
  const [country, setCountry] = useState('US')
  const [state, setState] = useState('')
  const [county, setCounty] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [platform, setPlatform] = useState('airbnb')
  const [management, setManagement] = useState('none')
  const [customManagement, setCustomManagement] = useState('0')
  const [comparisonManagementRate, setComparisonManagementRate] = useState('10')
  const [comparisonFees, setComparisonFees] = useState({})
  const [comparisonGuestFees, setComparisonGuestFees] = useState({})
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const [copiedState, setCopiedState] = useState('')
  const [clipboardError, setClipboardError] = useState(false)
  const [fallbackSummary, setFallbackSummary] = useState('')

  const countryRecord = COUNTRIES.find((item) => item.code === country)
  const verifiedTax = findVerifiedTaxRate({ country, state: country === 'US' ? state : region, county, city })
  const activePlatform = getPlatformPreset(platform, country)
  const effectiveManagement = management === 'listing' ? '10' : management === 'full' ? '20' : management === 'custom' ? customManagement : '0'
  const calcInput = useMemo(() => ({
    ...input,
    platformFee: input.platformFee,
    managementRate: effectiveManagement,
    taxRate: verifiedTax ? verifiedTax.tax_rate : input.taxRate,
    taxableComponents: verifiedTax ? verifiedTax.taxable_components : input.taxableComponents,
    taxRemitter: input.taxRemitter,
  }), [input, effectiveManagement, verifiedTax])
  const result = useMemo(() => calculatePayout(calcInput), [calcInput])
  const previewManagementRate = management === 'none' ? comparisonManagementRate : effectiveManagement
  const managementComparison = useMemo(() => compareManagementPayouts(calcInput, previewManagementRate), [calcInput, previewManagementRate])
  const feeGuide = activePlatform?.guidance?.[spanish ? 'es' : 'en'] || ''
  const platformLabel = localizedPlatformLabel(activePlatform, spanish)
  const errors = result.ok ? {} : Object.fromEntries(Object.entries(result.errors || {}).map(([field, message]) => [field, localizePayoutError(message, language)]))

  function update(field, value) { setInput((current) => ({ ...current, [field]: value })) }
  function jurisdictionChange(setter, value) {
    setter(value)
    update('taxRate', '')
  }
  function changeCountry(value) {
    setCountry(value)
    setState('')
    setCounty('')
    setCity('')
    setRegion('')
    update('taxRate', '')
    applyPlatformPreset(platform, value)
  }
  function applyPlatformPreset(id, selectedCountry = country) {
    const record = getPlatformPreset(id, selectedCountry)
    setPlatform(id)
    update('platformFee', record?.fee == null ? '' : String(record.fee))
  }
  function changePlatform(id) { applyPlatformPreset(id) }
  function changeManagement(value) {
    setManagement(value)
    if (value === 'listing') setComparisonManagementRate('10')
    if (value === 'full') setComparisonManagementRate('20')
    if (value === 'custom') setComparisonManagementRate(customManagement)
  }
  function editComparisonManagement(value) {
    setComparisonManagementRate(value)
    if (management !== 'none') {
      setManagement('custom')
      setCustomManagement(value)
    }
  }
  function updateComparisonFee(id, value) {
    setComparisonFees((current) => ({ ...current, [id]: value }))
  }
  function updateComparisonGuestFee(id, value) {
    setComparisonGuestFees((current) => ({ ...current, [id]: value }))
  }
  function comparisonInput(id) {
    const preset = getPlatformPreset(id, country)
    const fee = Object.prototype.hasOwnProperty.call(comparisonFees, id)
      ? comparisonFees[id]
      : id === platform ? input.platformFee : preset?.fee == null ? '' : String(preset.fee)
    const guestFeeRate = Object.prototype.hasOwnProperty.call(comparisonGuestFees, id)
      ? comparisonGuestFees[id]
      : id === platform ? input.guestFeeRate : '0'
    return { ...calcInput, mode: input.mode, platformFee: fee, guestFeeRate }
  }
  const comparisonResults = CHANNELS.map((id) => {
    const preset = getPlatformPreset(id, country)
    const candidate = calculatePayout(comparisonInput(id))
    if (!candidate.ok) candidate.errors = Object.fromEntries(Object.entries(candidate.errors).map(([field, message]) => [field, localizePayoutError(message, language)]))
    return { id, label: localizedPlatformLabel(preset, spanish), fee: comparisonInput(id).platformFee, result: candidate }
  })
  const highestResult = input.mode === 'rate' ? comparisonResults.filter((item) => item.result.ok).reduce((best, item) => !best || item.result.ownerPayout > best.result.ownerPayout ? item : best, null) : null
  const taxTitle = verifiedTax ? `${t.verifiedSource}: ${verifiedTax.tax_name}` : t.manualSource

  async function copyResults() {
    if (!result.ok) { setCopiedState('invalid'); return }
    const location = [city, county, state, region, countryRecord?.label?.[spanish ? 'es' : 'en']].filter(Boolean).join(', ')
    const summary = [
      t.summaryTitle,
      `${t.summaryPlatform}: ${platformLabel}`,
      `${input.mode === 'rate' ? t.summaryNightly : t.summaryTarget}: ${money(input.mode === 'rate' ? result.nightlyRate : input.targetPayout, currency, language)}`,
      `${t.summaryNights}: ${result.nights}`,
      `${t.summaryAccommodation}: ${money(result.accommodation, currency, language)}`,
      `${t.summaryCleaning}: ${money(result.cleaningFee, currency, language)}`,
      `${t.summaryOther}: ${money(result.otherFees, currency, language)}`,
      `${t.summaryFee}: ${percent(result.platformFeeRate)}`,
      `${t.summaryFeeAmount}: ${money(result.platformFee, currency, language)}`,
      `${t.guestTotal}: ${money(result.guestTotal, currency, language)}`,
      `${t.platformPayout}: ${money(result.platformPayout, currency, language)}`,
      `${t.processingResult}: ${money(result.processingFee, currency, language)}`,
      `${t.managementResult}: ${money(result.managementFee, currency, language)}`,
      ...(managementComparison.withManagement.ok && managementComparison.withoutManagement.ok ? [
        `${t.withoutIpm}: ${money(managementComparison.withoutManagement.ownerPayout, currency, language)}`,
        `${t.withIpm} (${percent(previewManagementRate)}): ${money(managementComparison.withManagement.ownerPayout, currency, language)}`,
        ...(input.mode === 'target' ? [
          `${t.withoutIpm} — ${t.requiredRate}: ${money(managementComparison.withoutManagement.requiredNightlyRate, currency, language)}`,
          `${t.withIpm} — ${t.requiredRate}: ${money(managementComparison.withManagement.requiredNightlyRate, currency, language)}`,
        ] : []),
        t.ipmPreviewNote,
      ] : []),
      `${t.taxReserve}: ${money(result.taxReserve, currency, language)}`,
      ...(input.mode === 'target' ? [`${t.requiredRate}: ${money(result.requiredNightlyRate, currency, language)}`] : []),
      `${t.summaryPayout}: ${money(result.ownerPayout, currency, language)}`,
      `${t.summaryLocation}: ${location || t.summaryUnavailable}`,
      `${t.summaryTax}: ${percent(result.taxRate)}`,
      t.summaryOnly,
    ].join('\n')
    setClipboardError(false)
    setFallbackSummary(summary)
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(summary)
      setCopiedState('success')
    } catch {
      setClipboardError(true)
      setCopiedState('error')
      window.setTimeout(() => {
        const manual = document.getElementById('payout-manual-copy')
        manual?.focus()
        manual?.select()
      }, 0)
    }
  }
  const amount = (value) => money(value, currency, language)

  return <div className="payout-page" lang={spanish ? 'es' : 'en'}>
    <section className="payout-hero">
      <div className="payout-wrap payout-hero__inner">
        <p className="payout-eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="payout-hero__intro">{t.intro}</p>
        <div className="payout-hero__actions">
          <a className="payout-primary" href="#payout-calculator">{t.calculate}<ArrowRight size={17} aria-hidden="true" style={{ marginLeft: 9 }} /></a>
          <span className="payout-hero__note">{t.free}</span>
        </div>
      </div>
    </section>

    <section className="payout-calculator-section payout-wrap" id="payout-calculator" aria-labelledby="payout-calc-title">
      <div className="payout-section-heading">
        <p className="payout-kicker">{t.calcEyebrow}</p>
        <h2 id="payout-calc-title">{t.calcTitle}</h2>
        <p>{t.calcIntro}</p>
      </div>
      <div className="payout-calculator-grid">
        <section className="payout-panel payout-input-panel" aria-label={t.calcTitle}>
          <div className="payout-panel-title"><h3>{t.calcTitle}</h3><span className="payout-step">{spanish ? '01 — DATOS' : '01 — INPUTS'}</span></div>
          <div className="payout-mode" role="group" aria-label={spanish ? 'Modo de cálculo' : 'Calculation mode'}>
            <button type="button" aria-pressed={input.mode === 'rate'} onClick={() => update('mode', 'rate')}>{t.knowRate}</button>
            <button type="button" aria-pressed={input.mode === 'target'} onClick={() => update('mode', 'target')}>{t.knowPayout}</button>
          </div>

          <div className="payout-subsection"><span className="payout-subsection__mark">A</span><div><h4>{t.where}</h4><p>{t.taxHelp}</p></div></div>
          <div className="payout-field-grid">
            <SelectField id="payout-country" label={t.country} value={country} onChange={(event) => changeCountry(event.target.value)}>
              {COUNTRIES.map((item) => <option key={item.code} value={item.code}>{item.label[spanish ? 'es' : 'en']}</option>)}
            </SelectField>
            {country === 'US' ? <SelectField id="payout-state" label={t.state} value={state} onChange={(event) => jurisdictionChange(setState, event.target.value)} wide>
              <option value="">{spanish ? 'Seleccione un estado' : 'Select a state'}</option>
              {US_STATES.map((item) => <option value={item.code} key={item.code}>{item.name}</option>)}
            </SelectField> : <InputField id="payout-region" label={t.region} type="text" value={region} onChange={(event) => jurisdictionChange(setRegion, event.target.value)} wide placeholder={spanish ? 'Opcional' : 'Optional'} />}
            {country === 'US' && <InputField id="payout-county" label={`${t.county} (${spanish ? 'opcional' : 'optional'})`} type="text" value={county} onChange={(event) => jurisdictionChange(setCounty, event.target.value)} />}
            <InputField id="payout-city" label={`${t.city} (${spanish ? 'opcional' : 'optional'})`} type="text" value={city} onChange={(event) => jurisdictionChange(setCity, event.target.value)} />
            <InputField id="payout-tax-rate" label={`${t.localTax} (%)`} value={verifiedTax ? String(verifiedTax.tax_rate) : input.taxRate}
              readOnly={!!verifiedTax}
              onChange={(event) => update('taxRate', event.target.value)} min="0" step="0.01" wide
              hint={verifiedTax ? `${t.taxName}: ${verifiedTax.tax_name}. ${t.taxVerified}: ${verifiedTax.last_verified || '—'}.` : t.unverified}
              error={errors.taxRate} />
          </div>
          {verifiedTax?.source && <div className="payout-tax-source"><strong>{taxTitle}</strong><br />{verifiedTax.platform_collection_notes || ''}<br /><a href={verifiedTax.source} target="_blank" rel="noreferrer">{spanish ? 'Ver fuente oficial' : 'View source'}</a></div>}
          {!verifiedTax && <p className="payout-inline-note">{t.unverified}</p>}

          <div className="payout-subsection"><span className="payout-subsection__mark">B</span><div><h4>{t.platform}</h4><p>{feeGuide}</p></div></div>
          <div className="payout-field-grid">
            <SelectField id="payout-platform" label={t.platform} value={platform} onChange={(event) => changePlatform(event.target.value)} wide>
              {PLATFORM_PRESETS.map((item) => <option key={item.id} value={item.id}>{localizedPlatformLabel(item, spanish)}</option>)}
            </SelectField>
            <InputField id="payout-platform-fee" label={`${t.platformFee} (%)`} value={input.platformFee} onChange={(event) => update('platformFee', event.target.value)} step="0.1" min="0" hint={feeGuide || t.feeHelp} error={errors.platformFee} />
            <InputField id="payout-guest-fee" label={t.guestFee} value={input.guestFeeRate} onChange={(event) => update('guestFeeRate', event.target.value)} step="0.1" min="0" hint={t.guestFeeHelp} error={errors.guestFeeRate} />
            <InputField id="payout-processing-rate" label={`${t.processingRate} (%)`} value={input.processingFee} onChange={(event) => update('processingFee', event.target.value)} step="0.1" min="0" hint={spanish ? 'Ingrese la tarifa real de su procesador.' : 'Enter your actual processor rate.'} error={errors.processingFee} />
            <InputField id="payout-processing-fixed" label={t.fixed} value={input.fixedProcessingFee} onChange={(event) => update('fixedProcessingFee', event.target.value)} hint={spanish ? 'Cargo fijo por reserva.' : 'Fixed charge per reservation.'} error={errors.fixedProcessingFee} />
          </div>
          {platform === 'airbnb' && <p className="payout-inline-note">{t.presetNote}</p>}
          {platform === 'booking' && <p className="payout-inline-note">{t.bookingNote}</p>}
          {platform === 'expedia' && <p className="payout-inline-note">{t.expediaNote}</p>}
          {platform === 'vrbo' && <p className="payout-inline-note">{t.vrboNote}</p>}
          {platform === 'google' && <p className="payout-inline-note">{t.googleNote}</p>}
          {platform === 'direct' && <p className="payout-inline-note">{t.directNote}</p>}

          <div className="payout-subsection"><span className="payout-subsection__mark">C</span><div><h4>{t.reservation}</h4><p>{input.mode === 'target' ? t.targetHelp : (spanish ? 'Los importes corresponden a la reserva completa.' : 'Amounts represent the entire reservation.')}</p></div></div>
          <div className="payout-field-grid">
            {input.mode === 'rate'
              ? <InputField id="payout-nightly" label={t.nightly} value={input.nightlyRate} onChange={(event) => update('nightlyRate', event.target.value)} error={errors.nightlyRate} />
              : <InputField id="payout-target" label={t.target} value={input.targetPayout} onChange={(event) => update('targetPayout', event.target.value)} hint={t.targetHelp} error={errors.targetPayout} />}
            <InputField id="payout-nights" label={t.nights} value={input.nights} onChange={(event) => update('nights', event.target.value)} step="1" min="1" error={errors.nights} />
            <InputField id="payout-cleaning" label={t.cleaning} value={input.cleaningFee} onChange={(event) => update('cleaningFee', event.target.value)} error={errors.cleaningFee} />
            <InputField id="payout-other" label={t.other} value={input.otherFees} onChange={(event) => update('otherFees', event.target.value)} error={errors.otherFees} />
          </div>

          <div className="payout-subsection"><span className="payout-subsection__mark">D</span><div><h4>{t.remit}</h4><p>{spanish ? 'El impuesto cobrado para el gobierno no debe mostrarse como ganancia.' : 'Government tax collected is not owner profit.'}</p></div></div>
          <SelectField id="payout-remitter" label={t.remit} value={input.taxRemitter} onChange={(event) => update('taxRemitter', event.target.value)} wide>
            <option value="platform">{t.remitPlatform}</option><option value="owner">{t.remitOwner}</option><option value="separate">{t.remitSeparate}</option><option value="unsure">{t.remitUnsure}</option>
          </SelectField>

          <div className="payout-subsection"><span className="payout-subsection__mark">E</span><div><h4>{t.management}</h4><p>{t.managementHelp}</p></div></div>
          <div className="payout-field-grid">
            <SelectField id="payout-management" label={t.managed} value={management} onChange={(event) => changeManagement(event.target.value)} wide>
              <option value="none">{t.none}</option><option value="listing">{t.listing}</option><option value="full">{t.full}</option><option value="custom">{t.custom}</option>
            </SelectField>
            {management === 'custom' && <InputField id="payout-management-rate" label={t.customRate} value={customManagement} onChange={(event) => setCustomManagement(event.target.value)} step="0.1" min="0" wide error={errors.managementRate} />}
          </div>

          <details className="payout-advanced">
            <summary>{t.advanced}</summary>
            <div className="payout-advanced__content">
              <p className="payout-hint">{t.advancedHelp}</p>
              <div className="payout-field-grid" style={{ marginTop: 12 }}>
                <SelectField id="payout-platform-basis" label={t.platformBasis} value={input.platformBasis} onChange={(event) => update('platformBasis', event.target.value)}>
                  <option value="subtotal">{t.subtotal}</option><option value="accommodation">{t.accommodation}</option>
                </SelectField>
                <SelectField id="payout-processing-basis" label={t.processingBasis} value={input.processingBasis} onChange={(event) => update('processingBasis', event.target.value)}>
                  <option value="guestTotal">{t.guestTotalBasis}</option><option value="subtotal">{t.subtotal}</option>
                </SelectField>
                <SelectField id="payout-management-basis" label={t.managementBasis} value={input.managementBasis} onChange={(event) => update('managementBasis', event.target.value)} wide>
                  <option value="accommodation">{t.accommodation}</option><option value="subtotal">{t.subtotal}</option>
                </SelectField>
              </div>
              <div className="payout-label-row" style={{ marginTop: 15 }}><span className="payout-field"><span style={{ color: '#e8eaf0', fontSize: '.87rem', fontWeight: 650 }}>{t.taxable}</span></span><span className="payout-help" title={t.advancedHelp} aria-label={t.advancedHelp}>i</span></div>
              <div className="payout-checks">
                {[
                  ['accommodation', t.taxAccommodation], ['cleaning', t.taxCleaning], ['other', t.taxOther],
                ].map(([key, label]) => <label key={key} className="payout-check"><input type="checkbox" disabled={!!verifiedTax} checked={calcInput.taxableComponents.includes(key)} onChange={(event) => update('taxableComponents', event.target.checked ? [...input.taxableComponents, key] : input.taxableComponents.filter((item) => item !== key))} />{label}</label>)}
              </div>
            </div>
          </details>
        </section>

        <aside className="payout-panel payout-result-panel" aria-live="polite">
          <div className="payout-result-top"><h3>{t.result}</h3><select aria-label={spanish ? 'Moneda' : 'Currency'} className="payout-select payout-currency-select" value={currency} onChange={(event) => setCurrency(event.target.value)}>{CURRENCIES.map((item) => <option key={item}>{item}</option>)}</select></div>
          <section className="payout-management-comparison" aria-labelledby="ipm-comparison-title">
            <h4 id="ipm-comparison-title">{t.ipmComparisonTitle}</h4>
            <InputField id="payout-comparison-management-rate" label={t.ipmPreviewRate}
              value={previewManagementRate} onChange={(event) => editComparisonManagement(event.target.value)}
              error={managementComparison.withManagement.errors?.managementRate ? localizePayoutError(managementComparison.withManagement.errors.managementRate, language) : undefined} />
            <div className="payout-management-comparison__grid">
              {[[t.withoutIpm, managementComparison.withoutManagement], [t.withIpm, managementComparison.withManagement]].map(([label, estimate]) => (
                <div className="payout-management-comparison__card" key={label}>
                  <span>{label}</span>
                  <strong>{estimate.ok ? amount(estimate.ownerPayout) : '—'}</strong>
                  <small>{t.ownerPayout}</small>
                  {input.mode === 'target' && estimate.ok && <small>{t.requiredRate}: {amount(estimate.requiredNightlyRate)}</small>}
                  {estimate.ok && label === t.withIpm && <small>{t.managementResult}: {amount(estimate.managementFee)}</small>}
                  {!estimate.ok && estimate.errors?.targetPayout && <small className="payout-error">{localizePayoutError(estimate.errors.targetPayout, language)}</small>}
                </div>
              ))}
            </div>
            <p className="payout-footnote">{t.ipmPreviewNote}</p>
          </section>
          {result.ok ? <>
            <div className="payout-result-total"><span>{t.ownerPayout}</span><strong>{amount(result.ownerPayout)}</strong>
              {input.mode === 'target' && <small>{t.reverseTitle}: {amount(result.requiredNightlyRate)} / {spanish ? 'noche' : 'night'}</small>}
            </div>
            <div className="payout-result-section"><h4>{t.bookingDetails}</h4><div className="payout-ledger">
              <Line label={t.nightlyResult} value={amount(result.nightlyRate)} />
              <Line label={t.nightsResult} value={String(result.nights)} />
              <Line label={t.accommodationResult} value={amount(result.accommodation)} />
              <Line label={t.cleaningResult} value={amount(result.cleaningFee)} />
              <Line label={t.otherResult} value={amount(result.otherFees)} />
              <Line label={t.subtotalResult} value={amount(result.bookingSubtotal)} emphasis />
              <Line label={t.taxResult} value={`+ ${amount(result.tax)}`} tax />
              {Number(result.guestFee) > 0 && <Line label={`${t.guestFee} (${percent(input.guestFeeRate)})`} value={`+ ${amount(result.guestFee)}`} tax />}
              <Line label={t.guestTotal} value={amount(result.guestTotal)} emphasis />
            </div></div>
            <div className="payout-result-section"><h4>{t.payoutDetails}</h4><div className="payout-ledger">
              <Line label={t.subtotalResult} value={amount(result.bookingSubtotal)} />
              <Line label={`${t.platformFeeResult} (${percent(result.platformFeeRate)})`} value={`− ${amount(result.platformFee)}`} />
              <Line label={t.processingResult} value={`− ${amount(result.processingFee)}`} />
              <Line label={t.platformPayout} value={amount(result.platformPayout)} emphasis />
              <Line label={t.taxReserve} value={amount(result.taxReserve)} tax />
              {Number(result.managementFee) > 0 && <Line label={`${t.managementResult} (${percent(result.managementRate)})`} value={`− ${amount(result.managementFee)}`} />}
              <Line label={t.ownerPayout} value={amount(result.ownerPayout)} emphasis />
            </div></div>
            <p className="payout-footnote">{input.taxRemitter === 'platform' ? t.platformTaxNote : input.taxRemitter === 'owner' ? t.ownerTaxNote : input.taxRemitter === 'unsure' ? t.taxUnsureNote : t.taxSeparateNote} {t.basisNote}</p>
            {input.mode === 'target' && <div className="payout-result-section">
              <h4>{t.reverseTitle}</h4><div className="payout-ledger">
                <Line label={t.requiredRate} value={amount(result.requiredNightlyRate)} emphasis />
                <Line label={t.requiredSubtotal} value={amount(result.requiredBookingSubtotal)} />
                <Line label={t.increase} value={percent(result.requiredIncreasePercent)} />
              </div>
            </div>}
          </> : <div className="payout-result-error" role="alert">
            <strong>{spanish ? 'Revise los datos' : 'Check your inputs'}</strong>
            <ul>{Object.entries(errors).map(([field, message]) => <li key={field}>{field === 'taxRate' ? `${t.localTax}: ` : ''}{message}</li>)}</ul>
          </div>}
          <button type="button" className="payout-secondary" onClick={copyResults}>{t.copy}</button>
          <p className="payout-status" role="status" aria-live="polite">{copiedState === 'success' ? t.copySuccess : copiedState === 'error' ? t.copyError : copiedState === 'invalid' ? t.copyInvalid : ''}</p>
          {clipboardError && result.ok && <div className="payout-field payout-field--wide">
            <label htmlFor="payout-manual-copy" className="payout-hint">{t.copiedFallback}</label>
            <textarea id="payout-manual-copy" className="payout-input" rows="7" readOnly value={fallbackSummary} />
          </div>}
        </aside>
      </div>

      <section className="payout-panel payout-compare" aria-labelledby="payout-compare-title">
        <div className="payout-compare__header">
          <div><h3 id="payout-compare-title">{t.compare}</h3><p>{t.compareIntro}</p></div>
          <button className="payout-secondary payout-compare__toggle" type="button" aria-expanded={comparisonOpen} onClick={() => setComparisonOpen((open) => !open)}>{comparisonOpen ? t.hideCompare : t.showCompare}</button>
        </div>
        {comparisonOpen && <div className="payout-compare-grid">
          {comparisonResults.map((item) => <article className="payout-compare-card" key={item.id}>
            <div className="payout-compare-card__top"><h4>{item.label}</h4>{highestResult?.id === item.id && <span className="payout-compare-card__winner">{t.highest}</span>}</div>
            <label htmlFor={`compare-fee-${item.id}`}>{t.yourFee}</label>
            <input id={`compare-fee-${item.id}`} className="payout-input" type="number" inputMode="decimal" min="0" max="99.99" step="0.1" value={item.fee} onChange={(event) => updateComparisonFee(item.id, event.target.value)} aria-invalid={!item.result.ok} />
            <label htmlFor={`compare-guest-fee-${item.id}`}>{t.guestFee}</label>
            <input id={`compare-guest-fee-${item.id}`} className="payout-input" type="number" inputMode="decimal" min="0" max="99.99" step="0.1"
              value={comparisonInput(item.id).guestFeeRate}
              onChange={(event) => updateComparisonGuestFee(item.id, event.target.value)} aria-invalid={!item.result.ok} />
            <span className="payout-compare-card__meta">{t.compareGuestFeeHelp}</span>
            {item.result.ok ? <>
              {input.mode === 'target' && <span className="payout-compare-card__meta">{t.requiredRate}: {amount(item.result.requiredNightlyRate)}</span>}
              <strong className="payout-compare-card__value">{amount(item.result.ownerPayout)}</strong>
              <span className="payout-compare-card__meta">{t.comparisonPayout}</span>
            </> : <p className="payout-error">{spanish ? 'Ingrese una comisión válida para calcular.' : 'Enter a valid fee to calculate.'}</p>}
          </article>)}
        </div>}
        {comparisonOpen && <p className="payout-compare__note"><strong>{t.winnerNote}</strong> {t.comparePerformance}</p>}
      </section>
    </section>

    <PayoutEducation t={t} amount={amount} percent={percent} spanish={spanish} currency={currency} />
  </div>
}
