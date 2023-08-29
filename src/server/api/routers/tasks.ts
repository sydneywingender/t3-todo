import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  getTasksFromUser: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: { userId: input.userId },
        orderBy: { createdAt: "desc" },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        isCompleted: z.boolean().default(false),
        userId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.create({ data: input });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string().optional() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: { id: input.id, userId: input.userId },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string().optional(),
        title: z.string().optional(),
        isCompleted: z.boolean().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: { id: input.id, userId: input.userId },
        data: { title: input.title, isCompleted: input.isCompleted },
      });
    }),
});
