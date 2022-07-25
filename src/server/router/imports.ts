import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const importsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getAllImports", {
    async resolve({ ctx }) {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const imports = await ctx.prisma.highlightImport.findMany({
        where: {
          userId: ctx.session.user.email!,
        },
        orderBy: {
          importedOn: "desc",
        },
      });

      return imports;
    },
  })
  .query("getBooksByImportId", {
    input: z.object({
      importId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const retrievedImport = await ctx.prisma.highlightImport.findUnique({
        where: {
          id: input.importId,
        },
        include: {
          books: true,
        },
      });
      if (!retrievedImport) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Import was not found upon database query",
        });
      }
      return retrievedImport.books;
    },
  });
