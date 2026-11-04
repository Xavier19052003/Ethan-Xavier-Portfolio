import { createContext, useEffect, useState, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { assetUrl } from '../utils/assets'
import { loadVerifiedPdf } from '../utils/cv'

// Shared once across all download buttons; no repeated PDF fetches.
// eslint-disable-next-line react-refresh/only-export-components
export const CvContext = createContext<string | null>(null)

export function CvProvider({ children }: { children: ReactNode }) {
  const [url, setUrl] = useState<string | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    let objectUrl: string | null = null
    loadVerifiedPdf(assetUrl(profile.cvFile), controller.signal).then(blob => {
      if (blob && !controller.signal.aborted) {
        objectUrl = URL.createObjectURL(blob)
        setUrl(objectUrl)
      }
    }).catch(() => { /* Offline and missing assets keep downloads unavailable. */ })
    return () => {
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [])
  return <CvContext.Provider value={url}>{children}</CvContext.Provider>
}
