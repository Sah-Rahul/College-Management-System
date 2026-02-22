import mongoose, { Schema, Document } from "mongoose";
import { AuditAction, AuditModule, AuditSeverity } from "./auditLog.enums";

export interface IAuditLog extends Document {
  userId?: mongoose.Types.ObjectId;
  module: AuditModule;
  action: AuditAction;
  severity: AuditSeverity;
  resourceType: string; 
  resourceId?: mongoose.Types.ObjectId;
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
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    module: {
      type: String,
      enum: Object.values(AuditModule),
      required: true,
    },
    action: {
      type: String,
      enum: Object.values(AuditAction),
      required: true,
    },
    severity: {
      type: String,
      enum: Object.values(AuditSeverity),
      default: AuditSeverity.INFO,
    },
    resourceType: { type: String, required: true },
    resourceId: { type: Schema.Types.ObjectId },
    description: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    changes: {
      before: { type: Schema.Types.Mixed },
      after: { type: Schema.Types.Mixed },
    },
    ipAddress: String,
    userAgent: String,
    sessionId: String,
    apiEndpoint: String,
    httpMethod: String,
    statusCode: Number,
    errorMessage: String,
    executionTime: Number,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    capped: { size: 1024 * 1024 * 1024, max: 10000000 },
  },
);

auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ module: 1, action: 1, createdAt: -1 });
auditLogSchema.index({ resourceType: 1, resourceId: 1 });
auditLogSchema.index({ severity: 1, createdAt: -1 });
auditLogSchema.index({ createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", auditLogSchema);
