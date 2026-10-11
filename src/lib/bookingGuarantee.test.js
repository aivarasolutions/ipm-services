import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { BOOKING_GUARANTEE_APPROVED, BOOKING_GUARANTEE_VISIBLE } from './bookingGuarantee.js'
import { getIndexableRoutePaths, getLocaleRouteInfo, getSeoMetadata, injectSeoMetadataIntoHtml } from './seo.js'
import { createSitemapXml } from './sitemap.js'
import { bookingGuaranteeContent } from '../pages/bookingGuaranteeContent.js'

test('Authorized campaign is visible in production without development-only restrictions', () => {
  assert.equal(BOOKING_GUARANTEE_APPROVED, true)
  assert.equal(BOOKING_GUARANTEE_VISIBLE, true)
  assert.doesNotMatch(readFileSync('src/lib/bookingGuarantee.js', 'utf8'), /import\.meta\.env/)
  const app = readFileSync('src/App.jsx', 'utf8')
  assert.match(app, /BOOKING_GUARANTEE_VISIBLE &&/)
  assert.match(app, /BOOKING_GUARANTEE_VISIBLE \? lazy/)
})

test('Bilingual public routes allow indexing and appear in the sitemap', () => {
  for (const path of ['/booking-guarantee', '/es/booking-guarantee']) {
    const metadata = getSeoMetadata(path)
    assert.equal(metadata.indexable, true)
    assert.ok(metadata.canonical.endsWith(path))
    assert.deepEqual(metadata.alternates.map((item) => item.hreflang), ['en', 'es', 'x-default'])
    assert.ok(getIndexableRoutePaths().includes(path))
    const html = injectSeoMetadataIntoHtml('<html><head></head><body><div id="root"></div></body></html>', path)
    assert.match(html, /index, follow/)
    assert.doesNotMatch(html, /noindex|Approval Draft|Borrador para Aprobación/)
    assert.ok(createSitemapXml([]).includes(`${metadata.canonical}</loc>`))
  }
  assert.equal(getLocaleRouteInfo('/es/booking-guarantee').locale, 'es')
  assert.equal(getLocaleRouteInfo('/es/booking-guarantee').localized, true)
  assert.match(createSitemapXml([]), /booking-guarantee/)
})

test('Selected language-matched campaign images are small optimized web copies', () => {
  for (const locale of ['en', 'es']) {
    for (const graphic of ['main', 'empty-nights', 'listing-promotion']) {
      const path = `public/images/booking-guarantee/${locale}-${graphic}.webp`
      assert.ok(existsSync(path))
      assert.ok(statSync(path).size < 120000)
      assert.equal(readFileSync(path).subarray(8, 12).toString(), 'WEBP')
    }
  }
})

test('Information-only guarantee UI has no new forms or network requests', () => {
  for (const path of ['src/pages/BookingGuarantee.jsx', 'src/pages/BookingGuaranteePromo.jsx']) {
    const source = readFileSync(path, 'utf8')
    assert.match(source, /BOOKING_GUARANTEE_VISIBLE/)
    assert.doesNotMatch(source, /<form|<input|fetch\(|axios|\/api\//)
    assert.match(source, /listing-promotion/)
    assert.doesNotMatch(source, /t\.draft|t\.pending/)
  }
})

test('Both languages cover all steps, official rules and FAQs with exact cash-payment thresholds', () => {
  for (const locale of ['en', 'es']) {
    const content = bookingGuaranteeContent[locale]
    assert.equal(content.steps.length, 4)
    assert.equal(content.rules.length, 11)
    assert.equal(content.faqs.length, 11)
    const rules = content.rules.map((rule) => rule.body).join(' ')
    for (const required of ['10%', '20%', '30', '70%', '21', '14', '$100 USD']) {
      assert.ok(rules.includes(required), `${locale}: ${required}`)
    }
    assert.match(rules, locale === 'en' ? /business days/ : /días hábiles/)
    assert.match(rules, locale === 'en' ? /not a discount or credit/ : /No es un descuento ni un crédito/)
    assert.match(rules, locale === 'en' ? /manually/ : /manualmente/)
    assert.match(rules, locale === 'en' ? /fully refunded/ : /totalmente reembolsada/)
    assert.equal(content.contactPath, locale === 'en' ? '/contact' : '/es/contact')
  }
})
