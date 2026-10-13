import { calculateProposal, calculateFurnishingBudget, formatProposalMoney } from './santaBeatrizModel.js'

// This module and the PDF libraries are downloaded only when the user exports.
export async function createSantaBeatrizPdf({ language = 'en', config, model, furnishings, contingencyPercent, photoData = null }) {
  const result = calculateProposal(model)
  if (!result.valid) throw new Error(language === 'es' ? 'Corrija los supuestos inválidos antes de exportar.' : 'Correct invalid assumptions before exporting.')
  const [{ jsPDF }, { default: autoTable }] = await Promise.all([import('jspdf'), import('jspdf-autotable')])
  const doc = new jsPDF({ format: 'a4', unit: 'mm' })
  const es = language === 'es'
  const t = (en, spanish) => es ? spanish : en
  const money = (usd) => formatProposalMoney(usd, model.currency, model.exchangeRatePenPerUsd, language)
  const pen = (value) => `S/${Math.round(value).toLocaleString(es ? 'es-PE' : 'en-US')}`
  const clean = (text) => String(text).replace(/[–—]/g, '-').replace(/→/g, '>').replace(/×/g, 'x').replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
  const budget = calculateFurnishingBudget(furnishings, contingencyPercent)
  let y = 28
  doc.setProperties({ title: `IPM - Jardines de Santa Beatriz - ${es ? 'Propuesta de inversión' : 'Investment Proposal'}`, author: 'International Property Management' })
  function next(height = 12) { if (y + height > 270) { doc.addPage(); y = 28 } }
  function heading(text) {
    next(20); doc.setFont('helvetica', 'bold'); doc.setFontSize(15); doc.setTextColor(34, 40, 43)
    doc.text(clean(text), 18, y); y += 9
  }
  function paragraph(text) {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(60, 65, 69)
    const lines = doc.splitTextToSize(clean(text), 174)
    for (const line of lines) { next(5); doc.text(line, 18, y); y += 4.9 }
    y += 4
  }
  function table(head, rows) {
    next(25)
    autoTable(doc, {
      startY: y, head: [head.map(clean)], body: rows.map((row) => row.map(clean)),
      margin: { left: 18, right: 18, top: 28, bottom: 22 },
      styles: { font: 'helvetica', fontSize: 8.5, cellPadding: 3, overflow: 'linebreak' },
      headStyles: { fillColor: [35, 42, 47], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [248, 246, 240] },
    })
    y = doc.lastAutoTable.finalY + 9
  }
  heading(t('Jardines de Santa Beatriz', 'Jardines de Santa Beatriz'))
  paragraph(t('Property Performance Analysis & Furnishing Investment Proposal', 'Análisis de desempeño y propuesta de inversión en mobiliario'))
  paragraph(t('Prepared by International Property Management | October 2026', 'Preparado por International Property Management | Octubre de 2026'))
  paragraph(`${config.property.address} | ${t('Preliminary proposal, subject to inspection and owner approval', 'Propuesta preliminar, sujeta a inspección y aprobación del propietario')}`)
  if (photoData) {
    next(82)
    const image = doc.getImageProperties(photoData)
    const height = Math.min(75, 174 * image.height / image.width)
    const width = height * image.width / image.height
    doc.addImage(photoData, 'JPEG', 18, y, width, height); y += height + 6
    paragraph(t('Actual interior photograph supplied by the client. No completed upgrades are implied.', 'Foto interior real suministrada por el cliente. No representa mejoras ya realizadas.'))
  }
  heading(t('Property overview', 'Resumen de la propiedad'))
  table([t('Detail', 'Detalle'), t('Proposal information', 'Información de la propuesta')], [
    [t('Tower / floor', 'Torre / piso'), `${config.property.tower} (${config.property.towerConfirmed ? t('confirmed','confirmada') : t('pending confirmation', 'por confirmar')}) / ${config.property.floor}`],
    [t('Area / bathroom', 'Área / baño'), `${config.property.areaSqm} m² / ${config.property.bathrooms}`],
    [t('Room designation', 'Designación de habitaciones'), `${config.property.primaryBedrooms} ${t('primary bedroom', 'dormitorio principal')} + ${config.property.studies} ${t('study (not a verified legal second bedroom)', 'estudio (no es un segundo dormitorio legal verificado)')}`],
    [t('Floor plan', 'Plano'), `${config.property.floorPlanType} - ${t('brochure p.32, floor 10. Final unit layout and balcony unconfirmed.', 'folleto p.32, piso 10. Distribución final y balcón por confirmar.')}`],
    [t('Guest capacity', 'Capacidad'), `${config.property.guestCapacity} ${t('provisional; 2-3 recommended, 4 only with an approved functional sleeping arrangement', 'provisional; 2-3 recomendados, 4 solo con distribución aprobada y funcional')}`],
  ])
  paragraph(t('Tipo 5 appears on odd-numbered floors in brochure p.31; Tipo 5A is listed for even floors including floor 10. Developer imagery and plans are references, not proof of as-built conditions.', 'Tipo 5 corresponde a pisos impares según la página 31; Tipo 5A figura para pisos pares, incluido el piso 10. Las imágenes y planos del promotor son referenciales.'))
  heading(t('Building amenities and location', 'Amenidades y ubicación'))
  paragraph(t('Developer-advertised: panoramic rooftop pool, gym, barbecue facilities, lobby, shared laundry, gardens, children’s area, bicycle parking, security cameras and multipurpose room. Availability, permitted guests and access rules require verification.', 'Anunciados por el promotor: piscina panorámica, gimnasio, parrillas, lobby, lavandería común, jardines, zona de niños, bicicletas, cámaras y sala de usos múltiples. Disponibilidad, huéspedes permitidos y normas de acceso por verificar.'))
  paragraph(t('Location references: Circuito Mágico del Agua, Estadio Nacional, Campo de Marte, Hospital Rebagliati, San Isidro financial district, Av. Arequipa, Av. Petit Thouars and Estación México. No travel times have been independently routed.', 'Referencias: Circuito Mágico del Agua, Estadio Nacional, Campo de Marte, Hospital Rebagliati, centro financiero de San Isidro, Av. Arequipa, Av. Petit Thouars y Estación México. No se han calculado tiempos de viaje.'))
  paragraph(t('Potential guests: business travelers, couples, small families, event visitors, medical visitors and companions, domestic/international travelers and medium-term corporate stays.', 'Huéspedes potenciales: profesionales, parejas, familias pequeñas, asistentes a eventos, visitantes médicos y acompañantes, viajeros nacionales e internacionales y estancias corporativas de mediano plazo.'))
  heading(t('Lima-wide market benchmarks', 'Referencias del mercado de Lima'))
  table([t('Metric', 'Indicador'), t('Historical benchmark', 'Referencia histórica')], [
    ['ADR (USD)', `$${config.market.adrUsd}`], [t('Occupancy', 'Ocupación'), `${config.market.occupancyPercent}%`],
    [t('Annual revenue (USD)', 'Ingresos anuales (USD)'), `$${config.market.annualRevenueUsd}`],
    [t('Active listings: supplied / rechecked', 'Anuncios activos: suministrados / verificados'), `${config.market.activeListingsInBrief} / ${config.market.activeListingsVerified}`],
    ['RevPAR (USD)', `$${config.market.revparUsd}`],
  ])
  paragraph(t(`AirDNA publication ${config.market.publicationDate}; checked ${config.researchDate}. Trailing twelve months through September 2026. Lima-wide, NOT this building/neighborhood. AirDNA annual revenue includes cleaning/other guest fees; this calculator models room revenue separately. Not guaranteed property results.`, `AirDNA publicado ${config.market.publicationDate}; consulta ${config.researchDate}. Doce meses hasta septiembre de 2026. Datos de Lima, NO del edificio/barrio. El ingreso de AirDNA incluye limpieza y otros cargos; este modelo separa los ingresos por alojamiento. Sin garantía de resultados.`))
  heading(t('Real competitor listings', 'Anuncios de competidores reales'))
  for (const c of config.competitors) {
    paragraph(`${c.name} | ${c.bedrooms} ${t('bedrooms', 'dormitorios')} / ${c.bathrooms} ${t('baths', 'baños')} / ${c.guests} ${t('guests', 'huéspedes')} | ${c.rating}/5 (${c.reviews} ${t('reviews', 'reseñas')}) | ${c.retrievedDate}`)
    paragraph(es ? c.strengthEs : c.strengthEn)
    paragraph(c.url)
    if (c.nightlyQuoteUsd !== null && c.quoteDates && c.quoteSource) paragraph(`${t('Date-specific sourced quote', 'Cotización con fechas y fuente')}: USD ${c.nightlyQuoteUsd} | ${c.quoteDates} | ${c.quoteSource}`)
  }
  paragraph(t('Public listing claims only. No independently verified occupancy, nightly comparable quotes, earnings or market percentile. A same-building listing does not prove condominium permission.', 'Afirmaciones de anuncios públicos. Sin ocupación, precios comparables, ingresos o percentil verificados independientemente. Un anuncio en el edificio no demuestra autorización del condominio.'))
  heading(t('Current versus refreshed: live model', 'Actual frente a renovado: modelo editable'))
  table([t('Annual metric', 'Indicador anual'), t('Existing', 'Actual'), t('Refreshed', 'Renovado')], [
    ['ADR (USD)', `$${model.before.adr}`, `$${model.after.adr}`],
    [t('Occupancy', 'Ocupación'), `${model.before.occupancyPercent}%`, `${model.after.occupancyPercent}%`],
    [t('Gross room revenue', 'Ingreso bruto por alojamiento'), money(result.before.gross), money(result.after.gross)],
    [t('Average monthly gross', 'Promedio bruto mensual'), money(result.before.monthlyGross), money(result.after.monthlyGross)],
    [t('Operating expenses', 'Gastos operativos'), money(result.before.expenses), money(result.after.expenses)],
    [t('Cleaning fee recovery', 'Recuperación de limpieza'), money(result.before.cleaningRecovery), money(result.after.cleaningRecovery)],
    [t('Net operating income', 'Ingreso operativo neto'), money(result.before.net), money(result.after.net)],
  ])
  paragraph(t(`Available nights: ${model.availableNights}. Formula: ADR x available nights x occupancy. Current photos are supplied; historical bookings/revenue remain unverified unless a sourced override is configured. Both results are assumptions, not financial guarantees. Furnishing alone does not guarantee uplift.`, `Noches disponibles: ${model.availableNights}. Fórmula: ADR x noches disponibles x ocupación. Hay fotos actuales; reservas e ingresos históricos siguen sin verificar salvo datos documentados. Son supuestos, no garantías. El mobiliario por sí solo no garantiza aumentos.`))
  table([t('Scenario', 'Escenario'), t('ADR USD / occupancy', 'ADR USD / ocupación'), t('Annual gross', 'Bruto anual'), t('Annual net', 'Neto anual')],
    result.scenarios.map((s) => [es ? s.es : s.en, `$${s.adr} / ${s.occupancyPercent}%`, money(s.gross), money(s.net)]))
  heading(t('Furnishing strategy and investment', 'Estrategia de mobiliario e inversión'))
  paragraph(t('Warm minimal luxury: beige/cream, natural wood, soft lighting, durable compact furniture, boutique-hotel comfort and a functional workspace. Bedroom: quality two-person bed/mattress/bedding, bedside lighting, blackout curtains. Study: approved single/convertible bed, desk, lighting, storage. Living: sofa, Smart TV, compact tables, art. Kitchen: complete equipment. Bathroom: hotel-quality towels, hair dryer, storage. Strong Wi-Fi, convenient check-in and professional photos. No structural changes without owner approval.', 'Lujo cálido y minimalista: beige/crema, madera, iluminación suave, muebles compactos y durables, confort boutique y espacio de trabajo. Dormitorio: cama doble, colchón, ropa de cama, luces y blackout. Estudio: cama individual/convertible aprobada, escritorio, luz y almacenamiento. Sala: sofá, Smart TV, mesas compactas y arte. Cocina equipada. Baño: toallas de calidad, secadora y almacenamiento. Wi-Fi, llegada cómoda y fotos profesionales. Sin cambios estructurales sin autorización.'))
  table([t('Item', 'Partida'), t('Planning range PEN', 'Rango estimado PEN'), t('Selected amount PEN', 'Importe seleccionado PEN'), t('Inventory status', 'Estado')],
    furnishings.map((item) => [es ? item.es : item.en, `${pen(item.minPen)} - ${pen(item.maxPen)}`, pen(item.amountPen), ({ owned: t('Owned','Propio'), reusable:t('Reusable','Reutilizable'), needed:t('Needed','Necesario'), ordered:t('Ordered','Pedido'), completed:t('Completed','Completado') })[item.status]]))
  paragraph(`${t('Selected subtotal', 'Subtotal seleccionado')}: ${pen(budget.subtotal)}. ${t('Contingency', 'Contingencia')}: ${contingencyPercent}% (${pen(budget.contingency)}). ${t('Selected total', 'Total seleccionado')}: ${pen(budget.total)}.`)
  paragraph(t('Full planning allowances: S/8,000-14,550 subtotal; 10% contingency; S/8,800-16,005 total. Recommended targeted refresh S/10,000-12,000, subject to inspection and inventory. Owned/reusable items are excluded from selected budget; ordered/completed items remain included. Not supplier quotes. No major construction allowance.', 'Rangos de planificación: subtotal S/8,000-14,550; contingencia 10%; total S/8,800-16,005. Renovación dirigida S/10,000-12,000, sujeta a inspección e inventario. Partidas propias/reutilizables excluidas; pedidas/completadas incluidas. No son cotizaciones. No incluye obras mayores.'))
  paragraph(t('Budget reconciliation: the supplied item ranges sum to S/8,000-14,250, or S/8,800-15,675 with 10% contingency. The brief’s stated S/14,550 upper subtotal has an undocumented S/300 difference. Preserve the original as a supplied reference only; no invented item is added to the calculation.', 'Reconciliación: las partidas suministradas suman S/8,000-14,250, o S/8,800-15,675 con 10%. El subtotal superior de S/14,550 del brief tiene una diferencia no documentada de S/300. Se conserva como referencia; no se inventa una partida.'))
  paragraph('https://www.sodimac.com.pe/ | https://www.promart.pe/')
  heading(t('Investment return and cost assumptions', 'Retorno de inversión y supuestos de costos'))
  table([t('Metric', 'Indicador'), t('Selected calculation', 'Cálculo seleccionado')], [
    [t('Improvement investment PEN', 'Inversión en mejoras PEN'), pen(model.improvementCostPen)],
    [t('Editable FX: PEN per USD', 'Cambio editable: PEN por USD'), String(model.exchangeRatePenPerUsd)],
    [t('Incremental annual gross', 'Bruto anual incremental'), money(result.incrementalGross)],
    [t('Incremental annual net', 'Neto anual incremental'), money(result.incrementalNet)],
    [t('Payback', 'Recuperación'), result.paybackYears === null ? t('Not recovered under these assumptions / no investment', 'No se recupera con estos supuestos / sin inversión') : `${result.paybackYears.toFixed(2)} ${t('years', 'años')}`],
    [t('Annual return on improvements', 'Retorno anual sobre mejoras'), result.roiPercent === null ? t('No investment', 'Sin inversión') : `${result.roiPercent.toFixed(1)}%`],
  ])
  for (const key of ['before','after']) {
    const c = model[key].costs
    paragraph(`${key === 'before' ? t('Existing cost assumptions', 'Supuestos de costos actuales') : t('Refreshed cost assumptions', 'Supuestos de costos renovados')}: ${t('all fixed amounts USD/year; fees are illustrative, not contract terms', 'todos los importes fijos USD/año; comisiones ilustrativas, no contractuales')}.`)
    table([t('Assumption', 'Supuesto'), t('Value', 'Valor')], [
      ['OTA', `${c.otaPercent}%`], [t('Management program', 'Programa de gestión'), `${c.managementMode} / ${c.managementMode==='listing'?10:c.managementMode==='full'?20:c.managementMode==='none'?0:c.managementPercent}%`],
      [t('Commission base / IPM-generated share', 'Base de comisión / proporción de IPM'), `${c.commissionBase} / ${c.ipmSharePercent}%`],
      [t('Utilities / internet / maintenance / supplies USD', 'Servicios / internet / mantenimiento / suministros USD'), `${c.utilities} / ${c.internet} / ${c.maintenance} / ${c.supplies}`],
      [t('Cleaning cost / cleaning recovery USD', 'Costo / recuperación de limpieza USD'), `${c.cleaningCost} / ${c.cleaningRecovery}`],
      [t('Taxes / additional annual costs USD', 'Impuestos / costos adicionales anuales USD'), `${c.taxes} / ${c.other}`],
      [t('Monthly fee USD / charged months', 'Cuota mensual USD / meses cobrados'), `${c.monthlyFee} / ${c.feeMonths}`],
      [t('Annual room revenue override USD', 'Ingreso anual por alojamiento sustituido USD'), model[key].annualRevenueOverride ?? t('None: modeled', 'Ninguno: modelo')],
    ])
  }
  paragraph(t('Payback = improvement cost in USD / positive incremental annual net income. If net uplift is zero/negative there is no positive payback. No financing, depreciation, tax benefits or live FX quote assumed. Cleaning cost and recovery are separate.', 'Recuperación = costo de mejoras en USD / incremento positivo del ingreso neto anual. Si el incremento es cero/negativo no hay recuperación positiva. Sin financiación, depreciación, beneficios fiscales ni cambio en tiempo real. Limpieza y recuperación separadas.'))
  heading(t('IPM management solutions', 'Soluciones de gestión IPM'))
  paragraph(t('10% Listing Promotion: owner retains operations and existing reservations. IPM promotes available nights across additional channels; commission only on IPM-generated reservations. No upfront setup charge. First 2 months free of subscription; $40/month from month 3 under the existing agreement, deducted from IPM revenue when possible, not charged out of pocket if IPM revenue cannot cover it. The calculator monthly-fee input is an editable assumption, not an invented allocation.', 'Promoción 10%: el propietario conserva operaciones y reservas existentes. IPM promueve noches disponibles; comisión solo sobre reservas generadas por IPM. Sin cargo inicial. Primeros 2 meses sin suscripción; $40/mes desde el mes 3 según el acuerdo existente, descontados de ingresos de IPM cuando sea posible; sin cobro de bolsillo cuando no los cubran. La cuota del modelo es un supuesto editable, no una asignación inventada.'))
  paragraph(t('20% Full Management: guest communication, reservations, cleaning and maintenance coordination, pricing oversight, channel distribution, reporting and owner portal. Actual commission base and fees follow the agreed contract. No promise of occupancy, earnings or platform acceptance.', 'Gestión Integral 20%: comunicación, reservas, coordinación de limpieza y mantenimiento, supervisión de precios, distribución, informes y portal del propietario. La base de comisión y cuotas siguen el contrato. Sin promesas de ocupación, ingresos ni aceptación en plataformas.'))
  heading(t('Implementation and compliance', 'Implementación y cumplimiento'))
  paragraph(t('1. Inspection and compliance. 2. Furniture inventory and upgrade approval. 3. Purchasing and installation. 4. Photography and listing preparation. 5. Channel onboarding, pricing and launch. 6. Reviews after 30, 60 and 90 days. Timeline depends on rules, availability and approvals.', '1. Inspección y cumplimiento. 2. Inventario y aprobación. 3. Compra e instalación. 4. Fotos y preparación. 5. Alta de canales, precios y lanzamiento. 6. Revisión a los 30, 60 y 90 días. Plazos sujetos a reglas, disponibilidad y aprobaciones.'))
  paragraph(t('Pending: written condominium approval, pool/gym access, STR restrictions, official bedroom designation, actual plan/balcony, permitted capacity, registration/taxes, insurance/safety, check-in procedures and owner authorization. Competitor listing presence is not evidence of legal permission.', 'Pendiente: autorización escrita del condominio, piscina/gimnasio, restricciones STR, designación de dormitorios, plano/balcón, capacidad permitida, registro/impuestos, seguro/seguridad, procedimientos de llegada y autorización del propietario. Los anuncios competidores no prueban permiso legal.'))
  heading(t('Sources and next steps', 'Fuentes y próximos pasos'))
  paragraph(`${t('Developer brochure supplied by client', 'Folleto del promotor suministrado por cliente')}: nuevo.pdf, ${t('pp.6-7 location/amenities, pp.31-32 floor plans, p.38 reference-only disclaimer', 'págs.6-7 ubicación/amenidades, págs.31-32 planos, pág.38 aviso referencial')}. ${t('Actual owner photos supplied October 2026.', 'Fotos reales suministradas en octubre de 2026.')}`)
  paragraph(config.market.source)
  paragraph(t('Distinguish developer-advertised features, public listing claims, verified source readings, modeling assumptions and pending due diligence. No verified owner historical income, competitor earnings or measured market ranking is asserted.', 'Diferencie características del promotor, afirmaciones de anuncios, datos consultados, supuestos y verificaciones pendientes. No se afirma ingreso histórico verificado, ingresos de competidores ni ranking medido.'))
  paragraph(t("Your Property Has Potential. Let's Put It to Work. Request a property consultation or furnishing assessment through IPM’s existing contact page.", 'Su propiedad tiene potencial. Pongámosla a trabajar. Solicite una consulta o evaluación de mobiliario mediante la página de contacto existente de IPM.'))
  paragraph(`https://www.ipm.services${es ? '/es' : ''}/contact | https://www.ipm.services${es ? '/es' : ''}/listing-promotion`)
  const count = doc.getNumberOfPages()
  for (let i=1; i<=count; i++) {
    doc.setPage(i); doc.setDrawColor(189, 154, 66); doc.line(18, 16, 192, 16)
    doc.setFontSize(8); doc.setTextColor(90, 92, 93); doc.text('IPM | INTERNATIONAL PROPERTY MANAGEMENT', 18, 12)
    doc.text(`www.ipm.services | ${config.researchDate} | ${i}/${count}`, 18, 287)
  }
  return doc
}

export async function downloadSantaBeatrizPdf(options) {
  // Small local web photo only: no screenshot generation or external requests.
  const response = await fetch(options.config.images.before)
  if (!response.ok) throw new Error('Could not load the proposal photo for PDF export.')
  const blob = await response.blob()
  const photoData = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the proposal photo.'))
    reader.onload = () => resolve(reader.result)
    reader.readAsDataURL(blob)
  })
  const doc = await createSantaBeatrizPdf({ ...options, photoData })
  doc.save(`IPM-Jardines-Santa-Beatriz-${options.language || 'en'}.pdf`)
}
