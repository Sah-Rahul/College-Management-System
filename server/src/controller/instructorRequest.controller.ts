import { Response } from "express";
import asyncHandler from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthRequest } from "../@types/auth.types";
import { InstructorRequestModel } from "../model/instructorRequest.model";
import { InstructorRequestStatus, UserRole } from "../@types/enums";
import { uploadToCloudinary } from "../config/cloudinary.config";

export const createInstructorRequest = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { fullName, email, bio, experience } = req.body;

    const existing = await InstructorRequestModel.findOne({
      email,
      status: InstructorRequestStatus.PENDING,
    });
    if (existing)
      throw new ApiError(
        400,
        "You already have a pending request with this email",
      );

    let instructorImageUrl = "";
    if (req.file) {
      const buffer = req.file.buffer;
      const cloudResult = await uploadToCloudinary(buffer, "instructors");
      instructorImageUrl = cloudResult.secure_url;
    }

    const request = await InstructorRequestModel.create({
      fullName,
      email,
      bio: bio ?? "",
      experience: experience ?? "Not specified",
      role: UserRole.INSTRUCTOR,
      InstructorImage: instructorImageUrl,
    });

    res
      .status(201)
      .json(new ApiResponse(201, request, "Instructor request created"));
  },
);

export const updateInstructorRequest = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const requestId = req.params.id;
    const { fullName, email, bio, experience } = req.body;

    const request = await InstructorRequestModel.findById(requestId);
    if (!request) throw new ApiError(404, "Request not found");
    if (request.status !== InstructorRequestStatus.PENDING)
      throw new ApiError(400, "Cannot update processed request");

    if (req.file) {
      const buffer = req.file.buffer;
      const cloudResult = await uploadToCloudinary(buffer, "instructors");
      request.InstructorImage = cloudResult.secure_url;
    }

    request.fullName = fullName ?? request.fullName;
    request.email = email ?? request.email;
    request.bio = bio ?? request.bio;
    request.experience = experience ?? request.experience;

    await request.save();

    res
      .status(200)
      .json(new ApiResponse(200, request, "Instructor request updated"));
  },
);

export const cancelInstructorRequest = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const requestId = req.params.id;

    const request = await InstructorRequestModel.findById(requestId);
    if (!request) throw new ApiError(404, "Request not found");
    if (request.status !== InstructorRequestStatus.PENDING)
      throw new ApiError(400, "Cannot cancel processed request");

    request.status = InstructorRequestStatus.CANCELLED;
    await request.save();

    res
      .status(200)
      .json(new ApiResponse(200, request, "Instructor request canceled"));
  },
);

export const approveInstructorRequest = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const requestId = req.params.id;

    if (!req.user || req.user.role !== UserRole.ADMIN)
      throw new ApiError(403, "Only admin can approve requests");

    const request = await InstructorRequestModel.findById(requestId);
    if (!request) throw new ApiError(404, "Request not found");
    if (request.status !== InstructorRequestStatus.PENDING)
      throw new ApiError(400, "Request already processed");

    request.status = InstructorRequestStatus.APPROVED;
    await request.save();

    res
      .status(200)
      .json(new ApiResponse(200, request, "Instructor request approved"));
  },
);

export const rejectInstructorRequest = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const requestId = req.params.id;

    if (!req.user || req.user.role !== UserRole.ADMIN)
      throw new ApiError(403, "Only admin can reject requests");

    const request = await InstructorRequestModel.findById(requestId);
    if (!request) throw new ApiError(404, "Request not found");
    if (request.status !== InstructorRequestStatus.PENDING)
      throw new ApiError(400, "Request already processed");

    request.status = InstructorRequestStatus.REJECTED;
    await request.save();

    res
      .status(200)
      .json(new ApiResponse(200, request, "Instructor request rejected"));
  },
);

export const getAllInstructorRequests = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    if (!req.user || req.user.role !== UserRole.ADMIN)
      throw new ApiError(403, "Only admin can view requests");

    const requests = await InstructorRequestModel.find().sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          requests,
          "Instructor requests fetched successfully",
        ),
      );
  },
);

export const deleteInstructorRequest = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const requestId = req.params.id;

    if (!req.user || req.user.role !== UserRole.ADMIN)
      throw new ApiError(403, "Only admin can delete requests");

    const request = await InstructorRequestModel.findByIdAndDelete(requestId);
    if (!request) throw new ApiError(404, "Request not found");

    res
      .status(200)
      .json(new ApiResponse(200, request, "Instructor request deleted"));
  },
);
