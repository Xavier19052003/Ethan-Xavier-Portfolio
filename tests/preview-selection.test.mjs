import test from 'node:test'
import assert from 'node:assert/strict'
import { selectPreview } from '../src/utils/previewSelection.ts'
import { createMobilePreviewController } from '../src/utils/mobilePreviewController.ts'

test('mobile previews require visibility and choose a deterministic central card', () => {
  assert.equal(selectPreview([{ id: 'a', ratio: .59, distance: 0, order: 0 }], null), null)
  const candidates = [{ id: 'b', ratio: .8, distance: 100, order: 1 }, { id: 'a', ratio: .7, distance: 100, order: 0 }]
  assert.equal(selectPreview(candidates, null), 'a')
  assert.equal(selectPreview([...candidates, { id: 'c', ratio: .9, distance: 0, order: 2 }], null), 'c')
})

test('hysteresis avoids tiny-scroll switching but releases an obscured card', () => {
  assert.equal(selectPreview([{ id: 'a', ratio: .58, distance: 100, order: 0 }, { id: 'b', ratio: .7, distance: 50, order: 1 }], 'a'), 'a')
  assert.equal(selectPreview([{ id: 'a', ratio: .54, distance: 100, order: 0 }, { id: 'b', ratio: .7, distance: 50, order: 1 }], 'a'), 'b')
  assert.equal(selectPreview([], 'a'), null)
  assert.equal(selectPreview([{ id: 'a', ratio: .58, distance: 100, order: 0 }], 'a'), 'a')
})

function previewEnvironment() {
  class Frame extends EventTarget {
    active = false
    constructor(top) { super(); this.top = top; this.addEventListener('portfolio:preview', event => { this.active = event.detail }) }
    getBoundingClientRect() { return { top: this.top, height: 300 } }
  }
  const frames = [new Frame(250), new Frame(600)]
  const mobile = Object.assign(new EventTarget(), { matches: true })
  const reduced = Object.assign(new EventTarget(), { matches: false })
  const document = Object.assign(new EventTarget(), { hidden: false, modal: false, querySelector() { return this.modal ? {} : null } })
  const timers = new Map(), animationFrames = new Map()
  let serial = 0, observer
  const environment = Object.assign(new EventTarget(), {
    document, innerHeight: 844, CustomEvent,
    matchMedia: query => query.includes('reduced-motion') ? reduced : mobile,
    setTimeout: callback => { timers.set(++serial, callback); return serial },
    clearTimeout: id => timers.delete(id),
    requestAnimationFrame: callback => { animationFrames.set(++serial, callback); return serial },
    cancelAnimationFrame: id => animationFrames.delete(id),
    IntersectionObserver: class {
      constructor(callback) { observer = { callback, disconnected: false } }
      observe() {}
      disconnect() { observer.disconnected = true }
    },
  })
  const flush = () => { const callbacks = [...timers.values()]; timers.clear(); callbacks.forEach(callback => callback()); const animations = [...animationFrames.values()]; animationFrames.clear(); animations.forEach(callback => callback()) }
  const observe = (a, b) => { observer.callback(frames.map((target, i) => ({ target, intersectionRatio: i ? b : a }))); flush() }
  return { frames, environment, document, mobile, reduced, flush, observe, get observer() { return observer }, timers, animationFrames }
}

test('touch policy starts one preview without hover and stops on modal, hidden tab, reduced motion and cleanup', () => {
  const test = previewEnvironment()
  const stop = createMobilePreviewController(test.frames, false, test.environment)
  test.observe(.8, .7)
  assert.deepEqual(test.frames.map(frame => frame.active), [true, false])
  test.document.modal = true
  test.environment.dispatchEvent(new Event('portfolio:dialog-presence'))
  assert.ok(test.frames.every(frame => !frame.active))
  test.document.modal = false
  test.environment.dispatchEvent(new Event('portfolio:dialog-presence')); test.flush()
  assert.equal(test.frames[0].active, true)
  test.document.hidden = true
  test.document.dispatchEvent(new Event('visibilitychange'))
  assert.ok(test.frames.every(frame => !frame.active))
  test.document.hidden = false
  test.document.dispatchEvent(new Event('visibilitychange')); test.flush()
  test.reduced.matches = true
  test.reduced.dispatchEvent(new Event('change'))
  assert.ok(test.frames.every(frame => !frame.active))
  test.reduced.matches = false
  test.reduced.dispatchEvent(new Event('change')); test.flush()
  test.observe(.2, .9)
  assert.deepEqual(test.frames.map(frame => frame.active), [false, true])
  test.environment.dispatchEvent(new Event('pagehide'))
  assert.ok(test.frames.every(frame => !frame.active))
  stop()
  assert.equal(test.observer.disconnected, true)
  assert.equal(test.timers.size + test.animationFrames.size, 0)
})

test('desktop pointer and paused routes never activate touch autoplay', () => {
  const desktop = previewEnvironment(); desktop.mobile.matches = false
  const stopDesktop = createMobilePreviewController(desktop.frames, false, desktop.environment)
  desktop.observe(.9, .9)
  assert.ok(desktop.frames.every(frame => !frame.active)); stopDesktop()
  const paused = previewEnvironment()
  const stopPaused = createMobilePreviewController(paused.frames, true, paused.environment)
  paused.observe(.9, .9)
  assert.ok(paused.frames.every(frame => !frame.active)); stopPaused()
})
