import config from '../data/furnishingService.json' with { type: 'json' }

export function calculateFurnishingQuote({ furniture = 3000, packageId = 'consultation', delivery = 0, installation = 0, thirdParty = 0 } = {}, pricing = config) {
  if (!pricing.packages.includes(packageId)) throw new Error('Choose a valid service package.')
  for (const [key, value] of Object.entries({ furniture, delivery, installation, thirdParty })) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 10000000) throw new Error(`Invalid ${key} amount.`)
  }
  const round = value => Math.round((value + Number.EPSILON) * 100) / 100
  const percentageFee = packageId === 'consultation' ? 0 : round(furniture * (packageId === 'sourcing' ? pricing.sourcingPercent : pricing.setupPercent) / 100)
  const minimum = packageId === 'consultation' ? pricing.consultationFeeUsd : packageId === 'sourcing' ? pricing.sourcingMinimumUsd : pricing.setupMinimumUsd
  const serviceFee = Math.max(minimum, percentageFee)
  const expenses = round(delivery + installation + thirdParty)
  return { furniture: round(furniture), serviceFee, expenses, total: round(furniture + serviceFee + expenses), minimumApplied: packageId !== 'consultation' && percentageFee < minimum, upfrontServiceFee: packageId === 'consultation' ? serviceFee : round(serviceFee / 2) }
}
