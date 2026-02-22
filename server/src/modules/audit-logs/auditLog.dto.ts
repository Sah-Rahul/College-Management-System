export interface CreateAuditLogDTO {
  userId?: string;
  module: string;
  action: string;
  severity: string;
  resourceType: string;
  resourceId?: string;
  description: string;
  metadata?: Record<string, any>;
  changes?: {
    before?: Record<string, any>;
    after?: Record<string, any>;
  };
  ipAddress?: string;
  userAgent?: string;
  sessionId?: string;
  apiEndpoint?: string;
  httpMethod?: string;
  statusCode?: number;
  errorMessage?: string;
  executionTime?: number;
}

export interface GetAuditLogsQueryDTO {
  userId?: string;
  module?: string;
  action?: string;
  severity?: string;
  resourceType?: string;
  resourceId?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
