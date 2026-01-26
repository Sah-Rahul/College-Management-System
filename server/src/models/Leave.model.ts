import mongoose, { Schema, Document, Model } from "mongoose";
import { LeaveStatus, LeaveType } from "../enums/enums";

export interface ILeave extends Document {
  user: mongoose.Types.ObjectId;
  userType: "teacher" | "staff";
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  appliedDate: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedDate?: Date;
  reviewComments?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const LeaveSchema = new Schema<ILeave>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userType: {
      type: String,
      enum: ["teacher", "staff"],
      required: true,
    },
    leaveType: {
      type: String,
      enum: Object.values(LeaveType),
      required: [true, "Leave type is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    totalDays: {
      type: Number,
      required: true,
      min: 0.5,
    },
    reason: {
      type: String,
      required: [true, "Reason is required"],
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.PENDING,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedDate: Date,
    reviewComments: {
      type: String,
      maxlength: 500,
    },
    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Indexes
LeaveSchema.index({ user: 1, status: 1 });
LeaveSchema.index({ status: 1, appliedDate: -1 });
LeaveSchema.index({ startDate: 1, endDate: 1 });

LeaveSchema.pre("save", function () {
  if (this.endDate < this.startDate) {
    throw new Error("End date must be after or equal to start date");
  }
});

export const Leave: Model<ILeave> = mongoose.model<ILeave>(
  "Leave",
  LeaveSchema,
);
