# API integration guide

This app currently renders from a **mock data layer** in `src/lib/data/*` (plain
async functions returning hardcoded data). The structure below mirrors the
cashdrive admin pattern and is ready for the real backend. When wiring a
resource, swap the page's `getX()` mock call for the matching React Query hook.

## Stack

- **HTTP**: native `fetch` wrapped by `apiClient<T>` (no axios)
- **Caching/fetching**: `@tanstack/react-query` v5 (provider mounted in `src/app/layout.tsx`)
- **Validation**: `zod` (env + request schemas)
- **Forms**: `react-hook-form` + `@hookform/resolvers`

## Layers (one sample file per layer)

| Layer | Path | Sample |
| --- | --- | --- |
| Env (validated) | `src/config/env.client.ts` | `envClient.NEXT_PUBLIC_API_BASE_URL` |
| Constants | `src/constants/api.ts` | `ApiRequest`, `AppQueryConfig` |
| HTTP client | `src/app/api/apiClient.ts` | `apiClient<T>()`, `ApiClientError` |
| Endpoints | `src/app/api/apiRoutes.ts` | `apiRoutes.users.list` |
| Auth token | `src/lib/api/auth-token.ts` | `getAuthToken()`, `authHeader()` |
| Response types | `src/types/api/response.ts` | `ApiResponse<T>`, `PaginatedResponse<T>` |
| Resource DTOs | `src/types/api/user.ts` | `ApiUser`, `UserFilters` |
| Request schema | `src/schemas/user.ts` | `updateUserStatusSchema` |
| Service | `src/services/users.ts` | `getUsers()`, `updateUserStatus()` |
| Query/mutation hooks | `src/hooks/api/users.ts` | `useUsers()`, `useUpdateUserStatus()` |
| RQ provider | `src/providers/ReactQueryProvider.tsx` | mounted in root layout |

> Note: `src/hooks/api/*` holds data hooks; `src/hooks/*` (e.g. `usePagination`)
> holds UI hooks. Keep DTOs (wire shape, often snake_case) in `src/types/api/*`
> and map them to the UI types in `src/lib/data/types.ts` inside the service.

## Add a new resource (recipe)

1. **Endpoints** → add paths to `src/app/api/apiRoutes.ts`.
2. **Types** → add DTOs + filters in `src/types/api/<resource>.ts`.
3. **Schema** (if it has mutations) → `src/schemas/<resource>.ts`.
4. **Service** → `src/services/<resource>.ts`, each function calling `apiClient`
   with `authHeader(token)`.
5. **Hooks** → `src/hooks/api/<resource>.ts` wrapping the service in
   `useQuery`/`useMutation`. Convention: `queryKey: ["<resource>", ...params]`.
6. **Consume** → in a client component, `const { data, isLoading } = use<Resource>()`.

## Before going live

- Set `NEXT_PUBLIC_API_BASE_URL` in `.env`, then tighten `env.client.ts`
  (`.url()` instead of `.url().optional()`).
- Replace `getAuthToken()` in `src/lib/api/auth-token.ts` with the real token
  source (and refresh logic) — today the session is a stub in localStorage.
- Server components can call services directly (`await getUsers(token)`); client
  components should use the hooks.
