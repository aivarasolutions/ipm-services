import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getContactPlan, getContactSource } from './contactLead.js'

test('both plan-specific contact paths preserve Mailchimp routing keywords', () => {
  assert.equal(getContactSource('listing-promotion', 'management'), 'Contact Form — Listing Promotion (10%)')
  assert.equal(getContactSource('full-management'), 'Contact Form — Full Management (20%)')
  assert.equal(getContactPlan('listing-promotion').es, 'Promoción de anuncios (10%)')
  assert.equal(getContactPlan('full-management').es, 'Gestión integral (20%)')
})

test('general and management inquiries retain the shared contact flow', () => {
  assert.equal(getContactSource(null), 'Contact Form')
  assert.equal(getContactSource(null, 'booking'), 'Contact Form')
  assert.equal(getContactSource(null, 'management'), 'Contact Form — Full Management (20%)')
})

test('untrusted query values cannot inject Mailchimp source tags', () => {
  for (const value of ['__proto__', 'constructor', 'unknown', 'full-management&other=1']) {
    assert.equal(getContactPlan(value), null)
    assert.equal(getContactSource(value), 'Contact Form')
  }
})