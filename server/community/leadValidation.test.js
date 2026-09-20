import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePropertyReviewLead } from './leadValidation.js';

test('validates and normalizes a property review lead', () => {
  const lead = validatePropertyReviewLead({
    name: ' Kevin ', email: 'HOST@EXAMPLE.COM', phone: '+1 555 0100',
    propertyLocation: 'Mexico', listingUrl: 'https://airbnb.com/rooms/123', propertyCount: '2',
    bookingPlatforms: ['Airbnb', 'VRBO'], biggestProblem: 'Occupancy',
    wantsPropertyReview: true, consentAt: '2026-09-20T10:00:00Z',
  });
  assert.equal(lead.name, 'Kevin');
  assert.equal(lead.email, 'host@example.com');
  assert.equal(lead.propertyCount, 2);
});

test('rejects honeypots and unsafe listing URLs', () => {
  assert.throws(() => validatePropertyReviewLead({ website: 'bot' }), /Invalid submission/);
  assert.throws(() => validatePropertyReviewLead({
    name: 'K', email: 'k@example.com', propertyLocation: 'US', propertyCount: 1,
    bookingPlatforms: ['Airbnb'], biggestProblem: 'Pricing', consentAt: new Date().toISOString(),
    listingUrl: 'javascript:alert(1)',
  }), /Invalid listing URL/);
});
