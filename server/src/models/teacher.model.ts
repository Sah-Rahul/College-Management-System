import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeacher extends Document {
  teacherName: string;
  email: string;
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
    teacherName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    employeeId: {
      type: String,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: "Department",
    },
    profilePicture:{
      type: String,
      default: ""
    },
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
