import { z } from 'zod';

export const createAssignmentSchema = z.object({
  body: z.object({
    courseId: z.string().min(1, 'Course ID is required'),
    sectionId: z.string().optional(),
    lectureId: z.string().optional(),
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(5000),
    instructions: z.string().max(10000).optional(),
    type: z.enum(['individual', 'group', 'peer_review', 'practical', 'project', 'essay', 'coding']),
    submissionType: z.enum(['file_upload', 'text_entry', 'link_submission', 'code_submission', 'mixed']),
    gradingType: z.enum(['points', 'percentage', 'letter_grade', 'pass_fail', 'rubric']),
    totalPoints: z.number().min(1),
    passingPoints: z.number().min(0),
    timeLimit: z.number().min(0).optional(),
    attemptsAllowed: z.number().min(0).max(5),
    allowLateSubmission: z.boolean(),
    latePenalty: z.number().min(0).max(100).optional(),
    maxLateDays: z.number().min(0).max(30).optional(),
    attachments: z.array(z.object({
      type: z.enum(['file', 'link', 'document']),
      name: z.string(),
      url: z.string().url(),
      size: z.number().optional(),
    })).optional(),
    rubric: z.array(z.object({
      criteria: z.string(),
      description: z.string().optional(),
      maxPoints: z.number().min(0),
    })).optional(),
    allowedFileTypes: z.array(z.string()).optional(),
    maxFileSize: z.number().optional(),
    maxFiles: z.number().min(1).max(10).optional(),
    requirePlagiarismCheck: z.boolean(),
    peerReview: z.object({
      enabled: z.boolean(),
      reviewsRequired: z.number().min(1).max(10),
      reviewDeadline: z.string().datetime().optional(),
    }).optional(),
    availableFrom: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
    lockDate: z.string().datetime().optional(),
  }),
});

// ========== UPDATE ASSIGNMENT SCHEMA ==========
export const updateAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(5).max(200).optional(),
    description: z.string().min(20).max(5000).optional(),
    instructions: z.string().max(10000).optional(),
    type: z.enum(['individual', 'group', 'peer_review', 'practical', 'project', 'essay', 'coding']).optional(),
    submissionType: z.enum(['file_upload', 'text_entry', 'link_submission', 'code_submission', 'mixed']).optional(),
    gradingType: z.enum(['points', 'percentage', 'letter_grade', 'pass_fail', 'rubric']).optional(),
    totalPoints: z.number().min(1).optional(),
    passingPoints: z.number().min(0).optional(),
    timeLimit: z.number().min(0).optional(),
    attemptsAllowed: z.number().min(0).max(5).optional(),
    allowLateSubmission: z.boolean().optional(),
    latePenalty: z.number().min(0).max(100).optional(),
    maxLateDays: z.number().min(0).max(30).optional(),
    status: z.enum(['draft', 'published', 'archived', 'deleted']).optional(),
    availableFrom: z.string().datetime().optional(),
    dueDate: z.string().datetime().optional(),
    lockDate: z.string().datetime().optional(),
  }),
});

// ========== SUBMIT ASSIGNMENT SCHEMA ==========
export const submitAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    submissionText: z.string().max(10000).optional(),
    files: z.array(z.object({
      filename: z.string(),
      url: z.string().url(),
      size: z.number(),
      mimeType: z.string(),
    })).max(10).optional(),
    links: z.array(z.string().url()).max(10).optional(),
  }),
});

// ========== GRADE ASSIGNMENT SCHEMA ==========
export const gradeAssignmentSchema = z.object({
  params: z.object({
    submissionId: z.string().min(1),
  }),
  body: z.object({
    points: z.number().min(0),
    rubricScores: z.array(z.object({
      criteriaId: z.string(),
      points: z.number().min(0),
    })).optional(),
    feedback: z.string().max(2000).optional(),
  }),
});

// ========== PEER REVIEW SCHEMA ==========
export const peerReviewSchema = z.object({
  params: z.object({
    submissionId: z.string().min(1),
  }),
  body: z.object({
    rating: z.number().min(1).max(5),
    feedback: z.string().min(10).max(1000),
    rubricScores: z.array(z.object({
      criteriaId: z.string(),
      points: z.number().min(0),
    })).optional(),
  }),
});

// ========== REQUEST RESUBMISSION SCHEMA ==========
export const requestResubmissionSchema = z.object({
  params: z.object({
    submissionId: z.string().min(1),
  }),
  body: z.object({
    reason: z.string().min(10).max(500),
  }),
});

// ========== GET ASSIGNMENTS QUERY SCHEMA ==========
export const getAssignmentsQuerySchema = z.object({
  query: z.object({
    courseId: z.string().optional(),
    sectionId: z.string().optional(),
    status: z.enum(['draft', 'published', 'archived', 'deleted']).optional(),
    type: z.enum(['individual', 'group', 'peer_review', 'practical', 'project', 'essay', 'coding']).optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

// ========== GET SUBMISSIONS QUERY SCHEMA ==========
export const getSubmissionsQuerySchema = z.object({
  query: z.object({
    assignmentId: z.string().optional(),
    userId: z.string().optional(),
    status: z.enum(['not_submitted', 'draft', 'submitted', 'resubmitted', 'graded', 'returned', 'late', 'missing']).optional(),
    isLate: z.string().transform(val => val === 'true').optional(),
    isPassed: z.string().transform(val => val === 'true').optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
  }),
});

// ========== GET ASSIGNMENT BY ID SCHEMA ==========
export const getAssignmentByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

// ========== DELETE ASSIGNMENT SCHEMA ==========
export const deleteAssignmentSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});