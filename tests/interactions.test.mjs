import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { screenIndex, swipeDirection } from '../src/utils/gallery.ts'

test('mobile gallery wraps safely and distinguishes horizontal swipes from page scrolling', () => {
  assert.equal(screenIndex(0, -1, 3), 2)
  assert.equal(screenIndex(2, 1, 3), 0)
  assert.equal(screenIndex(0, 1, 0), 0)
  assert.equal(screenIndex(0, 1, 1), 0)
  assert.equal(swipeDirection(-80, 10), 1)
  assert.equal(swipeDirection(80, 10), -1)
  assert.equal(swipeDirection(20, 5), 0)
  assert.equal(swipeDirection(60, 100), 0)
})
test('pre-paint theme respects saved preferences, system preference and unavailable storage', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1]
  function theme(saved, system, blocked = false) {
    const document = { documentElement: { dataset: {} } }
    runInNewContext(script, { document, localStorage: { getItem: () => { if (blocked) throw new Error('Unavailable'); return saved } }, matchMedia: () => ({ matches: system }) })
    return document.documentElement.dataset.theme
  }
  assert.equal(theme('light', true), 'light')
  assert.equal(theme('dark', false), 'dark')
  assert.equal(theme(null, true), 'dark')
  assert.equal(theme(null, false), 'light')
  assert.equal(theme(null, true, true), 'dark')
})
