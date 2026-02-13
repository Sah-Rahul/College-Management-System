"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight, Edit2, Trash2 } from "lucide-react";

export interface Categories {
  _id: string;
  categoryName: string;
  categoryImage: string;
  courseInCategory: number;
}

interface Props {
  category: Categories;
  onEdit: (category: Categories) => void;
  onDelete: (id: string) => void;
  deletingId?: string | null;
}

const CategoryCard = ({ category, onEdit, onDelete, deletingId }: Props) => {
  return (
    <Card className="group w-full max-w-70 h-82 rounded-2xl border-none bg-[#f2f3f3] flex items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-[#0ab99d] relative overflow-hidden">
      <CardContent className="flex flex-col items-center text-center p-8 w-full">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute w-28 h-28 rounded-full border-2 border-dashed border-[#1a7368] transition-transform duration-500 group-hover:rotate-180 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

          <div className="relative z-10 w-24 h-24 flex items-center justify-center rounded-full overflow-hidden bg-[#0ab99d] transition-colors duration-500 group-hover:bg-white">
            <Image
              src={category.categoryImage}
              alt={category.categoryName}
              width={42}
              height={42}
              className="object-cover rounded-full"
            />
          </div>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-600 transition-colors duration-300 group-hover:text-white">
          {category.categoryName}
        </CardTitle>

        <p className="mt-3 flex items-center gap-1 text-sm text-gray-500 transition-colors duration-300 group-hover:text-white">
          {category.courseInCategory}{" "}
          {category.courseInCategory === 1 ? "Course" : "Courses"}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </p>
      </CardContent>

      <div className="flex flex-col items-center gap-6 h-full w-14 absolute top-0 right-0 translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <button
          onClick={() => onEdit(category)}
          disabled={deletingId === category._id}
          className="mt-6 p-2 cursor-pointer hover:bg-blue-50 rounded-full transition text-blue-600 disabled:opacity-50"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={() => onDelete(category._id)}
          disabled={deletingId === category._id}
          className="p-2 cursor-pointer hover:bg-red-50 rounded-full transition text-red-600 disabled:opacity-50 relative"
        >
          {deletingId === category._id ? (
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>
    </Card>
  );
};

export default CategoryCard;
