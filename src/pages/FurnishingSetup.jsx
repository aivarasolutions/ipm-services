import React, { useMemo, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { calculateFurnishingQuote } from '../lib/furnishingCalculator'
import furnishingConfig from '../data/furnishingService.json'
import FurnishingAssessmentForm from './furnishing/FurnishingAssessmentForm'
import { furnishingCopy, furnishingPackageIds } from './furnishing/copy'
import './furnishing/FurnishingSetup.css'

const packagePath = {
  en: { listing: '/listing-promotion', management: '/full-management' },
  es: { listing: '/es/listing-promotion', management: '/es/full-management' },
}

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: value % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(value)
}

function setEstimateValue(setter, raw) {
  if (raw === '') {
    setter(0)
    return
  }
  const parsed = Number(raw)
  if (Number.isFinite(parsed)) setter(Math.min(10000000, Math.max(0, parsed)))
}

export default function FurnishingSetup() {
  const { language: siteLanguage } = useLanguage()
  const language = siteLanguage === 'es' ? 'es' : 'en'
  const t = furnishingCopy[language]
  const [selectedPackage, setSelectedPackage] = useState('consultation')
  const [budget, setBudget] = useState(3000)
  const [delivery, setDelivery] = useState(0)
  const [installation, setInstallation] = useState(0)
  const [thirdParty, setThirdParty] = useState(0)
  const quote = useMemo(() => calculateFurnishingQuote({
    furniture: Number(budget), packageId: selectedPackage, delivery: Number(delivery),
    installation: Number(installation), thirdParty: Number(thirdParty),
  }), [budget, selectedPackage, delivery, installation, thirdParty])

  function selectPackage(id) {
    setSelectedPackage(id)
    document.getElementById('furnishing-inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div lang={language} className="furnishing-page">
      <div className="furnish-topline">
        <div className="furnish-shell furnish-topline-inner">
          <span className="furnish-wordmark">IPM <i>{language === 'es' ? 'SERVICIOS DE PROPIEDADES' : 'PROPERTY SERVICES'}</i></span>
          <span className="furnish-topline-label">{t.eyebrow}</span>
        </div>
      </div>

      <section className="furnish-hero">
        <div className="furnish-shell furnish-hero-grid">
          <div className="furnish-hero-copy">
            <p className="furnish-kicker">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="furnish-hero-sub">{t.subtitle}</p>
            <p className="furnish-hero-support">{t.support}</p>
            <div className="furnish-actions">
              <a className="furnish-button furnish-button-gold" href="#furnishing-inquiry">{t.getQuote}<span aria-hidden="true">↗</span></a>
              <a className="furnish-button furnish-button-outline" href="#packages">{t.packagesLink}<span aria-hidden="true">↓</span></a>
            </div>
            <div className="furnish-hero-fact"><span className="furnish-fact-rule" /><div><strong>{t.heroFact}</strong><span>{t.heroFactText}</span></div></div>
          </div>
          <div className="furnish-hero-art">
            <div className="furnish-art-frame">
              <img className="furnish-interior-reference" src="/images/santa-beatriz/bedroom-concept.webp" alt={language === 'es' ? 'Dormitorio de referencia ilustrativa del desarrollador, no un proyecto terminado por IPM' : 'Illustrative developer bedroom reference, not a completed IPM project'} fetchPriority="high" />
              <span className="furnish-image-caption">{language === 'es' ? 'Referencia ilustrativa del desarrollador · No es un proyecto IPM terminado' : 'Illustrative developer reference · Not a completed IPM project'}</span>
              <span className="furnish-art-index">01 / IPM</span>
            </div>
          </div>
          <div className="furnish-hero-foot"><span>01—06</span><span>{language === 'es' ? 'AMOBLAMIENTO · BÚSQUEDA · PREPARACIÓN' : 'FURNISHING · SOURCING · SETUP'}</span><span>USD</span></div>
        </div>
      </section>

      <section className="furnish-section furnish-why">
        <div className="furnish-shell furnish-why-layout">
          <div><p className="furnish-kicker">01 / {language === 'es' ? 'EL VALOR' : 'THE VALUE'}</p><h2>{t.whyTitle}</h2><p className="furnish-section-intro">{t.whyIntro}</p></div>
          <div className="furnish-benefits">
            {t.benefits.map((benefit, index) => <div className="furnish-benefit" key={benefit}><span>{String(index + 1).padStart(2, '0')}</span><p>{benefit}</p></div>)}
          </div>
          <p className="furnish-caveat">{t.caveat}</p>
          <div className="furnish-room-gallery">
            {[
              ['bedroom-concept.webp', language === 'es' ? 'Dormitorio · referencia ilustrativa del desarrollador' : 'Bedroom · illustrative developer reference'],
              ['living-concept.webp', language === 'es' ? 'Sala · referencia ilustrativa del desarrollador' : 'Living room · illustrative developer reference'],
              ['kitchen-equipped.webp', language === 'es' ? 'Cocina · fotografía de referencia de una propiedad' : 'Kitchen · supplied property reference photograph'],
            ].map(([file, caption]) => <figure key={file}><img src={`/images/santa-beatriz/${file}`} alt={caption} loading="lazy" decoding="async" width="640" height="420" /><figcaption>{caption}<br />{language === 'es' ? 'No se presenta como un proyecto de amoblamiento terminado por IPM.' : 'Not presented as a completed IPM furnishing project.'}</figcaption></figure>)}
          </div>
        </div>
      </section>

      <section className="furnish-section furnish-packages" id="packages">
        <div className="furnish-shell">
          <div className="furnish-section-head furnish-package-head"><div><p className="furnish-kicker">02 / {t.packageLabel}</p><h2>{t.packagesTitle}</h2></div><p className="furnish-section-intro">{t.packagesIntro}</p></div>
          <div className="furnish-package-grid">
            {furnishingPackageIds.map((id, index) => (
              <article key={id} className={`furnish-package-card${id === 'setup' ? ' is-featured' : ''}`}>
                {id === 'setup' && <span className="furnish-package-badge">{t.mostComprehensive}</span>}
                <div className="furnish-package-top"><span>0{index + 1}</span><span>{language === 'es' ? 'SERVICIO IPM' : 'IPM SERVICE'}</span></div>
                <h3>{t.packageNames[index]}</h3>
                <p className="furnish-package-best">{t.packageBest[index]}</p>
                <p className="furnish-package-rate">{t.packageRates[index]}</p>
                {t.packageMinimum[index] && <p className="furnish-package-minimum">{t.packageMinimum[index]}</p>}
                <ul>{t.packageIncludes[index].map(item => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul>
                <p className="furnish-package-exclusion">{t.packageExclusions[index]}</p>
                <button className="furnish-button furnish-button-card" type="button" onClick={() => selectPackage(id)}>{t.packageCta[index]}<span aria-hidden="true">↗</span></button>
              </article>
            ))}
          </div>
          <p className="furnish-pricing-note">{t.pricingNote}</p>
        </div>
      </section>

      <section className="furnish-section furnish-sourcing">
        <div className="furnish-shell">
          <div className="furnish-section-head"><div><p className="furnish-kicker">03 / {language === 'es' ? 'DECISIONES DE COMPRA' : 'BUYING DECISIONS'}</p><h2>{t.amazonTitle}</h2></div><p className="furnish-section-intro">{t.amazonIntro}</p></div>
          <div className="furnish-source-columns">
            <article className="furnish-source-card furnish-source-local"><span className="furnish-source-number">A</span><h3>{t.localTitle}</h3><ul>{t.localItems.map(item => <li key={item}>{item}</li>)}</ul><p>{t.localAdvantages}</p></article>
            <article className="furnish-source-card furnish-source-global"><span className="furnish-source-number">B</span><h3>{t.onlineTitle}</h3><ul>{t.onlineItems.map(item => <li key={item}>{item}</li>)}</ul><p>{t.onlineAdvantages}</p></article>
          </div>
          <div className="furnish-comparison">
            <h3>{t.compareTitle}</h3>
            <div className="furnish-table-scroll" role="region" aria-label={t.compareTitle} tabIndex="0">
              <table><thead><tr>{t.compareHeaders.map(item => <th key={item} scope="col">{item}</th>)}</tr></thead><tbody>{t.compareRows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table>
            </div>
          </div>
          <div className="furnish-value-quote"><span>“</span><p>{t.valueStatement}</p><small>{t.importNote}</small></div>
        </div>
      </section>

      <section className="furnish-section furnish-process">
        <div className="furnish-shell">
          <div className="furnish-section-head"><div><p className="furnish-kicker">04 / {language === 'es' ? 'EL PROCESO' : 'THE PROCESS'}</p><h2>{t.processTitle}</h2></div><p className="furnish-section-intro">{t.timelineNote}</p></div>
          <ol className="furnish-process-list">{t.process.map(([title, detail], index) => <li key={title}><span className="furnish-step-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="furnish-section furnish-terms">
        <div className="furnish-shell furnish-terms-layout">
          <div className="furnish-terms-heading"><p className="furnish-kicker">05 / {language === 'es' ? 'CONDICIONES' : 'TERMS'}</p><h2>{t.termsTitle}</h2><p>{t.termsDisclaimer}</p><a href="#furnishing-inquiry" className="furnish-text-link">{t.getQuote}<span aria-hidden="true">↗</span></a></div>
          <div className="furnish-term-list">{t.terms.map(([title, content], index) => <details key={title} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><i aria-hidden="true">+</i></summary><p>{content}</p></details>)}</div>
        </div>
      </section>

      <section className="furnish-section furnish-calculator" id="calculator">
        <div className="furnish-shell furnish-calculator-layout">
          <div className="furnish-calculator-copy"><p className="furnish-kicker">06 / {language === 'es' ? 'ESTIMACIÓN' : 'ESTIMATE'}</p><h2>{t.calculatorTitle}</h2><p>{t.calculatorIntro}</p><div className="furnish-formula">{t.totalFormula}</div></div>
          <div className="furnish-calculator-panel">
            <div className="furnish-calc-fields">
              <label>{t.furniture}<span className="furnish-currency-prefix">$</span><input type="number" min="0" max="10000000" step="any" value={budget} onChange={event => setEstimateValue(setBudget, event.target.value)} /></label>
              <label>{t.choosePackage}<select value={selectedPackage} onChange={event => setSelectedPackage(event.target.value)}>{furnishingConfig.packages.map((id, index) => <option value={id} key={id}>{t.packageNames[index]}</option>)}</select></label>
              <label>{t.delivery}<span className="furnish-currency-prefix">$</span><input type="number" min="0" max="10000000" step="any" value={delivery} onChange={event => setEstimateValue(setDelivery, event.target.value)} /></label>
              <label>{t.installation}<span className="furnish-currency-prefix">$</span><input type="number" min="0" max="10000000" step="any" value={installation} onChange={event => setEstimateValue(setInstallation, event.target.value)} /></label>
              <label>{t.thirdParty}<span className="furnish-currency-prefix">$</span><input type="number" min="0" max="10000000" step="any" value={thirdParty} onChange={event => setEstimateValue(setThirdParty, event.target.value)} /></label>
            </div>
            <div className="furnish-calc-results">
              <div><span>{t.fee}</span><strong>{money(quote.serviceFee)}</strong></div>
              <div><span>{t.expenses}</span><strong>{money(quote.expenses)}</strong></div>
              <div className="furnish-calc-total"><span>{t.estimateTotal}</span><strong>{money(quote.total)}</strong></div>
            </div>
            {quote.minimumApplied && <p className="furnish-minimum-note" role="status">{t.minimumApplied}</p>}
            <p className="furnish-upfront">{t.upfront}: <strong>{money(quote.upfrontServiceFee)}</strong></p>
            <button type="button" className="furnish-button furnish-button-dark" onClick={() => selectPackage(selectedPackage)}>{t.personalized}<span aria-hidden="true">↗</span></button>
          </div>
        </div>
      </section>

      <section className="furnish-section furnish-faq">
        <div className="furnish-shell furnish-faq-layout">
          <div><p className="furnish-kicker">07 / FAQ</p><h2>{t.faqTitle}</h2></div>
          <div className="furnish-faq-list">{t.faqs.map(([question, answer], index) => <details key={question}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><i aria-hidden="true">+</i></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className="furnish-management">
        <div className="furnish-shell furnish-management-inner"><div><p className="furnish-kicker">IPM / NEXT STEPS</p><h2>{t.managementTitle}</h2><p>{t.managementIntro}</p></div><nav aria-label={language === 'es' ? 'Programas de gestión' : 'Management programs'}><a href={packagePath[language].listing}>{t.listingLink}<span aria-hidden="true">↗</span></a><a href={packagePath[language].management}>{t.managementLink}<span aria-hidden="true">↗</span></a></nav></div>
      </section>

      <FurnishingAssessmentForm language={language} t={t} selectedPackage={selectedPackage} />
      <footer className="furnish-footer"><div className="furnish-shell"><span>IPM / PROPERTY FURNISHING & SETUP</span><span>{language === 'es' ? 'Servicio profesional independiente' : 'Independent professional service'}</span></div></footer>
    </div>
  )
}

