import { z } from "zod";

export const createInstituteSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(50).max(2000),
    type: z.enum([
      "university",
      "college",
      "school",
      "training_center",
      "online_platform",
      "coaching_center",
    ]),
    email: z.string().email(),
    phone: z.string().min(10),
    website: z.string().url().optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      pincode: z.string(),
    }),
    registrationNumber: z.string().optional(),
    taxNumber: z.string().optional(),
    bankDetails: z
      .object({
        accountNumber: z.string(),
        accountHolderName: z.string(),
        ifscCode: z.string(),
        bankName: z.string(),
      })
      .optional(),
  }),
});

export const updateInstituteSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(3).max(100).optional(),
    description: z.string().min(50).max(2000).optional(),
    logo: z.string().url().optional(),
    coverImage: z.string().url().optional(),
    email: z.string().email().optional(),
    phone: z.string().min(10).optional(),
    website: z.string().url().optional(),
    address: z
      .object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        pincode: z.string(),
      })
      .optional(),
    socialLinks: z
      .object({
        facebook: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        instagram: z.string().url().optional(),
      })
      .optional(),
    bankDetails: z
      .object({
        accountNumber: z.string(),
        accountHolderName: z.string(),
        ifscCode: z.string(),
        bankName: z.string(),
      })
      .optional(),
  }),
});

export const getInstitutesQuerySchema = z.object({
  query: z.object({
    status: z.string().optional(),
    type: z.string().optional(),
    search: z.string().optional(),
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
