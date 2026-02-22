export const ASSIGNMENT_CONSTANTS = {
  MIN_TITLE_LENGTH: 5,
  MAX_TITLE_LENGTH: 200,
  MIN_DESCRIPTION_LENGTH: 20,
  MAX_DESCRIPTION_LENGTH: 5000,
  MAX_INSTRUCTIONS_LENGTH: 10000,
  MAX_FILES_PER_SUBMISSION: 10,
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  DEFAULT_MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  ALLOWED_FILE_TYPES: [
    "application/pdf", 
    "image/jpeg",
    "image/png",
    "image/gif",
    "text/plain",
    "application/zip",
  ],
  DEFAULT_ATTEMPTS_ALLOWED: 1,
  MAX_ATTEMPTS_ALLOWED: 5,
  DEFAULT_LATE_PENALTY: 10, // 10% per day
  MAX_LATE_DAYS: 7,
  MIN_PASSING_PERCENTAGE: 50,
  PLAGIARISM_THRESHOLD: 30, // 30% similarity triggers review
  PEER_REVIEWS_REQUIRED: 3,
  AUTO_GRADE_DELAY: 24 * 60 * 60 * 1000,  
};

export const ASSIGNMENT_MESSAGES = {
  CREATED: "Assignment created successfully",
  UPDATED: "Assignment updated successfully",
  DELETED: "Assignment deleted successfully",
  PUBLISHED: "Assignment published successfully",
  SUBMITTED: "Assignment submitted successfully",
  RESUBMITTED: "Assignment resubmitted successfully",
  GRADED: "Assignment graded successfully",
  NOT_FOUND: "Assignment not found",
  NOT_AVAILABLE: "Assignment is not available yet",
  PAST_DUE: "Assignment deadline has passed",
  PAST_LOCK_DATE: "Assignment is locked. No more submissions allowed.",
  MAX_ATTEMPTS_REACHED: "Maximum submission attempts reached",
  FILE_TOO_LARGE: "File size exceeds the limit",
  INVALID_FILE_TYPE: "Invalid file type",
  PLAGIARISM_DETECTED: "Plagiarism detected in your submission",
  PEER_REVIEW_SUBMITTED: "Peer review submitted successfully",
  RESUBMISSION_REQUESTED: "Resubmission requested",
  LATE_SUBMISSION: "Late submission. Penalty applied.",
};

export const ASSIGNMENT_GRADE_MESSAGES = {
  EXCELLENT: "Excellent work! Outstanding submission",
  VERY_GOOD: "Very good! Great effort",
  GOOD: "Good work! Keep it up",
  SATISFACTORY: "Satisfactory. Room for improvement",
  NEEDS_IMPROVEMENT: "Needs improvement. Please review the feedback",
  UNSATISFACTORY: "Unsatisfactory. Resubmission recommended",
};

export const LETTER_GRADES = {
  "A+": { min: 95, max: 100 },
   A: { min: 90, max: 94 },
  "A-": { min: 85, max: 89 },
  "B+": { min: 80, max: 84 },
   B: { min: 75, max: 79 },
  "B-": { min: 70, max: 74 },
  "C+": { min: 65, max: 69 },
   C: { min: 60, max: 64 },
  "C-": { min: 55, max: 59 },
   D: { min: 50, max: 54 },
   F: { min: 0, max: 49 },
};
