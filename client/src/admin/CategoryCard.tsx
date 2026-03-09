"use client";

import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ArrowRight, EditIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ICategory } from "../Api/services/category.service";

interface Props {
  item: ICategory;
  onDelete: (id: string) => void;
  onEdit: (cat: ICategory) => void;
}

const CategoryCard = ({ item, onDelete, onEdit }: Props) => {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/courses?category=${item.slug}`)}
      className="group w-full max-w-70 h-82 rounded-2xl border-none bg-[#f2f3f3] flex items-center transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-[#0ab99d] cursor-pointer relative"
    >
      <CardContent className="flex flex-col relative items-center text-center p-8 w-full">
        <div
          className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onEdit(item)}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            <EditIcon size={16} className="text-gray-600" />
          </button>

          <button
            onClick={() => onDelete(item._id)}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
          >
            <Trash2Icon size={16} className="text-red-500" />
          </button>
        </div>

        <div className="relative mb-8 flex items-center justify-center">
          <div
            className="
              absolute w-28 h-28 rounded-full
              border-2 border-dashed border-[#1a7368]
              transition-transform duration-500
              group-hover:rotate-180
              -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2
            "
          />

          <div className="relative z-10 w-24 h-24 bg-[#0ab99d] flex items-center justify-center rounded-full overflow-hidden transition-colors duration-500 group-hover:bg-white">
            {item.image?.public_url ? (
              <Image
                src={item.image.public_url}
                alt={item.name}
                width={96}
                height={96}
                className="object-cover w-15 h-15"
              />
            ) : (
              <span className="text-white group-hover:text-[#0ab99d] text-2xl font-bold transition-colors duration-500">
                {item.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <CardTitle className="text-lg font-semibold text-gray-600 transition-colors duration-300 group-hover:text-white">
          {item.name}
        </CardTitle>

        <p className="mt-3 flex items-center gap-1 text-sm text-gray-500 transition-colors duration-300 group-hover:text-white">
          {item.totalCourses} {item.totalCourses === 1 ? "Course" : "Courses"}
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
