export const INSTITUTE_CONSTANTS = {
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 2000,
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
};

export const INSTITUTE_MESSAGES = {
  CREATED: "Institute registered successfully. Awaiting admin approval.",
  UPDATED: "Institute updated successfully",
  DELETED: "Institute deleted successfully",
  NOT_FOUND: "Institute not found",
  ALREADY_EXISTS: "Institute with this name already exists",
  APPROVED: "Institute approved successfully",
  REJECTED: "Institute rejected",
  SUSPENDED: "Institute suspended",
  NOT_AUTHORIZED: "You are not authorized to perform this action",
};
