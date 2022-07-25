import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const vaultRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("get", {
    async resolve({ ctx }) {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const vaultRecords = await ctx.prisma.vaultRecord.findMany({
        where: {
          userId: ctx.session.user.email!,
        },
        orderBy: {
          savedOn: "desc",
        },
        include: {
          import: true,
        },
      });

      return vaultRecords;
    },
  });
