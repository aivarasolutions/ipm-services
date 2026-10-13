import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { calculateCondition, calculateFurnishingBudget, calculateProposal, createProposalModel, formatProposalMoney } from './santaBeatrizModel.js'
import { createSantaBeatrizPdf } from './santaBeatrizPdf.js'
import { getLocaleRouteInfo, getSeoMetadata, getIndexableRoutePaths } from './seo.js'
import { createSitemapXml } from './sitemap.js'

const config = JSON.parse(readFileSync('src/data/santaBeatrizProposal.json', 'utf8'))
const model = () => createProposalModel(config)
const close = (value, expected) => assert.ok(Math.abs(value - expected) < 0.000001, `${value} != ${expected}`)

test('Default proposal gross models match the supplied brief without treating them as history', () => {
  const result = calculateProposal(model())
  assert.equal(result.valid, true)
  close(result.before.gross, 7665)
  close(result.after.gross, 12045)
  close(result.incrementalGross, 4380)
  close(result.scenarios[0].gross, 8212.5)
  close(result.scenarios[1].gross, 12045)
  close(result.scenarios[2].gross, 16133)
  assert.equal(config.verifiedPerformance.existingAnnualRevenueUsd, null)
})

test('Management, OTA, subscription and cleaning recovery are separate operating items', () => {
  const m = model()
  const result = calculateProposal(m)
  close(result.after.ota, 1806.75)
  close(result.after.management, 2409)
  close(result.after.fixed, 2160)
  close(result.after.net, 5669.25)
  m.after.costs.cleaningCost = 800
  m.after.costs.cleaningRecovery = 600
  close(calculateProposal(m).after.net, 5469.25)
  m.after.costs.monthlyFee = 40
  m.after.costs.feeMonths = 10
  close(calculateProposal(m).after.subscription, 400)
  close(calculateProposal(m).after.net, 5069.25)
})

test('10% promotion commission applies only to the selected IPM-generated share and editable base', () => {
  const m = model()
  m.after.costs.managementMode = 'listing'
  m.after.costs.ipmSharePercent = 25
  close(calculateProposal(m).after.management, 301.125)
  m.after.costs.commissionBase = 'after-ota'
  close(calculateProposal(m).after.management, (12045 - 1806.75) * 0.1 * 0.25)
  m.after.costs.ipmSharePercent = 0
  close(calculateProposal(m).after.management, 0)
  m.after.costs.managementMode = 'none'
  close(calculateProposal(m).after.management, 0)
})

test('Base scenario, tables, availability and overrides all use the upgraded calculation', () => {
  const m = model()
  m.availableNights = 300
  m.after.adr = 70
  m.after.occupancyPercent = 65
  const result = calculateProposal(m)
  close(result.after.gross, 13650)
  close(result.scenarios[1].gross, result.after.gross)
  close(result.scenarios[1].net, result.after.net)
  m.after.annualRevenueOverride = 0
  close(calculateProposal(m).after.gross, 0)
  close(calculateProposal(m).scenarios[1].gross, 0)
})

test('Only documented configured performance populates historical revenue overrides', () => {
  const copy = structuredClone(config)
  copy.verifiedPerformance.existingAnnualRevenueUsd = 9500
  assert.equal(createProposalModel(copy).before.annualRevenueOverride, null)
  copy.verifiedPerformance.source = 'Owner-supplied annual room-revenue statement'
  copy.verifiedPerformance.period = '2025'
  assert.equal(createProposalModel(copy).before.annualRevenueOverride, 9500)
  assert.equal(config.model.before.annualRevenueOverride, null)
})

test('Zero or negative incremental net returns no positive payback; zero investment avoids infinity', () => {
  const m = model()
  m.after.costs.other = 20000
  let result = calculateProposal(m)
  assert.ok(result.incrementalNet < 0)
  assert.equal(result.paybackYears, null)
  assert.ok(result.roiPercent < 0)
  m.after = structuredClone(m.before)
  result = calculateProposal(m)
  close(result.incrementalNet, 0)
  assert.equal(result.paybackYears, null)
  m.improvementCostPen = 0
  result = calculateProposal(m)
  assert.equal(result.roiPercent, null)
  assert.equal(result.paybackYears, null)
})

test('Investment FX and invalid percentage/night/fee assumptions have explicit validation', () => {
  const m = model()
  close(calculateProposal(m).investmentUsd, 12000 / 3.5)
  m.exchangeRatePenPerUsd = 0
  assert.equal(calculateProposal(m).valid, false)
  m.exchangeRatePenPerUsd = 3.5
  for (const value of [-1, 366, NaN]) {
    m.availableNights = value
    assert.equal(calculateProposal(m).valid, false)
  }
  m.availableNights = 365
  m.after.occupancyPercent = 101
  assert.equal(calculateProposal(m).valid, false)
  m.after.occupancyPercent = 60
  m.after.costs.feeMonths = 13
  assert.equal(calculateProposal(m).valid, false)
  assert.ok(formatProposalMoney(100, 'PEN', 3.5).includes('350'))
})

test('Furnishing range totals and inventory exclusions match the brief', () => {
  close(config.furnishings.reduce((sum, item) => sum + item.minPen, 0), 8000)
  // Supplied category maxima sum to 14,250, not the brief's stated 14,550.
  close(config.furnishings.reduce((sum, item) => sum + item.maxPen, 0), 14250)
  const items = structuredClone(config.furnishings)
  const original = calculateFurnishingBudget(items, 10)
  items[0].status = 'owned'
  items[1].status = 'reusable'
  const reduced = calculateFurnishingBudget(items, 10)
  close(reduced.total, original.total - (items[0].amountPen + items[1].amountPen) * 1.1)
  items[0].status = 'completed'
  close(calculateFurnishingBudget(items, 10).total, reduced.total + items[0].amountPen * 1.1)
})

test('English and Spanish proposal routes have locale-aware metadata and sitemap entries', () => {
  for (const path of ['/insights/jardines-santa-beatriz-lima', '/es/insights/jardines-santa-beatriz-lima']) {
    const metadata = getSeoMetadata(path)
    assert.equal(metadata.indexable, true)
    assert.ok(getIndexableRoutePaths().includes(path))
    assert.ok(createSitemapXml([]).includes(`${metadata.canonical}</loc>`))
    assert.ok(metadata.alternates.some((item) => item.hreflang === 'es'))
  }
  assert.equal(getLocaleRouteInfo('/es/insights/jardines-santa-beatriz-lima').localized, true)
})

test('Assets are local optimized web copies and competitor quotes are not invented', () => {
  for (const path of Object.values(config.images).flat().filter((value) => typeof value === 'string' && value.startsWith('/images/'))) {
    const bytes = readFileSync(`public${path}`)
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.ok(bytes.length < 220000)
  }
  for (const competitor of config.competitors) {
    assert.ok(competitor.url.startsWith('https://www.airbnb.com/rooms/'))
    assert.equal(competitor.nightlyQuoteUsd, null)
    assert.equal(competitor.occupancyPercent, null)
  }
})

test('PDF exports work in both languages and include current selected calculations', async () => {
  for (const language of ['en', 'es']) {
    const m = model()
    m.after.annualRevenueOverride = 19999
    const pdf = await createSantaBeatrizPdf({ language, config, model: m, furnishings: config.furnishings, contingencyPercent: 10 })
    const output = pdf.output()
    assert.match(output, /^%PDF-/)
    assert.ok(pdf.getNumberOfPages() >= 5)
    assert.ok(output.includes('19,999') || output.includes('19.999'))
    assert.ok(output.includes('airbnb.com/rooms/1527817004235899813'))
  }
})

test('Negative income stays negative and is never treated as an earnings promise', () => {
  const m = model()
  m.after.adr = 0
  const condition = calculateCondition(m.after, m.availableNights)
  assert.equal(condition.gross, 0)
  assert.ok(condition.net < 0)
})
