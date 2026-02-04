import { z } from "zod";
import { objectId } from "./common.zod"; 
import { LeaveStatus } from "../@types/enums";

export const CreateLeaveRequestSchema = z
  .object({
    requester: objectId,

    fromDate: z.coerce.date(),
    toDate: z.coerce.date(),

    reason: z.string().min(2).max(5000),
  })
  .refine((data) => data.toDate >= data.fromDate, {
    message: "toDate must be greater than or equal to fromDate",
  });

export const UpdateLeaveRequestSchema = z.object({
  status: z.nativeEnum(LeaveStatus).optional(),

  reviewedBy: objectId.optional(),
  reviewedAt: z.coerce.date().optional(),

  rejectionReason: z.string().max(2000).optional(),
});
