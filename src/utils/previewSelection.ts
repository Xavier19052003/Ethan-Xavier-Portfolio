export type PreviewCandidate = { id: string; ratio: number; distance: number; order: number }

export function selectPreview(candidates: PreviewCandidate[], current: string | null) {
  const eligible = candidates.filter(card => card.ratio >= .6).sort((a, b) => a.distance - b.distance || a.order - b.order)
  const best = eligible[0]
  const previous = candidates.find(card => card.id === current)
  if (!best) return previous && previous.ratio >= .55 ? previous.id : null
  return previous && previous.ratio >= .55 && previous.distance <= best.distance + 80 ? previous.id : best.id
}
