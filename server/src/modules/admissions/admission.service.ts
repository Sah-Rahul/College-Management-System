import { Admission } from "./admission.model";
import {
  CreateAdmissionDTO,
  UpdateAdmissionDTO,
  ReviewAdmissionDTO,
  GetAdmissionsQueryDTO,
} from "./admission.dto";

export const createAdmission = async (
  data: CreateAdmissionDTO,
  userId: string,
) => {};

export const getAllAdmissions = async (query: GetAdmissionsQueryDTO) => {};

export const getAdmissionById = async (admissionId: string) => {};

export const updateAdmission = async (
  admissionId: string,
  data: UpdateAdmissionDTO,
  userId: string,
) => {};

export const deleteAdmission = async (
  admissionId: string,
  userId: string,
) => {};

export const reviewAdmission = async (
  admissionId: string,
  data: ReviewAdmissionDTO,
  reviewerId: string,
) => {};

export const withdrawAdmission = async (
  admissionId: string,
  reason: string,
  userId: string,
) => {};

export const getMyAdmissions = async (userId: string) => {};
