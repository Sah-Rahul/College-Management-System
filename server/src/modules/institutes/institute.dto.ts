export interface CreateInstituteDTO {
  name: string;
  description: string;
  type: string;
  email: string;
  phone: string;
  website?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  registrationNumber?: string;
  taxNumber?: string;
  bankDetails?: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
    bankName: string;
  };
}

export interface UpdateInstituteDTO {
  name?: string;
  description?: string;
  logo?: string;
  coverImage?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  bankDetails?: {
    accountNumber: string;
    accountHolderName: string;
    ifscCode: string;
    bankName: string;
  };
}

export interface GetInstitutesQueryDTO {
  status?: string;
  type?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
