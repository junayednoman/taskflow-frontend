import { z } from "zod";

// Validation schema for member
export const createMemberSchema = z.object({
  name: z.string().min(1, "Member name is required"),
  role: z.string().min(1, "Role is required"),
  capacity: z.string().min(1, "Capacity is required"),
  team: z.string().min(1, "Team is required"),
});

export type TCreateMember = z.infer<typeof createMemberSchema>;
