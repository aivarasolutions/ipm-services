const number = (value) => typeof value === 'number' && Number.isFinite(value)
const nonnegative = (value) => number(value) && value >= 0
const percent = (value) => nonnegative(value) && value <= 100

export function createProposalModel(config) {
  const model = structuredClone(config.model)
  const performance = config.verifiedPerformance
  if (performance?.source && performance?.period) {
    if (nonnegative(performance.existingAnnualRevenueUsd)) model.before.annualRevenueOverride = performance.existingAnnualRevenueUsd
    if (nonnegative(performance.upgradedAnnualRevenueUsd)) model.after.annualRevenueOverride = performance.upgradedAnnualRevenueUsd
  }
  return model
}

export function validateProposalModel(model) {
  const errors = []
  if (!nonnegative(model.availableNights) || model.availableNights > 365) errors.push('availableNights')
  if (model.currency !== 'USD') errors.push('currency')
  if (!nonnegative(model.improvementCostUsd)) errors.push('improvementCostUsd')
  for (const key of ['before', 'after']) {
    const state = model[key]
    if (!nonnegative(state.adr)) errors.push(`${key}.adr`)
    if (!percent(state.occupancyPercent)) errors.push(`${key}.occupancyPercent`)
    if (state.annualRevenueOverride !== null && !nonnegative(state.annualRevenueOverride)) errors.push(`${key}.annualRevenueOverride`)
    for (const field of ['otaPercent', 'managementPercent', 'ipmSharePercent']) {
      if (!percent(state.costs[field])) errors.push(`${key}.${field}`)
    }
    for (const field of ['utilities', 'internet', 'maintenance', 'supplies', 'cleaningCost', 'cleaningRecovery', 'taxes', 'other', 'monthlyFee', 'feeMonths']) {
      if (!nonnegative(state.costs[field])) errors.push(`${key}.${field}`)
    }
    if (state.costs.feeMonths > 12) errors.push(`${key}.feeMonths`)
    if (!['none', 'listing', 'full', 'custom'].includes(state.costs.managementMode)) errors.push(`${key}.managementMode`)
    if (!['gross', 'after-ota'].includes(state.costs.commissionBase)) errors.push(`${key}.commissionBase`)
  }
  for (const scenario of model.scenarios) {
    if (!nonnegative(scenario.adr) || !percent(scenario.occupancyPercent)) errors.push(`scenario.${scenario.id}`)
  }
  return errors
}

export function calculateCondition(condition, availableNights) {
  const gross = condition.annualRevenueOverride ?? condition.adr * availableNights * condition.occupancyPercent / 100
  const c = condition.costs
  const ota = gross * c.otaPercent / 100
  const base = c.commissionBase === 'after-ota' ? gross - ota : gross
  const rate = c.managementMode === 'none' ? 0 : c.managementMode === 'listing' ? 0.10 : c.managementMode === 'full' ? 0.20 : c.managementPercent / 100
  const share = c.managementMode === 'listing' ? c.ipmSharePercent / 100 : 1
  const management = base * rate * share
  const subscription = c.monthlyFee * c.feeMonths
  const fixed = c.utilities + c.internet + c.maintenance + c.supplies + c.taxes + c.other
  const expenses = ota + management + fixed + c.cleaningCost + subscription
  const net = gross + c.cleaningRecovery - expenses
  return { gross, monthlyGross: gross / 12, bookedNights: availableNights * condition.occupancyPercent / 100, ota, management, subscription, fixed, cleaningCost: c.cleaningCost, cleaningRecovery: c.cleaningRecovery, expenses, net, monthlyNet: net / 12 }
}

export function calculateProposal(model) {
  const errors = validateProposalModel(model)
  if (errors.length) return { valid: false, errors }
  const before = calculateCondition(model.before, model.availableNights)
  const after = calculateCondition(model.after, model.availableNights)
  const incrementalGross = after.gross - before.gross
  const incrementalNet = after.net - before.net
  const investmentUsd = model.improvementCostUsd
  const scenarios = model.scenarios.map((s) => {
    // Base case is the upgraded condition; one source of truth for every view.
    const condition = s.id === 'base' ? model.after : { adr: s.adr, occupancyPercent: s.occupancyPercent, annualRevenueOverride: null, costs: model.after.costs }
    return { ...s, adr: condition.adr, occupancyPercent: condition.occupancyPercent, ...calculateCondition(condition, model.availableNights) }
  })
  return {
    valid: true, errors: [], before, after, scenarios, incrementalGross, incrementalNet, investmentUsd,
    paybackYears: incrementalNet > 0 && investmentUsd > 0 ? investmentUsd / incrementalNet : null,
    roiPercent: investmentUsd > 0 ? incrementalNet / investmentUsd * 100 : null,
  }
}

export function calculateFurnishingBudget(items, contingencyPercent = 10) {
  const cents = (value) => Math.round((value + Number.EPSILON) * 100) / 100
  const contributing = items.filter((item) => !['owned', 'reusable'].includes(item.status))
  const subtotal = cents(contributing.reduce((sum, item) => sum + Math.max(0, Number(item.amountUsd) || 0), 0))
  const contingency = cents(subtotal * Math.max(0, Number(contingencyPercent) || 0) / 100)
  return { subtotal, contingency, total: cents(subtotal + contingency) }
}

export function formatProposalMoney(usd, language = 'en', fractionDigits = 0) {
  return new Intl.NumberFormat(language === 'es' ? 'es-PE' : 'en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits })
    .format(usd)
}
