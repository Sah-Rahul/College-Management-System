import mongoose, { Schema, Document, Model } from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export interface ITask extends Document {
  title: string;
  description: string;
  assignedBy: mongoose.Types.ObjectId; // Teacher/Admin
  assignedTo: mongoose.Types.ObjectId; // Student
  subject?: mongoose.Types.ObjectId;
  dueDate: Date;
  status: TaskStatus;
  priority: TaskPriority;
  attachments?: string[];
  submittedAt?: Date;
  submissionFile?: string;
  submissionText?: string;
  marks?: number;
  totalMarks?: number;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      maxlength: 2000,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
    attachments: [
      {
        type: String,
      },
    ],
    submittedAt: Date,
    submissionFile: String,
    submissionText: {
      type: String,
      maxlength: 5000,
    },
    marks: {
      type: Number,
      min: 0,
    },
    totalMarks: {
      type: Number,
      min: 0,
    },
    feedback: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  },
);

TaskSchema.index({ assignedTo: 1, status: 1 });
TaskSchema.index({ assignedBy: 1 });
TaskSchema.index({ dueDate: 1 });
TaskSchema.index({ subject: 1 });

export const Task: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);
