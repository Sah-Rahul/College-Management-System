import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole, UserRoleEnum } from "../enums/enums";

export interface ITeacher extends Document {
  teacherName: string;
  email: string;
  password: string;
  role: UserRole;    
  employeeId?: string;
  department: mongoose.Types.ObjectId;
  designation: string;
  qualification: string;
  profilePicture: string;
  experience: number;
  subjects: mongoose.Types.ObjectId[];
  joiningDate: Date;
}


const TeacherSchema = new Schema<ITeacher>(
  {
    teacherName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: UserRoleEnum.options,  
      default: "teacher",          
    },

    employeeId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    profilePicture: { type: String, default: "" },
    designation: String,
    qualification: String,
    experience: Number,
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    joiningDate: Date,
  },
  { timestamps: true },
);
export const TeacherModel: Model<ITeacher> = mongoose.model<ITeacher>(
  "Teacher",
  TeacherSchema,
);
