import { z } from "zod";

export const TaskStatusEnum = z.enum([
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);
export const TaskPriorityEnum = z.enum(["low", "medium", "high", "urgent"]);

export const CreateTaskSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(200),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000),
  assignedTo: z.string().min(1, "Assigned to user ID is required"),
  subject: z.string().optional(),
  dueDate: z.date(),
  priority: TaskPriorityEnum.default("medium"),
  attachments: z.array(z.string().url()).optional(),
  totalMarks: z.number().min(0).optional(),
});

export const UpdateTaskSchema = CreateTaskSchema.partial();

export const SubmitTaskSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  submissionText: z.string().max(5000).optional(),
  submissionFile: z.string().url().optional(),
});

export const GradeTaskSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  marks: z.number().min(0),
  feedback: z.string().max(1000).optional(),
});

export const UpdateTaskStatusSchema = z.object({
  taskId: z.string().min(1, "Task ID is required"),
  status: TaskStatusEnum,
});

export const GetStudentTasksSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  status: TaskStatusEnum.optional(),
  subject: z.string().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetTeacherTasksSchema = z.object({
  teacherId: z.string().min(1, "Teacher ID is required"),
  status: TaskStatusEnum.optional(),
  subject: z.string().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetTaskByIdSchema = z.object({
  id: z.string().min(1, "Task ID is required"),
});

export const DeleteTaskSchema = z.object({
  id: z.string().min(1, "Task ID is required"),
});

// Type exports
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
export type SubmitTaskInput = z.infer<typeof SubmitTaskSchema>;
export type GradeTaskInput = z.infer<typeof GradeTaskSchema>;
export type UpdateTaskStatusInput = z.infer<typeof UpdateTaskStatusSchema>;
export type GetStudentTasksInput = z.infer<typeof GetStudentTasksSchema>;
export type GetTeacherTasksInput = z.infer<typeof GetTeacherTasksSchema>;
export type GetTaskByIdInput = z.infer<typeof GetTaskByIdSchema>;
export type DeleteTaskInput = z.infer<typeof DeleteTaskSchema>;
