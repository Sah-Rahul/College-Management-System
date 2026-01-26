import mongoose, { Schema, Document, Model } from "mongoose";
import { DayOfWeek } from "../enums/enums";

export interface ITimetable extends Document {
  course: mongoose.Types.ObjectId;
  semester: number;
  section: string;
  day: DayOfWeek;
  period: number;
  subject: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;
  startTime: string;
  endTime: string;
  room?: string;
  academicYear: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TimetableSchema = new Schema<ITimetable>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
    },
    section: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      enum: Object.values(DayOfWeek),
      required: true,
    },
    period: {
      type: Number,
      required: true,
      min: 1,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    room: String,
    academicYear: {
      type: String,
      required: true,
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

 
TimetableSchema.index(
  { course: 1, semester: 1, section: 1, day: 1, period: 1, academicYear: 1 },
  { unique: true },
);

export const Timetable: Model<ITimetable> = mongoose.model<ITimetable>(
  "Timetable",
  TimetableSchema,
);
