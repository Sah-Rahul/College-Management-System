export interface Course {
  _id: string;
  courseTitle: string;
  description: string;
  thumbnail: string;

  category: {
    _id: string;
    categoryName: string;
  };

  price: number;
  discountPercentage: number;
  finalPrice: number;

  level: string;
  language: string;
  tags: string[];

  status: "DRAFT" | "PUBLISHED";  
  totalDuration: number;
  totalLectures: number;
  enrolledCount: number;

  teacher?: string;
  teacherImage?: string;
}