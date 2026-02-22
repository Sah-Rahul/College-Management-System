import mongoose, { Schema, Document } from "mongoose";
import { InstituteType } from "../institutes/institute.enums";
import { InstituteRequestStatus } from "./instituteRequest.enums";

export interface IInstituteRequest extends Document {
  userId: mongoose.Types.ObjectId;
  instituteName: string;
  instituteType: InstituteType;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  registrationNumber?: string;
  documents: Array<{
    type: string;
    url: string;
    uploadedAt: Date;
  }>;
  status: InstituteRequestStatus;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  rejectionReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const instituteRequestSchema = new Schema<IInstituteRequest>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    instituteName: { type: String, required: true, trim: true },
    instituteType: {
      type: String,
      enum: Object.values(InstituteType),
      required: true,
    },
    description: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    registrationNumber: String,
    documents: [
      {
        type: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: Object.values(InstituteRequestStatus),
      default: InstituteRequestStatus.PENDING,
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    rejectionReason: String,
    notes: String,
  },
  { timestamps: true },
);

instituteRequestSchema.index({ userId: 1 });
instituteRequestSchema.index({ status: 1 });
instituteRequestSchema.index({ createdAt: -1 });

const InstituteRequestModel = mongoose.model<IInstituteRequest>(
  "InstituteRequest",
  instituteRequestSchema,
);
export default InstituteRequestModel;
