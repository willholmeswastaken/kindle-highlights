// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { importsRouter } from "./imports";
import { booksRouter } from "./books";
import { vaultRouter } from "./vault";
import { exporterRouter } from "./exporter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("imports.", importsRouter)
  .merge("books.", booksRouter)
  .merge("vault.", vaultRouter)
  .merge("exporter.", exporterRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
