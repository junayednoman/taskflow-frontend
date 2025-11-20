import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  // project: z.string(),
});

export type TTask = z.infer<typeof taskSchema>;
