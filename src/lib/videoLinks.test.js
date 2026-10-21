import test from 'node:test'
import assert from 'node:assert/strict'
import { getVideoAnchor, getVideoShareUrl } from './videoLinks.js'

test('Video anchors are stable and distinguish repeated homepage players', () => {
  const video = { id: 'en-owner-portal', src: '/videos/portal.mp4' }
  assert.equal(getVideoAnchor(video), 'video-en-owner-portal')
  assert.notEqual(getVideoAnchor(video, 'hero'), getVideoAnchor(video, 'showcase'))
  assert.notEqual(getVideoAnchor(video), getVideoAnchor(video, 'hero'))
  assert.equal(getVideoAnchor(video), getVideoAnchor({ ...video, src: '/videos/replaced.mp4' }))
})

test('Editorial videos without catalogue IDs get deterministic source anchors', () => {
  assert.equal(getVideoAnchor({ src: '/a.mp4' }), getVideoAnchor({ src: '/a.mp4', title: 'Edited' }))
  assert.notEqual(getVideoAnchor({ src: '/a.mp4' }), getVideoAnchor({ src: '/b.mp4' }))
})

test('Share links preserve the current localized page but omit unrelated queries', () => {
  assert.equal(
    getVideoShareUrl('https://ipm.services/es/listing-promotion?tracking=private#other', 'video-es-owner-portal'),
    'https://ipm.services/es/listing-promotion#video-es-owner-portal',
  )
  assert.equal(getVideoShareUrl('https://ipm.services/', 'video-en-owner-portal-hero'), 'https://ipm.services/#video-en-owner-portal-hero')
})
