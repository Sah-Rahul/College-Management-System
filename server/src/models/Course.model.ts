import mongoose, { Schema, Document, Model } from "mongoose";

export enum CourseLevel {
  UNDERGRADUATE = "undergraduate",
  POSTGRADUATE = "postgraduate",
  DIPLOMA = "diploma",
}

export interface ICourse extends Document {
  name: string;
  code: string;
  level: CourseLevel;
  department: mongoose.Types.ObjectId;
  duration: number; // in years
  totalSemesters: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    level: {
      type: String,
      enum: Object.values(CourseLevel),
      required: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    totalSemesters: {
      type: Number,
      required: true,
    },
    description: String,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

CourseSchema.index({ code: 1 });
CourseSchema.index({ department: 1 });

export const Course: Model<ICourse> = mongoose.model<ICourse>(
  "Course",
  CourseSchema,
);
