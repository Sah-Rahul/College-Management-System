export const COURSE_CONSTANTS = {
  MIN_TITLE_LENGTH: 10,
  MAX_TITLE_LENGTH: 100,
  MIN_DESCRIPTION_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 5000,
  MIN_PRICE: 0,
  MAX_PRICE: 1000000,
  MIN_LECTURES: 5,
  MAX_LECTURES: 500,
  THUMBNAIL_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  VIDEO_MAX_SIZE: 500 * 1024 * 1024, // 500MB
  ALLOWED_VIDEO_FORMATS: ["video/mp4", "video/webm", "video/ogg"],
};

export const COURSE_MESSAGES = {
  CREATED: "Course created successfully",
  UPDATED: "Course updated successfully",
  DELETED: "Course deleted successfully",
  FETCHED: "Course fetched successfully",
  FETCHED_ALL: "Courses fetched successfully",
  PUBLISHED: "Course published successfully",
  UNPUBLISHED: "Course unpublished successfully",
  STATISTICS_FETCHED: "Course statistics fetched successfully",
  FEATURED_TOGGLED: "Course featured status toggled",
  BESTSELLER_TOGGLED: "Course bestseller status toggled",

  // Errors
  NOT_FOUND: "Course not found",
  NOT_AUTHORIZED: "You are not authorized to perform this action",
  ALREADY_PUBLISHED: "Course is already published",
  ALREADY_DRAFT: "Course is already unpublished",
  THUMBNAIL_REQUIRED: "Thumbnail is required to publish course",
};