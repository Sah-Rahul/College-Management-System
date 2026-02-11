import { z } from "zod";

export const CreateInstructorRequestSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email format is invalid",
    ),

  bio: z.string().max(500).optional(),
  experience: z.string().max(100).optional(),
});

export const UpdateInstructorRequestSchema = z.object({
  fullName: z.string().min(3).optional(),
  bio: z.string().max(500).optional(),
  experience: z.string().max(100).optional(),
});
