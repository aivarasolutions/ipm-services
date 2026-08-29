import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, Bath, BedDouble, CalendarDays, CheckCircle2, ChevronLeft,
  ChevronRight, ExternalLink, MapPin, ShieldCheck, Star, Users, Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar as BookingCalendar } from '@/components/ui/calendar'
import { fetchCalendar, fetchProperty, fetchQuote, fetchReviews, submitReservation } from '../services/hostawayApi'

const today = new Date().toISOString().slice(0, 10)
const addDays = (date, days) => {
  const [year, month, day] = String(date || '').split('-').map(Number)
  if (![year, month, day].every(Number.isInteger)) return ''
  const next = new Date(Date.UTC(year, month - 1, day))
  if (Number.isNaN(next.getTime())) return ''
  next.setUTCDate(next.getUTCDate() + days)
  return next.toISOString().slice(0, 10)
}

const money = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)

const toDateKey = (date) => {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const fromDateKey = (value) => {
  const [year, month, day] = String(value || '').split('-').map(Number)
  if (![year, month, day].every(Number.isInteger)) return undefined
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? undefined : date
}

const nightsBetween = (startDate, endDate) => {
  const start = fromDateKey(startDate)
  const end = fromDateKey(endDate)
  if (!start || !end) return 0
  return Math.round((end.getTime() - start.getTime()) / 86400000)
}

const PropertyStat = ({ label, value, icon: IconComponent }) => (
  <div className="flex items-center gap-3">
    {createElement(IconComponent, { className: 'h-5 w-5 text-[#D4AF37]' })}
    <div><div className="font-bold text-[#0A1A30]">{value}</div><div className="text-xs text-[#64748B]">{label}</div></div>
  </div>
)

const PropertyDetail = () => {
  const { slug } = useParams()
  const [property, setProperty] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)
  const [dates, setDates] = useState({ startDate: '', endDate: '', guests: 1 })
  const [availability, setAvailability] = useState([])
  const [availabilityLoading, setAvailabilityLoading] = useState(true)
  const [availabilityError, setAvailabilityError] = useState('')
  const [quote, setQuote] = useState(null)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [booking, setBooking] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [guest, setGuest] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const reservationKey = useRef('')
  const quoteRequest = useRef(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    setAvailabilityLoading(true)
    setAvailabilityError('')
    Promise.all([
      fetchProperty(slug),
      fetchReviews(slug).catch(() => []),
      fetchCalendar(slug, today, addDays(today, 365)).catch((err) => {
        if (active) setAvailabilityError(err.message)
        return []
      }),
    ])
      .then(([item, propertyReviews, calendarDays]) => {
        if (!active) return
        setProperty(item)
        setReviews(propertyReviews)
        setAvailability(calendarDays)
        setDates((current) => ({ ...current, guests: Math.min(Math.max(current.guests, 1), item.guests) }))
      })
      .catch((err) => active && setError(err.message))
      .finally(() => {
        if (!active) return
        setLoading(false)
        setAvailabilityLoading(false)
      })
    return () => { active = false }
  }, [slug])

  const averageRating = useMemo(() => {
    if (property?.rating) return property.rating
    const rated = reviews.filter((review) => review.rating)
    return rated.length ? rated.reduce((sum, review) => sum + review.rating, 0) / rated.length : null
  }, [property, reviews])

  const availabilityByDate = useMemo(
    () => new Map(availability.map((day) => [String(day.date).slice(0, 10), day])),
    [availability]
  )

  const selectedRange = useMemo(() => {
    const from = fromDateKey(dates.startDate)
    const to = fromDateKey(dates.endDate)
    return from ? { from, ...(to ? { to } : {}) } : undefined
  }, [dates.startDate, dates.endDate])

  const validateStay = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Choose a check-in and check-out date.'
    const nights = nightsBetween(startDate, endDate)
    if (nights < 1) return 'Check-out must be after check-in.'

    const stayDays = []
    for (let index = 0; index < nights; index += 1) {
      const date = addDays(startDate, index)
      const day = availabilityByDate.get(date)
      if (!day) return 'Availability is still loading for these dates. Please choose another date or try again.'
      if (!day.isAvailable) return 'Those dates include an unavailable night. Please choose another stay.'
      stayDays.push(day)
    }

    const arrivalDay = stayDays[0]
    const minimumStay = arrivalDay.minimumStay || property.minimumStay || 1
    const maximumStay = arrivalDay.maximumStay || 365
    if (nights < minimumStay) return `This property requires at least ${minimumStay} nights for this arrival date.`
    if (nights > maximumStay) return `This property allows a maximum stay of ${maximumStay} nights for this arrival date.`
    return ''
  }

  const loadQuote = async (startDate = dates.startDate, endDate = dates.endDate, guests = dates.guests) => {
    const requestId = quoteRequest.current + 1
    quoteRequest.current = requestId
    setQuote(null)

    const validationError = validateStay(startDate, endDate)
    if (validationError) {
      setQuoteLoading(false)
      setBookingError(validationError)
      return
    }

    setBookingError('')
    setQuoteLoading(true)
    try {
      const nextQuote = await fetchQuote(slug, { startDate, endDate, guests: Number(guests) })
      if (quoteRequest.current === requestId) setQuote(nextQuote)
    } catch (err) {
      if (quoteRequest.current === requestId) setBookingError(err.message)
    } finally {
      if (quoteRequest.current === requestId) setQuoteLoading(false)
    }
  }

  const handleDateSelect = (range) => {
    const startDate = range?.from ? toDateKey(range.from) : ''
    const endDate = range?.to ? toDateKey(range.to) : ''
    if (
      startDate
      && (!endDate || endDate === startDate)
      && !availabilityByDate.get(startDate)?.isAvailable
    ) {
      setDates((current) => ({ ...current, startDate: '', endDate: '' }))
      setQuote(null)
      setQuoteLoading(false)
      setBookingError('That date is unavailable for check-in. It can only be used as the check-out date for a stay ending that day.')
      return
    }
    setDates((current) => ({ ...current, startDate, endDate }))
    setQuote(null)
    setBookingError('')
    if (startDate && endDate) loadQuote(startDate, endDate, dates.guests)
  }

  const handleGuestsChange = (event) => {
    const guests = Number(event.target.value)
    setDates((current) => ({ ...current, guests }))
    setQuote(null)
    setBookingError('')
    if (dates.startDate && dates.endDate) loadQuote(dates.startDate, dates.endDate, guests)
  }

  const handleManualDateChange = (field, value) => {
    const nextDates = { ...dates, [field]: value }
    if (field === 'startDate' && nextDates.endDate && nextDates.endDate <= value) nextDates.endDate = ''
    setDates(nextDates)
    setQuote(null)
    setBookingError('')
    if (nextDates.startDate && nextDates.endDate) {
      loadQuote(nextDates.startDate, nextDates.endDate, nextDates.guests)
    }
  }

  const isDateOutsideBookingWindow = (date) => {
    const dateKey = toDateKey(date)
    if (availabilityLoading || availabilityError || dateKey < today || dateKey > addDays(today, 365)) return true
    return !availabilityByDate.has(dateKey)
  }

  const isDateUnavailable = (date) => !availabilityByDate.get(toDateKey(date))?.isAvailable

  const checkAvailability = async (event) => {
    event.preventDefault()
    await loadQuote()
  }

  const reserve = async (event) => {
    event.preventDefault()
    setBooking(true)
    setBookingError('')
    try {
      reservationKey.current ||= crypto.randomUUID()
      const reservation = await submitReservation(
        slug,
        { ...dates, ...guest, guests: Number(dates.guests) },
        reservationKey.current
      )
      setConfirmation(reservation)
      reservationKey.current = ''
    } catch (err) {
      setBookingError(err.message)
    } finally {
      setBooking(false)
    }
  }

  const startOver = () => {
    setConfirmation(null)
    setBookingError('')
    reservationKey.current = ''
  }

  if (loading) return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#06121F]">
      <div className="text-center text-[#C9D2DE]"><div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />Loading live property details…</div>
    </div>
  )

  if (error || !property) return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#06121F] px-4 text-center">
      <div><h1 className="mb-3 text-3xl font-bold text-white">Property unavailable</h1><p className="mb-7 text-[#C9D2DE]">{error || 'This property could not be found.'}</p><Link to="/properties"><Button className="bg-[#D4AF37] text-[#06121F]">Back to Properties</Button></Link></div>
    </div>
  )

  const images = property.images || []
  const image = images[activeImage]

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <div className="bg-[#06121F] px-4 py-4">
        <div className="mx-auto max-w-7xl"><Link to="/properties" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#F2D98D]"><ArrowLeft className="h-5 w-5" />All properties</Link></div>
      </div>

      <section className="bg-[#06121F] pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative aspect-[16/9] max-h-[620px] overflow-hidden rounded-2xl bg-[#0A1A30]">
            {image ? <img src={image.url} alt={image.caption || property.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-[#C9D2DE]">Photos coming soon</div>}
            {images.length > 1 && <>
              <button aria-label="Previous photo" onClick={() => setActiveImage((activeImage - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 rounded-full bg-[#06121F]/80 p-3 text-white"><ChevronLeft /></button>
              <button aria-label="Next photo" onClick={() => setActiveImage((activeImage + 1) % images.length)} className="absolute right-4 top-1/2 rounded-full bg-[#06121F]/80 p-3 text-white"><ChevronRight /></button>
              <span className="absolute bottom-4 right-4 rounded-full bg-[#06121F]/80 px-3 py-1 text-sm text-white">{activeImage + 1} / {images.length}</span>
            </>}
          </div>
          <div className="mt-8">
            <div className="mb-3 flex flex-wrap items-center gap-4 text-[#C9D2DE]">
              <span className="flex items-center gap-2"><MapPin className="h-5 w-5 text-[#D4AF37]" />{property.location}</span>
              {averageRating && <span className="flex items-center gap-1"><Star className="h-5 w-5 fill-[#D4AF37] text-[#D4AF37]" />{averageRating.toFixed(1)} {reviews.length ? `(${reviews.length} reviews)` : ''}</span>}
            </div>
            <h1 className="font-display text-4xl font-bold text-white md:text-5xl">{property.name}</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl bg-white p-5 shadow-sm sm:grid-cols-4">
            <PropertyStat label="Guests" value={property.guests} icon={Users} />
            <PropertyStat label="Bedrooms" value={property.bedrooms} icon={BedDouble} />
            <PropertyStat label="Beds" value={property.beds} icon={BedDouble} />
            <PropertyStat label="Bathrooms" value={property.bathrooms} icon={Bath} />
          </div>

          <h2 className="mb-4 font-display text-3xl font-bold text-[#0A1A30]">About this stay</h2>
          <p className="mb-10 whitespace-pre-line text-lg leading-relaxed text-[#334155]">{property.description || 'A professionally managed IPM vacation rental with everything you need for a memorable stay.'}</p>

          {property.amenities?.length > 0 && <><h2 className="mb-5 font-display text-3xl font-bold text-[#0A1A30]">Amenities</h2><div className="mb-12 grid gap-3 sm:grid-cols-2">{property.amenities.slice(0, 20).map((amenity) => <div key={amenity} className="flex items-center gap-3 text-[#334155]"><CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#B28B17]" />{amenity}</div>)}</div></>}

          {reviews.length > 0 && <><h2 className="mb-6 font-display text-3xl font-bold text-[#0A1A30]">Guest reviews</h2><div className="grid gap-5 md:grid-cols-2">{reviews.map((review) => <article key={review.id} className="rounded-2xl bg-white p-6 shadow-sm"><div className="mb-3 flex items-center justify-between"><strong className="text-[#0A1A30]">{review.reviewerName}</strong>{review.rating && <span className="flex items-center gap-1 font-semibold text-[#0A1A30]"><Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />{review.rating.toFixed(1)}</span>}</div><p className="leading-relaxed text-[#475569]">{review.text}</p></article>)}</div></>}
        </div>

        <aside>
          <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-[#D4AF37]/30 bg-white p-6 shadow-xl">
            {confirmation ? (
              <div className="py-4">
                {confirmation.checkoutUrl ? (
                  <>
                    <div className="mb-5 text-center">
                      <ShieldCheck className="mx-auto mb-4 h-14 w-14 text-green-600" />
                      <h2 className="mb-2 text-2xl font-bold text-[#0A1A30]">Your stay is ready to pay</h2>
                      <p className="text-[#475569]">Reservation #{confirmation.id} has been created in Hostaway. Complete payment in the secure Hostaway Guest Portal.</p>
                    </div>
                    <div className="mb-5 rounded-xl bg-[#F8F5EF] p-4">
                      <div className="flex items-center justify-between text-lg font-bold text-[#0A1A30]"><span>Total</span><span>{money(confirmation.total, confirmation.currency)}</span></div>
                      <p className="mt-2 text-xs text-[#64748B]">This total comes from the live Hostaway reservation quote. IPM never sees or stores your card details.</p>
                    </div>
                    <a
                      href={confirmation.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A1A30] px-4 py-3 font-bold text-white transition-colors hover:bg-[#0F2440]"
                    >
                      Continue to secure payment <ExternalLink className="h-4 w-4" />
                    </a>
                    <p className="mt-4 text-center text-xs leading-relaxed text-[#64748B]">If payment is declined or you close the portal, use the button above to try again. Hostaway prevents duplicate payment collection for this reservation.</p>
                    <button type="button" onClick={startOver} className="mt-4 w-full text-sm font-semibold text-[#64748B] underline underline-offset-2 hover:text-[#0A1A30]">Start a different reservation</button>
                  </>
                ) : (
                  <>
                    <div className="mb-5 text-center">
                      <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" />
                      <h2 className="mb-2 text-2xl font-bold text-[#0A1A30]">Reservation request received</h2>
                      <p className="text-[#475569]">Request #{confirmation.id} is safely recorded in Hostaway, but its secure payment portal is still being prepared.</p>
                    </div>
                    <p className="mb-5 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">Please check your email for Hostaway payment instructions. If you do not receive them shortly, contact our reservations team with request #{confirmation.id}.</p>
                    <button type="button" onClick={startOver} className="w-full rounded-lg border border-[#0A1A30] px-4 py-3 font-bold text-[#0A1A30] hover:bg-slate-50">Start a different reservation</button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="mb-6"><h2 className="font-display text-2xl font-bold text-[#0A1A30]">Book your stay</h2><p className="mt-1 text-sm text-[#64748B]">Live availability and pricing from Hostaway</p></div>
                <form onSubmit={checkAvailability} className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#334155]">
                      <CalendarDays className="h-4 w-4 text-[#B28B17]" />
                      <span>Select your dates</span>
                    </div>
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        Check-in
                        <input
                          type="date"
                          required
                          min={today}
                          max={addDays(today, 365)}
                          value={dates.startDate}
                          onChange={(event) => handleManualDateChange('startDate', event.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-[#0A1A30] outline-none placeholder:text-[#94A3B8] focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30"
                        />
                      </label>
                      <label className="text-xs font-semibold uppercase tracking-wide text-[#64748B]">
                        Check-out
                        <input
                          type="date"
                          required
                          min={dates.startDate ? addDays(dates.startDate, 1) : today}
                          max={addDays(today, 365)}
                          value={dates.endDate}
                          onChange={(event) => handleManualDateChange('endDate', event.target.value)}
                          className="mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm font-normal text-[#0A1A30] outline-none placeholder:text-[#94A3B8] focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30"
                        />
                      </label>
                    </div>
                    <p className="mb-2 text-xs text-[#64748B]">Type dates above or select them below. Crossed-out dates cannot be check-in or stay nights.</p>
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      {availabilityLoading ? (
                        <div className="flex min-h-80 items-center justify-center px-5 text-center text-sm text-[#64748B]">
                          <div><div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-[#D4AF37] border-t-transparent" />Loading live availability…</div>
                        </div>
                      ) : availabilityError ? (
                        <div className="flex min-h-80 items-center justify-center px-5 text-center text-sm text-red-700">
                          Availability is temporarily unavailable. Please refresh and try again.
                        </div>
                      ) : (
                        <BookingCalendar
                          mode="range"
                          selected={selectedRange}
                          onSelect={handleDateSelect}
                          disabled={isDateOutsideBookingWindow}
                          modifiers={{ unavailable: isDateUnavailable }}
                          modifiersClassNames={{ unavailable: 'text-slate-300 line-through' }}
                          excludeDisabled
                          startMonth={fromDateKey(today)}
                          endMonth={fromDateKey(addDays(today, 365))}
                          defaultMonth={selectedRange?.from || fromDateKey(today)}
                          showOutsideDays
                          className="w-full text-[#0A1A30]"
                          classNames={{
                            months: 'flex w-full flex-col',
                            month: 'flex w-full flex-col gap-4',
                            caption: 'flex justify-center pt-1 relative items-center w-full',
                            caption_label: 'text-sm font-semibold text-[#0A1A30]',
                            nav: 'flex items-center gap-1',
                            nav_button: 'size-8 border border-slate-200 bg-white p-0 text-[#0A1A30] opacity-80 hover:bg-[#F8F5EF] hover:opacity-100',
                            nav_button_previous: 'absolute left-1',
                            nav_button_next: 'absolute right-1',
                            table: 'w-full border-collapse',
                            head_row: 'flex w-full',
                            head_cell: 'w-9 flex-1 rounded-md text-center text-[0.7rem] font-semibold uppercase text-[#94A3B8]',
                            row: 'mt-2 flex w-full',
                            cell: 'relative flex-1 p-0 text-center text-sm focus-within:relative focus-within:z-20',
                            day: 'mx-auto size-9 rounded-full p-0 font-normal text-[#0A1A30] hover:bg-[#F8F5EF] focus:bg-[#F8F5EF]',
                            day_selected: 'bg-[#0A1A30] text-white hover:bg-[#0A1A30] hover:text-white focus:bg-[#0A1A30] focus:text-white',
                            day_today: 'border border-[#D4AF37] bg-white font-semibold text-[#0A1A30]',
                            day_outside: 'text-slate-300 opacity-60',
                            day_disabled: 'cursor-not-allowed text-slate-300 opacity-100 line-through',
                            day_range_middle: 'rounded-none bg-[#F8F5EF] text-[#0A1A30]',
                            day_range_start: 'rounded-l-full bg-[#0A1A30] text-white',
                            day_range_end: 'rounded-r-full bg-[#0A1A30] text-white',
                          }}
                        />
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#0A1A30]" />Selected</span>
                      <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-slate-300 bg-slate-100" />Unavailable (checkout only)</span>
                      <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border border-[#D4AF37] bg-white" />Today</span>
                    </div>
                    <p className="mt-2 text-xs text-[#64748B]">
                      {dates.startDate && !dates.endDate
                        ? 'Now choose your check-out date.'
                        : dates.startDate && dates.endDate
                          ? `${dates.startDate} → ${dates.endDate}`
                          : 'Crossed-out dates cannot be check-in or stay nights, but may be used for check-out.'}
                    </p>
                  </div>
                  <label className="block text-sm font-semibold text-[#334155]">Guests<select value={dates.guests} onChange={handleGuestsChange} className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-normal">{Array.from({ length: property.guests }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} guest{index ? 's' : ''}</option>)}</select></label>
                  <Button type="submit" disabled={booking || quoteLoading || availabilityLoading || !dates.startDate || !dates.endDate} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] py-3 font-bold text-[#06121F]">{quoteLoading ? 'Updating live price…' : quote ? 'Refresh live price' : 'Select dates to see price'}</Button>
                </form>

                {quoteLoading && <div className="mt-6 rounded-xl border border-[#D4AF37]/30 bg-[#F8F5EF] p-4 text-center text-sm text-[#475569]">Getting the live price for your stay…</div>}
                {quote && <form onSubmit={reserve} className="mt-6 space-y-4 border-t border-slate-200 pt-6"><div className="rounded-xl bg-[#F8F5EF] p-4"><div className="flex items-center justify-between text-lg font-bold text-[#0A1A30]"><span>Total</span><span>{quote.total == null ? 'Confirmed at booking' : money(quote.total, quote.currency)}</span></div>{quote.components?.length > 0 && <div className="mt-3 space-y-1 border-t border-[#0A1A30]/10 pt-3 text-sm text-[#475569]">{quote.components.map((component, index) => <div key={`${component.name}-${index}`} className="flex items-center justify-between gap-3"><span>{component.name}</span><span>{money(component.total, quote.currency)}</span></div>)}</div>}<p className="mt-2 text-xs text-[#64748B]">Taxes and required fees included in the Hostaway quote.</p></div><div className="grid grid-cols-2 gap-3"><input required placeholder="First name" value={guest.firstName} onChange={(e) => setGuest({ ...guest, firstName: e.target.value })} className="rounded-lg border border-slate-300 bg-white p-3 text-[#0A1A30] placeholder:text-[#94A3B8] outline-none focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30" /><input required placeholder="Last name" value={guest.lastName} onChange={(e) => setGuest({ ...guest, lastName: e.target.value })} className="rounded-lg border border-slate-300 bg-white p-3 text-[#0A1A30] placeholder:text-[#94A3B8] outline-none focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30" /></div><input required type="email" placeholder="Email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-[#0A1A30] placeholder:text-[#94A3B8] outline-none focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30" /><input required type="tel" placeholder="Phone" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} className="w-full rounded-lg border border-slate-300 bg-white p-3 text-[#0A1A30] placeholder:text-[#94A3B8] outline-none focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30" /><textarea placeholder="Message or special request (optional)" value={guest.message} onChange={(e) => setGuest({ ...guest, message: e.target.value })} className="min-h-24 w-full rounded-lg border border-slate-300 bg-white p-3 text-[#0A1A30] placeholder:text-[#94A3B8] outline-none focus:border-[#B28B17] focus:ring-2 focus:ring-[#D4AF37]/30" /><input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" /><Button type="submit" disabled={booking || quote.total == null} className="w-full bg-[#0A1A30] py-3 font-bold text-white hover:bg-[#0F2440]">{booking ? 'Submitting…' : 'Reserve & pay securely'}</Button><p className="text-center text-xs text-[#64748B]">Next, Hostaway will open a secure hosted payment portal for this reservation. Card details are never collected on this website.</p></form>}
                {bookingError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{bookingError}</p>}
                <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-200 pt-5 text-sm text-[#64748B]"><Wifi className="h-4 w-4 text-[#D4AF37]" />Secure, live booking connection</div>
              </>
            )}
          </div>
        </aside>
      </section>
    </div>
  )
}

export default PropertyDetail