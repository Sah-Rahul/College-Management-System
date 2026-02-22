import { z } from "zod";

export const createAdmissionSchema = z.object({
  body: z.object({
    instituteId: z.string().min(1),
    type: z.enum(["regular", "lateral_entry", "transfer", "scholarship"]),
    program: z.string().optional(),
    batch: z.string().optional(),
    session: z.string().optional(),
    personalInfo: z.object({
      fatherName: z.string().optional(),
      motherName: z.string().optional(),
      guardianName: z.string().optional(),
      guardianContact: z.string().optional(),
      nationality: z.string().optional(),
      religion: z.string().optional(),
      category: z.string().optional(),
      bloodGroup: z.string().optional(),
    }),
    academicInfo: z.object({
      previousSchool: z.string().optional(),
      previousClass: z.string().optional(),
      previousPercentage: z.number().min(0).max(100).optional(),
      previousBoard: z.string().optional(),
    }),
    documents: z
      .array(
        z.object({
          type: z.string(),
          url: z.string().url(),
        }),
      )
      .min(1),
  }),
});

export const updateAdmissionSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    program: z.string().optional(),
    batch: z.string().optional(),
    session: z.string().optional(),
    personalInfo: z
      .object({
        fatherName: z.string().optional(),
        motherName: z.string().optional(),
        guardianName: z.string().optional(),
        guardianContact: z.string().optional(),
        nationality: z.string().optional(),
        religion: z.string().optional(),
        category: z.string().optional(),
        bloodGroup: z.string().optional(),
      })
      .optional(),
    academicInfo: z
      .object({
        previousSchool: z.string().optional(),
        previousClass: z.string().optional(),
        previousPercentage: z.number().min(0).max(100).optional(),
        previousBoard: z.string().optional(),
      })
      .optional(),
    documents: z
      .array(
        z.object({
          type: z.string(),
          url: z.string().url(),
        }),
      )
      .optional(),
  }),
});

export const reviewAdmissionSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    status: z.enum(["approved", "rejected"]),
    rejectionReason: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const getAdmissionsQuerySchema = z.object({
  query: z.object({
    instituteId: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    session: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
