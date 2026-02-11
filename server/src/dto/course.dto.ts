import { z } from "zod";
import { CourseLevel, CourseStatus } from "../@types/enums";

const num = z.preprocess(
  (v) => (v === "" || v === undefined ? undefined : Number(v)),
  z.number(),
);
const bool = z.preprocess((v) => {
  if (v === "true") return true;
  if (v === "false") return false;
  return v;
}, z.boolean());

export const CreateCourseSchema = z.object({
  courseTitle: z
    .string()
    .min(3, "Course title must be at least 3 characters")
    .max(120, "Course title must be less than 120 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must be less than 5000 characters"),

  category: z.string().min(1, "Category is required"),

  price: z.coerce.number().min(0).optional(),
  discountPrice: z.coerce.number().min(0).optional(),

  level: z.nativeEnum(CourseLevel).optional(),

  language: z.string().min(2).max(30).optional(),

  tags: z
    .preprocess(
      (v) => {
        if (!v) return undefined;

        if (Array.isArray(v)) return v;

        if (typeof v === "string") {
          try {
            const parsed = JSON.parse(v);
            if (Array.isArray(parsed)) return parsed;
          } catch {}

          return [v];
        }

        return undefined;
      },
      z.array(z.string().min(1)).optional(),
    )
    .optional(),

  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const UpdateCourseSchema = z.object({
  courseTitle: z.string().min(3).max(120).optional(),
  description: z.string().min(10).max(5000).optional(),

  category: z.string().optional(),

  price: z.coerce.number().min(0).optional(),
  discountPrice: z.coerce.number().min(0).optional(),

  level: z.nativeEnum(CourseLevel).optional(),
  language: z.string().min(2).max(30).optional(),

  tags: z
    .preprocess((v) => {
      if (!v) return undefined;
      if (Array.isArray(v)) return v;
      return String(v)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }, z.array(z.string()).optional())
    .optional(),

  startDate: z.string().optional(),
  endDate: z.string().optional(),

  status: z.nativeEnum(CourseStatus).optional(),
  isActive: z.boolean().optional(),
});

 
