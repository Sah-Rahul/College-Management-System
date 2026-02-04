import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAssignment extends Document {
  course: mongoose.Types.ObjectId;
  teacher: mongoose.Types.ObjectId;

  title: string;
  description?: string;

  dueDate?: Date;
  totalMarks: number;

  attachments: string[];

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    description: { type: String, maxlength: 10000 },

    dueDate: { type: Date },
    totalMarks: { type: Number, default: 100, min: 0 },

    attachments: { type: [String], default: [] },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

assignmentSchema.index({ course: 1 });
assignmentSchema.index({ teacher: 1 });
assignmentSchema.index({ dueDate: 1 });
assignmentSchema.index({ isActive: 1 });

export const Assignment: Model<IAssignment> = mongoose.model<IAssignment>(
  "Assignment",
  assignmentSchema
);
