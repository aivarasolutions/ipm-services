import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { setImmediate } from 'node:timers'
import { transformSync } from 'esbuild'
import { getVideoAnchor, getVideoShareUrl } from './videoLinks.js'

function componentSource(name) {
  return transformSync(
    readFileSync(new URL(`../components/${name}.jsx`, import.meta.url), 'utf8')
      .replace(/^import .*$/gm, '').replace('export default function', 'function'),
    { loader: 'jsx', jsxFactory: 'h' },
  ).code
}

const h = (type, props, ...children) => ({ type, props: props || {}, children })
const settle = () => new Promise(resolve => setImmediate(resolve))
function findButton(tree) {
  if (tree?.type === 'button') return tree
  for (const child of tree?.children || []) {
    const result = findButton(child)
    if (result) return result
  }
}

test('Share uses the native menu, copies on unsupported devices, and handles cancellation/failure', async () => {
  for (const mode of ['native', 'clipboard', 'cancel', 'denied']) {
    const states = []
    const calls = []
    const navigator = {
      clipboard: { writeText: async url => { calls.push(['copy', url]); if (mode === 'denied') throw Error('Denied') } },
    }
    if (mode === 'native' || mode === 'cancel') navigator.share = async data => {
      calls.push(['share', data.url])
      if (mode === 'cancel') throw Object.assign(Error('Cancelled'), { name: 'AbortError' })
    }
    const context = {
      h, Check: 'check', Share2: 'share', navigator,
      useId: () => 'share-link',
      useState: initial => [initial, value => states.push(value)],
    }
    vm.runInNewContext(`${componentSource('VideoShareButton')}\nvar tree = VideoShareButton({url:'https://ipm.services/#video-test',title:'Test',language:'en'});`, context)
    await findButton(context.tree).props.onClick()
    assert.equal(calls[0][0], ['native', 'cancel'].includes(mode) ? 'share' : 'copy')
    if (mode === 'cancel') assert.equal(calls.length, 1)
    if (mode === 'clipboard') assert.ok(states.includes('Link copied.'))
    if (mode === 'denied') {
      assert.ok(states.includes(true))
      assert.ok(states.some(value => typeof value === 'string' && value.includes('manually')))
    }
  }
})

test('Only an exact video link loads media; blocked sound retries muted and preserves a Play fallback', async () => {
  for (const mode of ['normal', 'exact', 'unrelated', 'muted', 'blocked']) {
    const effects = []
    const states = []
    let plays = 0, loads = 0, refCount = 0
    const player = {
      muted: false, hasAttribute: () => Boolean(player.src), load: () => { loads++ },
      focus() {}, pause() {},
      play: async () => {
        plays++
        if (mode === 'blocked' || (mode === 'muted' && !player.muted)) {
          throw Object.assign(Error('Needs gesture'), { name: 'NotAllowedError' })
        }
      },
    }
    const context = {
      h, Play: 'play', VideoShareButton: 'share', getVideoAnchor, getVideoShareUrl,
      useCallback: fn => fn,
      useLocation: () => ({ hash: mode === 'normal' ? '' : mode === 'unrelated' ? '#video-other' : '#video-test', key: 'click' }),
      useRef: () => ({ current: refCount++ === 0 ? {} : player }),
      useState: initial => [initial, value => states.push(value)],
      useEffect: fn => effects.push(fn),
      requestAnimationFrame: fn => { fn(); return 1 }, cancelAnimationFrame() {},
      window: { location: { href: 'https://ipm.services/' } },
    }
    vm.runInNewContext(`${componentSource('ClickToPlayVideo')}\nClickToPlayVideo({video:{id:'test',src:'/test.mp4',title:'Test'},language:'en'});`, context)
    // Only the deep-link effect; other effects handle posters and unmount cleanup.
    effects.at(-1)()
    await settle()
    if (mode === 'normal' || mode === 'unrelated') {
      assert.equal(plays, 0)
      assert.equal(loads, 0)
      assert.equal(player.src, undefined)
    } else {
      assert.equal(player.src, '/test.mp4')
      assert.equal(loads, 1)
      assert.equal(plays, mode === 'exact' ? 1 : 2)
      if (mode === 'muted') assert.equal(player.muted, true)
      if (mode === 'blocked') assert.equal(states.at(-1), true)
    }
  }
})
