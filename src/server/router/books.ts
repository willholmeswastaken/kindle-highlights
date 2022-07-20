import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

export const booksRouter = createRouter()
  .query("getSession", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getBookById", {
    input: z.object({
      bookId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const book = await ctx.prisma.book.findUnique({
        where: {
          id: input.bookId,
        },
        include: {
          highlights: {
            orderBy: {
              location: "asc",
            },
          },
        },
      });
      return book;
    },
  });
