export interface CreateInstituteRequestDTO {
  instituteName: string;
  instituteType: string;
  description: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  registrationNumber?: string;
  documents?: Array<{
    type: string;
    url: string;
  }>;
  notes?: string;
}

export interface UpdateInstituteRequestDTO {
  instituteName?: string;
  instituteType?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  registrationNumber?: string;
  documents?: Array<{
    type: string;
    url: string;
  }>;
  notes?: string;
}

export interface ReviewInstituteRequestDTO {
  status: "approved" | "rejected";
  rejectionReason?: string;
  notes?: string;
}