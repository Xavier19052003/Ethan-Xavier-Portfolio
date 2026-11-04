import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { profile } from '../data/profile'

export function CopyEmail() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<number | undefined>(undefined)
  const mounted = useRef(true)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; window.clearTimeout(timer.current) } }, [])
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(profile.email)
      if (mounted.current) setStatus('copied')
    } catch { if (mounted.current) setStatus('failed') }
    if (mounted.current) { window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setStatus('idle'), 4000) }
  }
  return <div className="copy-email"><button type="button" className="text-link" onClick={copy}>{status === 'copied' ? <Check size={16}/> : <Copy size={16}/>} {status === 'copied' ? 'Copied!' : 'Copy email'}</button><span className="copy-status" role="status">{status === 'copied' ? 'Email copied to clipboard.' : status === 'failed' ? 'Copy unavailable. Select the email address above to copy it.' : ''}</span></div>
}
