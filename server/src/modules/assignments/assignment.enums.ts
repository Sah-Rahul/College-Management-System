export enum AssignmentType {
  INDIVIDUAL = "individual",
  GROUP = "group",
  PEER_REVIEW = "peer_review",
  PRACTICAL = "practical",
  PROJECT = "project",
  ESSAY = "essay",
  CODING = "coding",
}

export enum AssignmentStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
  DELETED = "deleted",
}

export enum SubmissionType {
  FILE_UPLOAD = "file_upload",
  TEXT_ENTRY = "text_entry",
  LINK_SUBMISSION = "link_submission",
  CODE_SUBMISSION = "code_submission",
  MIXED = "mixed",
}

export enum GradingType {
  POINTS = "points",
  PERCENTAGE = "percentage",
  LETTER_GRADE = "letter_grade",
  PASS_FAIL = "pass_fail",
  RUBRIC = "rubric",
}

export enum SubmissionStatus {
  NOT_SUBMITTED = "not_submitted",
  DRAFT = "draft",
  SUBMITTED = "submitted",
  RESUBMITTED = "resubmitted",
  GRADED = "graded",
  RETURNED = "returned",
  LATE = "late",
  MISSING = "missing",
}

export enum PlagiarismStatus {
  NOT_CHECKED = "not_checked",
  CHECKING = "checking",
  PASSED = "passed",
  SUSPECTED = "suspected",
  CONFIRMED = "confirmed",
  FAILED = "failed",
}
