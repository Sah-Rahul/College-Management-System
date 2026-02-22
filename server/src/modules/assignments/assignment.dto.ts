export interface CreateAssignmentDTO {
  courseId: string;
  sectionId?: string;
  lectureId?: string;
  title: string;
  description: string;
  instructions?: string;
  type: string;
  submissionType: string;
  gradingType: string;
  totalPoints: number;
  passingPoints: number;
  timeLimit?: number;
  attemptsAllowed: number;
  allowLateSubmission: boolean;
  latePenalty?: number;
  maxLateDays?: number;
  attachments?: Array<{
    type: string;
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
}

export interface UpdateAssignmentDTO {
  title?: string;
  description?: string;
  instructions?: string;
  type?: string;
  submissionType?: string;
  gradingType?: string;
  totalPoints?: number;
  passingPoints?: number;
  timeLimit?: number;
  attemptsAllowed?: number;
  allowLateSubmission?: boolean;
  latePenalty?: number;
  maxLateDays?: number;
  attachments?: Array<{
    type: string;
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
  requirePlagiarismCheck?: boolean;
  peerReview?: {
    enabled: boolean;
    reviewsRequired: number;
    reviewDeadline?: Date;
  };
  availableFrom?: Date;
  dueDate?: Date;
  lockDate?: Date;
  status?: string;
}

export interface SubmitAssignmentDTO {
  assignmentId: string;
  submissionText?: string;
  files?: Array<{
    filename: string;
    url: string;
    size: number;
    mimeType: string;
  }>;
  links?: string[];
}

export interface GradeAssignmentDTO {
  submissionId: string;
  points: number;
  rubricScores?: Array<{
    criteriaId: string;
    points: number;
  }>;
  feedback?: string;
}

export interface PeerReviewDTO {
  submissionId: string;
  rating: number;
  feedback: string;
  rubricScores?: Array<{
    criteriaId: string;
    points: number;
  }>;
}

export interface RequestResubmissionDTO {
  submissionId: string;
  reason: string;
}

export interface GetAssignmentsQueryDTO {
  courseId?: string;
  sectionId?: string;
  status?: string;
  type?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetSubmissionsQueryDTO {
  assignmentId?: string;
  userId?: string;
  status?: string;
  isLate?: boolean;
  isPassed?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AssignmentResponseDTO {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: string;
  status: string;
  totalPoints: number;
  passingPoints: number;
  dueDate?: Date;
  submissionCount?: number;
  gradedCount?: number;
  averageScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubmissionResponseDTO {
  id: string;
  assignmentId: string;
  userId: string;
  attemptNumber: number;
  status: string;
  isLate: boolean;
  isPassed: boolean;
  grade?: {
    points: number;
    percentage: number;
    feedback?: string;
  };
  submittedAt?: Date;
  gradedAt?: Date;
}
