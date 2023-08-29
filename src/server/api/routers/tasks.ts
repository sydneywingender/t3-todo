import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  getTasksFromUser: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: { user_id: input.userId },
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
      return ctx.prisma.task.create({
        data: {
          title: input.title,
          user_id: input.userId,
          isCompleted: input.isCompleted,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string().optional() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: { id: input.id, user_id: input.userId },
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
        where: { id: input.id, user_id: input.userId },
        data: { title: input.title, isCompleted: input.isCompleted },
      });
    }),
});
