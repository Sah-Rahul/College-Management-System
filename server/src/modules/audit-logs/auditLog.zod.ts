import { z } from 'zod';

export const createAuditLogSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    module: z.enum(['auth', 'user', 'course', 'institute', 'order', 'payment', 'enrollment', 'admission', 'review', 'certificate', 'instructor', 'admin', 'system']),
    action: z.enum(['create', 'read', 'update', 'delete', 'login', 'logout', 'login_failed', 'password_reset', 'email_verification', 'approve', 'reject', 'suspend', 'activate', 'purchase', 'refund', 'enroll', 'complete', 'export', 'import', 'download', 'upload']),
    severity: z.enum(['info', 'warning', 'error', 'critical']),
    resourceType: z.string(),
    resourceId: z.string().optional(),
    description: z.string(),
    metadata: z.record(z.string(), z.any()).optional(),
    changes: z.object({
      before: z.record(z.string(), z.any()).optional(),
      after: z.record(z.string(), z.any()).optional(),
    }).optional(),
    ipAddress: z.string().optional(),
    userAgent: z.string().optional(),
    sessionId: z.string().optional(),
    apiEndpoint: z.string().optional(),
    httpMethod: z.string().optional(),
    statusCode: z.number().optional(),
    errorMessage: z.string().optional(),
    executionTime: z.number().optional(),
  }),
});
