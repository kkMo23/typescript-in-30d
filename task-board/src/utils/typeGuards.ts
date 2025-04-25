import { type Task, TaskStatus } from "../types/task";

export function isTask(obj: unknown): obj is Task {
    return (
        obj !== null && 
        typeof obj === "object" && 
        typeof (obj as Task).title === "string" && 
        Object.values(TaskStatus).includes((obj as Task).status)
    );
}
