import InstituteRequestModel, {
  IInstituteRequest,
} from "./instituteRequest.model";
import {
  CreateInstituteRequestDTO,
  UpdateInstituteRequestDTO,
  ReviewInstituteRequestDTO,
} from "./instituteRequest.dto";
import { InstituteRequestStatus } from "./instituteRequest.enums";
import {
  INSTITUTE_REQUEST_CONSTANTS,
  INSTITUTE_REQUEST_MESSAGES,
} from "./instituteRequest.constants";
import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError";
import { HTTP_STATUS } from "../../constant/httpStatus";
import { uploadToCloudinary } from "../../config/cloudinary.config";
import cloudinary from "../../config/cloudinary.config";

export const createInstituteRequestService = async (
  data: CreateInstituteRequestDTO,
  userId: string,
  files: Express.Multer.File[],
): Promise<IInstituteRequest> => {
  if (files.length > INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENTS) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      `Maximum ${INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENTS} documents allowed`,
    );
  }

  const documents: IInstituteRequest["documents"] = [];

  for (const file of files) {
    if (
      !INSTITUTE_REQUEST_CONSTANTS.ALLOWED_DOCUMENT_TYPES.includes(
        file.mimetype,
      )
    ) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `File type not allowed: ${file.originalname}`,
      );
    }

    if (file.size > INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENT_SIZE) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        `File too large: ${file.originalname}`,
      );
    }

    const uploaded = await uploadToCloudinary(
      file.buffer,
      "institute-documents",
    );

    documents!.push({
      type: file.mimetype,
      url: uploaded.secure_url,
      publicId: uploaded.public_id,
      uploadedAt: new Date(),
    });
  }

  const request = await InstituteRequestModel.create({
    ...data,
    documents,
    userId: new mongoose.Types.ObjectId(userId),
    status: InstituteRequestStatus.PENDING,
  });

  return request;
};

export const getAllInstituteRequests = async (): Promise<
  IInstituteRequest[]
> => {
  return InstituteRequestModel.find().sort({ createdAt: -1 });
};

export const getInstituteRequestById = async (
  id: string,
): Promise<IInstituteRequest> => {
  const request = await InstituteRequestModel.findById(id);
  if (!request)
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTITUTE_REQUEST_MESSAGES.NOT_FOUND,
    );
  return request;
};

export const getMyInstituteRequest = async (
  userId: string,
): Promise<IInstituteRequest[]> => {
  return InstituteRequestModel.find({
    userId: new mongoose.Types.ObjectId(userId),
  }).sort({ createdAt: -1 });
};

export const updateInstituteRequestService = async (
  requestId: string,
  data: UpdateInstituteRequestDTO,
  userId: string,
  files?: Express.Multer.File[],
): Promise<IInstituteRequest> => {
  const request = await InstituteRequestModel.findById(requestId);
  if (!request)
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTITUTE_REQUEST_MESSAGES.NOT_FOUND,
    );

  if (request.userId.toString() !== userId)
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      INSTITUTE_REQUEST_MESSAGES.UNAUTHORIZED,
    );

  const isPending = request.status === InstituteRequestStatus.PENDING;

  if (files && files.length > 0 && !isPending) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Documents can only be updated when request is PENDING",
    );
  }

  if (isPending) {
    Object.assign(request, data);

    if (files && files.length > 0) {
      if (files.length > INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENTS)
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          `Maximum ${INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENTS} documents allowed`,
        );

      for (const doc of request.documents || []) {
        if (doc.publicId) {
          try {
            await cloudinary.uploader.destroy(doc.publicId);
          } catch (err) {
            console.warn("Failed to delete old cloud file:", doc.publicId);
          }
        }
      }

      const newDocuments: IInstituteRequest["documents"] = [];

      for (const file of files) {
        if (
          !INSTITUTE_REQUEST_CONSTANTS.ALLOWED_DOCUMENT_TYPES.includes(
            file.mimetype,
          )
        ) {
          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            `File type not allowed: ${file.originalname}`,
          );
        }

        if (file.size > INSTITUTE_REQUEST_CONSTANTS.MAX_DOCUMENT_SIZE) {
          throw new ApiError(
            HTTP_STATUS.BAD_REQUEST,
            `File too large: ${file.originalname}`,
          );
        }

        for (const file of files) {
          const uploaded = await uploadToCloudinary(
            file.buffer,
            "institute-documents",
          );

          newDocuments.push({
            type: file.mimetype,
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            uploadedAt: new Date(),
          });
        }
      }

      request.documents = newDocuments;
    }
  } else {
    if (data.notes) {
      request.notes = data.notes;
    }
  }

  await request.save();
  return request;
};

export const deleteInstituteRequestService = async (
  requestId: string,
  userId: string,
): Promise<void> => {
  const request = await InstituteRequestModel.findById(requestId);
  if (!request)
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTITUTE_REQUEST_MESSAGES.NOT_FOUND,
    );

  if (request.userId.toString() !== userId) {
    console.warn("Admin deleting another user's request");
  }

  for (const doc of request.documents || []) {
    if (doc.publicId) {
      try {
        await cloudinary.uploader.destroy(doc.publicId);
      } catch (err) {
        console.warn("Failed to delete cloud file:", doc.publicId);
      }
    }
  }

  await request.deleteOne();
};

export const reviewInstituteRequestService = async (
  requestId: string,
  data: ReviewInstituteRequestDTO,
  reviewerId: string,
): Promise<IInstituteRequest> => {
  const request = await InstituteRequestModel.findById(requestId);
  if (!request)
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      INSTITUTE_REQUEST_MESSAGES.NOT_FOUND,
    );

  if (request.status !== InstituteRequestStatus.PENDING)
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      INSTITUTE_REQUEST_MESSAGES.ALREADY_PROCESSED,
    );

  request.status =
    data.status === "approved"
      ? InstituteRequestStatus.APPROVED
      : InstituteRequestStatus.REJECTED;
  request.reviewedBy = new mongoose.Types.ObjectId(reviewerId);
  request.reviewedAt = new Date();
  if (data.rejectionReason) request.rejectionReason = data.rejectionReason;
  if (data.notes) request.notes = data.notes;

  await request.save();
  return request;
};

export const acceptOrRejectInstituteRequestService = async (
  requestId: string,
  data: ReviewInstituteRequestDTO,
  reviewerId: string,
): Promise<IInstituteRequest> => {
  const request = await InstituteRequestModel.findById(requestId);
  if (!request) throw new ApiError(HTTP_STATUS.NOT_FOUND);

  if (request.status !== InstituteRequestStatus.PENDING)
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      INSTITUTE_REQUEST_MESSAGES.ALREADY_PROCESSED,
    );

  request.status =
    data.status === "approved"
      ? InstituteRequestStatus.APPROVED
      : InstituteRequestStatus.REJECTED;
  request.reviewedBy = new mongoose.Types.ObjectId(reviewerId);
  request.reviewedAt = new Date();
  if (data.rejectionReason && data.status === "rejected")
    request.rejectionReason = data.rejectionReason;
  if (data.notes) request.notes = data.notes;

  await request.save();
  return request;
};
