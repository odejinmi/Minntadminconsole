/**
 * Returns the bearer token for API calls.
 *
 * Today the app uses a stubbed localStorage session ([[auth-context]]), which
 * carries no real token. When the backend lands, replace this with the actual
 * access token (e.g. from the auth context, a cookie, or next-auth session).
 */
export function getAuthToken(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = window.localStorage.getItem("minnt.session");
    if (!raw) return "";
    const session = JSON.parse(raw) as { token?: string };
    return session.token ?? "";
  } catch {
    return "";
  }
}

/** Authorization header helper for service functions. */
export function authHeader(token: string): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
