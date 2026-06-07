import { apiClient } from "@/app/api/apiClient";
import { apiRoutes } from "@/app/api/apiRoutes";
import { ApiRequest } from "@/constants/api";
import { authHeader } from "@/lib/api/auth-token";
import type { UpdateUserStatusInput } from "@/schemas/user";
import type { ApiUser, UserFilters, UsersResponse } from "@/types/api/user";

/**
 * SAMPLE service layer. Each function calls `apiClient`, passes the token via
 * the Authorization header, and returns typed data. No React here, so these
 * are easy to unit-test and reuse.
 */

function toQueryString(filters: UserFilters): string {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function getUsers(
  token: string,
  filters: UserFilters = {},
): Promise<UsersResponse> {
  return apiClient<UsersResponse>(
    `${apiRoutes.users.list}${toQueryString(filters)}`,
    { method: ApiRequest.GET, headers: authHeader(token) },
  );
}

export function getUserById(token: string, id: string): Promise<ApiUser> {
  return apiClient<ApiUser>(apiRoutes.users.byId(id), {
    method: ApiRequest.GET,
    headers: authHeader(token),
  });
}

export function updateUserStatus(
  token: string,
  id: string,
  input: UpdateUserStatusInput,
): Promise<ApiUser> {
  return apiClient<ApiUser>(apiRoutes.users.byId(id), {
    method: ApiRequest.PATCH,
    headers: authHeader(token),
    body: JSON.stringify(input),
  });
}
