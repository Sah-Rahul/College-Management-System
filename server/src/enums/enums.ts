import z from "zod";

export const UserRoleEnum = z.enum([
  'admin',
  'student',
  'teacher',
  'staff',
]);

export const GenderEnum = z.enum([
  'male',
  'female',
  'other',
]);

export const AccountStatusEnum = z.enum([
  'active',
  'blocked',
  'suspended',
]);

export const BlockReasonEnum = z.enum([
  'low_attendance',
  'fee_overdue',
  'book_overdue',
  'disciplinary',
  'other',
]);

export enum CollegeDepartment {
  COMPUTER_SCIENCE = "Computer Science",
  MATHEMATICS = "Mathematics",
  PHYSICS = "Physics",
  CHEMISTRY = "Chemistry",
  BIOLOGY = "Biology",
  ENGLISH = "English",
  HISTORY = "History",
  ECONOMICS = "Economics",
  BUSINESS_ADMINISTRATION = "Business Administration",
  MECHANICAL_ENGINEERING = "Mechanical Engineering",
  ELECTRICAL_ENGINEERING = "Electrical Engineering",
  CIVIL_ENGINEERING = "Civil Engineering",
  IT = "Information Technology",
  OTHER = "Other",
}

export enum TEACHER_HIERARCHY {
  JUNIOR = "Junior Teacher",
  TEACHER = "Teacher",
  SENIOR = "Senior Teacher",
  HOD = "HOD",
}

export enum STAFF_HIERARCHY {
  JUNIOR = "Junior Staff",
  STAFF = "Staff",
  SENIOR = "Senior Staff",
  MANAGER = "Manager",
}
 

export const TEACHER_HIERARCHY_ARRAY = [
  TEACHER_HIERARCHY.JUNIOR,
  TEACHER_HIERARCHY.TEACHER,
  TEACHER_HIERARCHY.SENIOR,
  TEACHER_HIERARCHY.HOD,
];

 

export const STAFF_HIERARCHY_ARRAY = [
  STAFF_HIERARCHY.JUNIOR,
  STAFF_HIERARCHY.STAFF,
  STAFF_HIERARCHY.SENIOR,
  STAFF_HIERARCHY.MANAGER,
];