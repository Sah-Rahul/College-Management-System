export const ADMISSION_CONSTANTS = {
  ADMISSION_PREFIX: "ADM",
  MAX_DOCUMENTS: 15,
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "image/jpeg", "image/png"],
  MAX_DOCUMENT_SIZE: 5 * 1024 * 1024, // 5MB
  REVIEW_TIME_DAYS: 10,
  FEE_PAYMENT_GRACE_PERIOD: 30, // days
};

export const ADMISSION_MESSAGES = {
  SUBMITTED: "Admission application submitted successfully",
  APPROVED: "Admission approved successfully",
  REJECTED: "Admission rejected",
  WITHDRAWN: "Admission withdrawn",
  NOT_FOUND: "Admission not found",
  ALREADY_APPLIED: "Already applied for admission in this institute",
  INCOMPLETE_APPLICATION: "Please complete all required fields",
  DOCUMENTS_REQUIRED: "Please upload all required documents",
  FEE_PAYMENT_PENDING: "Fee payment is pending",
};
