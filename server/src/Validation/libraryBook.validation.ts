import { z } from "zod";

export const BookStatusEnum = z.enum([
  "available",
  "issued",
  "reserved",
  "maintenance",
  "lost",
]);

export const CreateLibraryBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  author: z.string().min(1, "Author is required").max(200),
  isbn: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  publisher: z.string().max(200).optional(),
  publishedYear: z
    .number()
    .int()
    .min(1000)
    .max(new Date().getFullYear() + 1)
    .optional(),
  edition: z.string().max(50).optional(),
  totalCopies: z.number().int().min(1, "At least 1 copy required"),
  shelfLocation: z.string().max(100).optional(),
  description: z.string().max(1000).optional(),
  coverImage: z.string().url().optional(),
  price: z.number().min(0).optional(),
});

export const UpdateLibraryBookSchema = CreateLibraryBookSchema.partial();

export const IssueBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  userId: z.string().min(1, "User ID is required"),
  dueDate: z.date(),
});

export const ReturnBookSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  userId: z.string().min(1, "User ID is required"),
  fine: z.number().min(0).optional(),
});

export const GetLibraryBooksSchema = z.object({
  category: z.string().optional(),
  status: BookStatusEnum.optional(),
  search: z.string().optional(),
  page: z.number().int().min(1).optional(),
  limit: z.number().int().min(1).max(100).optional(),
});

export const GetUserIssuedBooksSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

export const GetOverdueBooksSchema = z.object({
  date: z.date().optional(),
});

export const CalculateFineSchema = z.object({
  bookId: z.string().min(1, "Book ID is required"),
  userId: z.string().min(1, "User ID is required"),
});

// Type exports
export type CreateLibraryBookInput = z.infer<typeof CreateLibraryBookSchema>;
export type UpdateLibraryBookInput = z.infer<typeof UpdateLibraryBookSchema>;
export type IssueBookInput = z.infer<typeof IssueBookSchema>;
export type ReturnBookInput = z.infer<typeof ReturnBookSchema>;
export type GetLibraryBooksInput = z.infer<typeof GetLibraryBooksSchema>;
export type GetUserIssuedBooksInput = z.infer<typeof GetUserIssuedBooksSchema>;
export type GetOverdueBooksInput = z.infer<typeof GetOverdueBooksSchema>;
export type CalculateFineInput = z.infer<typeof CalculateFineSchema>;
