import { z } from "zod";

/**
 * SAMPLE request schema. Validate form/mutation input with zod before sending
 * it to a service (pair with react-hook-form via @hookform/resolvers).
 */
export const updateUserStatusSchema = z.object({
  status: z.enum(["Active", "Inactive", "Frozen"]),
  reason: z.string().min(3, "Add a short reason").optional(),
});

export type UpdateUserStatusInput = z.infer<typeof updateUserStatusSchema>;
