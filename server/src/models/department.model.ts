import mongoose, { Schema, Document, Model } from "mongoose";
import { CollegeDepartment } from "../enums/enums";

export interface IDepartment extends Document {
  name: CollegeDepartment;
  code: string;
  description?: string;
  hod?: mongoose.Types.ObjectId;
  totalStudents: number;
  totalTeachers: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      enum: Object.values(CollegeDepartment),
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
      required: [true, "Department code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: String,
    hod: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalStudents: {
      type: Number,
      default: 0,
    },
    totalTeachers: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
DepartmentSchema.index({ code: 1 });

export const Department: Model<IDepartment> = mongoose.model<IDepartment>(
  "Department",
  DepartmentSchema,
);
