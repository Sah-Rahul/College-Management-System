"use client";

import React, { useState } from "react";
import AdminLayout from "./Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Enrollment {
  id: number;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  courseName: string;
  enrollmentDate: string;
  status: "Active" | "Completed" | "Inactive";
}

const Enrollments = () => {
  const allEnrollments: Enrollment[] = Array.from({ length: 37 }, (_, i) => ({
    id: i + 1,
    studentName: `Student ${i + 1}`,
    studentEmail: `student${i + 1}@lms.com`,
    studentAvatar: `https://i.pravatar.cc/150?img=${i + 30}`,
    courseName: ["Math", "Physics", "Chemistry", "Biology"][i % 4],
    enrollmentDate: `2023-${(i % 12) + 1}-0${(i % 28) + 1}`,
    status: ["Active", "Completed", "Inactive"][i % 3] as
      | "Active"
      | "Completed"
      | "Inactive",
  }));

  const totalEnrollments = allEnrollments.length;
  const activeEnrollments = allEnrollments.filter(
    (e) => e.status === "Active",
  ).length;
  const completedEnrollments = allEnrollments.filter(
    (e) => e.status === "Completed",
  ).length;

  const [search, setSearch] = useState("");
  const filteredEnrollments = allEnrollments.filter(
    (e) =>
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      e.courseName.toLowerCase().includes(search.toLowerCase()),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(filteredEnrollments.length / pageSize);

  const currentEnrollments = filteredEnrollments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users size={24} /> Enrollments
          </h2>
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search student, email or course..."
            className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-2xl font-bold">{totalEnrollments}</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="default">{activeEnrollments}</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">{completedEnrollments}</Badge>
            </CardContent>
          </Card>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Enrollment Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentEnrollments.map((enrollment) => (
              <TableRow key={enrollment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={enrollment.studentAvatar} />
                      <AvatarFallback>
                        {enrollment.studentName[0]}
                      </AvatarFallback>
                    </Avatar>
                    {enrollment.studentName}
                  </div>
                </TableCell>
                <TableCell>{enrollment.studentEmail}</TableCell>
                <TableCell>{enrollment.courseName}</TableCell>
                <TableCell>{enrollment.enrollmentDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end items-center gap-4 mt-2">
          <button
            className={`px-3 py-1 rounded border ${
              currentPage === 1
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="inline w-4 h-4 mr-1" /> Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`px-3 py-1 rounded border ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="inline w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Enrollments;
