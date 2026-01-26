import mongoose, { Schema, Document, Model } from "mongoose";
import { ExamStatus, ExamType } from "../enums/enums";

export interface IExam extends Document {
  name: string;
  type: ExamType;
  course: mongoose.Types.ObjectId;
  semester: number;
  section?: string;
  academicYear: string;
  startDate: Date;
  endDate: Date;
  status: ExamStatus;
  isResultPublished: boolean;
  resultPublishedDate?: Date;
  description?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<IExam>(
  {
    name: {
      type: String,
      required: [true, "Exam name is required"],
      trim: true,
      maxlength: 200,
    },
    type: {
      type: String,
      enum: Object.values(ExamType),
      required: [true, "Exam type is required"],
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: 1,
      max: 12,
    },
    section: {
      type: String,
      trim: true,
      uppercase: true,
    },
    academicYear: {
      type: String,
      required: [true, "Academic year is required"],
      match: /^\d{4}-\d{4}$/,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    status: {
      type: String,
      enum: Object.values(ExamStatus),
      default: ExamStatus.SCHEDULED,
    },
    isResultPublished: {
      type: Boolean,
      default: false,
    },
    resultPublishedDate: {
      type: Date,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Indexes
ExamSchema.index({ course: 1, semester: 1, academicYear: 1, type: 1 });
ExamSchema.index({ status: 1 });
ExamSchema.index({ startDate: 1, endDate: 1 });

 
ExamSchema.pre("save", function () {
  if (this.endDate < this.startDate) {
    throw new Error("End date must be after start date");
  }
});


export const Exam: Model<IExam> = mongoose.model<IExam>("Exam", ExamSchema);
