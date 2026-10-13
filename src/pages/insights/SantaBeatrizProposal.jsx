import { useId, useMemo, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import proposalConfig from '../../data/santaBeatrizProposal.json';
import { calculateFurnishingBudget, calculateProposal, createProposalModel, formatProposalMoney } from '../../lib/santaBeatrizModel.js';
import { proposalCopy } from './santa-beatriz/copy.js';
import { BeforeAfter, CompetitorCard, MapExplorer, ScenarioChart } from './santa-beatriz/ProposalVisuals.jsx';
import './SantaBeatrizProposal.css';

const clone = (value) => structuredClone(value);
const amenityList = [
  ['Panoramic rooftop swimming pool', 'Piscina panorámica en la azotea', true],
  ['Gym', 'Gimnasio', true],
  ['Barbecue facilities', 'Área de parrillas', true],
  ['Lobby', 'Lobby', false],
  ['Shared laundry', 'Lavandería compartida', false],
  ['Common gardens', 'Jardines comunes', true],
  ['Children’s area', 'Área para niños', true],
  ['Bicycle parking', 'Estacionamiento de bicicletas', false],
  ['Security camera system', 'Sistema de cámaras de seguridad', false],
  ['Multipurpose room', 'Sala multiusos', false]
];
const costFields = ['utilities', 'internet', 'maintenance', 'supplies', 'cleaningCost', 'cleaningRecovery', 'taxes', 'other'];

function money(value, model, language) {
  return formatProposalMoney(Number(value) || 0, model.currency, model.exchangeRatePenPerUsd, language);
}

function CostEditor({ label, value, onChange, suffix = 'USD / year' }) {
  const id = useId();
  const months = /month|meses/.test(suffix) && !/USD/.test(suffix);
  const maximum = suffix === '%' ? 100 : months ? 12 : undefined;
  return <div className="sp-cost-row"><label htmlFor={id}>{label} <small>({suffix})</small></label><input id={id} type="number" min="0" max={maximum} step={maximum ? '1' : '25'} value={value} onChange={(event) => onChange(Number(event.target.value))} /></div>;
}

export default function SantaBeatrizProposal() {
  const { language, toggleLanguage } = useLanguage();
  const lang = language === 'es' ? 'es' : 'en';
  const t = proposalCopy[lang];
  const [model, setModel] = useState(() => createProposalModel(proposalConfig));
  const [furnishings, setFurnishings] = useState(() => clone(proposalConfig.furnishings));
  const [contingency, setContingency] = useState(proposalConfig.contingencyPercent);
  const [activeImage, setActiveImage] = useState(null);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [copyFailure, setCopyFailure] = useState(false);

  const result = useMemo(() => calculateProposal(model), [model]);
  const budget = useMemo(() => calculateFurnishingBudget(furnishings, contingency), [furnishings, contingency]);
  const minSubtotal = furnishings.reduce((total, item) => total + item.minPen, 0);
  const maxSubtotal = furnishings.reduce((total, item) => total + item.maxPen, 0);
  const grossRange = { min: minSubtotal * (1 + contingency / 100), max: maxSubtotal * (1 + contingency / 100) };
  const p = proposalConfig.property;
  const market = proposalConfig.market;
  const image = proposalConfig.images;
  const prefix = lang === 'es' ? '/es' : '';
  const statusLabel = ({ preliminary: t.proposalStatus, ready: lang === 'es' ? 'Lista para presentar' : 'Ready for presentation', archived: lang === 'es' ? 'Propuesta archivada' : 'Archived proposal' })[proposalConfig.status] || proposalConfig.status;

  const updateGlobal = (key, value) => setModel((current) => ({ ...current, [key]: value }));
  const updateCondition = (condition, key, value) => setModel((current) => ({
    ...current,
    [condition]: { ...current[condition], [key]: value }
  }));
  const updateCost = (condition, key, value) => setModel((current) => ({
    ...current,
    [condition]: { ...current[condition], costs: { ...current[condition].costs, [key]: value } }
  }));
  const updateMonthlyFee = (condition, value) => setModel((current) => {
    const costs = current[condition].costs;
    return {
      ...current,
      [condition]: {
        ...current[condition],
        costs: { ...costs, monthlyFee: value }
      }
    };
  });
  const updateScenario = (id, key, value) => setModel((current) => ({
    ...current,
    scenarios: current.scenarios.map((scenario) => scenario.id === id ? { ...scenario, [key]: value } : scenario)
  }));
  const updateFurnishing = (id, key, value) => setFurnishings((current) => current.map((item) => item.id === id ? { ...item, [key]: value } : item));
  const displayMoney = (value) => money(value, model, lang);
  const resetModel = () => {
    setModel(createProposalModel(proposalConfig));
    setFurnishings(clone(proposalConfig.furnishings));
    setContingency(proposalConfig.contingencyPercent);
    setPdfError(false);
  };
  const share = async () => {
    setShareMessage('');
    setCopyFailure(false);
    try {
      if (navigator.share) {
        await navigator.share({ title: t.title, url: `${window.location.origin}${window.location.pathname}` });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}`);
        setShareMessage(t.copied);
      } else {
        setCopyFailure(true);
        setShareMessage(t.copyFailed);
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setCopyFailure(true);
        setShareMessage(t.shareFailed);
      }
    }
  };
  const downloadPdf = async () => {
    if (!result.valid || pdfBusy) return;
    setPdfBusy(true);
    setPdfError(false);
    try {
      const { downloadSantaBeatrizPdf } = await import('../../lib/santaBeatrizPdf.js');
      await downloadSantaBeatrizPdf({ language: lang, config: proposalConfig, model, furnishings, contingencyPercent: contingency });
    } catch {
      setPdfError(true);
    } finally {
      setPdfBusy(false);
    }
  };
  const applyBudget = () => updateGlobal('improvementCostPen', Math.round(budget.total));
  if (!proposalConfig.enabled) {
    return <div className="santa-proposal"><div className="sp-unavailable"><h1>{t.unavailable}</h1></div></div>;
  }

  return (
    <div className="santa-proposal" lang={lang}>
      <div className="sp-topline"><div className="sp-shell sp-topline-inner">
        <div className="sp-brand"><span className="sp-brand-mark">IPM</span><span>International Property Management</span></div>
        <div className="sp-top-actions">
          <button type="button" onClick={() => toggleLanguage(lang === 'en' ? 'es' : 'en')} aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}>{t.language}</button>
          <button type="button" onClick={share}>{t.share}</button>
          <button type="button" onClick={() => window.print()}>{t.print}</button>
        </div>
      </div></div>
      <div className="sp-shell">
        <header className="sp-hero">
          <div>
            <div className="sp-eyebrow">{t.prepared}</div>
             <span className="sp-status">{statusLabel}</span>
            <h1>{t.title}</h1>
            <p className="sp-hero-sub">{t.subtitle}</p>
            <p className="sp-address">{p.address}</p>
            <div className="sp-actions">
              <a className="sp-button sp-button-primary" href="#financial-model">{t.viewRevenue}</a>
               <a className="sp-button sp-button-gold" href={`${prefix}/contact`}>{t.consult}</a>
            </div>
            {shareMessage && <p className={`sp-source ${copyFailure ? 'sp-invalid' : ''}`} role="status">{shareMessage}</p>}
          </div>
          <div className="sp-hero-image">
             <img src={image.exterior} alt={image.exteriorType === 'actual' ? (lang === 'es' ? 'Fotografía real exterior del edificio' : 'Actual building exterior photograph') : (lang === 'es' ? 'Vista de referencia exterior del edificio; render del desarrollador' : 'Building exterior reference; developer rendering')} fetchPriority="high" />
             <span className="sp-image-label">{image.exteriorType === 'actual' ? t.actual : t.afterRender}</span>
          </div>
          <div className="sp-meta">
            <div className="sp-meta-item"><strong>{p.areaSqm} m²</strong><span>{t.area}</span></div>
            <div className="sp-meta-item"><strong>{p.primaryBedrooms} + {p.studies}</strong><span>{t.layout}</span></div>
            <div className="sp-meta-item"><strong>{p.bathrooms}</strong><span>{t.bath}</span></div>
            <div className="sp-meta-item"><strong>{p.floor}</strong><span>{t.floor} · {t.tower} {p.tower}</span></div>
          </div>
        </header>

        <section className="sp-section" id="overview">
          <div className="sp-section-head"><div><span className="sp-eyebrow">01 / {t.overview}</span><h2>{t.overview}</h2></div><p className="sp-section-intro">{t.factsIntro}</p></div>
          <div className="sp-grid-2">
            <div className="sp-panel">
              <div className="sp-facts">
                <div className="sp-fact"><small>{t.property}</small><strong>{p.name}</strong></div>
                <div className="sp-fact"><small>{t.tower}</small><strong>{p.tower} · {p.towerConfirmed ? t.confirmed : t.pending}</strong></div>
                <div className="sp-fact"><small>{t.floor}</small><strong>{p.floor}</strong></div>
                <div className="sp-fact"><small>{t.area}</small><strong>{p.areaSqm} m²</strong></div>
                <div className="sp-fact"><small>{t.layout}</small><strong>{p.primaryBedrooms} {lang === 'es' ? 'dormitorio' : 'bedroom'} + {p.studies} {lang === 'es' ? 'estudio' : 'study'} · {p.floorPlanType}</strong></div>
                <div className="sp-fact"><small>{t.bath}</small><strong>{p.bathrooms}</strong></div>
                <div className="sp-fact"><small>{t.guests}</small><strong>{p.guestCapacity} · {p.capacityConfirmed ? t.confirmed : t.pending}</strong></div>
                <div className="sp-fact"><small>{lang === 'es' ? 'Balcón' : 'Balcony'}</small><strong>{p.balcony === 'unconfirmed' ? t.pending : p.balcony === 'yes' ? (lang === 'es' ? 'Sí' : 'Yes') : (lang === 'es' ? 'No' : 'No')}</strong></div>
              </div>
              <p className="sp-caution">{t.studyNote}</p>
              <p className="sp-source">{t.planNote} · {p.floorPlanConfirmed ? t.confirmed : t.pending}</p>
            </div>
            <div className="sp-panel">
              <img src={image.floorPlan} alt={`${p.floorPlanType} floor plan`} loading="lazy" style={{ width: '100%', maxHeight: 350, objectFit: 'contain', background: '#f5f3ee' }} />
              <p className="sp-source">{t.brochure}</p>
            </div>
          </div>
          <h3 className="sp-cost-heading" style={{ marginTop: 28 }}>{lang === 'es' ? 'Fotografías interiores suministradas' : 'Supplied interior photographs'}</h3>
          <div className="sp-photo-grid">
            {(image.gallery || []).map((src, index) => <button className="sp-photo" key={`${src}-${index}`} type="button" onClick={() => setActiveImage(src)}>
              <img src={src} loading="lazy" alt={`${t.beforeActual} ${index + 1}`} /><span>{t.actual}</span>
            </button>)}
          </div>
          <p className="sp-source">{lang === 'es' ? 'Las fotos muestran una cocina instalada con refrigerador, estufa y horno, además de un sofá básico y espacio de trabajo. Priorice inspeccionar y reutilizar piezas adecuadas antes de reemplazarlas. No se han suministrado fotos de los dormitorios ni historial de reservas.' : 'The photos show a fitted kitchen with refrigerator, stove and oven, plus a basic sofa and workspace. Inspect and retain suitable pieces before budgeting replacements. Bedroom photographs and booking history have not been supplied.'}</p>
        </section>

        <section className="sp-section" id="amenities">
          <div className="sp-section-head"><div><span className="sp-eyebrow">02 / {t.amenities}</span><h2>{t.amenities}</h2></div><p className="sp-section-intro">{t.amenityNote}</p></div>
          <div className="sp-table-scroll"><table className="sp-amenity-table"><thead><tr><th>{t.advertised}</th><th>{t.amenityUse}</th></tr></thead><tbody>
            {amenityList.map(([en, es, useful]) => <tr key={en}><td>{lang === 'es' ? es : en}</td><td><span className="sp-tag">{useful ? t.high : t.shared}</span></td></tr>)}
          </tbody></table></div>
        </section>

        <section className="sp-section" id="location">
          <div className="sp-section-head"><div><span className="sp-eyebrow">03 / {t.location}</span><h2>{t.location}</h2></div><p className="sp-section-intro">{t.locationIntro}</p></div>
          <MapExplorer address={p.address} t={t} />
          <h3 className="sp-cost-heading" style={{ marginTop: 26 }}>{t.segments}</h3>
          <div className="sp-segments">{(lang === 'es'
            ? ['Viajeros de negocios','Parejas','Familias pequeñas','Asistentes a eventos','Visitantes médicos y acompañantes','Viajeros nacionales e internacionales','Estancias corporativas de mediano plazo']
            : ['Business travelers','Couples','Small families','Visitors attending events','Medical visitors and companions','Domestic and international travelers','Medium-term corporate stays']).map((segment) => <span key={segment}>{segment}</span>)}</div>
          <img src={image.location} loading="lazy" alt={lang === 'es' ? 'Mapa de ubicación del folleto' : 'Brochure location map'} style={{ width: '100%', maxHeight: 300, objectFit: 'contain', marginTop: 22, background: '#efede7' }} />
        </section>

        <section className="sp-section" id="market">
          <div className="sp-section-head"><div><span className="sp-eyebrow">04 / {t.market}</span><h2>{t.market}</h2></div><p className="sp-section-intro">{t.historical}</p></div>
          <div className="sp-market-grid">
            {[
              [lang === 'es' ? 'Tarifa diaria promedio' : 'Average daily rate', `$${market.adrUsd}`],
              [lang === 'es' ? 'Ocupación promedio' : 'Average occupancy', `${market.occupancyPercent}%`],
              [lang === 'es' ? 'Ingreso bruto anual' : 'Average annual gross revenue', `$${market.annualRevenueUsd.toLocaleString()}`],
              [lang === 'es' ? 'Anuncios activos · brief' : 'Active listings · brief snapshot', market.activeListingsInBrief.toLocaleString()],
              ['RevPAR', `≈ $${market.revparUsd}`]
            ].map(([label, value]) => <div className="sp-market-cell" key={label}><span>{label}</span><strong>{value}</strong></div>)}
          </div>
          <p className="sp-source">{t.period}: {lang === 'es' ? 'Doce meses hasta septiembre de 2026' : market.observationPeriod}. {t.sourceDate}: {market.publicationDate}. {lang === 'es' ? `La consulta del ${proposalConfig.researchDate} encontró ${market.activeListingsVerified.toLocaleString()} anuncios activos; el brief indica ${market.activeListingsInBrief.toLocaleString()}.` : `Rechecked ${proposalConfig.researchDate}: ${market.activeListingsVerified.toLocaleString()} active listings; supplied snapshot: ${market.activeListingsInBrief.toLocaleString()}.`}<br />
            {t.marketSource}: <a href={market.source} target="_blank" rel="noreferrer">{market.source}</a>.</p>
          <p className="sp-caution">{t.method}</p>
          <p className="sp-source">{lang === 'es' ? 'El ingreso anual de AirDNA incluye limpieza y otros cargos del huésped; la calculadora de esta propuesta modela ingresos por alojamiento y recuperación de limpieza por separado.' : 'AirDNA annual revenue includes cleaning and other guest fees; this proposal calculator models room revenue and cleaning-fee recovery separately.'}</p>
        </section>

        <section className="sp-section" id="competitors">
          <div className="sp-section-head"><div><span className="sp-eyebrow">05 / {t.competitors}</span><h2>{t.competitors}</h2></div><p className="sp-section-intro">{t.compIntro}</p></div>
          <div className="sp-competitors">{proposalConfig.competitors.map((competitor) => <CompetitorCard key={competitor.id} competitor={competitor} language={lang} t={t} />)}</div>
          <h3 className="sp-cost-heading" style={{ marginTop: 26 }}>{t.matrix}</h3>
          <div className="sp-matrix" role="table" aria-label={t.matrix}>
            {[t.matrixListing,t.matrixCapacity,t.matrixStrength,t.matrixGap].map((label) => <div className="sp-matrix-title" role="columnheader" key={label}>{label}</div>)}
            {proposalConfig.competitors.map((c) => <div role="row" key={c.id} className="sp-matrix-row">
              <span>{c.name} · {c.relationship === 'same-building' ? t.sameBuilding : t.nearby}</span>
              <span>{c.bedrooms} bd / {c.bathrooms} ba · {c.guests} {t.guestsLabel}</span>
              <span>{lang === 'es' ? c.strengthEs : c.strengthEn}</span>
              <span>{lang === 'es' ? 'Estudio funcional, presentación profesional y verificación de acceso.' : 'Functional study, considered presentation and verified guest access.'}</span>
            </div>)}
          </div>
          <p className="sp-source">{t.noQuotes}</p>
        </section>

        <section className="sp-section" id="condition">
          <div className="sp-section-head"><div><span className="sp-eyebrow">06 / {t.condition}</span><h2>{t.condition}</h2></div><p className="sp-section-intro">{t.conditionIntro}</p></div>
          <div className="sp-condition-controls">
            {['before','after'].map((condition) => {
              const current = model[condition];
              return <div className="sp-condition" key={condition}>
                <h3>{condition === 'before' ? t.existing : t.upgraded}</h3>
                <div className="sp-control"><label htmlFor={`${condition}-adr`}><span>{t.adr}</span><strong>${current.adr}</strong></label><input id={`${condition}-adr`} type="range" min="0" max="200" value={current.adr} onChange={(event) => updateCondition(condition, 'adr', Number(event.target.value))} /></div>
                <div className="sp-control"><label htmlFor={`${condition}-occupancy`}><span>{t.occupancy}</span><strong>{current.occupancyPercent}%</strong></label><input id={`${condition}-occupancy`} type="range" min="0" max="100" value={current.occupancyPercent} onChange={(event) => updateCondition(condition, 'occupancyPercent', Number(event.target.value))} /></div>
                <div className="sp-control"><label htmlFor={`${condition}-override`}>{condition === 'before' ? t.beforeRevenueOverride : t.upgradedRevenueOverride}</label><input id={`${condition}-override`} type="number" min="0" placeholder={lang === 'es' ? 'Vacío = tarifa × noches × ocupación' : 'Blank = rate × nights × occupancy'} value={current.annualRevenueOverride ?? ''} onChange={(event) => updateCondition(condition, 'annualRevenueOverride', event.target.value === '' ? null : Number(event.target.value))} /></div>
                {result.valid && <div className="sp-results"><div className="sp-result"><span>{t.annualGross}</span><strong>{displayMoney(result[condition].gross)}</strong></div><div className="sp-result"><span>{t.monthlyGross}</span><strong>{displayMoney(result[condition].monthlyGross)}</strong></div><div className="sp-result"><span>{t.expenses}</span><strong>{displayMoney(result[condition].expenses)}</strong></div><div className="sp-result"><span>{t.annualNet}</span><strong>{displayMoney(result[condition].net)}</strong></div></div>}
              </div>;
            })}
          </div>
          <div className="sp-note">{t.conditionIntro}</div>
          {result.valid && <p className="sp-note"><strong>{lang === 'es' ? 'Ingreso bruto anual adicional modelado' : 'Modeled additional annual gross'}: {displayMoney(result.incrementalGross)}</strong></p>}
          <div className="sp-panel" style={{ marginTop: 22 }}>
            <BeforeAfter before={image.before} after={image.after} afterType={image.afterType} t={t} />
            <p className="sp-source">{t.beforeActual} · {image.afterType === 'actual' ? t.actual : t.afterRender}.</p>
          </div>
        </section>

        <section className="sp-section" id="scenarios">
          <div className="sp-section-head"><div><span className="sp-eyebrow">07 / {t.scenarios}</span><h2>{t.scenarios}</h2></div><p className="sp-section-intro">{t.scenariosNote}</p></div>
          <div className="sp-control-row">
            <div className="sp-control"><label>{t.availability}<strong>{model.availableNights}</strong></label><input type="range" min="0" max="365" value={model.availableNights} onChange={(event) => updateGlobal('availableNights', Number(event.target.value))} /></div>
          </div>
          <div className="sp-grid-3">
            {model.scenarios.map((scenario) => <div className="sp-condition" key={scenario.id}>
              <h3>{lang === 'es' ? scenario.es : scenario.en}{scenario.id === 'base' ? ` · ${lang === 'es' ? 'vinculado al renovado' : 'linked to refreshed'}` : ''}</h3>
              {scenario.id === 'base' ? <p>{t.adr}: ${model.after.adr} · {t.occupancy}: {model.after.occupancyPercent}%</p> : <>
                <div className="sp-control"><label>{t.adr}<strong>${scenario.adr}</strong></label><input type="range" min="15" max="200" value={scenario.adr} onChange={(event) => updateScenario(scenario.id, 'adr', Number(event.target.value))} /></div>
                <div className="sp-control"><label>{t.occupancy}<strong>{scenario.occupancyPercent}%</strong></label><input type="range" min="0" max="100" value={scenario.occupancyPercent} onChange={(event) => updateScenario(scenario.id, 'occupancyPercent', Number(event.target.value))} /></div>
              </>}
              {result.valid && <div className="sp-results"><div className="sp-result"><span>{t.gross}</span><strong>{displayMoney(result.scenarios.find((r) => r.id === scenario.id)?.gross)}</strong></div><div className="sp-result"><span>{t.net}</span><strong>{displayMoney(result.scenarios.find((r) => r.id === scenario.id)?.net)}</strong></div></div>}
            </div>)}
          </div>
          {result.valid && <div style={{ marginTop: 20 }}>
            <ScenarioChart scenarios={result.scenarios.map((row) => ({ ...row, name: lang === 'es' ? row.es : row.en }))} format={displayMoney} labels={{ gross: t.gross, net: t.net, aria: t.financialChart, axis: model.currency, table: t.financialChart, scenario: t.scenarios }} />
          </div>}
          <p className="sp-source">{t.scenariosNote}</p>
        </section>

        <section className="sp-section" id="furnishing">
          <div className="sp-section-head"><div><span className="sp-eyebrow">08 / {t.furniture}</span><h2>{t.furnitureTitle}</h2></div><p className="sp-section-intro">{t.mood}</p></div>
          <div className="sp-photo-grid">
            {(image.moodBoard || []).map((src, index) => <button className="sp-photo" key={src} type="button" onClick={() => setActiveImage(src)}><img src={src} loading="lazy" alt={`${t.concept} ${index + 1}`} /><span>{t.concept}</span></button>)}
          </div>
          <div className="sp-grid-2" style={{ marginTop: 18 }}>
            {t.rooms.map(([title, body]) => <div className="sp-panel" key={title}><h3>{title}</h3><p>{body}</p></div>)}
          </div>
          <p className="sp-caution" style={{ marginTop: 14 }}>{t.noStructure}</p>
        </section>

        <section className="sp-section" id="budget">
          <div className="sp-section-head"><div><span className="sp-eyebrow">09 / {t.budget}</span><h2>{t.budget}</h2></div><p className="sp-section-intro">{t.budgetIntro}</p></div>
          <div className="sp-budget-scroll"><table className="sp-budget-table"><thead><tr><th>{t.item}</th><th>{t.range}</th><th>{t.estimate}</th><th>{t.status}</th></tr></thead><tbody>
            {furnishings.map((item) => <tr key={item.id}>
              <td>{item[lang]}</td><td>S/{item.minPen.toLocaleString()}–{item.maxPen.toLocaleString()}</td>
              <td><label className="sp-sr-only" htmlFor={`amount-${item.id}`}>{t.estimate}: {item[lang]}</label><input id={`amount-${item.id}`} type="number" min="0" value={item.amountPen} onChange={(event) => updateFurnishing(item.id, 'amountPen', Number(event.target.value))} /></td>
              <td><label className="sp-sr-only" htmlFor={`status-${item.id}`}>{t.status}: {item[lang]}</label><select id={`status-${item.id}`} value={item.status} onChange={(event) => updateFurnishing(item.id, 'status', event.target.value)}>{Object.entries(t.statuses).map(([key, value]) => <option value={key} key={key}>{value}</option>)}</select></td>
            </tr>)}
          </tbody></table></div>
          <div className="sp-budget-summary"><div><span>{t.subtotal}: {formatProposalMoney(budget.subtotal, 'PEN', 1, lang)}</span><br /><span>{t.contingency}: {contingency}% · {formatProposalMoney(budget.contingency, 'PEN', 1, lang)}</span></div><div><span>{t.totalBudget}</span><br /><strong>{formatProposalMoney(budget.total, 'PEN', 1, lang)}</strong></div></div>
          <div className="sp-control"><label htmlFor="proposal-contingency">{t.contingency} (%)</label><input id="proposal-contingency" type="number" min="0" max="100" step="1" value={contingency} onChange={(event) => setContingency(Math.max(0, Math.min(100, Number(event.target.value) || 0)))} /></div>
          <div className="sp-range-note"><div><strong>{t.budgetRanges}</strong><br />S/{minSubtotal.toLocaleString()}–{maxSubtotal.toLocaleString()} + {contingency}% = S/{grossRange.min.toLocaleString()}–{grossRange.max.toLocaleString()}</div><div>{t.target}</div></div>
          <p className="sp-caution">{lang === 'es' ? 'Reconciliación del brief: el rango suministrado indica subtotal S/8,000–14,550 y total S/8,800–16,005 con 10%. Sin embargo, las partidas indicadas suman S/8,000–14,250; con 10% son S/8,800–15,675. La diferencia superior de S/300 no tiene una partida documentada y no se incorpora al cálculo. Se conserva el rango original como referencia, no como cotización.' : 'Brief reconciliation: the supplied range states subtotal S/8,000–14,550 and total S/8,800–16,005 with 10%. However, its listed items sum to S/8,000–14,250; with 10% that is S/8,800–15,675. The S/300 upper-subtotal difference has no documented line item and is not added to the calculation. The original range remains a reference, not a quote.'}</p>
          <p className="sp-source">{t.suppliers}: <a href="https://www.sodimac.com.pe/" target="_blank" rel="noreferrer">Sodimac Peru</a> · <a href="https://www.promart.pe/" target="_blank" rel="noreferrer">Promart Peru</a>. {t.localSuppliers}</p>
          <button type="button" className="sp-button sp-button-primary" onClick={applyBudget}>{t.applyBudget}</button>
        </section>

        <section className="sp-section" id="financial-model">
          <div className="sp-section-head"><div><span className="sp-eyebrow">10 / {t.roi}</span><h2>{t.roi}</h2></div><p className="sp-section-intro">{t.roiIntro}</p></div>
          {!result.valid && <div className="sp-invalid" role="alert">{t.validation} {result.errors.join(', ')}</div>}
          <div className="sp-grid-2">
            <div className="sp-panel"><h3>{t.globalInputs}</h3>
              <div className="sp-control"><label htmlFor="proposal-nights">{t.availability}</label><input id="proposal-nights" type="number" min="0" max="365" value={model.availableNights} onChange={(event) => updateGlobal('availableNights', Number(event.target.value))} /></div>
              <div className="sp-control"><label htmlFor="proposal-fx">{t.exchange}</label><input id="proposal-fx" type="number" min="0.01" step="0.01" value={model.exchangeRatePenPerUsd} onChange={(event) => updateGlobal('exchangeRatePenPerUsd', Number(event.target.value))} /></div>
              <div className="sp-control"><label htmlFor="proposal-investment">{t.improvement}</label><input id="proposal-investment" type="number" min="0" step="100" value={model.improvementCostPen} onChange={(event) => updateGlobal('improvementCostPen', Number(event.target.value))} /></div>
              <div className="sp-control"><label htmlFor="proposal-currency">{t.currency}</label><select id="proposal-currency" value={model.currency} onChange={(event) => updateGlobal('currency', event.target.value)}><option value="USD">USD</option><option value="PEN">PEN</option></select></div>
            </div>
            <div className="sp-panel"><h3>{t.operatingCosts}</h3>
              {['before','after'].map((condition) => <div key={condition} style={{ marginBottom: 20 }}>
                <h4>{condition === 'before' ? t.existing : t.upgraded}</h4>
                <CostEditor label={t.channel} value={model[condition].costs.otaPercent} suffix="%" onChange={(value) => updateCost(condition, 'otaPercent', value)} />
                <div className="sp-cost-row"><label htmlFor={`${condition}-management`}>{t.managementMode}</label><select id={`${condition}-management`} value={model[condition].costs.managementMode} onChange={(event) => updateCost(condition, 'managementMode', event.target.value)}>
                  <option value="none">{t.none}</option><option value="listing">{t.listingMode}</option><option value="full">{t.fullMode}</option><option value="custom">{t.customMode}</option>
                </select></div>
                {model[condition].costs.managementMode === 'custom' && <CostEditor label={t.managementRate} suffix="%" value={model[condition].costs.managementPercent} onChange={(value) => updateCost(condition, 'managementPercent', value)} />}
                {model[condition].costs.managementMode === 'listing' && <CostEditor label={t.ipmShare} suffix="%" value={model[condition].costs.ipmSharePercent} onChange={(value) => updateCost(condition, 'ipmSharePercent', value)} />}
                <div className="sp-cost-row"><label htmlFor={`${condition}-commission-base`}>{t.commissionBase}</label><select id={`${condition}-commission-base`} value={model[condition].costs.commissionBase} onChange={(event) => updateCost(condition, 'commissionBase', event.target.value)}><option value="gross">{t.grossBase}</option><option value="after-ota">{t.afterOta}</option></select></div>
                {costFields.map((field) => <CostEditor key={`${condition}-${field}`} label={t[field]} suffix={lang === 'es' ? 'USD / año' : 'USD / year'} value={model[condition].costs[field]} onChange={(value) => updateCost(condition, field, value)} />)}
                <CostEditor label={t.monthlyFee} value={model[condition].costs.monthlyFee} suffix="USD / month" onChange={(value) => updateMonthlyFee(condition, value)} />
                <CostEditor label={t.feeMonths} value={model[condition].costs.feeMonths} suffix={lang === 'es' ? 'meses / año' : 'months / year'} onChange={(value) => updateCost(condition, 'feeMonths', value)} />
              </div>)}
            </div>
          </div>
          <p className="sp-caution" style={{ marginTop: 15 }}>{t.feeTerms}</p>
          {result.valid && <>
            <h3 className="sp-cost-heading" style={{ marginTop: 24 }}>{t.calculateOutputs}</h3>
            <div className="sp-results">
              <div className="sp-result"><span>{t.annualGross} · {t.existing}</span><strong>{displayMoney(result.before.gross)}</strong></div>
              <div className="sp-result"><span>{t.annualGross} · {t.upgraded}</span><strong>{displayMoney(result.after.gross)}</strong></div>
              <div className="sp-result"><span>{t.monthlyGross} · {t.upgraded}</span><strong>{displayMoney(result.after.monthlyGross)}</strong></div>
              <div className="sp-result"><span>{t.expenses} · {t.upgraded}</span><strong>{displayMoney(result.after.expenses)}</strong></div>
              <div className="sp-result"><span>{t.annualNet} · {t.existing}</span><strong>{displayMoney(result.before.net)}</strong></div>
              <div className="sp-result"><span>{t.annualNet} · {t.upgraded}</span><strong>{displayMoney(result.after.net)}</strong></div>
              <div className="sp-result"><span>{t.incrementalNet}</span><strong>{displayMoney(result.incrementalNet)}</strong></div>
              <div className="sp-result"><span>{lang === 'es' ? 'Inversión de mejora' : 'Improvement investment'} ({model.currency})</span><strong>{displayMoney(result.investmentUsd)}</strong></div>
            </div>
            <div className="sp-panel" style={{ marginTop: 15 }}><span className="sp-eyebrow">{t.payback}</span><div className="sp-payback">{result.paybackYears === null ? t.notRecovered : `${result.paybackYears.toFixed(1)} ${lang === 'es' ? 'años' : 'years'}`}</div>
              <p>{t.roiReturn}: <strong>{result.roiPercent === null ? '—' : `${result.roiPercent.toFixed(1)}%`}</strong></p>
              <p>{t.assumptions}</p>
            </div>
          </>}
          <p className="sp-source">{t.secureConfig}</p>
        </section>

        <section className="sp-section" id="ipm-solutions">
          <div className="sp-section-head"><div><span className="sp-eyebrow">11 / {t.ipm}</span><h2>{t.ipm}</h2></div><p className="sp-section-intro">{t.agreement}</p></div>
          <div className="sp-service-grid">
            <article className="sp-service"><h3>{t.listingTitle}</h3><p>{t.listingText}</p><a href={`${prefix}/listing-promotion`}>{t.listingTitle} ↗</a></article>
            <article className="sp-service"><h3>{t.fullTitle}</h3><p>{t.fullText}</p><p>{t.agreement}</p><a href={`${prefix}/full-management`}>{t.fullTitle} ↗</a></article>
          </div>
        </section>

        <section className="sp-section" id="roadmap">
          <div className="sp-section-head"><div><span className="sp-eyebrow">12 / {t.roadmap}</span><h2>{t.roadmap}</h2></div><p className="sp-section-intro">{t.roadmapNote}</p></div>
          <div className="sp-roadmap">{t.steps.map((step) => <div className="sp-roadmap-item" key={step}><strong>{step}</strong></div>)}</div>
        </section>

        <section className="sp-section" id="compliance">
          <div className="sp-section-head"><div><span className="sp-eyebrow">13 / {t.compliance}</span><h2>{t.compliance}</h2></div><p className="sp-section-intro">{t.complianceIntro}</p></div>
          <ul className="sp-checks">{t.checks.map((check) => <li key={check}>{check}</li>)}</ul>
        </section>

        <section className="sp-section" id="sources">
          <div className="sp-section-head"><div><span className="sp-eyebrow">14 / {t.sources}</span><h2>{t.sources}</h2></div><p className="sp-section-intro">{t.sourcesText}</p></div>
          <div className="sp-grid-2">
            <div className="sp-panel"><h3>{lang === 'es' ? 'Documentación y mercado' : 'Documentation & market'}</h3>
              <p>{t.brochure}</p><p>{t.airDna}: <a href={market.source} target="_blank" rel="noreferrer">{market.source}</a> · {market.publicationDate}</p>
              <p>{t.method}</p>
            </div>
            <div className="sp-panel"><h3>{t.competitors}</h3>
              {proposalConfig.competitors.map((competitor) => <p key={competitor.id}><a href={competitor.url} target="_blank" rel="noreferrer">{competitor.name}</a> · {t.retrieved} {competitor.retrievedDate}</p>)}
              <p>{t.localSuppliers}</p>
            </div>
          </div>
        </section>

        <section className="sp-section" id="next-steps">
          <div className="sp-cta"><div><span className="sp-eyebrow">{t.finalTitle}</span><h2>{t.finalTitle}</h2><p>{t.finalText}</p><p className="sp-source">{t.secureConfig}</p></div>
            <div className="sp-actions">
              <a className="sp-button sp-button-primary" href={`${prefix}/contact`}>{t.schedule}</a>
              <a className="sp-button" href={`${prefix}/listing-promotion`}>{t.promotion}</a>
              <a className="sp-button" href={`${prefix}/contact`}>{t.furnishingAssessment}</a>
            </div>
          </div>
        </section>

        <div className="sp-panel" style={{ marginBottom: 30 }}>
          <div className="sp-actions">
            <button type="button" className="sp-button sp-button-primary" disabled={!result.valid || pdfBusy} onClick={downloadPdf}>{pdfBusy ? t.pdfBusy : t.pdf}</button>
            <button type="button" className="sp-button" onClick={() => window.print()}>{t.print}</button>
            <button type="button" className="sp-button" onClick={share}>{t.share}</button>
            <button type="button" className="sp-button" onClick={resetModel}>{lang === 'es' ? 'Restablecer supuestos' : 'Reset assumptions'}</button>
          </div>
          {pdfError && <p className="sp-invalid" role="alert">{t.pdfError}</p>}
          {shareMessage && <p role="status" className={copyFailure ? 'sp-invalid' : 'sp-source'}>{shareMessage}</p>}
        </div>
        <footer className="sp-footer-note">{t.prepared}. {t.secureConfig}<br />{statusLabel} · {proposalConfig.researchDate}</footer>
      </div>

      {activeImage && <div className="sp-modal" role="dialog" aria-modal="true" aria-label={image.gallery.includes(activeImage) ? t.actual : t.concept} onClick={() => setActiveImage(null)} onKeyDown={(event) => { if (event.key === 'Escape') setActiveImage(null); if (event.key === 'Tab') { event.preventDefault(); event.currentTarget.querySelector('button')?.focus(); } }}>
        <div className="sp-modal-card" onClick={(event) => event.stopPropagation()}>
          <button className="sp-modal-close" autoFocus type="button" onClick={() => setActiveImage(null)} aria-label={lang === 'es' ? 'Cerrar' : 'Close'}>×</button>
          <img src={activeImage} alt={image.gallery.includes(activeImage) ? t.actual : t.concept} />
          <p className="sp-source">{image.gallery.includes(activeImage) ? t.beforeActual : t.afterRender}</p>
        </div>
      </div>}
    </div>
  );
}
