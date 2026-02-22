import mongoose, { Schema, Document } from "mongoose";
import { AdmissionStatus, AdmissionType } from "./admission.enums";

export interface IAdmission extends Document {
  admissionNumber: string;
  userId: mongoose.Types.ObjectId;
  instituteId: mongoose.Types.ObjectId;
  type: AdmissionType;
  status: AdmissionStatus;
  program?: string;
  batch?: string;
  session?: string; //  "2024-2025"
  applicationForm: {
    personalInfo: {
      fatherName?: string;
      motherName?: string;
      guardianName?: string;
      guardianContact?: string;
      nationality?: string;
      religion?: string;
      category?: string;
      bloodGroup?: string;
    };
    academicInfo: {
      previousSchool?: string;
      previousClass?: string;
      previousPercentage?: number;
      previousBoard?: string;
    };
    documents: Array<{
      type: string;
      url: string;
      uploadedAt: Date;
    }>;
  };
  fees: {
    total: number;
    paid: number;
    pending: number;
    dueDate?: Date;
  };
  enrolledCourses: mongoose.Types.ObjectId[];
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  withdrawnAt?: Date;
  withdrawReason?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const admissionSchema = new Schema<IAdmission>(
  {
    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    instituteId: {
      type: Schema.Types.ObjectId,
      ref: "Institute",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(AdmissionType),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(AdmissionStatus),
      default: AdmissionStatus.PENDING,
    },
    program: String,
    batch: String,
    session: String,
    applicationForm: {
      personalInfo: {
        fatherName: String,
        motherName: String,
        guardianName: String,
        guardianContact: String,
        nationality: String,
        religion: String,
        category: String,
        bloodGroup: String,
      },
      academicInfo: {
        previousSchool: String,
        previousClass: String,
        previousPercentage: Number,
        previousBoard: String,
      },
      documents: [
        {
          type: String,
          url: String,
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
    },
    fees: {
      total: { type: Number, default: 0 },
      paid: { type: Number, default: 0 },
      pending: { type: Number, default: 0 },
      dueDate: Date,
    },
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    approvedAt: Date,
    rejectedAt: Date,
    rejectionReason: String,
    withdrawnAt: Date,
    withdrawReason: String,
    notes: String,
  },
  { timestamps: true },
);

admissionSchema.index({ admissionNumber: 1 });
admissionSchema.index({ userId: 1, instituteId: 1 });
admissionSchema.index({ instituteId: 1, status: 1 });
admissionSchema.index({ createdAt: -1 });

// Generate unique admission number
admissionSchema.pre("save", async function (next) {
  if (!this.admissionNumber) {
    const year = new Date().getFullYear();
    const count = await mongoose.model("Admission").countDocuments();
    this.admissionNumber = `ADM${year}${String(count + 1).padStart(5, "0")}`;
  }
});

export const Admission = mongoose.model<IAdmission>(
  "Admission",
  admissionSchema,
);
