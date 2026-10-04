import assert from 'node:assert/strict'
import { test } from 'node:test'
import { OWNER_FAQ_CONTENT, OWNER_TAX_POLICY, getOwnerFaqItems } from '../lib/ownerFaq.js'
import { getRouteStructuredData } from '../lib/structuredData.js'
import { createSeoRouteContent } from '../lib/seoContent.js'

test('English and Spanish share the current plans, subscription, and global tax policy', () => {
  for (const locale of ['en', 'es']) {
    const items = getOwnerFaqItems(locale)
    assert.deepEqual(items.map(item => item.id), [
      'promotion-fees', 'full-management', 'subscription', 'tax-responsibility', 'cancel',
    ])
    assert.match(items.find(item => item.id === 'promotion-fees').answer, /10%/)
    assert.match(items.find(item => item.id === 'full-management').answer, /20%/)
    assert.match(items.find(item => item.id === 'subscription').answer, /\$40/)
    const tax = items.find(item => item.id === 'tax-responsibility')
    assert.equal(tax.answer, OWNER_TAX_POLICY[locale])
    assert.match(tax.answer, /1099/)
    assert.doesNotMatch(`${tax.question} ${tax.answer}`, /Hacienda|\bSAT\b/)
  }
  assert.match(OWNER_TAX_POLICY.en, /In the U.S., IPM provides Form 1099 where required/)
  assert.match(OWNER_TAX_POLICY.en, /coordinate with you to confirm the tax forms/)
  assert.match(OWNER_TAX_POLICY.es, /En Estados Unidos.*1099 cuando sea obligatorio/)
})

test('FAQ structured data uses exactly the same localized answers as the page', () => {
  for (const locale of ['en', 'es']) {
    const path = locale === 'es' ? '/es/faq' : '/faq'
    const schema = getRouteStructuredData(path)[0]
    assert.equal(schema.inLanguage, locale)
    assert.deepEqual(schema.mainEntity.map(item => item.acceptedAnswer.text),
      OWNER_FAQ_CONTENT[locale].items.map(item => item.answer))
  }
})

test('source-visible public pages and onboarding contain the shared tax policy', () => {
  const metadata = { h1: 'IPM', intro: 'IPM services' }
  for (const locale of ['en', 'es']) {
    for (const path of ['/', '/services', '/listing-promotion', '/full-management', '/faq', '/onboarding']) {
      const html = createSeoRouteContent(path, metadata, { locale })
      assert.match(html, /1099/)
      assert.doesNotMatch(html, /Hacienda|\bSAT\b/)
    }
  }
})

test('the full-management subset does not imply its monthly fee is the listing subscription', () => {
  const items = getOwnerFaqItems('en', 'management')
  assert.ok(items.some(item => item.id === 'tax-responsibility'))
  assert.ok(items.some(item => item.id === 'full-management'))
  assert.ok(items.every(item => item.id !== 'subscription'))
})