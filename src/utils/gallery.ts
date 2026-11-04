export function screenIndex(current: number, direction: number, count: number) {
  return count > 0 ? ((current + direction) % count + count) % count : 0
}

export function swipeDirection(dx: number, dy: number) {
  return Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4 ? (dx < 0 ? 1 : -1) : 0
}
