// Pure, currency-independent reservation math. All displayed charges round to
// cents before subtraction so the visible breakdown reconciles exactly.
const round = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
const monetaryFields = ['nightlyRate', 'targetPayout', 'cleaningFee', 'otherFees', 'fixedProcessingFee'];
const percentageFields = ['platformFee', 'guestFeeRate', 'processingFee', 'taxRate', 'managementRate'];
const components = ['accommodation', 'cleaning', 'other'];
const feeBases = {
  platformBasis: ['subtotal', 'accommodation'],
  managementBasis: ['accommodation', 'subtotal'],
  processingBasis: ['guestTotal', 'subtotal'],
};

function normalize(input) {
  const values = {
    mode: 'rate', nightlyRate: 250, targetPayout: 250, nights: 3,
    cleaningFee: 75, otherFees: 0, platformFee: 15.5, guestFeeRate: 0,
    processingFee: 0, fixedProcessingFee: 0, managementRate: 0,
    platformBasis: 'subtotal', managementBasis: 'accommodation',
    processingBasis: 'guestTotal', taxableComponents: components,
    taxRemitter: 'platform', ...input,
  };
  const errors = {};
  for (const field of [...monetaryFields, ...percentageFields, 'nights']) {
    if ((field === 'nightlyRate' && values.mode === 'target') ||
        (field === 'targetPayout' && values.mode === 'rate')) continue;
    const raw = values[field];
    const value = typeof raw === 'number' ? raw
      : typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : NaN;
    if (!Number.isFinite(value) || value < 0) {
      errors[field] = 'Enter a valid non-negative number.';
    } else if (percentageFields.includes(field) && value >= 100) {
      errors[field] = 'Enter a percentage from 0 to less than 100.';
    } else if (field === 'nights' && (!Number.isInteger(value) || value < 1 || value > 3650)) {
      errors[field] = 'Enter a whole number of nights from 1 to 3650.';
    } else if (monetaryFields.includes(field) && value > 1_000_000_000) {
      errors[field] = 'Enter an amount no greater than 1,000,000,000.';
    }
    values[field] = value;
  }
  if (!['rate', 'target'].includes(values.mode)) errors.mode = 'Choose a calculator mode.';
  for (const [field, choices] of Object.entries(feeBases)) {
    if (!choices.includes(values[field])) errors[field] = 'Choose a valid fee basis.';
  }
  if (!['platform', 'owner', 'separate', 'unsure'].includes(values.taxRemitter)) {
    errors.taxRemitter = 'Choose who remits the tax.';
  }
  if (!Array.isArray(values.taxableComponents) ||
      values.taxableComponents.some((component) => !components.includes(component))) {
    errors.taxableComponents = 'Choose valid taxable components.';
  }
  return { values, errors };
}

function forward(values, nightlyRate) {
  const accommodation = round(nightlyRate * values.nights);
  const cleaningFee = round(values.cleaningFee);
  const otherFees = round(values.otherFees);
  const bookingSubtotal = round(accommodation + cleaningFee + otherFees);
  const amounts = { accommodation, cleaning: cleaningFee, other: otherFees };
  const taxableAmount = values.taxableComponents.reduce((sum, key) => sum + amounts[key], 0);
  const tax = round(taxableAmount * values.taxRate / 100);
  const guestFee = round(bookingSubtotal * values.guestFeeRate / 100);
  const guestTotal = round(bookingSubtotal + tax + guestFee);
  const platformFee = round((values.platformBasis === 'accommodation' ? accommodation : bookingSubtotal) * values.platformFee / 100);
  const processingBase = values.processingBasis === 'guestTotal' ? guestTotal : bookingSubtotal;
  const processingFee = round(processingBase * values.processingFee / 100 + values.fixedProcessingFee);
  // Only tax sent to the owner enters the platform transfer. It is then
  // reserved exactly once. "Unsure" conservatively assumes this same treatment.
  const taxReserve = ['owner', 'unsure'].includes(values.taxRemitter) ? tax : 0;
  const platformPayout = round(bookingSubtotal + taxReserve - platformFee - processingFee);
  const managementBase = values.managementBasis === 'subtotal' ? bookingSubtotal : accommodation;
  const managementFee = round(managementBase * values.managementRate / 100);
  const ownerPayout = round(platformPayout - taxReserve - managementFee);
  return {
    ok: true, nightlyRate: round(nightlyRate), nights: values.nights,
    accommodation, cleaningFee, otherFees, bookingSubtotal, taxRate: values.taxRate,
    tax, guestFee, guestTotal, platformFeeRate: values.platformFee, platformFee,
    processingFee, platformPayout, taxReserve, managementRate: values.managementRate,
    managementFee, ownerPayout, taxRemitter: values.taxRemitter,
  };
}

export function calculatePayout(input = {}) {
  const { values, errors } = normalize(input);
  if (Object.keys(errors).length) return { ok: false, errors };
  if (values.mode === 'rate') return forward(values, round(values.nightlyRate));

  const platformRate = values.platformFee / 100;
  const processingRate = values.processingFee / 100;
  const managementRate = values.managementRate / 100;
  const taxSlope = values.taxableComponents.includes('accommodation') ? values.taxRate / 100 : 0;
  const retention = 1 - platformRate - managementRate -
    processingRate * (values.processingBasis === 'guestTotal' ? 1 + taxSlope + values.guestFeeRate / 100 : 1);
  if (retention <= 0) {
    return { ok: false, errors: { targetPayout: 'These combined deductions leave no positive revenue. Reduce the fees to calculate a target rate.' } };
  }
  // Solve the full affine reservation equation, then search rounded nightly
  // cents so its final displayed payout actually meets the target.
  const fixedFees = values.cleaningFee + values.otherFees;
  const taxFixed = (values.taxableComponents.includes('cleaning') ? values.cleaningFee : 0) +
    (values.taxableComponents.includes('other') ? values.otherFees : 0);
  const fixedNet = fixedFees -
    (values.platformBasis === 'subtotal' ? fixedFees * platformRate : 0) -
    processingRate * (fixedFees + (values.processingBasis === 'guestTotal' ? taxFixed * values.taxRate / 100 + fixedFees * values.guestFeeRate / 100 : 0)) -
    values.fixedProcessingFee -
    (values.managementBasis === 'subtotal' ? fixedFees * managementRate : 0);
  const target = round(values.targetPayout);
  if (forward(values, 0).ownerPayout > target) {
    return { ok: false, errors: { targetPayout: 'The fixed guest fees already exceed this target at a zero nightly rate. Reduce those fees or increase your target.' } };
  }
  const estimate = (target - fixedNet) / retention / values.nights;
  if (!Number.isFinite(estimate) || estimate > 1_000_000_000) {
    return { ok: false, errors: { targetPayout: 'The required nightly rate is outside the supported range. Reduce the target or fees.' } };
  }
  let low = 0;
  let high = Math.min(100_000_000_000, Math.max(1, Math.ceil(Math.max(0, estimate) * 100) + 10));
  while (forward(values, high / 100).ownerPayout < target && high < 100_000_000_000) {
    high = Math.min(100_000_000_000, high * 2);
  }
  if (forward(values, high / 100).ownerPayout < target) {
    return { ok: false, errors: { targetPayout: 'This target cannot be reached within the supported nightly-rate range.' } };
  }
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (forward(values, mid / 100).ownerPayout >= target) high = mid;
    else low = mid + 1;
  }
  const result = forward(values, low / 100);
  return {
    ...result, requiredNightlyRate: result.nightlyRate,
    requiredBookingSubtotal: result.bookingSubtotal,
    requiredIncreasePercent: target > 0 ? round((result.accommodation / target - 1) * 100) : null,
  };
}

export function getFeeMarkup(feePercent) {
  const fee = Number(feePercent);
  if (feePercent === '' || feePercent === null || !Number.isFinite(fee) || fee < 0 || fee >= 100) return { ok: false };
  return { ok: true, requiredPrice: round(250 / (1 - fee / 100)), markupPercent: round((1 / (1 - fee / 100) - 1) * 100) };
}

// An optional comparison never enrolls the owner or changes the main estimate.
export function compareManagementPayouts(input, managementRate) {
  return {
    withoutManagement: calculatePayout({ ...input, managementRate: 0 }),
    withManagement: calculatePayout({ ...input, managementRate }),
  };
}
