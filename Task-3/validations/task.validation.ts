import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().trim().nonempty("Title is required"),
    description: z.string().optional(),
    status: z.enum(["pending", "in-progress", "done"]).default("pending"),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
