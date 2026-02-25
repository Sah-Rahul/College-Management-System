export const INSTITUTE_REQUEST_CONSTANTS = {
  MAX_DOCUMENTS: 10,
  ALLOWED_DOCUMENT_TYPES: ["application/pdf", "image/jpeg", "image/png"],
  MAX_DOCUMENT_SIZE: 10 * 1024 * 1024, // 10MB
  REVIEW_TIME_DAYS: 7,
};

export const INSTITUTE_REQUEST_MESSAGES = {
  SUBMITTED: "Institute request submitted successfully",
  APPROVED: "Institute request approved",
  REJECTED: "Institute request rejected",
  CANCELLED: "Institute request cancelled",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Institute request not found",
  ALREADY_PROCESSED: "This request has already been processed",
  INSUFFICIENT_DOCUMENTS: "Please upload all required documents",
  ALLINSSTITUTEREQUESTS: "All InstituteRequests fetched successfully",
  FETCHED: "Institute request fetched successfully",
  UPDATED: "Institute request updated successfully",
  DELETED: "Institute request deleted successfully",
  REVIEWED: "Institute request reviewed successfully",
};