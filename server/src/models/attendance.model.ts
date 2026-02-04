import mongoose, { Schema, Document, Model } from "mongoose"; 
import { AttendanceStatus } from "../@types/enums";

export interface IAttendance extends Document {
  student: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;

  date: Date;
  status: AttendanceStatus;

  markedBy: mongoose.Types.ObjectId;

  note?: string;

  createdAt: Date;
  updatedAt: Date;
}

const attendanceSchema = new Schema<IAttendance>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    date: { type: Date, required: true },

    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      required: true,
    },

    markedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    note: { type: String, maxlength: 500 },
  },
  { timestamps: true }
);

 
attendanceSchema.index({ student: 1, course: 1, date: 1 }, { unique: true });

attendanceSchema.index({ course: 1, date: 1 });
attendanceSchema.index({ status: 1 });

export const Attendance: Model<IAttendance> = mongoose.model<IAttendance>(
  "Attendance",
  attendanceSchema
);
