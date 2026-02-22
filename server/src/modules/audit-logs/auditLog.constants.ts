export const AUDIT_LOG_CONSTANTS = {
  RETENTION_DAYS: 90,
  BATCH_SIZE: 1000,
  CLEANUP_INTERVAL: 24 * 60 * 60 * 1000,
  MAX_METADATA_SIZE: 1024 * 16,
  CRITICAL_ACTIONS: [
    "delete_user",
    "approve_institute",
    "process_refund",
    "suspend_account",
  ],
};

export const AUDIT_LOG_MESSAGES = {
  LOGGED: "Audit log created",
  CLEANUP_STARTED: "Audit log cleanup started",
  CLEANUP_COMPLETED: "Audit log cleanup completed",
  EXPORT_STARTED: "Audit log export started",
  EXPORT_COMPLETED: "Audit log export completed",
};

export const SENSITIVE_FIELDS = [
  "password",
  "passwordHash",
  "token",
  "apiKey",
  "secret",
  "creditCard",
  "ssn",
  "accountNumber",
];
