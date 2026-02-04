import mongoose, { Schema, Document, Model } from "mongoose"; 
import { LeaveStatus } from "../@types/enums";

export interface ILeaveRequest extends Document {
  requester: mongoose.Types.ObjectId;

  fromDate: Date;
  toDate: Date;

  reason: string;

  status: LeaveStatus;

  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;

  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

const leaveRequestSchema = new Schema<ILeaveRequest>(
  {
    requester: { type: Schema.Types.ObjectId, ref: "User", required: true },

    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },

    reason: { type: String, required: true, minlength: 2, maxlength: 5000 },

    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.PENDING,
    },

    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: { type: Date },

    rejectionReason: { type: String, maxlength: 2000 },
  },
  { timestamps: true }
);

leaveRequestSchema.index({ requester: 1, createdAt: -1 });
leaveRequestSchema.index({ status: 1 });
leaveRequestSchema.index({ fromDate: 1, toDate: 1 });

export const LeaveRequest: Model<ILeaveRequest> = mongoose.model<ILeaveRequest>(
  "LeaveRequest",
  leaveRequestSchema
);
