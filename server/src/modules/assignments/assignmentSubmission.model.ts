import mongoose, { Schema, Document } from "mongoose";
import { PlagiarismStatus, SubmissionStatus } from "./assignment.enums";

export interface ISubmission {
  submissionText?: string;
  files?: Array<{
    filename: string;
    url: string;
    size: number;
    mimeType: string;
    uploadedAt: Date;
  }>;
  links?: string[];
  submittedAt: Date;
}

export interface IGrade {
  points: number;
  percentage: number;
  rubricScores?: Array<{
    criteriaId: mongoose.Types.ObjectId;
    points: number;
  }>;
  feedback?: string;
  gradedBy: mongoose.Types.ObjectId;
  gradedAt: Date;
}

export interface IPeerReview {
  reviewerId: mongoose.Types.ObjectId;
  rating: number; // 1-5
  feedback: string;
  rubricScores?: Array<{
    criteriaId: mongoose.Types.ObjectId;
    points: number;
  }>;
  submittedAt: Date;
}

export interface IAssignmentSubmission extends Document {
  assignmentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrollmentId: mongoose.Types.ObjectId;
  attemptNumber: number;
  status: SubmissionStatus;
  submissions: ISubmission[];
  currentSubmission?: ISubmission;
  grade?: IGrade;
  peerReviews?: IPeerReview[];
  averagePeerScore?: number;
  plagiarismCheck?: {
    status: PlagiarismStatus;
    score: number;
    report?: string;
    checkedAt: Date;
  };
  isLate: boolean;
  lateDays?: number;
  penaltyApplied?: number;
  isPassed: boolean;
  resubmissionRequested?: boolean;
  resubmissionReason?: string;
  lastSubmittedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSubmissionSchema = new Schema<IAssignmentSubmission>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrollmentId: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    attemptNumber: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(SubmissionStatus),
      default: SubmissionStatus.NOT_SUBMITTED,
    },
    submissions: [
      {
        submissionText: String,
        files: [
          {
            filename: String,
            url: String,
            size: Number,
            mimeType: String,
            uploadedAt: { type: Date, default: Date.now },
          },
        ],
        links: [String],
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    currentSubmission: {
      submissionText: String,
      files: [
        {
          filename: String,
          url: String,
          size: Number,
          mimeType: String,
          uploadedAt: Date,
        },
      ],
      links: [String],
      submittedAt: Date,
    },
    grade: {
      points: { type: Number, min: 0 },
      percentage: { type: Number, min: 0, max: 100 },
      rubricScores: [
        {
          criteriaId: mongoose.Types.ObjectId,
          points: Number,
        },
      ],
      feedback: String,
      gradedBy: { type: Schema.Types.ObjectId, ref: "User" },
      gradedAt: Date,
    },
    peerReviews: [
      {
        reviewerId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, min: 1, max: 5 },
        feedback: String,
        rubricScores: [
          {
            criteriaId: mongoose.Types.ObjectId,
            points: Number,
          },
        ],
        submittedAt: { type: Date, default: Date.now },
      },
    ],
    averagePeerScore: Number,
    plagiarismCheck: {
      status: {
        type: String,
        enum: Object.values(PlagiarismStatus),
        default: PlagiarismStatus.NOT_CHECKED,
      },
      score: { type: Number, min: 0, max: 100 },
      report: String,
      checkedAt: Date,
    },
    isLate: { type: Boolean, default: false },
    lateDays: Number,
    penaltyApplied: Number,
    isPassed: { type: Boolean, default: false },
    resubmissionRequested: { type: Boolean, default: false },
    resubmissionReason: String,
    lastSubmittedAt: Date,
  },
  { timestamps: true },
);

assignmentSubmissionSchema.index(
  { assignmentId: 1, userId: 1, attemptNumber: 1 },
  { unique: true },
);
assignmentSubmissionSchema.index({ userId: 1, status: 1 });
assignmentSubmissionSchema.index({ courseId: 1, assignmentId: 1 });
assignmentSubmissionSchema.index({ "grade.gradedAt": -1 });

export const AssignmentSubmission = mongoose.model<IAssignmentSubmission>(
  "AssignmentSubmission",
  assignmentSubmissionSchema,
);
