import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Mail, MapPin, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import OwnerFaqSection from '../components/OwnerFaqSection'

const copy = {
  en: {
    eyebrow: 'IPM PROPERTY MANAGEMENT',
    title: 'Full Management',
    intro: 'A complete management plan for vacation rental owners who want support beyond listing promotion.',
    rate: '20%',
    fee: 'commission + monthly fee',
    features: [
      'Everything in Listing Promotion',
      'Guest communication & check-in coordination',
      'Cleaning & maintenance coordination',
      'Revenue optimization strategy',
      'Owner support & monthly reporting',
      'Multi-platform management & updates',
    ],
    explanation: 'Full Management includes the Listing Promotion services, with guest communication, operational coordination, revenue strategy, owner support and reporting.',
    formTitle: 'Tell us about your property',
    formIntro: 'Share a few details and our team will be in touch.',
    name: 'Your name',
    email: 'Email address',
    property: 'Property name',
    location: 'Property location',
    details: 'Property details and what you are looking for',
    submit: 'Request Full Management',
    sending: 'Sending…',
    success: 'Thank you. Your inquiry has been sent to IPM.',
    error: 'We could not send your inquiry. Please try again.',
    language: 'Español',
    otherPlan: 'Looking for listing promotion?',
    otherLink: 'Explore the 10% Listing Promotion plan',
    contact: 'Contact IPM about Full Management',
  },
  es: {
    eyebrow: 'GESTIÓN DE PROPIEDADES IPM',
    title: 'Gestión Completa',
    intro: 'Un plan integral para propietarios de alquileres vacacionales que buscan apoyo más allá de la promoción de anuncios.',
    rate: '20%',
    fee: 'comisión + cuota mensual',
    features: [
      'Todo lo incluido en Promoción de Anuncios',
      'Comunicación con huéspedes y coordinación de check-in',
      'Coordinación de limpieza y mantenimiento',
      'Estrategia de optimización de ingresos',
      'Soporte al propietario e informes mensuales',
      'Gestión y actualizaciones multi-plataforma',
    ],
    explanation: 'La Gestión Completa incluye los servicios de Promoción de Anuncios, además de comunicación con huéspedes, coordinación operativa, estrategia de ingresos, soporte e informes para propietarios.',
    formTitle: 'Cuéntenos sobre su propiedad',
    formIntro: 'Comparta algunos detalles y nuestro equipo se pondrá en contacto.',
    name: 'Su nombre',
    email: 'Correo electrónico',
    property: 'Nombre de la propiedad',
    location: 'Ubicación de la propiedad',
    details: 'Detalles de la propiedad y qué servicios busca',
    submit: 'Solicitar Gestión Completa',
    sending: 'Enviando…',
    success: 'Gracias. Su consulta se envió a IPM.',
    error: 'No pudimos enviar su consulta. Inténtelo de nuevo.',
    language: 'English',
    otherPlan: '¿Busca promoción de anuncios?',
    otherLink: 'Conozca el plan de Promoción de Anuncios del 10%',
    contact: 'Contactar a IPM sobre Gestión Completa',
  },
}

export default function FullManagement() {
  const { language, toggleLanguage } = useLanguage()
  const spanish = language === 'es'
  const t = copy[spanish ? 'es' : 'en']
  const [status, setStatus] = useState('idle')

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: 'Full Management inquiry',
          message: `Property name: ${data.get('propertyName')}\nProperty location: ${data.get('propertyLocation')}\nProperty details: ${data.get('propertyDetails')}`,
          propertyType: 'Full Management',
          source: 'Full Management Page — Full Management (20%)',
        }),
      })
      if (!response.ok) throw new Error('Submission failed')
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div lang={spanish ? 'es' : 'en'} className="min-h-screen bg-[#06121F] text-white">
      <section className="relative overflow-hidden border-b border-[#D4AF37]/25 bg-gradient-to-br from-[#06121F] via-[#0A1A30] to-[#0F2440]">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-[#D4AF37]/10" />
        <div aria-hidden="true" className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-[#D4AF37]/15" />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20">
          <div className="flex justify-end gap-2 mb-10">
            <button type="button" onClick={() => toggleLanguage('en')} aria-pressed={!spanish} className={`px-3 py-1.5 rounded border text-xs font-semibold tracking-wide ${!spanish ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F2D98D]' : 'border-white/15 text-[#C9D2DE] hover:border-[#D4AF37]/60'}`}>English</button>
            <button type="button" onClick={() => toggleLanguage('es')} aria-pressed={spanish} className={`px-3 py-1.5 rounded border text-xs font-semibold tracking-wide ${spanish ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F2D98D]' : 'border-white/15 text-[#C9D2DE] hover:border-[#D4AF37]/60'}`}>Español</button>
          </div>
          <div className="max-w-3xl">
            <p className="text-[#F2D98D] text-xs font-bold tracking-[0.22em] uppercase mb-5">{t.eyebrow}</p>
            <h1 className="font-hero text-5xl sm:text-6xl md:text-7xl leading-tight mb-5">{t.title}</h1>
            <p className="text-lg sm:text-xl text-[#C9D2DE] leading-relaxed max-w-2xl">{t.intro}</p>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-6xl sm:text-7xl font-bold text-[#F2D98D]">{t.rate}</span>
              <span className="text-[#C9D2DE]">{t.fee}</span>
            </div>
            <a href="#inquiry" className="inline-flex items-center gap-2 mt-8 rounded-md bg-[#D4AF37] px-6 py-3 font-semibold text-[#06121F] hover:bg-[#F2D98D] transition-colors">
              {t.contact}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 md:py-20 grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20">
        <div>
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.2em] uppercase mb-4">{spanish ? 'EL PLAN' : 'THE PLAN'}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-5">{spanish ? 'Gestión para cada parte de la estancia' : 'Management across the guest stay'}</h2>
          <p className="text-[#C9D2DE] leading-relaxed mb-8">{t.explanation}</p>
          <ul className="space-y-4">
            {t.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-[#E1E6EC]"><span className="mt-0.5 rounded-full bg-[#D4AF37]/15 p-1 text-[#E6C978]"><Check className="h-4 w-4" aria-hidden="true" /></span><span>{feature}</span></li>)}
          </ul>
          <div className="mt-10 border-l-2 border-[#D4AF37] pl-5">
            <p className="text-[#C9D2DE] text-sm mb-2">{t.otherPlan}</p>
            <Link to={spanish ? '/es/listing-promotion' : '/listing-promotion'} className="text-[#F2D98D] font-semibold hover:text-white inline-flex items-center gap-2">{t.otherLink}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>

        <div id="inquiry" className="rounded-xl border border-[#D4AF37]/25 bg-[#0A1A30] p-6 sm:p-8 scroll-mt-24">
          <div className="mb-7">
            <h2 className="text-2xl font-bold mb-2">{t.formTitle}</h2>
            <p className="text-sm text-[#AEBBCB]">{t.formIntro}</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="flex items-center gap-2 text-sm text-[#D9E0E8] mb-1.5"><UserRound className="h-4 w-4 text-[#D4AF37]" />{t.name}</span>
              <input name="name" type="text" autoComplete="name" required disabled={status === 'sending'} className="w-full rounded-md border border-[#34506A] bg-[#06121F] px-3 py-3 text-white placeholder:text-[#8493A5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-60" />
            </label>
            <label className="block">
              <span className="flex items-center gap-2 text-sm text-[#D9E0E8] mb-1.5"><Mail className="h-4 w-4 text-[#D4AF37]" />{t.email}</span>
              <input name="email" type="email" autoComplete="email" required disabled={status === 'sending'} className="w-full rounded-md border border-[#34506A] bg-[#06121F] px-3 py-3 text-white placeholder:text-[#8493A5] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-60" />
            </label>
            <label className="block">
              <span className="text-sm text-[#D9E0E8] mb-1.5 block">{t.property}</span>
              <input name="propertyName" type="text" disabled={status === 'sending'} className="w-full rounded-md border border-[#34506A] bg-[#06121F] px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-60" />
            </label>
            <label className="block">
              <span className="flex items-center gap-2 text-sm text-[#D9E0E8] mb-1.5"><MapPin className="h-4 w-4 text-[#D4AF37]" />{t.location}</span>
              <input name="propertyLocation" type="text" autoComplete="address-level2" disabled={status === 'sending'} className="w-full rounded-md border border-[#34506A] bg-[#06121F] px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-60" />
            </label>
            <label className="block">
              <span className="text-sm text-[#D9E0E8] mb-1.5 block">{t.details}</span>
              <textarea name="propertyDetails" rows="4" disabled={status === 'sending'} className="w-full resize-y rounded-md border border-[#34506A] bg-[#06121F] px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 disabled:opacity-60" />
            </label>
            <Button type="submit" disabled={status === 'sending'} className="w-full bg-[#D4AF37] hover:bg-[#F2D98D] text-[#06121F] font-bold py-3 disabled:opacity-60">
              {status === 'sending' ? t.sending : t.submit}<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
            <p role="status" aria-live="polite" className={`min-h-5 text-sm ${status === 'error' ? 'text-rose-300' : 'text-[#E6C978]'}`}>{status === 'sent' ? t.success : status === 'error' ? t.error : ''}</p>
          </form>
        </div>
      </section>
      <section className="border-t border-[#D4AF37]/15 bg-[#0A1A30] py-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row justify-between gap-4">
          <Link to={spanish ? '/es/listing-promotion' : '/listing-promotion'} className="text-[#C9D2DE] hover:text-[#F2D98D]">{t.otherLink}</Link>
          <Link to={spanish ? '/es/contact?plan=full-management' : '/contact?plan=full-management'} className="text-[#F2D98D] font-semibold hover:text-white">{t.contact}</Link>
        </div>
      </section>
      <OwnerFaqSection plan="management" />
    </div>
  )
}