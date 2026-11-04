import { readFileSync, writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'

const source = new URL('../public/social-card.svg', import.meta.url)
const target = new URL('../public/social-card.png', import.meta.url)
const renderer = new Resvg(readFileSync(source), { fitTo: { mode: 'width', value: 1200 } })
writeFileSync(target, renderer.render().asPng())
console.log('Generated public/social-card.png (1200 × 630)')
