// Central API helper - uses VITE_API_URL in production, empty for dev (proxy)
// NOTE: cast import.meta to any to avoid missing TS types for `env` in this repo
export const API_BASE = (import.meta as any).env?.VITE_API_URL ?? ''

/**
 * Build absolute API URL. In development the Vite dev server proxy can handle
 * requests to `/api/*`, so leaving API_BASE empty keeps relative paths.
 */
export function api(path: string) {
  // ensure path starts with '/'
  if (!path.startsWith('/')) path = '/' + path
  return `${API_BASE}${path}`
}
