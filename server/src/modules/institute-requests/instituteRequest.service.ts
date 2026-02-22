import {
  CreateInstituteRequestDTO,
  UpdateInstituteRequestDTO,
  ReviewInstituteRequestDTO,
  GetInstituteRequestsQueryDTO,
} from "./instituteRequest.dto";

export const createInstituteRequest = async (
  data: CreateInstituteRequestDTO,
  userId: string,
) => {
  // TODO: Create institute request
};

export const getAllInstituteRequests = async (
  query: GetInstituteRequestsQueryDTO,
) => {
  // TODO: Get all institute requests
};

export const getInstituteRequestById = async (requestId: string) => {
  // TODO: Get request by ID
};

export const getMyInstituteRequest = async (userId: string) => {
  // TODO: Get user's institute request
};

export const updateInstituteRequest = async (
  requestId: string,
  data: UpdateInstituteRequestDTO,
  userId: string,
) => {
  // TODO: Update institute request
};

export const deleteInstituteRequest = async (
  requestId: string,
  userId: string,
) => {
  // TODO: Delete/cancel request
};

export const reviewInstituteRequest = async (
  requestId: string,
  data: ReviewInstituteRequestDTO,
  reviewerId: string,
) => {
  // TODO: Approve/reject institute request
  // If approved, create Institute and update user role
};
