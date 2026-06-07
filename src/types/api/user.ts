import type { PaginatedResponse } from "./response";

/**
 * SAMPLE resource DTOs. These mirror the backend payload shape (often
 * snake_case). Map them to the UI-facing types in `@/lib/data/types` inside the
 * service or a small mapper, so components stay decoupled from the wire format.
 */
export type ApiUser = {
  id: string;
  full_name: string;
  email: string;
  status: string;
  kyc_tier: string;
  wallet_balance: number;
  created_at: string;
};

export type UserFilters = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

export type UsersResponse = PaginatedResponse<ApiUser>;
