/**
 * Central registry of API endpoint paths, grouped by domain.
 *
 * Keep every path here (never hardcode a URL in a service) so endpoints are
 * discoverable and easy to update. Paths are relative to
 * `NEXT_PUBLIC_API_BASE_URL` (see apiClient).
 */
export const apiRoutes = {
  auth: {
    login: "/auth/login",
    refreshToken: "/auth/refresh",
  },
  users: {
    list: "/users",
    byId: (id: string): string => `/users/${id}`,
  },
  transactions: {
    list: "/transactions",
    byId: (id: string): string => `/transactions/${id}`,
  },
} as const;
