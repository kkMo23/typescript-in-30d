export enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}

export interface Task {
    id: string;
    title: string;
    assignedTo?: string;
    status: TaskStatus;
    createdAt: Date;
}

export type UpdateTaskInput = Partial<Pick<Task, "title" | "status" | "assignedTo">>;
export type NewTaskInput = Omit<Task, "id" | "createdAt">;
export type ReadonlyTask = { [K in keyof Task]: Readonly<Task[K]> };
