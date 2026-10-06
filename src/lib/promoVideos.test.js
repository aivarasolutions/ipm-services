import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { getPromoVideos, PROMO_VIDEOS, OWNER_PORTAL_VIDEOS } from './promoVideos.js'
import { createSeoShell, getSeoMetadata } from './seo.js'

test('Each supported language puts its matching portal first without changing the talking clips', () => {
  for (const language of ['en', 'es']) {
    const videos = getPromoVideos(language, true)
    assert.equal(videos.length, 3)
    assert.equal(videos[0], OWNER_PORTAL_VIDEOS[language])
    assert.deepEqual(videos.slice(1), PROMO_VIDEOS[language])
    assert.ok(videos.every((video) => video.id.startsWith(`${language}-`)))
    for (const video of videos) {
      assert.ok(existsSync(`public${video.src}`), video.src)
      assert.ok(existsSync(`public${video.poster}`), video.poster)
    }
  }
})

test('Unrequested portals and unsupported-language videos are not added', () => {
  assert.deepEqual(getPromoVideos('es'), PROMO_VIDEOS.es)
  assert.deepEqual(getPromoVideos('en'), PROMO_VIDEOS.en)
  for (const language of ['fr', 'vi', undefined]) assert.deepEqual(getPromoVideos(language, true), [])
})

test('Spanish homepage, promotion and services placements share the portal-first list', () => {
  const home = readFileSync('src/pages/Home.jsx', 'utf8')
  const promotion = readFileSync('src/pages/ListingPromotion.jsx', 'utf8')
  const services = readFileSync('src/pages/Services.jsx', 'utf8')
  const listing = readFileSync('src/components/ListingPromotionSection.jsx', 'utf8')
  assert.match(home, /<ListingPromotionSection[^>]*showVideos[^>]*includeOwnerPortal/)
  assert.match(promotion, /<ListingPromotionSection[\s\S]*?showVideos[\s\S]*?includeOwnerPortal/)
  assert.match(listing, /videos=\{getPromoVideos\(language, includeOwnerPortal\)\}/)
  assert.match(services, /language === 'es'[\s\S]*?<PromoVideoSection language=\{language\} videos=\{getPromoVideos\(language, true\)\}/)
})

test('Homepage hero adds a locale-matching click-to-play reel while preserving the lower section', () => {
  const home = readFileSync('src/pages/Home.jsx', 'utf8')
  assert.match(home, /language === 'en' \|\| language === 'es'/)
  assert.match(home, /<ClickToPlayVideo video=\{heroOwnerPortalVideo\} language=\{language\}/)
  assert.match(home, /<ListingPromotionSection[^>]*showVideos[^>]*includeOwnerPortal/)
  const player = readFileSync('src/components/ClickToPlayVideo.jsx', 'utf8')
  assert.match(player, /preload="none"/)
  assert.doesNotMatch(player.match(/<video[\s\S]*?\/>/)[0], /\bsrc=|autoPlay/)
})

test('Homepage first-paint shells match the new hero without eager video downloads', () => {
  for (const [locale, path] of [['en', '/'], ['es', '/es']]) {
    const html = createSeoShell(getSeoMetadata(path), path)
    const portal = OWNER_PORTAL_VIDEOS[locale]
    assert.ok(html.includes('seo-hero-inner seo-hero-inner--portal'))
    assert.ok(html.includes(portal.poster))
    assert.ok(html.includes(`href="${portal.src}"`))
    assert.doesNotMatch(html, /<video|as="video"/)
    assert.ok(!html.includes(OWNER_PORTAL_VIDEOS[locale === 'en' ? 'es' : 'en'].poster))
  }
  const french = createSeoShell(getSeoMetadata('/fr'), '/fr')
  assert.doesNotMatch(french, /class="seo-portal"/)
})
