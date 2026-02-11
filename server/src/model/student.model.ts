import { Schema, model, Types } from "mongoose";
import { UserRole } from "../@types/enums";

export interface IStudent {
  studentName: string;
  email: string;
  password: string;
  role: UserRole;
  studentImage?: string;
  isActive: boolean;
  enrolledInstitute: Types.ObjectId[];
  enrolledCourses: Types.ObjectId[];
}

const studentSchema = new Schema<IStudent>(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    enrolledCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    enrolledInstitute: [
      {
        type: Schema.Types.ObjectId,
        ref: "Institute",
        default: [],
      },
    ],
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
    studentImage: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const StudentModel = model<IStudent>("Student", studentSchema);

export default StudentModel;
