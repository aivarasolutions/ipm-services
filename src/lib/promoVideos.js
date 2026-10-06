// Each public asset is content-hashed and reused on the home/promotion pages.
// The source uploads remain unchanged in attached_assets.
export const OWNER_PORTAL_VIDEO = {
  id: 'en-owner-portal',
  title: 'IPM Owner Portal — See How It Works',
  src: '/videos/en-owner-portal.8ec98a8e10.mp4',
  poster: '/videos/en-owner-portal.3d7a06c522.webp',
}

export const OWNER_PORTAL_VIDEOS = {
  en: OWNER_PORTAL_VIDEO,
  es: {
    id: 'es-owner-portal',
    title: 'Portal de Propietarios IPM — Conozca Cómo Funciona',
    src: '/videos/es-owner-portal.b532dbdd64.mp4',
    poster: '/videos/es-owner-portal.5899221edc.webp',
  },
}

export const PROMO_VIDEOS = {
  en: [
    {
      id: 'en-start-free',
      title: 'Start Free — No Fees to Join',
      src: '/videos/en-start-free.541961b95c.mp4',
      poster: '/videos/en-start-free.facca7fa8e.webp',
    },
    {
      id: 'en-fill-empty-nights',
      title: 'Fill Empty Nights — 10% Only',
      src: '/videos/en-fill-empty-nights.1bd5aca4a1.mp4',
      poster: '/videos/en-fill-empty-nights.f9b947fbaa.webp',
    },
  ],
  es: [
    {
      id: 'es-karen-start-free',
      title: 'Empieza Sin Costo Inicial',
      src: '/videos/es-karen-promotion.dde77c8526.mp4',
      poster: '/videos/es-karen-promotion.ec576a6a2c.webp',
    },
    {
      id: 'es-karen-fill-empty-nights',
      title: 'Llena Tus Noches Disponibles',
      src: '/videos/es-karen-intro.8157ad6925.mp4',
      poster: '/videos/es-karen-intro.2d904d3b24.webp',
    },
  ],
}

export function getPromoVideos(language, includeOwnerPortal = false) {
  const videos = PROMO_VIDEOS[language] || []
  const portal = OWNER_PORTAL_VIDEOS[language]
  return includeOwnerPortal && portal ? [portal, ...videos] : videos
}