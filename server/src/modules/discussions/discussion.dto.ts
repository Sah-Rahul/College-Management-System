export interface CreateDiscussionDTO {
  courseId: string;
  title: string;
  content: string;
  category: string;
  tags?: string[];
}

export interface UpdateDiscussionDTO {
  title?: string;
  content?: string;
  category?: string;
  tags?: string[];
}

export interface CreateReplyDTO {
  content: string;
}

export interface GetDiscussionsQueryDTO {
  courseId?: string;
  category?: string;
  status?: string;
  tags?: string[];
  search?: string;
  isPinned?: boolean;
  isFeatured?: boolean;
  hasAcceptedAnswer?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
