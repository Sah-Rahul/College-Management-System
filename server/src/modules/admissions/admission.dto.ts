export interface CreateAdmissionDTO {
  instituteId: string;
  type: string;
  program?: string;
  batch?: string;
  session?: string;
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
  }>;
}

export interface UpdateAdmissionDTO {
  program?: string;
  batch?: string;
  session?: string;
  personalInfo?: {
    fatherName?: string;
    motherName?: string;
    guardianName?: string;
    guardianContact?: string;
    nationality?: string;
    religion?: string;
    category?: string;
    bloodGroup?: string;
  };
  academicInfo?: {
    previousSchool?: string;
    previousClass?: string;
    previousPercentage?: number;
    previousBoard?: string;
  };
  documents?: Array<{
    type: string;
    url: string;
  }>;
}

export interface ReviewAdmissionDTO {
  status: "approved" | "rejected";
  rejectionReason?: string;
  notes?: string;
}

export interface GetAdmissionsQueryDTO {
  instituteId?: string;
  status?: string;
  type?: string;
  session?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
