export const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))
type Bounds = { left: number; top: number; width: number; height: number }

export function cinematicPose(source: Bounds | null, target: Bounds, mobile: boolean) {
  if (!source || !target.width || !target.height) return { x: 0, y: 12, scale: .96 }
  return {
    x: clamp(source.left + source.width / 2 - target.left - target.width / 2, mobile ? -60 : -180, mobile ? 60 : 180),
    y: clamp(source.top + source.height / 2 - target.top - target.height / 2, mobile ? -80 : -150, mobile ? 80 : 150),
    scale: clamp(Math.min(source.width / target.width, source.height / target.height), .5, .98),
  }
}

export function phoneAngles(dx: number, dy: number) {
  return { x: clamp(-dy * .1, -8, 8), y: clamp(dx * .12, -16, 16) }
}
