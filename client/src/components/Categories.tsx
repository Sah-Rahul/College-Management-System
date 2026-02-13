"use client";

import CategoryCard from "./CategoryCard";
import arrowImg from "../../public/images/shape-1.webp";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllCategoryAPI } from "@/services/category.service";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
  courseInCategory: number;
  slug: string;
}

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await getAllCategoryAPI();
    if (!error && data?.data) {
      setCategories(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="mt-10 px-4">
      <div className="h-36 flex items-center px-6 md:px-12">
        <div>
          <button className="bg-[#cef0ea] px-12 py-2 rounded-sm font-semibold text-[#0ab99d] uppercase text-sm">
            Categories
          </button>
          <h2 className="mt-2 font-bold text-4xl text-gray-700">
            Browse By Categories
          </h2>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Image
            src={arrowImg}
            alt="Arrow icon"
            width={180}
            height={180}
            className="object-contain mr-10 w-32 h-auto"
          />

          <button className="bg-[#0ab89c] text-white font-semibold px-6 py-3 rounded-md cursor-pointer transition flex items-center gap-2">
            All Categories
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-6 place-items-center mb-10">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-full max-w-70 h-82 rounded-2xl"
              />
            ))
          : categories.map((item) => (
              <CategoryCard key={item._id} item={item} />
            ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
