import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";
import { Notion } from "../export/Notion";

export const exporterRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .mutation("exportBooksByIds", {
    input: z.object({
      bookIds: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const books = await ctx.prisma.book.findMany({
        where: {
          id: {
            in: input.bookIds,
          },
        },
        include: {
          highlights: true,
        },
      });
      if (!books) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Books have not been found upon database query",
        });
      }

      const notion = new Notion(process.env.NOTION_INTEGRATION_ID!);

      return await notion.exportBooks(
        "4d99479b569d49e2b1fb47e36600c592",
        books
      );
    },
  });
