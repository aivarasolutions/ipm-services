import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import { BOOKING_BACKUP_PROPERTIES } from '../data/bookingBackup.js'
import { fetchProperties, fetchQuote, submitReservation } from './hostawayApi.js'

const originalFetch = globalThis.fetch
afterEach(() => { globalThis.fetch = originalFetch })

const expectBackup = async () => {
  const properties = await fetchProperties()
  assert.equal(properties.length, BOOKING_BACKUP_PROPERTIES.length)
  assert.ok(properties.length > 0)
  for (const property of properties) {
    assert.equal(property.bookingFallback, true)
    assert.equal(property.bookingEngineUrl, `https://stay.richaf.global/listings/${property.id}`)
    assert.ok(property.name && property.location && property.thumbnailUrl)
    for (const field of ['nightlyPrice', 'currency', 'rating', 'availability', 'calendar']) {
      assert.equal(Object.hasOwn(property, field), false)
    }
  }
  return properties
}

test('healthy live inventory remains unchanged and has a browsing timeout', async () => {
  const live = [{ id: '576211', name: 'Live property', bookingEngineUrl: 'https://stay.richaf.global/listings/576211', nightlyPrice: 123 }]
  globalThis.fetch = async (url, options) => {
    assert.equal(url, '/api/properties')
    assert.ok(options.signal instanceof AbortSignal)
    return Response.json({ properties: live })
  }
  assert.deepEqual(await fetchProperties(), live)
})

test('authentication and server failures use the verified hosted-booking catalog', async () => {
  for (const status of [401, 403, 429, 500, 502, 503]) {
    globalThis.fetch = async () => Response.json({ error: 'Upstream failure' }, { status })
    await expectBackup()
  }
})

test('network failures and timeouts use the same booking backup', async () => {
  for (const name of ['TypeError', 'TimeoutError', 'AbortError']) {
    globalThis.fetch = async () => { const error = new Error('Request failed'); error.name = name; throw error }
    await expectBackup()
  }
})

test('empty, malformed, and non-JSON inventory cannot leave browsing broken', async () => {
  for (const body of [{ properties: [] }, {}, { properties: null }, { properties: [null] }, { properties: [{}] }]) {
    globalThis.fetch = async () => Response.json(body)
    await expectBackup()
  }
  globalThis.fetch = async () => new Response('<html>Unavailable</html>')
  await expectBackup()
})

test('backup responses are separate copies and the next healthy request returns live data', async () => {
  globalThis.fetch = async () => Response.json({}, { status: 502 })
  const properties = await expectBackup()
  properties[0].name = 'Changed locally'
  assert.notEqual((await expectBackup())[0].name, 'Changed locally')
  const live = [{ id: '576211', name: 'Recovered live property', bookingEngineUrl: 'https://stay.richaf.global/listings/576211' }]
  globalThis.fetch = async () => Response.json({ properties: live })
  assert.deepEqual(await fetchProperties(), live)
})

test('failed quotes and reservations never fall back or report fake success', async () => {
  globalThis.fetch = async () => Response.json({ error: 'Booking unavailable' }, { status: 502 })
  await assert.rejects(fetchQuote('576211', {}), /Booking unavailable/)
  await assert.rejects(submitReservation('576211', {}, 'test-only-key'), /Booking unavailable/)
})