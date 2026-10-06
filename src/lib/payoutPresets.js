// Informational starting points, never universal contracted commissions.
export const PLATFORM_PRESETS = [
  {
    id: 'airbnb', label: 'Airbnb', defaultFee: 15.5, mexicoFee: 16,
    guidance: {
      en: 'Single host fee starting point: 15.5% (16% in Mexico). Your actual Airbnb service fee may vary. Confirm the fee shown in your Airbnb account.',
      es: 'Referencia de tarifa única del anfitrión: 15,5% (16% en México). Su tarifa real de Airbnb puede variar. Confirme la tarifa en su cuenta.',
    },
  },
  {
    id: 'vrbo', label: 'Vrbo', defaultFee: null,
    guidance: {
      en: 'Enter your actual fee. Vrbo fee structures vary based on account type, software connection, region and payment setup.',
      es: 'Ingrese su tarifa real. Las tarifas de Vrbo varían según el tipo de cuenta, conexión de software, región y método de pago.',
    },
  },
  {
    id: 'booking', label: 'Booking.com', defaultFee: 15,
    guidance: {
      en: 'Example rate — replace with your contracted Booking.com commission. Payment charges, VAT and withholding may be separate.',
      es: 'Tarifa de ejemplo: reemplácela por su comisión contractual de Booking.com. Los cargos de pago, IVA y retenciones pueden ser adicionales.',
    },
  },
  {
    id: 'expedia', label: 'Expedia Group', defaultFee: null,
    guidance: {
      en: 'Enter the compensation/commission percentage from your Expedia agreement. It is contract-specific, not a universal rate.',
      es: 'Ingrese el porcentaje de compensación/comisión de su contrato con Expedia. No existe una tarifa universal.',
    },
  },
  {
    id: 'google', label: 'Google Vacation Rentals', defaultFee: 0,
    guidance: {
      en: 'Free Google Vacation Rental booking links charge no OTA referral commission. Booking-engine, processing, management and tax expenses can still apply.',
      es: 'Los enlaces gratuitos de Google Vacation Rentals no cobran comisión de referencia OTA. Pueden aplicarse gastos de motor de reservas, procesamiento, gestión e impuestos.',
    },
  },
  {
    id: 'direct', label: 'Direct Booking', defaultFee: 0,
    guidance: {
      en: 'No OTA commission. Enter your actual processing expenses; booking-engine, management, taxes and operating costs may still apply.',
      es: 'Sin comisión OTA. Ingrese los gastos reales de procesamiento; pueden aplicarse costos del motor de reservas, gestión, impuestos y operación.',
    },
  },
  {
    id: 'custom', label: 'Custom Channel', defaultFee: null,
    guidance: {
      en: 'Enter the platform fee from your agreement. This calculator does not assume your contracted charges.',
      es: 'Ingrese la tarifa de plataforma de su contrato. Esta calculadora no presume sus cargos contractuales.',
    },
  },
];

export function getPlatformPreset(id, country) {
  const preset = PLATFORM_PRESETS.find((item) => item.id === id);
  return preset ? { ...preset, fee: id === 'airbnb' && country === 'MX' ? preset.mexicoFee : preset.defaultFee } : null;
}
