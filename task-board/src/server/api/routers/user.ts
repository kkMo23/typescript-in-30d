import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";
import type { User } from "@prisma/client";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
    .query(async () => {
        const users: User[] = await db.user.findMany();
        return users;
    })
    ,
});