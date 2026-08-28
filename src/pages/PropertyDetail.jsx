import { createElement, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft, Bath, BedDouble, CalendarDays, CheckCircle2, ChevronLeft,
  ChevronRight, MapPin, Star, Users, Wifi,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fetchProperty, fetchQuote, fetchReviews, submitReservation } from '../services/hostawayApi'

const today = new Date().toISOString().slice(0, 10)
const addDays = (date, days) => {
  const next = new Date(`${date}T12:00:00`)
  next.setDate(next.getDate() + days)
  return next.toISOString().slice(0, 10)
}

const money = (value, currency = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)

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
  const [quote, setQuote] = useState(null)
  const [booking, setBooking] = useState(false)
  const [bookingError, setBookingError] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [guest, setGuest] = useState({ firstName: '', lastName: '', email: '', phone: '', message: '' })
  const reservationKey = useRef('')

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([fetchProperty(slug), fetchReviews(slug).catch(() => [])])
      .then(([item, propertyReviews]) => {
        if (!active) return
        setProperty(item)
        setReviews(propertyReviews)
        setDates((current) => ({ ...current, guests: Math.min(Math.max(current.guests, 1), item.guests) }))
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [slug])

  const averageRating = useMemo(() => {
    if (property?.rating) return property.rating
    const rated = reviews.filter((review) => review.rating)
    return rated.length ? rated.reduce((sum, review) => sum + review.rating, 0) / rated.length : null
  }, [property, reviews])

  const checkAvailability = async (event) => {
    event.preventDefault()
    setBookingError('')
    setQuote(null)
    if (!dates.startDate || !dates.endDate) {
      setBookingError('Please choose check-in and check-out dates.')
      return
    }
    setBooking(true)
    try {
      setQuote(await fetchQuote(slug, { ...dates, guests: Number(dates.guests) }))
    } catch (err) {
      setBookingError(err.message)
    } finally {
      setBooking(false)
    }
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
          <div className="sticky top-24 rounded-2xl border border-[#D4AF37]/30 bg-white p-6 shadow-xl">
            {confirmation ? (
              <div className="py-8 text-center"><CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-green-600" /><h2 className="mb-2 text-2xl font-bold text-[#0A1A30]">Reservation request received</h2><p className="mb-4 text-[#475569]">Request #{confirmation.id}. Our booking team will email your secure payment instructions and final confirmation.</p><p className="font-semibold text-[#0A1A30]">{money(confirmation.total, confirmation.currency)}</p></div>
            ) : (
              <>
                <div className="mb-6"><h2 className="font-display text-2xl font-bold text-[#0A1A30]">Book your stay</h2><p className="mt-1 text-sm text-[#64748B]">Live availability and pricing from Hostaway</p></div>
                <form onSubmit={checkAvailability} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label className="text-sm font-semibold text-[#334155]">Check-in<input required type="date" min={today} value={dates.startDate} onChange={(e) => setDates({ ...dates, startDate: e.target.value, endDate: dates.endDate && dates.endDate <= e.target.value ? '' : dates.endDate })} className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-normal" /></label>
                    <label className="text-sm font-semibold text-[#334155]">Check-out<input required type="date" min={dates.startDate ? addDays(dates.startDate, 1) : addDays(today, 1)} value={dates.endDate} onChange={(e) => setDates({ ...dates, endDate: e.target.value })} className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-normal" /></label>
                  </div>
                  <label className="block text-sm font-semibold text-[#334155]">Guests<select value={dates.guests} onChange={(e) => setDates({ ...dates, guests: Number(e.target.value) })} className="mt-1 w-full rounded-lg border border-slate-300 p-3 font-normal">{Array.from({ length: property.guests }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1} guest{index ? 's' : ''}</option>)}</select></label>
                  <Button disabled={booking} className="w-full bg-gradient-to-r from-[#D4AF37] to-[#F2D98D] py-3 font-bold text-[#06121F]">{booking ? 'Checking…' : 'Check availability & price'}</Button>
                </form>

                {quote && <form onSubmit={reserve} className="mt-6 space-y-4 border-t border-slate-200 pt-6"><div className="rounded-xl bg-[#F8F5EF] p-4"><div className="flex items-center justify-between text-lg font-bold text-[#0A1A30]"><span>Total</span><span>{quote.total == null ? 'Confirmed at booking' : money(quote.total, quote.currency)}</span></div><p className="mt-2 text-xs text-[#64748B]">Taxes and required fees included in the Hostaway quote.</p></div><div className="grid grid-cols-2 gap-3"><input required placeholder="First name" value={guest.firstName} onChange={(e) => setGuest({ ...guest, firstName: e.target.value })} className="rounded-lg border border-slate-300 p-3" /><input required placeholder="Last name" value={guest.lastName} onChange={(e) => setGuest({ ...guest, lastName: e.target.value })} className="rounded-lg border border-slate-300 p-3" /></div><input required type="email" placeholder="Email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} className="w-full rounded-lg border border-slate-300 p-3" /><input required type="tel" placeholder="Phone" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} className="w-full rounded-lg border border-slate-300 p-3" /><textarea placeholder="Message or special request (optional)" value={guest.message} onChange={(e) => setGuest({ ...guest, message: e.target.value })} className="min-h-24 w-full rounded-lg border border-slate-300 p-3" /><input name="website" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" /><Button disabled={booking || quote.total == null} className="w-full bg-[#0A1A30] py-3 font-bold text-white hover:bg-[#0F2440]">{booking ? 'Submitting…' : 'Submit reservation request'}</Button><p className="text-center text-xs text-[#64748B]">Your request is sent securely to Hostaway. IPM will email payment instructions and final confirmation. Card details are never collected on this website.</p></form>}
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