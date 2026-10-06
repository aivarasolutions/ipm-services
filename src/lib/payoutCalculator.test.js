import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatePayout, getFeeMarkup, compareManagementPayouts } from './payoutCalculator.js';
import { getPlatformPreset, PLATFORM_PRESETS } from './payoutPresets.js';
import { findVerifiedTaxRate, VERIFIED_TAX_RATES, COUNTRIES, US_STATES } from './payoutTaxes.js';

const base = { nightlyRate: 250, nights: 3, cleaningFee: 75, otherFees: 0, platformFee: 15.5, taxRate: 10 };
const cents = (number) => Math.round(number * 100);
const targetCases = [
  [5, 263.16, 5.26], [8, 271.74, 8.70], [10, 277.78, 11.11],
  [12, 284.09, 13.64], [15, 294.12, 17.65], [15.5, 295.86, 18.34],
  [16, 297.62, 19.05], [18, 304.88, 21.95], [20, 312.50, 25],
];
for (const [fee, expected, markup] of targetCases) {
  test(`Target 250 after ${fee}% requires ${expected}`, () => {
    const result = calculatePayout({ ...base, mode: 'target', targetPayout: 250, nights: 1, cleaningFee: 0, taxRate: 0, platformFee: fee });
    assert.equal(result.ok, true);
    assert.equal(result.requiredNightlyRate, expected);
    assert.equal(result.ownerPayout, 250);
    assert.equal(result.requiredIncreasePercent, markup);
    assert.deepEqual(getFeeMarkup(fee), { ok: true, requiredPrice: expected, markupPercent: markup });
  });
}
test('Guest total, cent-rounded platform fee, and payout reconcile', () => {
  const result = calculatePayout(base);
  assert.equal(result.bookingSubtotal, 825);
  assert.equal(result.tax, 82.5);
  assert.equal(result.guestTotal, 907.5);
  assert.equal(result.platformFee, 127.88);
  assert.equal(result.platformPayout, 697.12);
  assert.equal(result.ownerPayout, 697.12);
});
test('Reverse of 295.86 is 250.00', () => {
  assert.equal(calculatePayout({ ...base, nights: 1, cleaningFee: 0, nightlyRate: 295.86 }).ownerPayout, 250);
});
for (const taxRemitter of ['platform', 'owner', 'separate', 'unsure']) {
  test(`Tax never becomes profit or double deduction: ${taxRemitter}`, () => {
    const result = calculatePayout({ ...base, taxRemitter });
    assert.equal(result.ownerPayout, 697.12);
    assert.equal(result.taxReserve, ['owner', 'unsure'].includes(taxRemitter) ? 82.5 : 0);
    assert.equal(result.platformPayout, ['owner', 'unsure'].includes(taxRemitter) ? 779.62 : 697.12);
  });
}
for (const managementRate of [0, 10, 20, 13.7]) {
  for (const managementBasis of ['accommodation', 'subtotal']) {
    test(`Separate IPM ${managementRate}% on ${managementBasis}`, () => {
      const result = calculatePayout({ ...base, managementRate, managementBasis });
      const expected = Math.round((managementBasis === 'accommodation' ? 750 : 825) * managementRate) / 100;
      assert.equal(result.managementFee, expected);
      assert.equal(cents(result.ownerPayout), cents(697.12) - cents(expected));
      assert.equal(result.platformFee, 127.88);
    });
  }
}
test('Processing percentage and fixed fee are separate from platform charges', () => {
  const result = calculatePayout({ ...base, processingFee: 3, fixedProcessingFee: 0.30 });
  assert.equal(result.processingFee, 27.53);
  assert.equal(result.ownerPayout, 669.59);
  assert.equal(calculatePayout({ ...base, processingFee: 3, fixedProcessingFee: 0.30, processingBasis: 'subtotal' }).processingFee, 25.05);
});
test('Selected taxable components and commission bases apply', () => {
  const result = calculatePayout({ ...base, otherFees: 25, taxableComponents: ['accommodation'], platformBasis: 'accommodation' });
  assert.equal(result.tax, 75);
  assert.equal(result.platformFee, 116.25);
  assert.equal(result.bookingSubtotal, 850);
  assert.equal(calculatePayout({ ...base, taxableComponents: [] }).tax, 0);
});
test('Guest-side service charges increase guest cost, not owner revenue', () => {
  const result = calculatePayout({ ...base, guestFeeRate: 14 });
  assert.equal(result.guestFee, 115.5);
  assert.equal(result.guestTotal, 1023);
  assert.equal(result.ownerPayout, 697.12);
});
test('Reverse includes nights, cleaning, other fees, processing, taxes and management', () => {
  for (const platformBasis of ['accommodation', 'subtotal']) {
    for (const managementBasis of ['accommodation', 'subtotal']) {
      for (const processingBasis of ['guestTotal', 'subtotal']) {
        const input = {
          ...base, mode: 'target', targetPayout: 800, otherFees: 25, guestFeeRate: 12,
          processingFee: 3.25, fixedProcessingFee: 0.3, managementRate: 20,
          platformBasis, managementBasis, processingBasis, taxRemitter: 'owner',
        };
        const result = calculatePayout(input);
        assert.equal(result.ok, true);
        assert.ok(result.ownerPayout >= 800);
        assert.ok(result.ownerPayout < 800.04);
        const forward = calculatePayout({ ...input, mode: 'rate', nightlyRate: result.requiredNightlyRate });
        assert.equal(forward.ownerPayout, result.ownerPayout);
        assert.equal(cents(result.platformPayout) - cents(result.taxReserve) - cents(result.managementFee), cents(result.ownerPayout));
      }
    }
  }
});
const invalidInputs = [
  { nightlyRate: -1 }, { nightlyRate: '' }, { nightlyRate: 'abc' },
  { nights: 0 }, { nights: -1 }, { nights: 1.5 },
  { platformFee: -1 }, { platformFee: 100 }, { processingFee: 100 },
  { managementRate: 100 }, { guestFeeRate: -1 }, { guestFeeRate: 100 },
  { taxRate: '' }, { taxRate: null }, { taxRate: NaN },
  { cleaningFee: -1 }, { otherFees: Infinity }, { fixedProcessingFee: -0.3 },
  { platformFee: '' }, { nightlyRate: {} }, { taxRemitter: 'invalid' },
  { taxableComponents: ['invalid'] }, { platformBasis: 'undefined' },
  { mode: 'invalid' }, { mode: 'target', targetPayout: -1 },
  { mode: 'target', targetPayout: 1000, platformFee: 80, managementRate: 20 },
  { mode: 'target', targetPayout: 1, cleaningFee: 75, platformFee: 0 },
];
for (const [index, invalid] of invalidInputs.entries()) {
  test(`Invalid input ${index + 1} returns explicit errors, never non-finite output`, () => {
    const result = calculatePayout({ ...base, ...invalid });
    assert.equal(result.ok, false);
    assert.ok(Object.keys(result.errors).length);
    assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(result)));
  });
}
test('Airbnb Mexico default; example vs unknown commissions remain explicit', () => {
  assert.equal(getPlatformPreset('airbnb', 'US').fee, 15.5);
  assert.equal(getPlatformPreset('airbnb', 'MX').fee, 16);
  assert.equal(getPlatformPreset('booking', 'US').fee, 15);
  assert.equal(getPlatformPreset('vrbo', 'US').fee, null);
  assert.equal(getPlatformPreset('expedia', 'US').fee, null);
  assert.equal(getPlatformPreset('custom', 'US').fee, null);
  assert.equal(getPlatformPreset('google', 'US').fee, 0);
  assert.equal(getPlatformPreset('direct', 'US').fee, 0);
  assert.equal(PLATFORM_PRESETS.length, 7);
});
test('Locations have complete state list; no fabricated verified tax rates', () => {
  assert.equal(COUNTRIES.length, 7);
  assert.equal(US_STATES.length, 51);
  assert.deepEqual(VERIFIED_TAX_RATES, []);
  assert.equal(findVerifiedTaxRate({ country: 'US', state: 'NC', city: 'Charlotte' }), null);
});
test('Verified record requires exact jurisdiction, source, and verification date', () => {
  // This rate is only synthetic test data, never included in app configuration.
  const record = { country: 'US', state: 'ZZ', county: 'Test', city: 'Test City', tax_rate: 7, taxable_components: ['accommodation'], source: 'https://example.test/official', last_verified: '2026-10-06' };
  assert.equal(findVerifiedTaxRate(record, [record]), record);
  assert.equal(findVerifiedTaxRate({ ...record, city: 'Other' }, [record]), null);
  assert.equal(findVerifiedTaxRate(record, [{ ...record, source: '' }]), null);
  assert.equal(findVerifiedTaxRate(record, [{ ...record, last_verified: '' }]), null);
  assert.equal(findVerifiedTaxRate(record, [{ ...record, tax_rate: 100 }]), null);
});

test('Optional IPM comparison never changes the general main estimate or input', () => {
  const input = { ...base, managementRate: 0 };
  const snapshot = { ...input };
  const comparison = compareManagementPayouts(input, 10);
  assert.equal(comparison.withoutManagement.ownerPayout, 697.12);
  assert.equal(comparison.withManagement.ownerPayout, 622.12);
  assert.equal(calculatePayout(input).ownerPayout, 697.12);
  assert.deepEqual(input, snapshot);
  assert.equal(compareManagementPayouts(input, 20).withManagement.ownerPayout, 547.12);
  assert.equal(compareManagementPayouts(input, 13.7).withManagement.ownerPayout, 594.37);
});
test('Target comparison calculates separate required rates, not artificial payout advantages', () => {
  const comparison = compareManagementPayouts({ ...base, mode: 'target', nights: 1, cleaningFee: 0, taxRate: 0, targetPayout: 250 }, 10);
  assert.equal(comparison.withoutManagement.requiredNightlyRate, 295.86);
  assert.equal(comparison.withoutManagement.ownerPayout, 250);
  assert.ok(comparison.withManagement.requiredNightlyRate > 295.86);
  assert.equal(comparison.withManagement.ownerPayout, 250);
});
test('Invalid IPM comparison fees do not break the valid non-client estimate', () => {
  for (const fee of [-1, 100, '', 'bad']) {
    const comparison = compareManagementPayouts(base, fee);
    assert.equal(comparison.withManagement.ok, false);
    assert.equal(comparison.withoutManagement.ownerPayout, 697.12);
  }
});
