import mongoose, { Schema, Document, Model } from "mongoose"; 
import { AssignmentSubmissionStatus } from "../@types/enums";

export interface IAssignmentSubmission extends Document {
  assignment: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;

  student: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;

  files: string[];
  textAnswer?: string;

  status: AssignmentSubmissionStatus;

  submittedAt?: Date;

  marksObtained?: number;
  teacherFeedback?: string;
  reviewedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const assignmentSubmissionSchema = new Schema<IAssignmentSubmission>(
  {
    assignment: { type: Schema.Types.ObjectId, ref: "Assignment", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },

    files: { type: [String], default: [] },
    textAnswer: { type: String, maxlength: 20000 },

    status: {
      type: String,
      enum: Object.values(AssignmentSubmissionStatus),
      default: AssignmentSubmissionStatus.SUBMITTED,
    },

    submittedAt: { type: Date },

    marksObtained: { type: Number, min: 0 },
    teacherFeedback: { type: String, maxlength: 5000 },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

 
assignmentSubmissionSchema.index({ assignment: 1, student: 1 }, { unique: true });

assignmentSubmissionSchema.index({ course: 1 });
assignmentSubmissionSchema.index({ student: 1 });
assignmentSubmissionSchema.index({ teacher: 1 });
assignmentSubmissionSchema.index({ status: 1 });

export const AssignmentSubmission: Model<IAssignmentSubmission> =
  mongoose.model<IAssignmentSubmission>(
    "AssignmentSubmission",
    assignmentSubmissionSchema
  );
