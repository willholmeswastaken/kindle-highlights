import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

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
  })
  .mutation("addImport", {
    input: z.object({
      importId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      return await ctx.prisma.vaultRecord.create({
        data: {
          importId: input.importId,
          userId: ctx.session.user.email!,
        },
      });
    },
  })
  .mutation("removeImport", {
    input: z.object({
      importId: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const vaultRecord = await ctx.prisma.vaultRecord.findFirst({
        where: {
          importId: input.importId,
          userId: ctx.session.user.email!,
        },
      });

      if (!vaultRecord) throw new TRPCError({ code: "FORBIDDEN" });

      return await ctx.prisma.vaultRecord.delete({
        where: {
          id: vaultRecord.id,
        },
      });
    },
  });
