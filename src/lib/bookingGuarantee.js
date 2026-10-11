// Approval must be explicitly recorded before this cash-payment promotion goes live.
export const BOOKING_GUARANTEE_APPROVED = false
export const BOOKING_GUARANTEE_VISIBLE = import.meta.env?.DEV === true || BOOKING_GUARANTEE_APPROVED
