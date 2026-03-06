import { classDay, CourseLanguage, CourseLevel } from "./course.enums";

export interface CreateCourseDTO {
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  discountPercentage: number;
  level: CourseLevel;
  language: CourseLanguage;
  categoryId: string;
  learningOutcomes: string[];
  prerequisites: string[];
  tags: string[];
  certificateEnabled: boolean;
  classDay: classDay[];
  startDate?: string;
  curriculum: { title: string; lectures: string[] }[];
}

export interface UpdateCourseDTO {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  level?: CourseLevel;
  language?: CourseLanguage;
  categoryId?: string;
  learningOutcomes?: string[];
  prerequisites?: string[];
  tags?: string[];
  certificateEnabled?: boolean;
  classDay?: classDay[];
  startDate?: string;
  curriculum?: { title: string; lectures: string[] }[];
}

export interface GetCoursesQueryDTO {
  categoryId?: string;
  instituteId?: string;
  instructorId?: string;
  level?: string;
  language?: string;
  status?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetCoursesQueryDTO {
  categoryId?: string;
  instituteId?: string;
  instructorId?: string;
  level?: string;
  language?: string;
  status?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
