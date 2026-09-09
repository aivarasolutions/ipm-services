import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Onboarding.css'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  propertyAddress: '',
  bedrooms: '',
  bathrooms: '',
  airbnbListingUrl: '',
  airbnbUsername: '',
  accessMethodAcknowledged: false,
  meetingDate: '',
  meetingTime: '',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  meetingTiming: 'before',
}

const copy = {
  en: {
    title: 'CLIENT ONBOARDING',
    eyebrow: 'International Property Management (IPM)',
    intro: 'Please complete the information below so our team can prepare your property for professional management.',
    contact: 'OWNER INFORMATION',
    fullName: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    property: 'PROPERTY & AIRBNB ACCESS',
    address: 'Property address',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    url: 'Airbnb listing URL',
    username: 'Airbnb username / email',
    secureTitle: 'SECURE AIRBNB ACCOUNT ACCESS',
    secureText: 'For your security, do not send an Airbnb password through this form. IPM will contact you with secure co-host invitation and account access instructions so we can connect and configure your property.',
    acknowledge: 'I understand that IPM will contact me with secure Airbnb co-host invitation or access instructions, and that I should not submit a password here.',
    billing: 'HOW IPM BILLING & PAYOUTS WORK',
    fee: '10% gross booking revenue',
    feeText: 'IPM charges 10% of gross booking revenue.',
    commissions: 'Platform commissions, fees & taxes',
    commissionsText: 'Platform commissions, fees, and taxes are deducted or remitted as needed before the owner payout.',
    payout: 'Final owner payout',
    payoutText: 'After the management fee and authorized deductions are accounted for, the remaining balance is paid to the owner.',
    weekly: 'Weekly payouts',
    weeklyText: 'Owner payouts are normally issued weekly on Monday.',
    portal: 'Owner Portal',
    portalText: 'Access across connected booking platforms so you can view reservations in one place.',
    schedule: 'SCHEDULE ONBOARDING CALL',
    scheduleText: 'Choose a convenient time for an approximately 30-minute onboarding meeting.',
    date: 'Meeting date',
    time: 'Meeting time',
    timezone: 'Time zone',
    timing: 'The meeting will take place',
    before: 'Before onboarding',
    during: 'During onboarding',
    after: 'After onboarding',
    submit: 'SUBMIT ONBOARDING INFORMATION',
    submitting: 'SUBMITTING…',
    required: 'This field is required.',
    invalidEmail: 'Enter a valid email address.',
    invalidUrl: 'Enter a valid listing URL.',
    serverError: 'We could not submit your information. Please try again.',
    successTitle: 'Thank you!',
    successText: 'Your IPM onboarding information has been received. We will contact you shortly to begin onboarding your property and confirm your scheduled meeting.',
    switch: 'Español',
    next: 'NEXT STEP',
    nextText: 'IPM will review your information, coordinate secure Airbnb access, and prepare your property for management.',
  },
  es: {
    title: 'INCORPORACIÓN DE CLIENTE',
    eyebrow: 'International Property Management (IPM)',
    intro: 'Complete la siguiente información para que nuestro equipo prepare su propiedad para una gestión profesional.',
    contact: 'INFORMACIÓN DEL PROPIETARIO',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Número de teléfono',
    property: 'PROPIEDAD Y ACCESO A AIRBNB',
    address: 'Dirección de la propiedad',
    bedrooms: 'Habitaciones',
    bathrooms: 'Baños',
    url: 'Enlace del anuncio de Airbnb',
    username: 'Usuario / correo de Airbnb',
    secureTitle: 'ACCESO SEGURO A LA CUENTA DE AIRBNB',
    secureText: 'Por su seguridad, no envíe una contraseña de Airbnb mediante este formulario. IPM se pondrá en contacto con usted con instrucciones seguras para la invitación de coanfitrión y el acceso a la cuenta, para conectar y configurar su propiedad.',
    acknowledge: 'Entiendo que IPM se pondrá en contacto conmigo con instrucciones seguras para la invitación de coanfitrión o el acceso a Airbnb, y que no debo enviar una contraseña aquí.',
    billing: 'CÓMO FUNCIONAN LOS COBROS Y PAGOS DE IPM',
    fee: '10% de los ingresos brutos de reservas',
    feeText: 'IPM cobra el 10% de los ingresos brutos de cada reserva.',
    commissions: 'Comisiones, cargos e impuestos de las plataformas',
    commissionsText: 'Las comisiones, cargos e impuestos de las plataformas se descuentan o remiten según sea necesario antes del pago al propietario.',
    payout: 'Pago final al propietario',
    payoutText: 'Después de contabilizar la comisión de administración y las deducciones autorizadas, el saldo restante se paga al propietario.',
    weekly: 'Pagos semanales',
    weeklyText: 'Los pagos al propietario normalmente se realizan semanalmente los lunes.',
    portal: 'Portal del propietario',
    portalText: 'Acceso a las plataformas conectadas para consultar las reservas en un solo lugar.',
    schedule: 'PROGRAMAR LLAMADA DE INCORPORACIÓN',
    scheduleText: 'Elija un horario conveniente para una reunión de incorporación de aproximadamente 30 minutos.',
    date: 'Fecha de la reunión',
    time: 'Hora de la reunión',
    timezone: 'Zona horaria',
    timing: 'La reunión tendrá lugar',
    before: 'Antes de la incorporación',
    during: 'Durante la incorporación',
    after: 'Después de la incorporación',
    submit: 'ENVIAR INFORMACIÓN DE INCORPORACIÓN',
    submitting: 'ENVIANDO…',
    required: 'Este campo es obligatorio.',
    invalidEmail: 'Ingrese un correo electrónico válido.',
    invalidUrl: 'Ingrese un enlace de anuncio válido.',
    serverError: 'No pudimos enviar su información. Inténtelo de nuevo.',
    successTitle: '¡Gracias!',
    successText: 'Hemos recibido su información de incorporación de IPM. Nos pondremos en contacto con usted pronto para comenzar la incorporación de su propiedad y confirmar la reunión programada.',
    switch: 'English',
    next: 'SIGUIENTE PASO',
    nextText: 'IPM revisará su información, coordinará el acceso seguro a Airbnb y preparará su propiedad para la gestión.',
  },
}

function Field({ id, label, error, ...props }) {
  return (
    <div className="ipm-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error && <p className="ipm-error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  )
}

export default function Onboarding() {
  const { pathname } = useLocation()
  const language = pathname.startsWith('/es/') ? 'es' : 'en'
  const t = copy[language]
  const alternate = language === 'es' ? '/onboarding' : '/es/onboarding'
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const timeZones = useMemo(() => {
    try { return Intl.supportedValuesOf('timeZone') } catch { return [...new Set(['UTC', form.timeZone])] }
  }, [form.timeZone])

  const update = (event) => {
    const { name, value, type, checked } = event.target
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    const required = ['fullName', 'email', 'phone', 'propertyAddress', 'bedrooms', 'bathrooms', 'airbnbListingUrl', 'airbnbUsername', 'meetingDate', 'meetingTime', 'timeZone']
    required.forEach((key) => { if (!String(form[key]).trim()) next[key] = t.required })
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t.invalidEmail
    if (form.airbnbListingUrl && !/^https?:\/\/.+/i.test(form.airbnbListingUrl)) next.airbnbListingUrl = t.invalidUrl
    if (!form.accessMethodAcknowledged) next.accessMethodAcknowledged = t.required
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event) => {
    event.preventDefault()
    setServerError('')
    if (!validate()) return
    setStatus('loading')
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, bedrooms: Number(form.bedrooms), bathrooms: Number(form.bathrooms), language }),
      })
      if (!response.ok) throw new Error('Unable to submit')
      setStatus('success')
    } catch {
      setStatus('error')
      setServerError(t.serverError)
    }
  }

  if (status === 'success') {
    return <main className="ipm-onboarding"><div className="ipm-paper ipm-success"><Header language={language} t={t} alternate={alternate} /><div className="success-mark" aria-hidden="true">IPM</div><h1>{t.successTitle}</h1><p>{t.successText}</p></div></main>
  }

  return (
    <main className="ipm-onboarding">
      <div className="ipm-paper">
        <Header language={language} t={t} alternate={alternate} />
        <form onSubmit={submit} noValidate>
          <p className="ipm-intro">{t.intro}</p>
          <SectionTitle>{t.contact}</SectionTitle>
          <div className="ipm-grid ipm-grid-three">
            <Field id="fullName" label={t.fullName} value={form.fullName} onChange={update} error={errors.fullName} autoComplete="name" required />
            <Field id="email" label={t.email} type="email" value={form.email} onChange={update} error={errors.email} autoComplete="email" required />
            <Field id="phone" label={t.phone} type="tel" value={form.phone} onChange={update} error={errors.phone} autoComplete="tel" required />
          </div>
          <SectionTitle>{t.property}</SectionTitle>
          <Field id="propertyAddress" label={t.address} value={form.propertyAddress} onChange={update} error={errors.propertyAddress} autoComplete="street-address" required />
          <div className="ipm-grid ipm-grid-two">
            <Field id="bedrooms" label={t.bedrooms} type="number" min="0" value={form.bedrooms} onChange={update} error={errors.bedrooms} required />
            <Field id="bathrooms" label={t.bathrooms} type="number" min="0" step="0.5" value={form.bathrooms} onChange={update} error={errors.bathrooms} required />
          </div>
           <Field id="airbnbListingUrl" label={t.url} type="url" value={form.airbnbListingUrl} onChange={update} error={errors.airbnbListingUrl} placeholder="https://" required />
          <Field id="airbnbUsername" label={t.username} value={form.airbnbUsername} onChange={update} error={errors.airbnbUsername} required />
          <div className="ipm-secure">
            <h2>{t.secureTitle}</h2><p>{t.secureText}</p>
            <label className={`ipm-check ${errors.accessMethodAcknowledged ? 'has-error' : ''}`}><input type="checkbox" name="accessMethodAcknowledged" checked={form.accessMethodAcknowledged} onChange={update} /> <span>{t.acknowledge}</span></label>
            {errors.accessMethodAcknowledged && <p className="ipm-error">{errors.accessMethodAcknowledged}</p>}
          </div>
          <SectionTitle>{t.billing}</SectionTitle>
          <ul className="ipm-billing">
            <li><strong>{t.fee}</strong><span>{t.feeText}</span></li>
            <li><strong>{t.commissions}</strong><span>{t.commissionsText}</span></li>
            <li><strong>{t.payout}</strong><span>{t.payoutText}</span></li>
            <li><strong>{t.weekly}</strong><span>{t.weeklyText}</span></li>
            <li><strong>{t.portal}</strong><span>{t.portalText}</span></li>
          </ul>
          <SectionTitle>{t.schedule}</SectionTitle><p className="ipm-intro ipm-schedule-copy">{t.scheduleText}</p>
          <div className="ipm-grid ipm-grid-three">
             <Field id="meetingDate" label={t.date} type="date" min={new Date().toLocaleDateString('en-CA')} value={form.meetingDate} onChange={update} error={errors.meetingDate} required />
            <Field id="meetingTime" label={t.time} type="time" value={form.meetingTime} onChange={update} error={errors.meetingTime} required />
            <div className="ipm-field"><label htmlFor="timeZone">{t.timezone}</label><select id="timeZone" name="timeZone" value={form.timeZone} onChange={update} aria-invalid={Boolean(errors.timeZone)}>{timeZones.map((zone) => <option key={zone}>{zone}</option>)}</select>{errors.timeZone && <p className="ipm-error">{errors.timeZone}</p>}</div>
          </div>
          <fieldset className="ipm-timing"><legend>{t.timing}</legend>{['before', 'during', 'after'].map((choice) => <label key={choice}><input type="radio" name="meetingTiming" value={choice} checked={form.meetingTiming === choice} onChange={update} /> {t[choice]}</label>)}</fieldset>
          {serverError && <p className="ipm-server-error" role="alert">{serverError}</p>}
          <button className="ipm-submit" type="submit" disabled={status === 'loading'}>{status === 'loading' ? t.submitting : t.submit}</button>
          <div className="ipm-next"><strong>{t.next}</strong><span>{t.nextText}</span></div>
        </form>
      </div>
    </main>
  )
}

function Header({ t, alternate }) {
  return <header className="ipm-header"><img src="/images/ipm-logo-new.png" alt="IPM — International Property Management" /><div><h1>{t.title}</h1><p>{t.eyebrow}</p><div className="ipm-header-rule" /></div><Link className="ipm-language" to={alternate}>{t.switch}</Link></header>
}

function SectionTitle({ children }) { return <h2 className="ipm-section-title">{children}</h2> }