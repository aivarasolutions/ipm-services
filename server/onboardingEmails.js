// Labels are localized; owner-entered values are kept verbatim in both copies.
const labels = {
  en: {
    name: 'Client full name', email: 'Email', phone: 'Phone', address: 'Property address',
    bedrooms: 'Bedrooms', bathrooms: 'Bathrooms', listing: 'Airbnb listing URL',
    username: 'Airbnb username / email', access: 'Secure access method',
    accessValue: 'Client acknowledged co-host invitation / secure access instructions',
    meeting: 'Meeting date and time', timezone: 'Client time zone', timing: 'Meeting timing',
    plan: 'Selected service plan', language: 'Form language',
    listingPlan: 'Listing Promotion (10% of IPM-generated reservations or agreed guaranteed nightly rate)',
    fullPlan: 'Full Property Management (20%)',
    before: 'Before onboarding', during: 'During onboarding', after: 'After onboarding',
  },
  es: {
    name: 'Nombre completo', email: 'Correo electrónico', phone: 'Teléfono', address: 'Dirección de la propiedad',
    bedrooms: 'Habitaciones', bathrooms: 'Baños', listing: 'Enlace del anuncio de Airbnb',
    username: 'Usuario / correo de Airbnb', access: 'Acceso seguro',
    accessValue: 'El cliente aceptó la invitación de coanfitrión / instrucciones de acceso seguro',
    meeting: 'Fecha y hora de la reunión', timezone: 'Zona horaria del cliente', timing: 'Momento de la reunión',
    plan: 'Plan de servicio seleccionado', language: 'Idioma del formulario',
    listingPlan: 'Promoción de Anuncios (10% de reservas generadas por IPM o tarifa nocturna garantizada acordada)',
    fullPlan: 'Gestión Integral de la Propiedad (20%)',
    before: 'Antes de la incorporación', during: 'Durante la incorporación', after: 'Después de la incorporación',
  },
  vi: {
    name: 'Họ và tên', email: 'Địa chỉ email', phone: 'Số điện thoại', address: 'Địa chỉ chỗ nghỉ',
    bedrooms: 'Số phòng ngủ', bathrooms: 'Số phòng tắm', listing: 'Đường dẫn tin đăng Airbnb',
    username: 'Tên đăng nhập / email Airbnb', access: 'Quyền truy cập an toàn',
    accessValue: 'Chủ nhà đã đồng ý với hướng dẫn mời đồng chủ nhà / cấp quyền truy cập an toàn',
    meeting: 'Ngày và giờ hẹn', timezone: 'Múi giờ của chủ nhà', timing: 'Thời điểm trao đổi',
    plan: 'Gói dịch vụ đã chọn', language: 'Ngôn ngữ biểu mẫu',
    listingPlan: 'Quảng Bá Chỗ Nghỉ (10% đặt phòng do IPM mang lại hoặc giá đảm bảo theo đêm đã thỏa thuận)',
    fullPlan: 'Quản Lý Toàn Diện (20%)',
    before: 'Trước khi bắt đầu dịch vụ', during: 'Trong quá trình bắt đầu dịch vụ', after: 'Sau khi bắt đầu dịch vụ',
  },
};

const languageNames = { en: 'English', es: 'Español', vi: 'Tiếng Việt' };
const mailchimpPlans = {
  'listing-promotion': 'Listing Promotion (10%)',
  'full-management': 'Full Management (20%)',
};

export function onboardingSource(plan) {
  return `Client Onboarding — ${mailchimpPlans[plan]}`;
}

export function onboardingEmailCopies(data) {
  const language = ['es', 'vi'].includes(data.language) ? data.language : 'en';
  const copies = ['en', ...(language === 'en' ? [] : [language])];
  return copies.map((locale) => {
    const t = labels[locale];
    const fields = {
      [t.name]: data.fullName,
      [t.email]: data.email,
      [t.phone]: data.phone,
      [t.address]: data.propertyAddress,
      [t.bedrooms]: String(data.bedrooms),
      [t.bathrooms]: String(data.bathrooms),
      [t.listing]: data.airbnbListingUrl,
      [t.username]: data.airbnbUsername,
      [t.access]: t.accessValue,
      [t.plan]: data.plan === 'listing-promotion' ? t.listingPlan : t.fullPlan,
      [t.meeting]: `${data.meetingDate} ${data.meetingTime} (${data.timeZone})`,
      [t.timezone]: data.timeZone,
      [t.timing]: t[data.meetingTiming],
      [t.language]: languageNames[language],
    };
    return {
      fields,
      subject: `IPM onboarding — ${languageNames[locale]} copy — ${data.fullName}`,
      source: `${onboardingSource(data.plan)} — ${languageNames[locale]} copy (submitted in ${languageNames[language]})`,
    };
  });
}