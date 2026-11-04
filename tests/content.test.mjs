import test from 'node:test'
import assert from 'node:assert/strict'
import { getVisibleProjects, projects, projectFilters } from '../src/data/projects.ts'
import { loadVerifiedPdf } from '../src/utils/cv.ts'

test('unverified projects never enter any public filter', () => {
  const hidden = projects.filter(project => !project.verified).map(project => project.id)
  assert.equal(hidden.length, 4)
  for (const filter of projectFilters) {
    assert.ok(getVisibleProjects(filter).every(project => !hidden.includes(project.id)))
  }
  assert.equal(getVisibleProjects().length, 6)
})

test('filters separate commercial websites from academic Android work', () => {
  assert.equal(getVisibleProjects('Commercial').length, 3)
  assert.equal(getVisibleProjects('Web Development').length, 4)
  assert.deepEqual(getVisibleProjects('Application Development').map(project => project.id), ['eduswap', 'campusconnect'])
  assert.equal(getVisibleProjects('Academic').length, 3)
  assert.ok(getVisibleProjects('Academic').every(project => !project.liveUrl))
  assert.equal(projects.find(project => project.id === 'natures-nurture').liveUrl, '')
})

test('featured showcase includes the team project while preserving archived commercial history', () => {
  const featured = getVisibleProjects().filter(project => project.featured)
  assert.equal(featured.length, 4)
  assert.ok(featured.some(project => project.id === 'active-autism' && project.status === 'academic'))
  assert.ok(!getVisibleProjects().some(project => project.id === 'sneaker-pimps'))
  assert.ok(projects.find(project => project.id === 'sneaker-pimps').liveUrl)
})

test('CV validation rejects missing files and HTML fallback, enables a PDF', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response('Not found', { status: 404 }))
  assert.equal(await loadVerifiedPdf('/cv/missing.pdf'), null)
  globalThis.fetch.mock.mockImplementation(async () => new Response('<!doctype html><html>SPA fallback</html>'))
  assert.equal(await loadVerifiedPdf('/cv/missing.pdf'), null)
  globalThis.fetch.mock.mockImplementation(async () => new Response('%PDF-1.7\nTest fixture', { headers: { 'Content-Type': 'application/octet-stream' } }))
  const result = await loadVerifiedPdf('/cv/present.pdf')
  assert.equal(result.type, 'application/pdf')
  assert.equal(await result.text(), '%PDF-1.7\nTest fixture')
})
