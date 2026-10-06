import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { deliverNotification, escapeHtml } from './emailService.js'

const invitationCopy = {
  en: {
    subject: 'Your IPM property is approved — start onboarding',
    greeting: 'Hello', intro: 'We have reviewed your property listing and approved it to begin onboarding.',
    next: 'Complete your information online using the button below, or fill out the attached PDF and reply to this email with it. IPM will review your information and arrange the next steps.',
    button: 'Start my onboarding', security: 'Never send your Airbnb password. We will coordinate secure co-host invitations or access instructions separately.',
    plan: 'Selected plan', listing: 'Property listing',
    expiry: 'The personalized online link is valid for 14 days after approval. You can also use the public onboarding form at',
  },
  es: {
    subject: 'Su propiedad fue aprobada por IPM — comience la incorporación',
    greeting: 'Hola', intro: 'Hemos revisado el anuncio de su propiedad y lo hemos aprobado para comenzar la incorporación.',
    next: 'Complete su información en línea con el botón de abajo, o llene el PDF adjunto y responda a este correo con el documento. IPM revisará su información y coordinará los siguientes pasos.',
    button: 'Comenzar mi incorporación', security: 'Nunca envíe su contraseña de Airbnb. Coordinaremos por separado invitaciones seguras como coanfitrión o instrucciones de acceso.',
    plan: 'Plan seleccionado', listing: 'Anuncio de la propiedad',
    expiry: 'El enlace personalizado es válido durante 14 días después de la aprobación. También puede usar el formulario público en',
  },
  vi: {
    subject: 'IPM đã chấp thuận chỗ nghỉ — bắt đầu đăng ký',
    greeting: 'Xin chào', intro: 'Chúng tôi đã xem xét tin đăng của bạn và chấp thuận bắt đầu đăng ký.',
    next: 'Hoàn thành thông tin trực tuyến bằng nút bên dưới hoặc điền PDF đính kèm và trả lời email này với tài liệu. IPM sẽ xem xét thông tin và sắp xếp các bước tiếp theo.',
    button: 'Bắt đầu đăng ký', security: 'Không gửi mật khẩu Airbnb. Chúng tôi sẽ phối hợp lời mời đồng chủ nhà hoặc hướng dẫn truy cập an toàn riêng.',
    plan: 'Gói dịch vụ', listing: 'Tin đăng chỗ nghỉ',
    expiry: 'Liên kết cá nhân có hiệu lực 14 ngày kể từ khi được chấp thuận. Bạn cũng có thể dùng biểu mẫu công khai tại',
  },
}

export async function buildOnboardingInvitation(lead, invitationToken) {
  const locale = invitationCopy[lead.language] ? lead.language : 'en'
  const t = invitationCopy[locale]
  const publicUrl = `https://www.ipm.services${locale === 'en' ? '' : `/${locale}`}/onboarding`
  const onlineUrl = `${publicUrl}?invite=${encodeURIComponent(invitationToken)}`
  const plan = lead.plan === 'full-management' ? 'Full Management (20%)' : 'Listing Promotion (10%)'
  const document = await fs.readFile(fileURLToPath(new URL(`../public/onboarding/ipm-onboarding-${locale}.pdf`, import.meta.url)))
  const text = `${t.greeting} ${lead.name},\n\n${t.intro}\n\n${t.plan}: ${plan}\n${t.listing}: ${lead.listingUrl}\n\n${t.next}\n\n${t.button}: ${onlineUrl}\n\n${t.expiry} ${publicUrl}\n\n${t.security}\n\nInternational Property Management`
  return {
    from: 'IPM Notifications <notifications@ipm.services>',
    to: [lead.email],
    reply_to: ['Kevin@AivaraSolutions.com', 'info@richaf.global'],
    subject: t.subject,
    text,
    html: `<html lang="${locale}"><body style="margin:0;background:#F8F5EF;font-family:Arial,sans-serif">
      <main style="max-width:620px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden">
      <header style="background:#06121F;padding:28px;color:#D4AF37"><h1 style="font-size:22px">International Property Management</h1></header>
      <section style="padding:28px;color:#334155;line-height:1.7">
      <h2 style="color:#0A1A30">${escapeHtml(t.greeting)} ${escapeHtml(lead.name)},</h2>
      <p>${escapeHtml(t.intro)}</p><p><strong>${escapeHtml(t.plan)}:</strong> ${escapeHtml(plan)}<br>
      <strong>${escapeHtml(t.listing)}:</strong> <a href="${escapeHtml(lead.listingUrl)}">${escapeHtml(lead.listingUrl)}</a></p>
      <p>${escapeHtml(t.next)}</p>
      <p style="margin:28px 0"><a href="${escapeHtml(onlineUrl)}" style="display:inline-block;background:#D4AF37;color:#06121F;text-decoration:none;font-weight:bold;padding:15px 24px;border-radius:6px">${escapeHtml(t.button)}</a></p>
      <p>${escapeHtml(t.expiry)} <a href="${publicUrl}">${publicUrl}</a>.</p>
      <p>${escapeHtml(t.security)}</p></section></main></body></html>`,
    attachments: [{ filename: `IPM-Onboarding-${locale}.pdf`, content: document.toString('base64') }],
  }
}

export async function sendOnboardingInvitation(lead, invitationToken, id, deliver = deliverNotification) {
  const payload = await buildOnboardingInvitation(lead, invitationToken)
  await deliver(payload, { idempotencyKey: `owner-onboarding/${id}` })
}
