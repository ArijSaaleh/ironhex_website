// Central API helper - uses VITE_API_URL in production, empty for dev (proxy)
// NOTE: cast import.meta to any to avoid missing TS types for `env` in this repo
export const API_BASE = (import.meta as any).env?.VITE_API_URL ?? ''

/**
 * Build absolute API URL. In development the Vite dev server proxy can handle
 * requests to `/api/*`, so leaving API_BASE empty keeps relative paths.
 *
 * This helper includes a lightweight runtime debug log that prints the
 * resolved URL and the current host when running in a browser. It helps
 * diagnose production issues where the client may be calling the wrong
 * host (for example Vercel static host) and receiving 405 responses.
 */
export function api(path: string) {
  // ensure path starts with '/'
  if (!path.startsWith('/')) path = '/' + path
  const url = `${API_BASE}${path}`

  // Runtime diagnostic: only log in browser environments
  try {
    if (typeof window !== 'undefined' && window?.console?.debug) {
      // Small, non-intrusive message to help debug production builds
      console.debug('[API]', {
        resolved: url,
        apiBase: API_BASE || '(empty — using relative path)',
        host: window.location.hostname
      })
    }
  } catch (e) {
    /* ignore */
  }

  return url
}
