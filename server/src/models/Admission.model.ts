import mongoose, { Schema, Document, Model } from "mongoose";

export enum AdmissionStatus {
  PENDING = "pending",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  REJECTED = "rejected",
  WAITLISTED = "waitlisted",
}

export enum QualificationType {
  HIGH_SCHOOL = "high_school",
  INTERMEDIATE = "intermediate",
  GRADUATION = "graduation",
  POST_GRADUATION = "post_graduation",
}

interface IEducationDetails {
  qualificationType: QualificationType;
  boardUniversity: string;
  passingYear: number;
  percentage: number;
  rollNumber?: string;
  certificateUrl?: string;
}

interface IDocuments {
  photo?: string;
  signature?: string;
  tenthMarksheet?: string;
  transferCertificate?: string;
}

export interface IAdmission extends Document {
  applicationNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  category: string;
  address: string;
  city: string;
  state: string;
  pincode: string;

  // Guardian details
  guardianName: string;
  guardianPhone: string;
  guardianRelation: string;

  // Academic details
  courseApplied: mongoose.Types.ObjectId;
  preferredSection?: string;
  educationDetails: IEducationDetails[];

  // Documents
  documents: IDocuments;

  // Application status
  status: AdmissionStatus;
  appliedDate: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedDate?: Date;
  reviewComments?: string;

  // If approved
  studentId?: mongoose.Types.ObjectId;
  rollNumber?: string;
  admissionDate?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const EducationDetailsSchema = new Schema<IEducationDetails>(
  {
    qualificationType: {
      type: String,
      enum: Object.values(QualificationType),
      required: true,
    },
    boardUniversity: {
      type: String,
      required: true,
      trim: true,
    },
    passingYear: {
      type: Number,
      required: true,
      min: 1950,
      max: new Date().getFullYear(),
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    rollNumber: String,
    certificateUrl: String,
  },
  { _id: false },
);

const DocumentsSchema = new Schema<IDocuments>(
  {
    photo: String,
    signature: String,
    tenthMarksheet: String,
    transferCertificate: String,
  },
  { _id: false },
);

const AdmissionSchema = new Schema<IAdmission>(
  {
    applicationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    applicantName: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: /^[0-9]{10}$/,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      maxlength: 500,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: /^[0-9]{6}$/,
    },
    guardianName: {
      type: String,
      required: [true, "Guardian name is required"],
      trim: true,
    },
    guardianPhone: {
      type: String,
      required: [true, "Guardian phone is required"],
      match: /^[0-9]{10}$/,
    },
    guardianRelation: {
      type: String,
      required: [true, "Guardian relation is required"],
      trim: true,
    },
    courseApplied: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    preferredSection: {
      type: String,
      trim: true,
      uppercase: true,
    },
    educationDetails: [EducationDetailsSchema],
    documents: {
      type: DocumentsSchema,
      default: {},
    },
    status: {
      type: String,
      enum: Object.values(AdmissionStatus),
      default: AdmissionStatus.PENDING,
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedDate: Date,
    reviewComments: {
      type: String,
      maxlength: 1000,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rollNumber: {
      type: String,
      sparse: true,
      uppercase: true,
    },
    admissionDate: Date,
  },
  {
    timestamps: true,
  },
);

// Indexes
AdmissionSchema.index({ applicationNumber: 1 });
AdmissionSchema.index({ email: 1 });
AdmissionSchema.index({ phone: 1 });
AdmissionSchema.index({ status: 1, appliedDate: -1 });
AdmissionSchema.index({ courseApplied: 1, status: 1 });

export const Admission: Model<IAdmission> = mongoose.model<IAdmission>(
  "Admission",
  AdmissionSchema,
);
