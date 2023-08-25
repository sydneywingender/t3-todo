import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  }),
  create: publicProcedure
    .input(
      z.object({ title: z.string(), isCompleted: z.boolean().default(false) })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({ data: input });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({ where: { id: input.id } });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        isCompleted: z.boolean().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id },
        data: { title: input.title, isCompleted: input.isCompleted },
      });
    }),
});
