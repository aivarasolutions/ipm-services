import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import vm from 'node:vm'
import { transformSync } from 'esbuild'

const read = file => readFileSync(new URL(file, import.meta.url), 'utf8')
const hub = read('../pages/education/EducationHub.jsx')
const css = read('../pages/education/Education.css')
const fallback = '/images/education/property-management-learning.webp'

test('Featured education image is local, optimized, and present even without a CMS image', () => {
  const asset = new URL('../../public/images/education/property-management-learning.webp', import.meta.url)
  const bytes = readFileSync(asset)
  assert.equal(bytes.subarray(0, 4).toString(), 'RIFF')
  assert.equal(bytes.subarray(8, 12).toString(), 'WEBP')
  assert.ok(statSync(asset).size < 150000)
  const compiled = transformSync(
    hub.replace(/^import .*$/gm, '').replace('export default function', 'function'),
    { loader: 'jsx', jsxFactory: 'h' },
  ).code

  for (const locale of ['en', 'es']) {
    let state
    const context = {
      h: (tag, props) => ({ tag, props }),
      useState: initial => [state === undefined ? initial : state, value => { state = value }],
      useEffect() {},
    }
    vm.runInNewContext(compiled, context)
    context.article = { title: 'Article', imageUrl: '', imageAlt: '' }
    context.locale = locale
    const render = () => vm.runInNewContext('FeaturedImage({article,locale})', context)
    let image = render()
    assert.equal(image.props.src, fallback)
    assert.equal(image.props.width, '1600')
    assert.ok(image.props.alt.includes(locale === 'es' ? 'Personas' : 'People'))

    // Respect supplied editorial imagery and its actual description.
    context.article = { title: 'Article', imageUrl: '/custom.webp', imageAlt: 'Custom image' }
    image = render()
    assert.equal(image.props.src, '/custom.webp')
    assert.equal(image.props.alt, 'Custom image')
    image.props.onError()
    image = render()
    assert.equal(image.props.src, fallback)
    assert.notEqual(image.props.alt, 'Custom image')
    image.props.onError()
    assert.equal(render().props.src, fallback)
  }
})

test('Homepage education has a full-width background and matches the neighboring content gutters', () => {
  const home = read('../pages/education/EducationHomepage.jsx')
  assert.match(home, /section className="education edu-home-section"/)
  assert.match(home, /className="edu-home-inner edu-section"/)
  assert.doesNotMatch(home, /className="education edu-wrap/)
  assert.match(css, /\.education:not\(\.edu-home-section\) \{ min-height: 100dvh; \}/)
  assert.match(css, /\.edu-home-inner \{[^}]*max-width: 1280px/)
  assert.match(css, /min-width:1024px[^}]*padding-inline:32px/)
  assert.match(css, /edu-section-head > \.edu-link \{ flex-shrink:0;white-space:nowrap/)
})

test('Article hero uses a spaced excerpt and responsive metadata with calendar dates', () => {
  const article = read('../pages/education/EducationArticle.jsx')
  assert.match(article, /className="edu-article-excerpt"/)
  assert.match(article, /className="edu-meta-item"/)
  assert.match(article, /dateTime=\{article\.publishedAt\}/)
  assert.match(css, /\.edu-meta \{ align-items:stretch;flex-direction:column; \}/)
  assert.match(css, /text-wrap:balance/)
  const helper = article.slice(article.indexOf('function formatArticleDate'), article.indexOf('export default function'))
  const context = {}
  vm.runInNewContext(helper, context)
  assert.equal(vm.runInNewContext("formatArticleDate('2026-11-10', 'en')", context), 'November 10, 2026')
  assert.match(vm.runInNewContext("formatArticleDate('2026-11-10', 'es')", context), /10.*noviembre.*2026/)
  assert.equal(vm.runInNewContext("formatArticleDate('invalid', 'en')", context), '')
})
