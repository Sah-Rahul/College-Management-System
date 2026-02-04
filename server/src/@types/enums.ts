export enum UserRole {
  STUDENT = "student",
  TEACHER = "teacher",
  MANAGEMENT = "management",
  ADMIN = "admin",
}

export enum EnrollmentStatus {
  ACTIVE = "active",
  COMPLETED = "completed",
  DROPPED = "dropped",
}

export enum AssignmentSubmissionStatus {
  SUBMITTED = "submitted",
  LATE = "late",
  RESUBMITTED = "resubmitted",
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  LATE = "late",
}

export enum NoticeAudience {
  ALL = "all",
  STUDENTS = "students",
  TEACHERS = "teachers",
  MANAGEMENT = "management",
  COURSE = "course",
}

export enum LeaveStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export enum ConversationType {
  DIRECT = "direct",
  GROUP = "group",
  COURSE = "course",
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
}

export enum QuizStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export enum QuizQuestionType {
  MCQ = "mcq",
  DESCRIPTIVE = "descriptive",
}

export enum NotificationType {
  SYSTEM = "system",
  NOTICE = "notice",
  ASSIGNMENT = "assignment",
  QUIZ = "quiz",
  CHAT = "chat",
  LEAVE = "leave",
}
