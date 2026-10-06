import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { OWNER_TAX_POLICY } from '../lib/ownerFaq.js'
import './Onboarding.css'

const initialForm = {
  fullName: '',
  plan: '',
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
    intro: 'Tell us about your property and select your service plan. Review the plan details before submitting.',
    planTitle: 'SELECT YOUR SERVICE PLAN',
    plan: 'Service plan',
    choosePlan: 'Choose your plan',
    listingPlan: 'Listing Promotion (10% or agreed nightly rate)',
    fullPlan: 'Full Property Management (20%)',
    pdf: 'Download the blank PDF form',
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
    billing: 'PLAN DETAILS & OWNER PAYOUTS',
    promotionTerms: [
      ['No upfront costs', 'No setup fee and no monthly subscription for the first 2 months.'],
      ['Choose your earnings arrangement', 'Either IPM receives 10% of reservations generated through IPM, or you receive an agreed guaranteed nightly rate. IPM may add a markup to the nightly rate; you still receive the agreed nightly amount.'],
      ['Subscription from month 3', 'The plan includes a $40 monthly subscription starting in month 3. When possible, it is deducted from IPM-generated reservation revenue. If that revenue is insufficient, you are not charged the subscription out of pocket.'],
      ['Review and no-cost exit', 'At the beginning of month 3, review your results. If the service does not bring enough value, you can end it at no cost.'],
      ['Your own reservations', 'IPM takes no commission on reservations you generate independently. Commission applies only to IPM-generated reservations.'],
    ],
    fullTerms: [
      ['Full Property Management', 'The advertised rate is 20% commission. IPM coordinates guest communication, check-in, cleaning, maintenance, inspections, and reporting. Review your individual management agreement for the exact scope and terms.'],
    ],
    commissions: 'Platform commissions, fees & taxes',
    commissionsText: 'Platform commissions, fees, applicable platform-collected taxes, and required withholding are reflected in the owner payout. This does not include preparing or filing an owner’s tax returns.',
    ownerTaxes: 'Independent owner tax responsibilities & documents',
    ownerTaxesText: OWNER_TAX_POLICY.en,
    payout: 'Final owner payout',
    payoutText: 'After the agreed plan charges, platform fees, taxes, and authorized deductions are accounted for, the remaining amount is paid to the owner.',
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
    nextText: 'IPM will review your information, coordinate secure Airbnb access, and prepare the selected service for your property.',
  },
  es: {
    title: 'INCORPORACIÓN DE CLIENTE',
    eyebrow: 'International Property Management (IPM)',
    intro: 'Cuéntenos sobre su propiedad y seleccione un plan. Revise los detalles del plan antes de enviar el formulario.',
    planTitle: 'SELECCIONE SU PLAN DE SERVICIO',
    plan: 'Plan de servicio',
    choosePlan: 'Seleccione su plan',
    listingPlan: 'Promoción de Anuncios (10% o tarifa nocturna acordada)',
    fullPlan: 'Gestión Integral de la Propiedad (20%)',
    pdf: 'Descargar el formulario PDF en blanco',
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
    billing: 'DETALLES DEL PLAN Y PAGOS AL PROPIETARIO',
    promotionTerms: [
      ['Sin costos iniciales', 'No hay costo de configuración ni suscripción mensual durante los primeros 2 meses.'],
      ['Elija cómo recibir ingresos', 'Puede pagar a IPM el 10% de las reservas generadas por IPM o recibir una tarifa nocturna garantizada acordada. IPM puede añadir un margen; usted sigue recibiendo el importe nocturno acordado.'],
      ['Suscripción desde el tercer mes', 'Desde el mes 3, el plan incluye una suscripción de $40 mensuales. Siempre que sea posible, se descuenta de los ingresos por reservas generadas por IPM. Si esos ingresos no son suficientes, no tendrá que pagar la suscripción de su bolsillo.'],
      ['Revisión y cancelación sin costo', 'Al comienzo del tercer mes, revise los resultados. Si el servicio no le aporta suficiente valor, puede cancelarlo sin costo.'],
      ['Sus propias reservas', 'IPM no cobra comisión por reservas que usted consiga por su cuenta. La comisión solo se aplica a reservas generadas por IPM.'],
    ],
    fullTerms: [
      ['Gestión Integral de la Propiedad', 'La tarifa anunciada es una comisión del 20%. IPM coordina la comunicación con huéspedes, llegada, limpieza, mantenimiento, inspecciones e informes. Consulte su contrato individual para conocer el alcance y las condiciones exactas.'],
    ],
    commissions: 'Comisiones, cargos e impuestos de las plataformas',
    commissionsText: 'Las comisiones, cargos, impuestos recaudados por las plataformas y retenciones obligatorias se reflejan en el pago al propietario. Esto no incluye preparar ni presentar sus declaraciones fiscales.',
    ownerTaxes: 'Responsabilidades y documentos fiscales del propietario',
    ownerTaxesText: OWNER_TAX_POLICY.es,
    payout: 'Pago final al propietario',
    payoutText: 'Después de contabilizar los cargos del plan acordado, comisiones de plataformas, impuestos y deducciones autorizadas, se paga el saldo restante al propietario.',
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
    nextText: 'IPM revisará sus datos, coordinará el acceso seguro a Airbnb y preparará el servicio seleccionado para su propiedad.',
  },
  vi: {
    title: 'ĐĂNG KÝ DỊCH VỤ CHO CHỦ NHÀ',
    eyebrow: 'International Property Management (IPM)',
    intro: 'Cho chúng tôi biết về chỗ nghỉ của bạn và chọn gói dịch vụ. Vui lòng xem kỹ điều khoản trước khi gửi.',
    planTitle: 'CHỌN GÓI DỊCH VỤ',
    plan: 'Gói dịch vụ',
    choosePlan: 'Chọn gói của bạn',
    listingPlan: 'Quảng Bá Chỗ Nghỉ (10% hoặc giá theo đêm thỏa thuận)',
    fullPlan: 'Quản Lý Toàn Diện (20%)',
    pdf: 'Tải mẫu PDF chưa điền',
    contact: 'THÔNG TIN CHỦ NHÀ',
    fullName: 'Họ và tên',
    email: 'Địa chỉ email',
    phone: 'Số điện thoại',
    property: 'CHỖ NGHỈ VÀ QUYỀN TRUY CẬP AIRBNB',
    address: 'Địa chỉ chỗ nghỉ',
    bedrooms: 'Số phòng ngủ',
    bathrooms: 'Số phòng tắm',
    url: 'Đường dẫn tin đăng Airbnb',
    username: 'Tên đăng nhập / email Airbnb',
    secureTitle: 'TRUY CẬP AIRBNB AN TOÀN',
    secureText: 'Vì sự an toàn của bạn, không gửi mật khẩu Airbnb qua biểu mẫu này. IPM sẽ liên hệ và hướng dẫn mời đồng chủ nhà hoặc phương thức cấp quyền truy cập an toàn để thiết lập chỗ nghỉ.',
    acknowledge: 'Tôi hiểu IPM sẽ liên hệ để hướng dẫn cấp quyền truy cập Airbnb an toàn và tôi không được gửi mật khẩu tại đây.',
    billing: 'CHI TIẾT GÓI DỊCH VỤ VÀ THANH TOÁN',
    promotionTerms: [
      ['Không có chi phí ban đầu', 'Không có phí thiết lập và không thu phí thuê bao hằng tháng trong 2 tháng đầu.'],
      ['Chọn cách nhận doanh thu', 'Bạn có thể trả IPM 10% giá trị các đặt phòng do IPM mang lại, hoặc nhận mức giá đảm bảo theo đêm đã thỏa thuận. IPM có thể cộng thêm phần chênh lệch; bạn vẫn nhận đúng mức giá theo đêm đã thỏa thuận.'],
      ['Phí thuê bao từ tháng thứ 3', 'Từ tháng thứ 3, gói có phí thuê bao $40 mỗi tháng. Khi có thể, khoản phí được trừ từ doanh thu đặt phòng do IPM mang lại. Nếu doanh thu đó không đủ, bạn không phải tự bỏ tiền túi trả phí thuê bao.'],
      ['Đánh giá và chấm dứt không mất phí', 'Đầu tháng thứ 3, bạn có thể xem lại kết quả. Nếu dịch vụ không mang lại đủ giá trị, bạn có thể chấm dứt mà không mất phí.'],
      ['Đặt phòng do bạn tự tìm được', 'IPM không thu hoa hồng đối với các đặt phòng do bạn tự tìm được. Hoa hồng chỉ áp dụng cho đặt phòng do IPM mang lại.'],
    ],
    fullTerms: [
      ['Quản Lý Toàn Diện', 'Mức phí được công bố là hoa hồng 20%. IPM điều phối liên lạc với khách, nhận phòng, dọn dẹp, bảo trì, kiểm tra và báo cáo. Vui lòng xem hợp đồng riêng để biết phạm vi và điều khoản cụ thể.'],
    ],
    commissions: 'Phí nền tảng và thuế',
    commissionsText: 'Phí nền tảng, thuế do nền tảng thu và các khoản khấu trừ bắt buộc được thể hiện trong khoản thanh toán cho chủ nhà. Điều này không bao gồm việc lập hoặc nộp tờ khai thuế của chủ nhà.',
    ownerTaxes: 'Trách nhiệm và tài liệu thuế riêng của chủ nhà',
    ownerTaxesText: OWNER_TAX_POLICY.vi,
    payout: 'Khoản thanh toán cuối cùng',
    payoutText: 'Sau khi tính phí theo gói đã thỏa thuận, phí nền tảng, thuế và các khoản khấu trừ được chấp thuận, số tiền còn lại được thanh toán cho chủ nhà.',
    weekly: 'Thanh toán hằng tuần',
    weeklyText: 'Thông thường, khoản thanh toán cho chủ nhà được thực hiện vào thứ Hai hằng tuần.',
    portal: 'Cổng thông tin chủ nhà',
    portalText: 'Xem các đặt phòng trên những nền tảng đã kết nối tại một nơi.',
    schedule: 'ĐẶT LỊCH TRAO ĐỔI',
    scheduleText: 'Chọn thời gian thuận tiện cho cuộc trao đổi đăng ký dịch vụ khoảng 30 phút.',
    date: 'Ngày hẹn',
    time: 'Giờ hẹn',
    timezone: 'Múi giờ',
    timing: 'Cuộc hẹn sẽ diễn ra',
    before: 'Trước khi bắt đầu dịch vụ',
    during: 'Trong quá trình bắt đầu dịch vụ',
    after: 'Sau khi bắt đầu dịch vụ',
    submit: 'GỬI THÔNG TIN ĐĂNG KÝ',
    submitting: 'ĐANG GỬI…',
    required: 'Vui lòng điền thông tin này.',
    invalidEmail: 'Vui lòng nhập địa chỉ email hợp lệ.',
    invalidUrl: 'Vui lòng nhập đường dẫn tin đăng hợp lệ.',
    serverError: 'Không thể gửi thông tin. Vui lòng thử lại.',
    successTitle: 'Cảm ơn bạn!',
    successText: 'IPM đã nhận được thông tin đăng ký. Chúng tôi sẽ sớm liên hệ để bắt đầu hỗ trợ chỗ nghỉ và xác nhận lịch hẹn của bạn.',
    next: 'BƯỚC TIẾP THEO',
    nextText: 'IPM sẽ xem lại thông tin, phối hợp cấp quyền truy cập Airbnb an toàn và chuẩn bị gói dịch vụ bạn đã chọn.',
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
  const { pathname, search } = useLocation()
  const language = pathname.startsWith('/vi/') ? 'vi' : pathname.startsWith('/es/') ? 'es' : 'en'
  const t = copy[language]
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')
  const [invitationMessage, setInvitationMessage] = useState('')
  useEffect(() => {
    const token = new URLSearchParams(search).get('invite')
    if (!token) return
    const controller = new AbortController()
    const messages = language === 'es'
      ? ['Sus datos aprobados se han completado. Revise y complete el formulario.', 'No se pudo cargar su invitación. Puede completar el formulario en blanco.']
      : language === 'vi'
        ? ['Thông tin đã được điền sẵn. Hãy kiểm tra và hoàn thành biểu mẫu.', 'Không thể tải lời mời. Bạn có thể điền biểu mẫu trống.']
        : ['Your approved contact details are filled in. Please review and complete the form.', 'Your invitation could not be loaded. You can complete the blank form below.']
    fetch(`/api/onboarding-invitations/${encodeURIComponent(token)}`, {
      signal: controller.signal, referrerPolicy: 'no-referrer',
    }).then(async response => {
      if (!response.ok) throw new Error('Invitation unavailable')
      const details = await response.json()
      if (controller.signal.aborted) return
      setForm(current => {
        const next = { ...current }
        for (const key of ['fullName', 'email', 'phone', 'airbnbListingUrl', 'plan']) {
          if (!current[key] && typeof details[key] === 'string') next[key] = details[key]
        }
        return next
      })
      setInvitationMessage(messages[0])
    }).catch(error => {
      if (error.name !== 'AbortError') setInvitationMessage(messages[1])
    })
    return () => controller.abort()
  }, [search, language])
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
    const required = ['plan', 'fullName', 'email', 'phone', 'propertyAddress', 'bedrooms', 'bathrooms', 'airbnbListingUrl', 'airbnbUsername', 'meetingDate', 'meetingTime', 'timeZone']
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
    return <main className="ipm-onboarding"><div className="ipm-paper ipm-success"><Header language={language} t={t} /><div className="success-mark" aria-hidden="true">IPM</div><h1>{t.successTitle}</h1><p>{t.successText}</p></div></main>
  }

  return (
    <main className="ipm-onboarding">
      <div className="ipm-paper">
        <Header language={language} t={t} />
        <form onSubmit={submit} noValidate>
          <p className="ipm-intro">{t.intro}</p>
          <a className="ipm-pdf-link" href={`/onboarding/ipm-onboarding-${language}.pdf`} download>{t.pdf} (PDF)</a>
          {invitationMessage && <p role="status">{invitationMessage}</p>}
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
          <SectionTitle>{t.planTitle}</SectionTitle>
          <div className="ipm-field">
            <label htmlFor="plan">{t.plan}</label>
            <select id="plan" name="plan" value={form.plan} onChange={update} aria-invalid={Boolean(errors.plan)} aria-describedby={errors.plan ? 'plan-error' : undefined} required>
              <option value="">{t.choosePlan}</option>
              <option value="listing-promotion">{t.listingPlan}</option>
              <option value="full-management">{t.fullPlan}</option>
            </select>
            {errors.plan && <p className="ipm-error" id="plan-error" role="alert">{errors.plan}</p>}
          </div>
          <SectionTitle>{t.billing}</SectionTitle>
          {form.plan && (
            <div className="ipm-plan-summary">
              <h3>{form.plan === 'listing-promotion' ? t.listingPlan : t.fullPlan}</h3>
              <ul className="ipm-billing">
                {(form.plan === 'listing-promotion' ? t.promotionTerms : t.fullTerms).map(([heading, description]) => (
                  <li key={heading}><strong>{heading}</strong><span>{description}</span></li>
                ))}
              </ul>
            </div>
          )}
          <ul className="ipm-billing">
            <li><strong>{t.commissions}</strong><span>{t.commissionsText}</span></li>
            <li><strong>{t.ownerTaxes}</strong><span>{t.ownerTaxesText}</span></li>
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

function Header({ t, language }) {
  return (
    <header className="ipm-header">
      <img src="/images/ipm-logo-new.png" alt="IPM — International Property Management" />
      <div><h1>{t.title}</h1><p>{t.eyebrow}</p><div className="ipm-header-rule" /></div>
      <nav className="ipm-language" aria-label="Form language">
        {[['en', 'English', '/onboarding'], ['es', 'Español', '/es/onboarding'], ['vi', 'Tiếng Việt', '/vi/onboarding']].map(([code, label, path]) => (
          <Link key={code} to={path} aria-current={code === language ? 'page' : undefined}>{label}</Link>
        ))}
      </nav>
    </header>
  )
}

function SectionTitle({ children }) { return <h2 className="ipm-section-title">{children}</h2> }