/** Shared API constants: HTTP verbs and React Query defaults. */

export enum ApiRequest {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export class AppQueryConfig {
  /** Default React Query stale time: 5 minutes. */
  static readonly ApiFetchStaleTime = 1000 * 60 * 5;
}
