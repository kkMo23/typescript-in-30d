
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import { TaskStatus } from "~/types/task";

const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    assignedTo: z.string().nullable(),
    status: z.nativeEnum(TaskStatus),
    createdAt: z.date(),
  });

export const taskRouter = createTRPCRouter({
  
    create: publicProcedure
      .input(
        z.object({
          title: z.string().min(3),
          assignedTo: z.string().optional(),
          status: z.nativeEnum(TaskStatus).default(TaskStatus.TO_DO),
        })
      )
      .output(taskSchema)
      .mutation(async ({ input }) => {
        const createdTask = await db.task.create({ data: input });

        return {
            ...createdTask,
            status: createdTask.status as TaskStatus,
          };
      }),
  
      getAll: publicProcedure
      .output(z.array(taskSchema))
      .query(async () => {
        return await db.task.findMany().then(tasks =>
            tasks.map(task => ({
                ...task,
                status: task.status as TaskStatus,
              }))
        );
      }),
  
      update: publicProcedure
      .input(z.object({
        id: z.string(),
        updates: z.object({
          title: z.string().optional(),
          status: z.nativeEnum(TaskStatus).optional(),
        }),
      }))
      .output(taskSchema)
      .mutation(async ({ input }) => {
        const updatedTask = await db.task.update({
            where: { id: input.id },
            data: input.updates,
          });
        
          return {
            ...updatedTask,
            status: updatedTask.status as TaskStatus,
          };
      }),
  });
