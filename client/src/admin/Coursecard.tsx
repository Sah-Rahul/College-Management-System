"use client";

import React from "react";
import { Star, BookOpen, Clock, Users, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CourseCardProps } from "../interface/course.interface";

const Coursecard: React.FC<CourseCardProps> = ({
  course,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-white h-full w-full">
      <div className="px-4 pt-4">
        <Link href={`/courses/${course.slug}`}>
          <div className="relative h-64 w-full overflow-hidden rounded-sm group">
            <Image
              src={course.thumbnail.url}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>
      </div>

      <div className="p-7">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(4)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-emerald-400 text-emerald-400"
            />
          ))}
          <Star size={18} className="text-gray-300" />
          <span className="ml-2 text-sm font-medium text-gray-500">
            ({course.rating})
          </span>
        </div>

        <Link href={`/courses/${course.slug}`}>
          <h3 className="text-xl w-fit font-extrabold text-slate-900 leading-snug mb-5 hover:text-[#0AB99D] transition-colors cursor-pointer">
            {course.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <BookOpen size={14} />
            <span className="text-[14px]">12 Lectures</span>
            {/* <span className="text-[14px]">{course.totalLectures}</span> */}
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-[14px]"> 6 hours</span>

            {/* <span className="text-[14px]">{course.duration}</span> */}
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} />
            <span className="text-[14px]">1200+ Students</span>
            {/* <span className="text-[14px]">{item.student}+ Students</span> */}
          </div>
        </div>

        <div className="mt-4 mb-4 border-black  border-dashed border-b-2"></div>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full overflow-hidden border">
            {/* <Image
              src={item.teacherImage}
              alt={item.teacher}
              className="w-full h-full object-cover"
            /> */}

            <img
              src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fteam1.9cb9f2ee.png&w=384&q=75"
              alt=""
            />
          </div>
          <p className="text-sm text-gray-600">
            By{" "}
            <span className="font-bold text-slate-800 hover:text-[#0AB99D] cursor-pointer">
              {/* {course.teacher} */}
            </span>{" "}
            in <span className="font-semibold text-slate-800">Development</span>
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-slate-900">
              Rs{course.discountedPrice}
            </span>
            <del className="text-gray-400 text-lg">{course.price}</del>
          </div>

          <div className="flex items-center gap-2 cursor-pointer group hover:text-gray-600">
            <ShoppingCart
              size={20}
              className="text-black transition-colors group-hover:text-gray-600"
            />
            <button className="text-black font-semibold transition-colors cursor-pointer group-hover:text-gray-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursecard;
