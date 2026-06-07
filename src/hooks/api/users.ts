"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/lib/api/auth-token";
import { getUserById, getUsers, updateUserStatus } from "@/services/users";
import type { UpdateUserStatusInput } from "@/schemas/user";
import type { UserFilters } from "@/types/api/user";

/**
 * SAMPLE query/mutation hooks. Convention: queryKey = [resource, ...params].
 * Hooks read the token, call the service, and expose React Query state
 * (data/isLoading/error). Components consume these, never the services directly.
 */

const USERS_KEY = "users";

export function useUsers(filters: UserFilters = {}) {
  const token = getAuthToken();
  return useQuery({
    queryKey: [USERS_KEY, filters],
    queryFn: () => getUsers(token, filters),
    enabled: Boolean(token),
  });
}

export function useUser(id: string) {
  const token = getAuthToken();
  return useQuery({
    queryKey: [USERS_KEY, id],
    queryFn: () => getUserById(token, id),
    enabled: Boolean(token) && Boolean(id),
  });
}

export function useUpdateUserStatus(id: string) {
  const token = getAuthToken();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserStatusInput) =>
      updateUserStatus(token, id, input),
    onSuccess: () => {
      // Refresh any cached user lists/detail after a successful update.
      queryClient.invalidateQueries({ queryKey: [USERS_KEY] });
    },
  });
}
