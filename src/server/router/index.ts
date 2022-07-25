// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { importsRouter } from "./imports";
import { booksRouter } from "./books";
import { vaultRouter } from "./vault";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("imports.", importsRouter)
  .merge("books.", booksRouter)
  .merge("vault.", vaultRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
