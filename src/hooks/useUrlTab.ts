"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type UseUrlTab<T extends string> = {
  active: T;
  setActive: (value: T) => void;
};

/**
 * Syncs a tab/segment value to a URL search param so a user returns to the
 * same view on back-navigation or refresh.
 */
export function useUrlTab<T extends string>(
  values: readonly T[],
  fallback: T,
  param = "tab",
): UseUrlTab<T> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get(param);
  const active = (values as readonly string[]).includes(current ?? "")
    ? (current as T)
    : fallback;

  const setActive = (value: T): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return { active, setActive };
}
