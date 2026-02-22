import mongoose, { Schema, Document } from "mongoose";
import { AssignmentStatus, AssignmentType, GradingType, SubmissionType } from "./assignment.enums";

export interface IAssignment extends Document {
  courseId: mongoose.Types.ObjectId;
  sectionId?: string;
  lectureId?: string;
  title: string;
  description: string;
  instructions?: string;
  type: AssignmentType;
  status: AssignmentStatus;
  submissionType: SubmissionType;
  gradingType: GradingType;
  totalPoints: number;
  passingPoints: number;
  timeLimit?: number;
  attemptsAllowed: number;
  allowLateSubmission: boolean;
  latePenalty?: number;
  maxLateDays?: number;
  attachments?: Array<{
    type: "file" | "link" | "document";
    name: string;
    url: string;
    size?: number;
  }>;
  rubric?: Array<{
    criteria: string;
    description: string;
    maxPoints: number;
  }>;
  allowedFileTypes?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  requirePlagiarismCheck: boolean;
  peerReview?: {
    enabled: boolean;
    reviewsRequired: number;
    reviewDeadline?: Date;
  };
  availableFrom?: Date;
  dueDate?: Date;
  lockDate?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    sectionId: String,
    lectureId: String,
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    instructions: String,
    type: {
      type: String,
      enum: Object.values(AssignmentType),
      default: AssignmentType.INDIVIDUAL,
    },
    status: {
      type: String,
      enum: Object.values(AssignmentStatus),
      default: AssignmentStatus.DRAFT,
    },
    submissionType: {
      type: String,
      enum: Object.values(SubmissionType),
      default: SubmissionType.FILE_UPLOAD,
    },
    gradingType: {
      type: String,
      enum: Object.values(GradingType),
      default: GradingType.POINTS,
    },
    totalPoints: { type: Number, required: true, min: 1 },
    passingPoints: { type: Number, required: true, min: 0 },
    timeLimit: { type: Number, default: 0 },
    attemptsAllowed: { type: Number, default: 1 },
    allowLateSubmission: { type: Boolean, default: true },
    latePenalty: { type: Number, default: 10, min: 0, max: 100 },
    maxLateDays: { type: Number, default: 7 },
    attachments: [
      {
        type: { type: String, enum: ["file", "link", "document"] },
        name: String,
        url: String,
        size: Number,
      },
    ],
    rubric: [
      {
        criteria: { type: String, required: true },
        description: String,
        maxPoints: { type: Number, required: true },
      },
    ],
    allowedFileTypes: [String],
    maxFileSize: { type: Number, default: 50 * 1024 * 1024 }, // 50MB
    maxFiles: { type: Number, default: 5 },
    requirePlagiarismCheck: { type: Boolean, default: false },
    peerReview: {
      enabled: { type: Boolean, default: false },
      reviewsRequired: { type: Number, default: 3 },
      reviewDeadline: Date,
    },
    availableFrom: Date,
    dueDate: Date,
    lockDate: Date,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

assignmentSchema.index({ courseId: 1, status: 1 });
assignmentSchema.index({ sectionId: 1, lectureId: 1 });
assignmentSchema.index({ dueDate: 1 });

export const Assignment = mongoose.model<IAssignment>(
  "Assignment",
  assignmentSchema,
);
