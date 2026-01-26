import z from "zod";

export const UserRoleEnum = z.enum(["admin", "student", "teacher", "staff"]);
export const GenderEnum = z.enum(["male", "female", "other"]);
export const AccountStatusEnum = z.enum(["active", "blocked", "suspended"]);
export const BlockReasonEnum = z.enum([
  "low_attendance",
  "fee_overdue",
  "book_overdue",
  "disciplinary",
  "other",
]);

export const AttendanceStatusEnum = z.enum([
  "present",
  "absent",
  "leave",
  "late",
]);
export const AttendanceTypeEnum = z.enum(["student", "teacher", "staff"]);

// FEE ENUM
export enum FeeStatus {
  PAID = "paid",
  PENDING = "pending",
  OVERDUE = "overdue",
  PARTIAL = "partial",
}

// PAYMENT ENUM
export enum PaymentMode {
  ONLINE = "online",
  CASH = "cash",
  CHEQUE = "cheque",
}

export const PaymentModeEnum = z.enum([
  "online",
  "cash",
  "cheque",
  "bank_transfer",
]);
export const FeeStatusEnum = z.enum(["paid", "pending", "overdue", "partial"]);

// SALARY ENUM
export enum SalaryStatus {
  PAID = "paid",
  PENDING = "pending",
  PROCESSING = "processing",
}

export const SalaryStatusEnum = z.enum(["paid", "pending", "processing"]);
export const EmployeeTypeEnum = z.enum(["teacher", "staff"]);

// EXAM RESULT
export enum Grade {
  A_PLUS = "A+",
  A = "A",
  B_PLUS = "B+",
  B = "B",
  C = "C",
  D = "D",
  F = "F",
}

// TIME ENUM
export enum DayOfWeek {
  MONDAY = "monday",
  TUESDAY = "tuesday",
  WEDNESDAY = "wednesday",
  THURSDAY = "thursday",
  FRIDAY = "friday",
  SATURDAY = "saturday",
}

// EXAM TYPE ENUM
export enum ExamType {
  CLASS_TEST = "class_test",
  FIRST_TERM = "first_term",
  SECOND_TERM = "second_term",
  FINAL = "final",
}

// EXAM STATUS ENUM
export enum ExamStatus {
  SCHEDULED = "scheduled",
  ONGOING = "ongoing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

// BOOK STATUS ENUM
export enum BookStatus {
  AVAILABLE = "available",
  ISSUED = "issued",
  RESERVED = "reserved",
  MAINTENANCE = "maintenance",
  LOST = "lost",
}


// NOTICE ENUM
export enum NoticeCategory {
  GENERAL = "general",
  EXAM = "exam",
  HOLIDAY = "holiday",
  EVENT = "event",
  ADMISSION = "admission",
  URGENT = "urgent",
  ACADEMIC = "academic",
}

export enum NoticeAudience {
  ALL = "all",
  STUDENTS = "students",
  TEACHERS = "teachers",
  STAFF = "staff",
  SPECIFIC_COURSE = "specific_course",
  SPECIFIC_DEPARTMENT = "specific_department",
}

export enum NoticePriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

// NOTIFICATION ENUM
export enum NotificationType {
  EMAIL = "email",
  SMS = "sms",
  IN_APP = "in_app",
  PUSH = "push",
}

export enum NotificationStatus {
  PENDING = "pending",
  SENT = "sent",
  FAILED = "failed",
  READ = "read",
}

export enum NotificationTrigger {
  ATTENDANCE_LOW = "attendance_low",
  FEE_OVERDUE = "fee_overdue",
  BOOK_OVERDUE = "book_overdue",
  EXAM_SCHEDULED = "exam_scheduled",
  RESULT_PUBLISHED = "result_published",
  NOTICE_PUBLISHED = "notice_published",
  LEAVE_STATUS = "leave_status",
  PROMOTION = "promotion",
  ACCOUNT_BLOCKED = "account_blocked",
  ACCOUNT_UNBLOCKED = "account_unblocked",
  ADMISSION_STATUS = "admission_status",
  GENERAL = "general",
}

// LEAVE ENUM
export enum LeaveType {
  SICK = "sick",
  CASUAL = "casual",
  EARNED = "earned",
  MATERNITY = "maternity",
  PATERNITY = "paternity",
  UNPAID = "unpaid",
  EMERGENCY = "emergency",
}

export enum LeaveStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

// MESSAGE ENUM
export enum MessageSender {
  USER = "user",
  SUPPORT = "support",
  SYSTEM = "system",
}

export enum MessageType {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  SYSTEM = "system",
}

// ADMISSION ENUM
export const AdmissionStatusEnum = z.enum([
  "pending",
  "under_review",
  "approved",
  "rejected",
  "waitlisted",
]);
export const QualificationTypeEnum = z.enum([
  "high_school",
  "intermediate",
  "graduation",
  "post_graduation",
]);

// COURSE ENUM
export const CourseLevelEnum = z.enum([
  "undergraduate",
  "postgraduate",
  "diploma",
]);
