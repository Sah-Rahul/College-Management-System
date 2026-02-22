import mongoose, { Schema, Document } from "mongoose";
import { InstituteStatus, InstituteType } from "./institute.enums";

export interface IInstitute extends Document {
  name: string;
  slug: string;
  description: string;
  logo?: string;
  coverImage?: string;
  type: InstituteType;
  status: InstituteStatus;
  adminId: mongoose.Types.ObjectId;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  registrationNumber?: string;
  taxNumber?: string;
  bankDetails?: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
    bankName: string;
  };
  rating: number;
  totalReviews: number;
  totalStudents: number;
  totalCourses: number;
  approvedBy?: mongoose.Types.ObjectId;
  approvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const instituteSchema = new Schema<IInstitute>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    logo: String,
    coverImage: String,
    type: {
      type: String,
      enum: Object.values(InstituteType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(InstituteStatus),
      default: InstituteStatus.PENDING,
    },
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    website: String,
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      instagram: String,
    },
    registrationNumber: String,
    taxNumber: String,
    bankDetails: {
      accountNumber: String,
      accountHolderName: String,
      ifscCode: String,
      bankName: String,
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalStudents: { type: Number, default: 0 },
    totalCourses: { type: Number, default: 0 },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
  },
  { timestamps: true },
);

instituteSchema.index({ slug: 1 });
instituteSchema.index({ status: 1 });
instituteSchema.index({ rating: -1 });

const InstituteModel = mongoose.model<IInstitute>("Institute", instituteSchema);
export default InstituteModel;
