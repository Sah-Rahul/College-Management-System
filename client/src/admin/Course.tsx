"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import AddCourseModal from "./AddCourseModal";
import { Button } from "@/components/ui/button";
import { getAllCourseApi } from "../Api/services/course.service";
import Coursecard from "./Coursecard";
import SkeletonLoading from "../components/skeletonLoading";

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const allCourse = async () => {
    try {
      setLoading(true);
      const course = await getAllCourseApi();
      setCourses(course.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    allCourse();
  }, []);

  const handleEdit = (id: string) => console.log("edit", id);
  const handleDelete = (id: string) => console.log("delete", id);
  const handleView = (id: string) => console.log("view", id);

  const totalCourses = courses.length;
  const publishedCourses = courses.filter(
    (c) => c.status === "published",
  ).length;
  const underReviewCourses = courses.filter(
    (c) => c.status === "under_review",
  ).length;
  const rejectedCourses = courses.filter((c) => c.status === "rejected").length;

  return (
    <AdminLayout>
      <div className="min-h-screen p-5 sm:p-8 bg-[#f2f2f2] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Course <span className="text-[#09b89b]">Management</span>
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              {loading ? "Loading..." : `${totalCourses} courses found`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-xl px-3 py-2 flex-1 sm:flex-none sm:min-w-55">
              <svg
                className="w-4 h-4 text-zinc-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                className="text-sm text-zinc-700 bg-transparent outline-none placeholder:text-zinc-300 w-full"
                placeholder="Search title or tag..."
              />
            </div>

            <select className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-600 outline-none cursor-pointer">
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="under_review">Under Review</option>
              <option value="published">Published</option>
              <option value="rejected">Rejected</option>
            </select>

            <select className="bg-white border border-zinc-200 rounded-xl px-3 py-2 text-sm text-zinc-600 outline-none cursor-pointer">
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <button
              onClick={allCourse}
              disabled={loading}
              className="bg-white border border-zinc-200 hover:border-orange-300 disabled:opacity-50 transition-colors text-zinc-600 text-sm font-semibold rounded-xl px-3 py-2"
            >
              <svg
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582M20 20v-5h-.581M5.635 19A9 9 0 1 0 4.582 9"
                />
              </svg>
            </button>

            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              Add Course
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "TOTAL", value: totalCourses, accent: true },
            { label: "PUBLISHED", value: publishedCourses, accent: false },
            { label: "UNDER REVIEW", value: underReviewCourses, accent: false },
            { label: "REJECTED", value: rejectedCourses, accent: false },
          ].map(({ label, value, accent }) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-300 bg-white p-5 flex flex-col items-center"
            >
              <span className="text-xs font-semibold tracking-widest text-zinc-400">
                {label}
              </span>
              <span
                className={`mt-2 text-3xl font-extrabold ${
                  accent ? "text-[#09b89b]" : "text-zinc-900"
                }`}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <AddCourseModal onClose={() => setIsModalOpen(false)} />
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-48 text-zinc-400 text-sm mt-8 gap-2">
            <svg
              className="w-10 h-10 text-zinc-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            No courses found
          </div>
        ) : courses.length === 0 ? (
          <SkeletonLoading count={6} />
        ) : (
          <div className="w-full flex items-center justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {courses.map((course) => (
              <Coursecard
                key={course._id}
                course={course}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Course;
