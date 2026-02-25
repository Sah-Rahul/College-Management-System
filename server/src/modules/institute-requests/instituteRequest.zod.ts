import { z } from "zod";

export const createInstituteRequestSchema = z.object({
  instituteName: z.string().min(3).max(100),
  instituteType: z.enum([
    "training_center",
    "online_platform",
    "coaching_center",
  ]),
  description: z.string().min(50).max(2000),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    pincode: z.string(),
  }),
  registrationNumber: z.string().optional(), 
});

export const updateInstituteRequestSchema = z.object({
  instituteName: z.string().min(3).max(100).optional(),
  instituteType: z
    .enum(["training_center", "online_platform", "coaching_center"])
    .optional(),
  description: z.string().min(50).max(2000).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      pincode: z.string(),
    })
    .optional(),
  registrationNumber: z.string().optional(),
  documents: z
    .array(
      z.object({
        type: z.string(),
        url: z.string().url(),
      }),
    )
    .optional(),
  notes: z.string().optional(),
});

export const reviewInstituteRequestSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  rejectionReason: z.string().optional(),
  notes: z.string().optional(),
});

 
