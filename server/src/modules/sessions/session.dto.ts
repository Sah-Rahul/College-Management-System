export interface CreateSessionDTO {
  userId: string;
  sessionToken: string;
  refreshToken: string;
  device: {
    type: string;
    name?: string;
    os?: string;
    browser?: string;
    version?: string;
  };
  ipAddress: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  };
  userAgent: string;
  expiresAt: Date;
}

export interface UpdateSessionDTO {
  lastActivity?: Date;
}

export interface GetSessionsQueryDTO {
  userId?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
