import test from 'node:test';
import assert from 'node:assert/strict';
import { onboardingEmailCopies, onboardingSource } from './onboardingEmails.js';
import { sendFormEmails } from './emailService.js';

const sample = {
  fullName: 'Sample Owner', email: 'owner@example.com', phone: '1234567890',
  propertyAddress: 'Calle Principal 1', bedrooms: 2, bathrooms: 1,
  airbnbListingUrl: 'https://airbnb.com/rooms/123', airbnbUsername: 'owner@example.com',
  meetingDate: '2027-01-20', meetingTime: '12:30', timeZone: 'Asia/Ho_Chi_Minh',
  meetingTiming: 'before', plan: 'listing-promotion', language: 'es',
};

test('English and submitted-language copies preserve owner-entered values', () => {
  const [english, spanish] = onboardingEmailCopies(sample);
  assert.equal(english.fields['Property address'], sample.propertyAddress);
  assert.equal(spanish.fields['Dirección de la propiedad'], sample.propertyAddress);
  assert.equal(spanish.fields['Momento de la reunión'], 'Antes de la incorporación');
  assert.match(english.fields['Selected service plan'], /IPM-generated reservations/);
  assert.match(spanish.subject, /Español copy/);
  assert.equal(onboardingSource(sample.plan), 'Client Onboarding — Listing Promotion (10%)');
});

test('Vietnamese submissions include Vietnamese and English copies; English needs one', () => {
  const [english, vietnamese] = onboardingEmailCopies({ ...sample, language: 'vi', plan: 'full-management' });
  assert.equal(english.fields['Selected service plan'], 'Full Property Management (20%)');
  assert.equal(vietnamese.fields['Địa chỉ chỗ nghỉ'], sample.propertyAddress);
  assert.equal(vietnamese.fields['Thời điểm trao đổi'], 'Trước khi bắt đầu dịch vụ');
  assert.equal(onboardingEmailCopies({ ...sample, language: 'en' }).length, 1);
});

test('admin notification addresses both inboxes and reports transport failure', async () => {
  let delivered;
  const success = await sendFormEmails({
    fields: { Name: 'Sample Owner' }, customerEmail: sample.email,
    deliver: async (payload) => { delivered = payload; },
  });
  assert.equal(success.ok, true);
  assert.deepEqual(delivered.to, ['Kevin@AivaraSolutions.com', 'info@richaf.global']);
  assert.equal(delivered.reply_to, sample.email);
  const failure = await sendFormEmails({
    fields: { Name: 'Sample Owner' },
    deliver: async () => { throw new Error('Resend unavailable'); },
  });
  assert.equal(failure.ok, false);
});