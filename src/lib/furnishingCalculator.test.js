import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateFurnishingQuote } from './furnishingCalculator.js'
import { getSeoMetadata, getIndexableRoutePaths } from './seo.js'

test('All three furnishing examples use alternative fees, not stacked commissions', () => {
  for (const [packageId, fee] of [['consultation', 150], ['sourcing', 450], ['setup', 600]]) {
    const quote = calculateFurnishingQuote({ furniture: 3000, packageId })
    assert.equal(quote.serviceFee, fee)
    assert.equal(quote.total, 3000 + fee)
    assert.equal(quote.upfrontServiceFee, packageId === 'consultation' ? fee : fee / 2)
  }
})
test('Minimum fees work below, at and above thresholds, including zero budget', () => {
  assert.equal(calculateFurnishingQuote({ furniture: 1500, packageId: 'sourcing' }).serviceFee, 300)
  assert.equal(calculateFurnishingQuote({ furniture: 2000, packageId: 'sourcing' }).minimumApplied, false)
  assert.equal(calculateFurnishingQuote({ furniture: 0, packageId: 'setup' }).serviceFee, 500)
  assert.equal(calculateFurnishingQuote({ furniture: 2500, packageId: 'setup' }).minimumApplied, false)
  assert.equal(calculateFurnishingQuote({ furniture: 2501, packageId: 'setup' }).serviceFee, 500.2)
})
test('Delivery, installation and other expenses do not incur percentage fees', () => {
  const quote = calculateFurnishingQuote({ furniture: 3000, packageId: 'sourcing', delivery: 200, installation: 150, thirdParty: 100 })
  assert.equal(quote.serviceFee, 450)
  assert.equal(quote.expenses, 450)
  assert.equal(quote.total, 3900)
  assert.equal(calculateFurnishingQuote({ furniture: 1234.56, packageId: 'setup' }).serviceFee, 500)
})
test('Invalid amounts and unknown packages fail explicitly', () => {
  for (const furniture of [-1, NaN, Infinity, '3000', 10000001]) assert.throws(() => calculateFurnishingQuote({ furniture }))
  for (const delivery of [-1, NaN]) assert.throws(() => calculateFurnishingQuote({ delivery }))
  assert.throws(() => calculateFurnishingQuote({ packageId: 'management' }))
})
test('Authorized config changes are reflected without changing calculation rules', () => {
  const pricing = { packages: ['consultation', 'sourcing', 'setup'], consultationFeeUsd: 175, sourcingPercent: 16, sourcingMinimumUsd: 325, setupPercent: 22, setupMinimumUsd: 550 }
  assert.equal(calculateFurnishingQuote({ furniture: 3000, packageId: 'sourcing' }, pricing).serviceFee, 480)
})
test('Both furnishing pages are indexable with bilingual metadata and alternate links', () => {
  const paths = ['/services/property-furnishing-setup', '/es/services/property-furnishing-setup']
  for (const path of paths) {
    const meta = getSeoMetadata(path)
    assert.ok(!meta.noindex)
    assert.ok(meta.title.includes(path.startsWith('/es') ? 'Amoblamiento' : 'Furnishing'))
    assert.ok(getIndexableRoutePaths().includes(path))
    assert.equal(meta.alternates.length, 3) // English, Spanish and x-default.
  }
})
