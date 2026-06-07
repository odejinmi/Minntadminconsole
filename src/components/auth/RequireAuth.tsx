"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-context";

/** Client-side gate: redirects to /login until a stub session is present. */
export function RequireAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  const { user, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, user, router]);

  if (!isReady || !user) {
    return (
      <div className="grid h-dvh place-items-center text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  return children;
}
