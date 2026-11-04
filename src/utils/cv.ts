/** Reject SPA fallback HTML and missing/invalid files before enabling downloads. */
export async function loadVerifiedPdf(url: string, signal?: AbortSignal): Promise<Blob | null> {
  const response = await fetch(url, { signal, cache: 'no-cache' })
  if (!response.ok) return null
  const buffer = await response.arrayBuffer()
  const header = new TextDecoder().decode(buffer.slice(0, 5))
  return header === '%PDF-' ? new Blob([buffer], { type: 'application/pdf' }) : null
}
