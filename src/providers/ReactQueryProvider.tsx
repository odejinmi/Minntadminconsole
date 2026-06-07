"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppQueryConfig } from "@/constants/api";

/**
 * Wraps the app with a single React Query client. Mounted once in the root
 * layout so any client component can use query/mutation hooks.
 */
export function ReactQueryProvider({
  children,
}: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: AppQueryConfig.ApiFetchStaleTime },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}
