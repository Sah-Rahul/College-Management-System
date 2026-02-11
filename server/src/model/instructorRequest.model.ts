import { Schema, model } from "mongoose";
import { InstructorRequestStatus, UserRole } from "../@types/enums";

export interface IInstructorRequest {
  fullName: string;
  email: string;
  role: UserRole;
  experience: string;
  bio?: string;
  InstructorImage?: string;
  status: InstructorRequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

const instructorRequestSchema = new Schema<IInstructorRequest>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.INSTRUCTOR,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
      default: "Not specified",
    },
    InstructorImage: {
      type: String,
      default: "",
      required: false,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(InstructorRequestStatus),
      default: InstructorRequestStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const InstructorRequestModel = model<IInstructorRequest>(
  "InstructorRequest",
  instructorRequestSchema
);
