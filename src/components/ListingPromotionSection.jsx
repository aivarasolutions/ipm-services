import { createElement, useState } from 'react'
// eslint-disable-next-line no-unused-vars -- JSX member expressions are not tracked by the base rule.
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, DollarSign, Percent, ShieldCheck, TrendingUp } from 'lucide-react'
import './ListingPromotionSection.css'
import PromoVideoSection from './PromoVideoSection'
import { getPromoVideos } from '../lib/promoVideos'

const copy = {
  en: {
    eyebrow: 'THE LISTING PROMOTION PLAN',
    title: 'Get More Reservations Without Paying Upfront',
    intro: 'IPM helps promote your property across additional booking channels. You only pay when we help generate revenue for you.',
    cards: [
      { title: 'No Upfront Cost', body: 'There is no setup fee and no subscription during your first 2 months.', highlight: '2 months free', icon: CalendarDays },
      { title: 'Choose How You Want to Earn', body: 'Choose 10% of the reservations IPM generates, or give IPM a guaranteed nightly rate. We may add a markup; you still receive the agreed nightly amount.', highlight: '10% or your nightly rate', icon: Percent },
      { title: 'Only Pay From Revenue We Generate', body: 'Starting in month 3, the plan includes a $40 monthly subscription. Whenever possible, we deduct it from IPM-generated reservations so you do not pay out of pocket.', highlight: '$40/month from month 3', icon: DollarSign },
    ],
    reassuranceTitle: 'What if IPM does not generate enough reservations?',
    reassurance: 'If IPM does not generate enough revenue to cover the monthly subscription, you are not charged the subscription out of pocket.',
    trialTitle: 'Try It for 2 Months',
    trial: 'The first 2 months have no monthly subscription. At the beginning of month 3, review your results. If the service is not bringing enough value, you can ',
    trialEmphasis: 'end it at no cost.',
    independence: 'IPM does not take commission from reservations you generate independently. Our commission applies only to reservations generated through IPM.',
    email: 'Your email',
    firstName: 'First name *',
    lastName: 'Last name *',
    phone: 'Phone number *',
    phoneHint: 'Include country code, e.g. +1 555 123 4567',
    phoneError: 'Enter a valid international phone number with country code.',
    listing: 'Airbnb listing URL',
    cta: 'Start Promoting My Property',
    sending: 'Sending…',
    sent: 'Thank you! We received your listing and will be in touch.',
    error: 'We could not send your listing. Please try again.',
    support: 'Send us your name, phone, email, and Airbnb listing to get started.',
    howTitle: 'How it works',
    steps: ['Send your listing', 'IPM promotes it', 'We bring reservations', 'You get paid'],
  },
  es: {
    eyebrow: 'PLAN DE PROMOCIÓN DE ANUNCIOS',
    title: 'Consiga Más Reservas Sin Pagar por Adelantado',
    intro: 'IPM promociona su propiedad en canales de reserva adicionales. Solo paga cuando le ayudamos a generar ingresos.',
    cards: [
      { title: 'Sin Costos Iniciales', body: 'No hay costo de configuración ni suscripción durante los primeros 2 meses.', highlight: '2 meses gratis', icon: CalendarDays },
      { title: 'Elija Cómo Quiere Ganar', body: 'Elija pagar a IPM el 10% de las reservas que generamos, o acuerde una tarifa nocturna garantizada. IPM puede añadir un margen; usted recibe el importe acordado.', highlight: '10% o su tarifa nocturna', icon: Percent },
      { title: 'Pague Solo con los Ingresos que Generamos', body: 'A partir del tercer mes, el plan incluye una suscripción de $40 al mes. Siempre que sea posible, se descuenta de reservas generadas por IPM para que no pague de su bolsillo.', highlight: '$40/mes desde el tercer mes', icon: DollarSign },
    ],
    reassuranceTitle: '¿Y si IPM no genera suficientes reservas?',
    reassurance: 'Si IPM no genera ingresos suficientes para cubrir la suscripción mensual, usted no paga la suscripción de su bolsillo.',
    trialTitle: 'Pruébelo Durante 2 Meses',
    trial: 'Los primeros 2 meses no tienen suscripción mensual. Al inicio del tercer mes, revise los resultados. Si el servicio no aporta suficiente valor, puede ',
    trialEmphasis: 'cancelarlo sin costo.',
    independence: 'IPM no cobra comisión por reservas que usted genere por su cuenta. Nuestra comisión solo se aplica a las reservas generadas mediante IPM.',
    email: 'Su correo electrónico',
    firstName: 'Nombre *',
    lastName: 'Apellido *',
    phone: 'Teléfono *',
    phoneHint: 'Incluya el código de país, por ejemplo +1 555 123 4567',
    phoneError: 'Ingrese un teléfono internacional válido con código de país.',
    listing: 'Enlace de su anuncio en Airbnb',
    cta: 'Empezar a Promocionar Mi Propiedad',
    sending: 'Enviando…',
    sent: '¡Gracias! Recibimos su anuncio y nos pondremos en contacto.',
    error: 'No pudimos enviar su anuncio. Inténtelo de nuevo.',
    support: 'Envíenos su nombre, teléfono, correo electrónico y enlace de Airbnb para empezar.',
    howTitle: 'Cómo funciona',
    steps: ['Envíe su anuncio', 'IPM lo promociona', 'Conseguimos reservas', 'Usted recibe el pago'],
  },
  fr: {
    eyebrow: 'OFFRE DE PROMOTION D’ANNONCES',
    title: 'Obtenez Plus de Réservations Sans Payer d’Avance',
    intro: 'IPM promeut votre propriété sur des canaux de réservation supplémentaires. Vous ne payez que lorsque nous vous aidons à générer des revenus.',
    cards: [
      { title: 'Aucun Frais Initial', body: 'Aucun frais de mise en place ni abonnement pendant les 2 premiers mois.', highlight: '2 mois offerts', icon: CalendarDays },
      { title: 'Choisissez Votre Mode de Rémunération', body: 'Choisissez de verser à IPM 10 % des réservations que nous générons, ou convenez d’un tarif garanti par nuit. IPM peut ajouter une marge ; vous percevez toujours le montant convenu.', highlight: '10 % ou votre tarif par nuit', icon: Percent },
      { title: 'Payez Sur les Revenus Générés', body: 'À partir du 3e mois, l’offre comprend un abonnement de 40 $ par mois. Dans la mesure du possible, il est déduit des réservations générées par IPM afin d’éviter un paiement de votre poche.', highlight: '40 $/mois dès le 3e mois', icon: DollarSign },
    ],
    reassuranceTitle: 'Si IPM ne génère pas assez de réservations ?',
    reassurance: 'Si IPM ne génère pas assez de revenus pour couvrir l’abonnement mensuel, vous ne payez pas cet abonnement de votre poche.',
    trialTitle: 'Essayez Pendant 2 Mois',
    trial: 'Les 2 premiers mois sont sans abonnement mensuel. Au début du 3e mois, examinez les résultats. Si le service ne vous apporte pas assez de valeur, vous pouvez ',
    trialEmphasis: 'l’arrêter sans frais.',
    independence: 'IPM ne prélève aucune commission sur les réservations que vous obtenez par vous-même. Notre commission ne concerne que les réservations générées par IPM.',
    email: 'Votre adresse e-mail',
    firstName: 'Prénom *',
    lastName: 'Nom *',
    phone: 'Téléphone *',
    phoneHint: 'Indicatif du pays requis, par ex. +1 555 123 4567',
    phoneError: 'Saisissez un numéro international valide avec indicatif du pays.',
    listing: 'Lien de votre annonce Airbnb',
    cta: 'Promouvoir Ma Propriété',
    sending: 'Envoi…',
    sent: 'Merci ! Nous avons reçu votre annonce et nous vous contacterons.',
    error: 'Impossible d’envoyer votre annonce. Veuillez réessayer.',
    support: 'Envoyez-nous votre nom, téléphone, e-mail et lien de votre annonce Airbnb pour commencer.',
    howTitle: 'Comment ça marche',
    steps: ['Envoyez votre annonce', 'IPM la promeut', 'Nous apportons des réservations', 'Vous êtes payé'],
  },
  vi: {
    eyebrow: 'GÓI QUẢNG BÁ CHỖ NGHỈ',
    title: 'Tăng Lượt Đặt Phòng Mà Không Cần Trả Phí Trước',
    intro: 'IPM giúp quảng bá chỗ nghỉ của bạn trên các kênh đặt phòng khác. Bạn chỉ trả phí khi chúng tôi giúp bạn tạo ra doanh thu.',
    cards: [
      { title: 'Không Có Chi Phí Ban Đầu', body: 'Không có phí thiết lập và không thu phí thuê bao trong 2 tháng đầu tiên.', highlight: 'Miễn phí thuê bao 2 tháng đầu', icon: CalendarDays },
      { title: 'Lựa Chọn Cách Nhận Doanh Thu', body: 'Chọn trả IPM 10% giá trị các lượt đặt phòng do IPM mang lại, hoặc thỏa thuận mức giá đảm bảo theo đêm. IPM có thể cộng thêm phần chênh lệch; bạn vẫn nhận đúng mức giá theo đêm đã thỏa thuận.', highlight: '10% hoặc giá theo đêm đã thỏa thuận', icon: Percent },
      { title: 'Chỉ Trả Từ Doanh Thu Chúng Tôi Mang Lại', body: 'Từ tháng thứ 3, gói có phí thuê bao $40 mỗi tháng. Khi có thể, khoản phí này được trừ từ doanh thu đặt phòng do IPM mang lại để bạn không phải tự bỏ tiền túi.', highlight: '$40/tháng từ tháng thứ 3', icon: DollarSign },
    ],
    reassuranceTitle: 'Nếu IPM không mang lại đủ lượt đặt phòng thì sao?',
    reassurance: 'Nếu doanh thu do IPM mang lại không đủ để chi trả phí thuê bao hằng tháng, bạn không phải tự bỏ tiền túi để trả khoản phí này.',
    trialTitle: 'Dùng Thử Trong 2 Tháng',
    trial: 'Hai tháng đầu không thu phí thuê bao hằng tháng. Đầu tháng thứ 3, bạn có thể xem lại kết quả. Nếu dịch vụ không mang lại đủ giá trị cho chỗ nghỉ, bạn có thể ',
    trialEmphasis: 'chấm dứt mà không mất phí.',
    independence: 'IPM không thu hoa hồng đối với các lượt đặt phòng do bạn tự tìm được. Hoa hồng của IPM chỉ áp dụng cho các lượt đặt phòng do IPM mang lại.',
    email: 'Email của bạn',
    firstName: 'Tên *',
    lastName: 'Họ *',
    phone: 'Số điện thoại *',
    phoneHint: 'Bao gồm mã quốc gia, ví dụ +1 555 123 4567',
    phoneError: 'Vui lòng nhập số điện thoại quốc tế hợp lệ có mã quốc gia.',
    listing: 'Đường dẫn tin đăng Airbnb',
    cta: 'Bắt Đầu Quảng Bá Chỗ Nghỉ',
    sending: 'Đang gửi…',
    sent: 'Cảm ơn bạn! Chúng tôi đã nhận được tin đăng và sẽ sớm liên hệ.',
    error: 'Không thể gửi tin đăng. Vui lòng thử lại.',
    support: 'Gửi tên, số điện thoại, email và đường dẫn tin đăng Airbnb của bạn để bắt đầu.',
    howTitle: 'Cách thức hoạt động',
    steps: ['Gửi tin đăng', 'IPM quảng bá', 'Chúng tôi mang lại lượt đặt phòng', 'Bạn nhận tiền'],
  },
}

const icons = [ArrowRight, TrendingUp, CalendarDays, Check]

export default function ListingPromotionSection({
  language = 'en',
  source = 'Homepage — Listing Promotion (10%)',
  headingLevel = 'h2',
  showVideos = false,
  includeOwnerPortal = false,
}) {
  const t = copy[language] || copy.en
  const reducedMotion = useReducedMotion()
  const [status, setStatus] = useState('idle')

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = new FormData(form)
    const phone = String(data.get('phone') || '').replace(/[ \-()]/g, '')
    if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
      setStatus('invalid')
      return
    }
    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          name: `${data.get('firstName')} ${data.get('lastName')}`.trim(),
          phone,
          email: data.get('email'),
          listingUrl: data.get('listingUrl'),
          language,
          plan: 'listing-promotion',
          subject: 'Listing Promotion Plan inquiry',
          message: `Airbnb listing URL: ${data.get('listingUrl')}`,
          propertyType: 'Listing Promotion',
          source,
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
    <section id="listing-promotion" className="listing-promotion" aria-labelledby="listing-promotion-title">
      <div className="listing-promotion__inner">
        <div className="listing-promotion__heading">
          <span className="listing-promotion__eyebrow"><TrendingUp size={15} aria-hidden="true" />{t.eyebrow}</span>
          {createElement(headingLevel, { id: 'listing-promotion-title' }, t.title)}
          <p>{t.intro}</p>
        </div>

        <div className="listing-promotion__cards">
          {t.cards.map(({ title, body, highlight, icon: Icon }, index) => (
            <motion.article
              key={title}
              className="listing-promotion__card"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
            >
              <span className="listing-promotion__icon">{createElement(Icon, { size: 23, 'aria-hidden': true })}</span>
              <span className="listing-promotion__highlight">{highlight}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </motion.article>
          ))}
        </div>

        <div className="listing-promotion__assurance">
          <ShieldCheck size={27} aria-hidden="true" />
          <div><h3>{t.reassuranceTitle}</h3><p>{t.reassurance}</p></div>
        </div>

        <div className="listing-promotion__trial">
          <div className="listing-promotion__trial-icon"><CalendarDays size={28} aria-hidden="true" /></div>
          <div><h3>{t.trialTitle}</h3><p>{t.trial}<strong>{t.trialEmphasis}</strong></p></div>
        </div>
        <p className="listing-promotion__independence"><Check size={19} aria-hidden="true" />{t.independence}</p>

        {showVideos && (
          <PromoVideoSection
            language={language}
            videos={getPromoVideos(language, includeOwnerPortal)}
          />
        )}

        <div className="listing-promotion__action">
          <p>{t.support}</p>
          <form onSubmit={submit}>
            <div className="listing-promotion__field">
              <label htmlFor="promotion-first-name">{t.firstName}</label>
              <input id="promotion-first-name" name="firstName" type="text" required autoComplete="given-name" disabled={status === 'sending'} />
            </div>
            <div className="listing-promotion__field">
              <label htmlFor="promotion-last-name">{t.lastName}</label>
              <input id="promotion-last-name" name="lastName" type="text" required autoComplete="family-name" disabled={status === 'sending'} />
            </div>
            <div className="listing-promotion__field">
              <label htmlFor="promotion-phone">{t.phone}</label>
              <input id="promotion-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 555 123 4567" aria-invalid={status === 'invalid'} aria-describedby={status === 'invalid' ? 'promotion-phone-hint promotion-phone-error' : 'promotion-phone-hint'} onChange={() => status === 'invalid' && setStatus('idle')} disabled={status === 'sending'} />
              <span id="promotion-phone-hint" className="listing-promotion__hint">{t.phoneHint}</span>
              {status === 'invalid' && <span id="promotion-phone-error" role="alert" className="listing-promotion__phone-error">{t.phoneError}</span>}
            </div>
            <div className="listing-promotion__field">
              <label htmlFor="promotion-email">{t.email} *</label>
              <input id="promotion-email" name="email" type="email" required autoComplete="email" placeholder={t.email} disabled={status === 'sending'} />
            </div>
            <div className="listing-promotion__field listing-promotion__field--listing">
              <label htmlFor="promotion-listing">{t.listing} *</label>
              <input id="promotion-listing" name="listingUrl" type="url" required placeholder={t.listing} disabled={status === 'sending'} />
            </div>
            <button className="listing-promotion__submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : t.cta}<ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
          <p className="listing-promotion__status" role="status" aria-live="polite">
            {status === 'sent' ? t.sent : status === 'error' ? t.error : ''}
          </p>
        </div>

        <div className="listing-promotion__how" aria-label={t.howTitle}>
          <h3>{t.howTitle}</h3>
          <ol>
            {t.steps.map((step, index) => {
              const Icon = icons[index]
              return (
                <motion.li
                  key={step}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                >
                  <span className="listing-promotion__step-icon"><Icon size={18} aria-hidden="true" /></span>
                  <span className="listing-promotion__step-number">0{index + 1}</span>
                  <span>{step}</span>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}