import assert from 'node:assert/strict'
import { test } from 'node:test'
import { OWNER_FAQ_CONTENT, OWNER_TAX_POLICY, getOwnerFaqItems, filterOwnerFaqItems } from '../lib/ownerFaq.js'
import { getUpdatedOwnerFaqItems } from '../lib/ownerFaqUpdates.js'
import { getRouteStructuredData } from '../lib/structuredData.js'
import { createSeoRouteContent } from '../lib/seoContent.js'

test('English and Spanish share the current plans, subscription, and global tax policy', () => {
  for (const locale of ['en', 'es']) {
    const items = getOwnerFaqItems(locale)
    assert.deepEqual(items.map(item => item.id), [
      'listing-options', 'promotion-fees', 'full-management', 'subscription', 'guest-communication', 'tax-responsibility', 'cancel',
    ])
    assert.match(items.find(item => item.id === 'promotion-fees').answer, /10%/)
    assert.match(items.find(item => item.id === 'full-management').answer, /20%/)
    assert.match(items.find(item => item.id === 'subscription').answer, /\$40/)
    const tax = items.find(item => item.id === 'tax-responsibility')
    assert.ok(tax.answer.includes(OWNER_TAX_POLICY[locale]))
    assert.match(tax.answer, /1099/)
    assert.doesNotMatch(`${tax.question} ${tax.answer}`, /Hacienda|\bSAT\b/)
  }
  assert.match(OWNER_TAX_POLICY.en, /In the U.S., IPM provides Form 1099 where required/)
  assert.match(OWNER_TAX_POLICY.en, /coordinate with you to confirm the tax forms/)
  assert.match(OWNER_TAX_POLICY.es, /En Estados Unidos.*1099 cuando sea obligatorio/)
})

test('All 24 new FAQs are translated, categorized and retained alongside six useful older answers', () => {
  for (const locale of ['en', 'es']) {
    const content = OWNER_FAQ_CONTENT[locale]
    const updated = getUpdatedOwnerFaqItems(locale)
    assert.equal(updated.length, 24)
    assert.equal(content.items.length, 30)
    assert.equal(content.categories.length, 6)
    assert.equal(new Set(content.items.map(item => item.id)).size, content.items.length)
    assert.equal(new Set(content.items.map(item => item.question)).size, content.items.length)
    for (const item of updated) assert.ok(content.items.some(candidate => candidate.id === item.id))
    for (const item of content.items) {
      assert.ok(content.categories.some(category => category.id === item.category))
      assert.ok(item.question && item.answer)
      assert.doesNotMatch(item.answer, /Casa Ozvana/)
    }
    const byId = id => content.items.find(item => item.id === id).answer
    assert.match(byId('listing-options'), /\$149 USD/)
    assert.match(byId('listing-options'), /\$0/)
    assert.match(byId('promotion-fees'), /10%/)
    assert.match(byId('subscription'), /\$40 USD/)
    assert.match(byId('internet-speed'), /200 Mbps/)
    assert.doesNotMatch(byId('cancel'), /at no cost|sin costo|no charge/i)
    assert.match(byId('cleaning-fee'), locale === 'es' ? /una vez por reservación, no por día/ : /once per reservation, not daily/)
    assert.match(byId('pricing-approval'), locale === 'es' ? /aprobación/ : /approval/)
    const source = createSeoRouteContent('/faq', { h1: 'FAQ', intro: '' }, { locale })
    for (const category of content.categories) assert.ok(source.includes(category.title.replaceAll('&', '&amp;')))
  }
  assert.deepEqual(OWNER_FAQ_CONTENT.en.items.map(item => item.id), OWNER_FAQ_CONTENT.es.items.map(item => item.id))
  for (let i = 0; i < 24; i++) {
    assert.notEqual(getUpdatedOwnerFaqItems('en')[i].answer, getUpdatedOwnerFaqItems('es')[i].answer)
  }
})

test('Search matches questions and answers, ignores case/accents, and handles empty results', () => {
  const english = OWNER_FAQ_CONTENT.en.items
  const spanish = OWNER_FAQ_CONTENT.es.items
  assert.equal(filterOwnerFaqItems(english, '  ').length, 30)
  assert.ok(filterOwnerFaqItems(english, 'HOSTAWAY').some(item => item.id === 'owner-portal'))
  assert.ok(filterOwnerFaqItems(spanish, 'comision 10%').some(item => item.id === 'promotion-fees'))
  assert.ok(filterOwnerFaqItems(english, '$149').some(item => item.id === 'listing-options'))
  assert.equal(filterOwnerFaqItems(english, 'unmatched-phrase-xyz').length, 0)
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