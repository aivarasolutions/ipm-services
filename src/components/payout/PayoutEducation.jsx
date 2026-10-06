import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getFeeMarkup } from '../../lib/payoutCalculator'
import { SOURCES } from './payoutCopy'

export default function PayoutEducation({ t, amount, percent, spanish, currency }) {
  return <>
    <section className="payout-education">
      <div className="payout-wrap">
        <header className="payout-education__heading">
          <p className="payout-kicker">{t.financialEducation}</p>
          <h2>{t.markupTitle}</h2>
          <p>{t.educationIntro}</p>
        </header>
        <div className="payout-lesson">
          <div><h3>{t.wrong}</h3><p>{t.explainAdd} {amount(250)}.</p></div>
          <div className="payout-lesson__math">
            <div className="payout-math-line"><span>{t.wants}</span><strong>{amount(250)}</strong></div>
            <div className="payout-math-line"><span>{t.wrongMethod}</span><strong>{amount(250 * 1.155)}</strong></div>
            <div className="payout-math-line payout-math-line--bad"><span>{t.afterFee}</span><strong>{amount(250 * 1.155 * (1 - .155))}</strong></div>
            <div className="payout-math-line payout-math-line--final payout-math-line--bad"><span>{t.stillShort}</span><strong>{amount(250 - 250 * 1.155 * (1 - .155))}</strong></div>
          </div>
        </div>
        <div className="payout-lesson">
          <div><h3>{t.correct}</h3><p>{t.formula}</p></div>
          <div className="payout-lesson__math">
            <div className="payout-math-line"><span>{t.wants}</span><strong>{amount(250)}</strong></div>
            <div className="payout-math-line"><span>{t.rightMethod}</span><strong>{amount(250 / .845)}</strong></div>
            <div className="payout-math-line"><span>{t.feeAmount}</span><strong>{amount((250 / .845) * .155)}</strong></div>
            <div className="payout-math-line payout-math-line--good"><span>{t.afterFee}</span><strong>{amount(250)}</strong></div>
            <div className="payout-math-line payout-math-line--final payout-math-line--good"><span>{t.markup}</span><strong>{percent(((1 / .845) - 1) * 100)}</strong></div>
          </div>
        </div>
        <div className="payout-table-wrap">
          <table className="payout-table">
            <caption>{t.quickTitle} — {t.quickCaption} ({currency})</caption>
            <thead><tr><th>{t.feeColumn}</th><th>{t.priceColumn}</th><th>{t.markupColumn}</th></tr></thead>
            <tbody>{[5, 8, 10, 12, 15, 15.5, 16, 18, 20].map((fee) => {
              const markup = getFeeMarkup(fee)
              return <tr key={fee}><td>{percent(fee)}</td><td>{markup?.ok ? amount(markup.requiredPrice) : '—'}</td><td>{markup?.ok ? percent(markup.markupPercent) : '—'}</td></tr>
            })}</tbody>
          </table>
        </div>
      </div>
    </section>

    <section className="payout-education payout-education--channels">
      <div className="payout-wrap">
        <header className="payout-education__heading">
          <p className="payout-kicker">{spanish ? 'CONOZCA SUS CANALES' : 'KNOW YOUR CHANNELS'}</p>
          <h2>{t.channelsTitle}</h2><p>{t.channelsIntro}</p>
        </header>
        <div className="payout-accordion">
          {[
            ['Airbnb', t.airbnbText, `15.5% → ${amount(250 / .845)} · ${percent((1 / .845 - 1) * 100)} ${t.markupExample.toLowerCase()}. ${t.mexicoExample}: ${amount(250 / .84)} · ${percent((1 / .84 - 1) * 100)}.`],
            ['Vrbo', t.vrboText, `5%: ${amount(250 / .95)} · ${percent((1 / .95 - 1) * 100)}. 12%: ${amount(250 / .88)} · ${percent((1 / .88 - 1) * 100)}.`],
            ['Booking.com', t.bookingText, `${t.exampleOnly}: 15% · ${amount(250 / .85)} · ${percent((1 / .85 - 1) * 100)}.`],
            ['Expedia Group', t.expediaText, `${t.exampleOnly}: 18% · ${amount(250 / .82)} · ${percent((1 / .82 - 1) * 100)}.`],
            ['Google Vacation Rentals', t.googleText, `${spanish ? 'Comisión de referencia' : 'Referral commission'}: 0%.`],
            [spanish ? 'Reserva directa' : 'Direct Booking', t.directText, `${spanish ? 'Comisión OTA' : 'OTA commission'}: 0%.`],
          ].map(([title, body, example]) => <details key={title}>
            <summary>{title}</summary>
            <div className="payout-accordion__body"><p>{body}</p><div className="payout-accordion__example">{example}</div></div>
          </details>)}
        </div>
      </div>
    </section>

    <section className="payout-ipm">
      <div className="payout-wrap">
        <div className="payout-ipm__intro"><p className="payout-kicker">IPM · {spanish ? 'SERVICIOS PARA PROPIETARIOS' : 'OWNER SERVICES'}</p><h2>{t.ipmTitle}</h2><p>{t.ipmText}</p></div>
        <div className="payout-time-savings">
          <h3>{t.timeSavingsTitle}</h3>
          <p>{t.timeSavingsCopy}</p>
        </div>
        <h3 className="payout-plan-heading">{t.plansTitle}</h3>
        <div className="payout-plan-grid">
          <article className="payout-plan">
            <div className="payout-plan__rate">10%</div><h3>{t.listingTitle}</h3><p>{t.listingDesc}</p>
            <Link className="payout-plan__link" to={spanish ? '/es/listing-promotion' : '/listing-promotion'}>
              {t.exploreListing}<ArrowRight size={15} aria-hidden="true" className="payout-inline-arrow" />
            </Link>
          </article>
          <article className="payout-plan">
            <div className="payout-plan__rate">20%</div><h3>{t.fullTitle}</h3><p>{spanish ? 'Comisión del 20% más una cuota mensual. ' : ''}{t.fullDesc}</p>
            <Link className="payout-plan__link" to={spanish ? '/es/full-management' : '/full-management'}>
              {t.exploreFull}<ArrowRight size={15} aria-hidden="true" className="payout-inline-arrow" />
            </Link>
          </article>
        </div>
      </div>
    </section>

    <section className="payout-cta">
      <div className="payout-wrap">
        <h2>{t.ctaTitle}</h2><p>{t.ctaText}</p>
        <Link className="payout-primary" to={spanish ? '/es/listing-promotion' : '/listing-promotion'}>
          {t.cta}<ArrowRight size={17} aria-hidden="true" className="payout-inline-arrow" />
        </Link>
      </div>
    </section>

    <footer className="payout-sources">
      <div className="payout-wrap">
        <div className="payout-sources__header"><h2>{t.sources}</h2><time dateTime="2026-10">{t.updated}</time></div>
        <div className="payout-sources__links">{SOURCES.map(([label, url]) =>
          <a key={label} href={url} target="_blank" rel="noopener noreferrer">
            {label}<span className="sr-only"> ({spanish ? 'abre en una pestaña nueva' : 'opens in a new tab'})</span>
          </a>,
        )}</div>
        <p className="payout-disclaimer">{t.disclaimer}</p>
      </div>
    </footer>
  </>
}
