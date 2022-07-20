// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { importsRouter } from "./imports";
import { booksRouter } from "./books";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("auth.", authRouter)
  .merge("imports.", importsRouter)
  .merge("books.", booksRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
