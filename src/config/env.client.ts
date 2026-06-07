import { z } from "zod";

/**
 * Validated, browser-safe environment variables.
 *
 * Only `NEXT_PUBLIC_*` vars are available in the browser. Keep the base URL
 * optional for now so the app still builds before a backend is wired; once the
 * API is live, set `NEXT_PUBLIC_API_BASE_URL` and tighten this to `.url()`.
 */
const clientEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url().optional(),
  NEXT_PUBLIC_NODE_ENV: z
    .enum(["development", "test", "staging", "production"])
    .default("development"),
});

export const envClient = clientEnvSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV ?? "development",
});
