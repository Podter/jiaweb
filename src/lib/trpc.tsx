import { createTRPCReact } from "@trpc/react-query";
import {
  createTRPCProxyClient,
  loggerLink,
  type CreateTRPCClientOptions,
} from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import superjson from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";
import type { AppRouter } from "../../electron/trpc/root.ts";

const trpcOptions: CreateTRPCClientOptions<AppRouter> = {
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        import.meta.env.DEV ||
        (opts.direction === "down" && opts.result instanceof Error),
    }),
    ipcLink(),
  ],
};

export const trpc = createTRPCReact<AppRouter>();
export const trpcClient = createTRPCProxyClient<AppRouter>(trpcOptions);

export function TRPCProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcReactClient] = useState(() => trpc.createClient(trpcOptions));

  return (
    <trpc.Provider client={trpcReactClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
