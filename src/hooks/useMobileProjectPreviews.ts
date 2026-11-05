import { useEffect, type RefObject } from 'react'
import { createMobilePreviewController } from '../utils/mobilePreviewController.ts'

export function useMobileProjectPreviews(container: RefObject<HTMLDivElement | null>, paused: boolean, filter: string) {
  useEffect(() => {
    const frames = Array.from(container.current?.querySelectorAll<HTMLElement>('.interactive-screenshot') || [])
    if (!frames.length) return
    return createMobilePreviewController(frames, paused)
  }, [container, paused, filter])
}
