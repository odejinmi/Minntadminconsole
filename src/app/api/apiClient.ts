import { envClient } from "@/config/env.client";
import type { ApiResponse } from "@/types/api/response";

/**
 * Thrown when the API returns an error envelope or an auth failure.
 * Catch it in hooks/components to surface a friendly message.
 */
export class ApiClientError extends Error {
  public readonly errorType?: string;
  public readonly errorCode?: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    errorType?: string,
    errorCode?: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiClientError";
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.details = details;
  }
}

const UNAUTHORIZED = 401;

function handleUnauthorized(): void {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (path.includes("/login")) return;
  // Real auth wiring goes here: clear the session and bounce to /login.
  window.localStorage.removeItem("minnt.session");
  window.location.href = "/login";
}

/**
 * Typed wrapper around fetch. Prefixes the configured base URL, sets JSON
 * headers (unless sending FormData), unwraps the `data` field on success and
 * throws `ApiClientError` on failure.
 *
 * Pass the bearer token via `options.headers.Authorization` (see services).
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${envClient.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  if (response.status === UNAUTHORIZED) {
    handleUnauthorized();
    throw new ApiClientError("Unauthorized access", "UNAUTHORIZED", "401");
  }

  const json: ApiResponse<T> = await response.json();

  if (json.status === "error" || !response.ok) {
    throw new ApiClientError(
      json.error?.message ?? "Something went wrong",
      json.error?.errorType,
      json.error?.errorCode,
      json.error?.details,
    );
  }

  return json.data as T;
}
