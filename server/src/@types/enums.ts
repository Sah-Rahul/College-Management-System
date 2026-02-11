export enum UserRole {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
  INSTITUTE = "INSTITUTE"
}

export enum InstructorRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",

}

export enum CourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum CourseStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export enum EnrollmentStatus {
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
}

export enum LessonType {
  VIDEO = "VIDEO",
  ARTICLE = "ARTICLE",
  QUIZ = "QUIZ",
}
