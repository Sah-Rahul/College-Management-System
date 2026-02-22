export enum AdmissionStatus {
  PENDING = "pending",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  WITHDRAWN = "withdrawn",
  ACTIVE = "active",
  COMPLETED = "completed",
  SUSPENDED = "suspended",
}

export enum AdmissionType {
  REGULAR = "regular",
  LATERAL_ENTRY = "lateral_entry",
  TRANSFER = "transfer",
  SCHOLARSHIP = "scholarship",
}

export enum DocumentType {
  PHOTO = "photo", 
  MARKSHEET = "marksheet", 
  OTHER = "other",
}
