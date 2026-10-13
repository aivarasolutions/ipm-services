import { useState } from 'react';

export function ScenarioChart({ scenarios, format, labels }) {
  const maxPositive = Math.max(1, ...scenarios.flatMap((item) => [item.gross, item.net, 0]));
  const maxNegative = Math.max(0, ...scenarios.map((item) => Math.abs(Math.min(0, item.net))));
  const fullRange = maxPositive + maxNegative;
  const zero = maxPositive / fullRange * 100;
  return (
    <div className="sp-chart" role="group" aria-label={labels.aria}>
      <div className="sp-chart-legend"><span className="sp-legend-gross">{labels.gross}</span><span className="sp-legend-net">{labels.net}</span></div>
      <div className="sp-bars">
        {scenarios.map((row) => (
          <div className="sp-bar-group" key={row.id}>
            <div className="sp-bar-pair" style={{ '--sp-zero': `${zero}%` }}>
              <div className="sp-bar sp-bar-gross" style={{ top: `${zero - row.gross / fullRange * 100}%`, height: `${Math.max(0, row.gross / fullRange * 100)}%` }} title={`${labels.gross}: ${format(row.gross)}`} />
              <div className={`sp-bar ${row.net < 0 ? 'sp-bar-negative' : 'sp-bar-net'}`} style={row.net < 0
                ? { top: `${zero}%`, height: `${Math.max(0, Math.abs(row.net) / fullRange * 100)}%` }
                : { top: `${zero - row.net / fullRange * 100}%`, height: `${Math.max(0, row.net / fullRange * 100)}%` }} title={`${labels.net}: ${format(row.net)}`} />
            </div>
            <div className="sp-bar-caption"><strong>{row.name}</strong><small>{format(row.gross)}</small><small>{format(row.net)}</small></div>
          </div>
        ))}
      </div>
      <p className="sp-chart-axis-note">{labels.axis}</p>
      <div className="sp-chart-fallback">
        <table><caption>{labels.table}</caption><thead><tr><th>{labels.scenario}</th><th>{labels.gross}</th><th>{labels.net}</th></tr></thead><tbody>
          {scenarios.map((row) => <tr key={row.id}><th>{row.name}</th><td>{format(row.gross)}</td><td>{format(row.net)}</td></tr>)}
        </tbody></table>
      </div>
    </div>
  );
}

export function BeforeAfter({ before, after, afterType, t }) {
  const [reveal, setReveal] = useState(50);
  return (
    <div className="sp-before-after">
      <img src={before} loading="lazy" alt={t.beforeActual} />
      <div className="sp-after-layer" style={{ clipPath: `inset(0 0 0 ${reveal}%)` }}>
        <img src={after} loading="lazy" alt={afterType === 'actual' ? t.actual : t.concept} />
      </div>
      <span className="sp-ba-label sp-ba-left">{t.actual}</span>
      <span className="sp-ba-label sp-ba-right">{afterType === 'actual' ? t.actual : t.concept}</span>
      <label className="sp-sr-only" htmlFor="sp-reveal">{t.compare}</label>
      <input id="sp-reveal" className="sp-ba-range" type="range" min="0" max="100" value={reveal} onChange={(event) => setReveal(Number(event.target.value))} aria-label={t.compare} />
    </div>
  );
}

export function CompetitorCard({ competitor, language, t }) {
  const [open, setOpen] = useState(false);
  const same = competitor.relationship === 'same-building';
  return (
    <article className="sp-competitor">
      <div className="sp-comp-head" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(!open); } }}>
        <div>
          <h3>{competitor.name}</h3>
          <span className="sp-tag">{same ? t.sameBuilding : t.nearby}</span>
          <div className="sp-comp-stats">{competitor.bedrooms} {t.bedrooms} · {competitor.bathrooms} {t.bathrooms} · {competitor.guests} {t.guestsLabel}<br />
            {competitor.rating ? `★ ${competitor.rating} · ${competitor.reviews} ${t.reviews} · ${t.retrieved} ${competitor.retrievedDate}` : t.noQuotes}
          </div>
        </div>
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </div>
      {open && <div className="sp-comp-details">
        <p>{language === 'es' ? competitor.strengthEs : competitor.strengthEn}</p>
        <p><strong>{t.amenities}:</strong> {competitor.amenities.map((amenity) => language === 'es' ? ({pool:'piscina',gym:'gimnasio',workspace:'espacio de trabajo',balcony:'balcón','paid-laundry':'lavandería de pago',washer:'lavadora','self-checkin':'llegada autónoma',security:'seguridad'})[amenity] || amenity : amenity.replace(/-/g, ' ')).join(', ')}</p>
        {competitor.nightlyQuoteUsd !== null && competitor.quoteDates && competitor.quoteSource && <p>{language === 'es' ? 'Precio con fechas y fuente' : 'Sourced date-specific quote'}: USD {competitor.nightlyQuoteUsd} · {competitor.quoteDates} · {competitor.quoteSource}</p>}
        <p>{competitor.nightlyQuoteUsd !== null && competitor.quoteDates && competitor.quoteSource ? (language === 'es' ? 'Ingresos y ocupación no verificados independientemente.' : 'Revenue and occupancy are not independently verified.') : t.noQuotes}</p>
        <a href={competitor.url} target="_blank" rel="noreferrer">{t.listing} ↗</a>
      </div>}
    </article>
  );
}

export function MapExplorer({ address, t }) {
  const [place, setPlace] = useState('');
  const points = [
    address, 'Circuito Mágico del Agua, Lima', 'Estadio Nacional del Perú',
    'Campo de Marte, Jesús María', 'Hospital Edgardo Rebagliati Martins', 'Centro Financiero San Isidro, Lima',
    'Avenida Arequipa, Lima'
  ];
  const selectedAddress = place || address;
  return (
    <>
      <div className="sp-map-select" aria-label={t.location}>
        {points.map((point, index) => <button type="button" key={point} aria-pressed={selectedAddress === point} onClick={() => setPlace(point)}>{index === 0 ? t.property : point.replace(', Lima', '')}</button>)}
      </div>
      <div className="sp-map-wrap">
        {place ? <iframe title={`${t.location}: ${selectedAddress}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(selectedAddress)}&output=embed`} /> :
          <div className="sp-map-placeholder"><div><p>{t.locationIntro}</p><button className="sp-button sp-button-primary" type="button" onClick={() => setPlace(address)}>{t.mapPrompt}</button></div></div>}
      </div>
    </>
  );
}
