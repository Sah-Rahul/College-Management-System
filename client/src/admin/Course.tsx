"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "./Layout";
import {
  Plus,
  BookOpen,
  Clock,
  CheckCircle,
  DollarSign,
  Star,
  Users,
  Edit2Icon,
  Trash2,
} from "lucide-react";
import { getAllCourseAPI } from "@/services/course.service";
import Image from "next/image";

interface Course {
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

const Course = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "DRAFT" | "PUBLISHED">("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await getAllCourseAPI();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(
    (course) => filter === "all" || course.status === filter,
  );

  const totalCourses = courses.length;
  const draftCourses = courses.filter((c) => c.status === "DRAFT").length;
  const publishedCourses = courses.filter(
    (c) => c.status === "PUBLISHED",
  ).length;

  const totalRevenue = courses.reduce(
    (sum, c) => sum + (c.finalPrice || c.price),
    0,
  );

  return (
    <AdminLayout>
      <div className=" space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
            <p className="text-gray-600 mt-1">
              Manage and organize your courses
            </p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-lg">
            <Plus size={20} />
            Create Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Courses</p>
                <h3 className="text-4xl font-bold mt-2">{totalCourses}</h3>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <BookOpen size={32} />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Draft Courses</p>
                <h3 className="text-4xl font-bold mt-2">{draftCourses}</h3>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <Clock size={32} />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Published</p>
                <h3 className="text-4xl font-bold mt-2">{publishedCourses}</h3>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <CheckCircle size={32} />
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Revenue</p>
                <h3 className="text-4xl font-bold mt-2">
                  ₹{totalRevenue.toLocaleString()}
                </h3>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <DollarSign size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-200 w-fit">
          {(["all", "DRAFT", "PUBLISHED"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-md font-medium transition ${
                filter === f
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {f === "all" ? "All" : f === "DRAFT" ? "Draft" : "Published"} (
              {f === "all"
                ? totalCourses
                : f === "DRAFT"
                  ? draftCourses
                  : publishedCourses}
              )
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">
              No Courses Found
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white mb-6 rounded-sm overflow-hidden border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="px-4 pt-4">
                  <div className="relative h-64 w-full overflow-hidden rounded-sm group">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt={course.courseTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <BookOpen size={48} className="text-gray-300" />
                      </div>
                    )}

                    <span className="absolute top-1 left-1 bg-blue-600 text-white px-3 py-1 rounded-sm text-xs font-semibold shadow">
                      {course.category?.categoryName || "Uncategorized"}
                    </span>

                    <span
                      className={`absolute top-1 right-1 px-3 py-1 rounded-sm text-xs font-semibold shadow ${
                        course.status === "PUBLISHED"
                          ? "bg-green-600 text-white"
                          : "bg-orange-500 text-white"
                      }`}
                    >
                      {course.status === "PUBLISHED" ? "Published" : "Draft"}
                    </span>
                  </div>
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
                      ({course.tags?.length || 0} Reviews)
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-5 hover:text-[#0AB99D] transition-colors cursor-pointer">
                    {course.courseTitle}
                  </h3>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <BookOpen size={14} />
                      <span>{course.totalLectures || 0} Lectures</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{course.totalDuration || 0} hrs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span>{course.enrolledCount || 0} Students</span>
                    </div>
                  </div>

                  <div className="mt-4 mb-4 border-black border-dashed border-b-2"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-slate-900">
                        Rs{course.finalPrice}
                      </span>

                      {course.finalPrice < course.price && (
                        <del className="text-gray-400 text-lg">
                          Rs{course.price}
                        </del>
                      )}

                      {course.discountPercentage > 0 && (
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                          {course.discountPercentage}% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-md border hover:bg-gray-50 transition">
                        <Edit2Icon size={18} />
                      </button>

                      <button className="p-2 rounded-md border hover:bg-red-50 transition text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Course;
