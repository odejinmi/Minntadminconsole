/**
 * Standard API envelope returned by the backend.
 *
 * The server wraps every response as either:
 *   { status: "success", data: T }
 *   { status: "error",   error: { message, errorType, errorCode, details } }
 *
 * `apiClient` unwraps `data` on success and throws `ApiClientError` on error,
 * so callers work with `T` directly.
 */
export type ApiError = {
  message: string;
  errorType?: string;
  errorCode?: string;
  details?: unknown;
};

export type ApiResponse<T> = {
  status: "success" | "error";
  data?: T;
  error?: ApiError;
};

/** Pagination envelope used by list endpoints. */
export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  meta: PaginationMeta;
};
