"use client";

import React, { useState, useMemo } from "react";
import AdminLayout from "./Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Download,
  UserPlus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "name",
    direction: "asc",
  });

  const allStudents = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        name:
          i % 3 === 0
            ? `Zeeshan ${i}`
            : i % 2 === 0
              ? `Abhishek ${i}`
              : `Sagar ${i}`,
        email: `student${i + 1}@lms.com`,
        avatar: `https://i.pravatar.cc/150?img=${i + 7}`,
        active: i % 2 === 0,
      })),
    [],
  );

  const filteredAndSortedStudents = useMemo(() => {
    let result = allStudents.filter(
      (s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortConfig.key && sortConfig.direction) {
      result.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [allStudents, searchTerm, sortConfig]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(filteredAndSortedStudents.length / pageSize);
  const currentStudents = filteredAndSortedStudents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column)
      return <ArrowUpDown size={14} className="ml-2 opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="ml-2 text-[#0AB99D]" />
    ) : (
      <ArrowDown size={14} className="ml-2 text-[#0AB99D]" />
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Users size={28} className="text-[#0AB99D]" /> Student Directory
            </h2>
            <p className="text-gray-500 text-sm">
              View and sort through your student database.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-200">
              <Download size={16} className="mr-2" /> Export CSV
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Students
            </p>
            <h3 className="text-2xl font-black mt-1">1,284</h3>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm border-l-4 border-l-green-500">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Active Status
            </p>
            <h3 className="text-2xl font-black mt-1 text-green-600">856</h3>
          </div>
          <div className="bg-white border rounded-xl p-5 shadow-sm border-l-4 border-l-[#0AB99D]">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Growth
            </p>
            <h3 className="text-2xl font-black mt-1 text-[#0AB99D]">+12%</h3>
          </div>
        </div>

        <div className="bg-white p-2 rounded-xl border shadow-sm max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by name or email..."
              className="pl-10 border-none bg-transparent focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead
                  className="cursor-pointer group py-4"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center font-bold text-gray-700 group-hover:text-[#0AB99D]">
                    Student Name <SortIcon column="name" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer group py-4"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center font-bold text-gray-700 group-hover:text-[#0AB99D]">
                    Email Address <SortIcon column="email" />
                  </div>
                </TableHead>
                <TableHead className="font-bold text-gray-700 text-center">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="bg-[#0AB99D] text-white font-bold">
                          {student.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-bold text-gray-800">
                        {student.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 font-medium">
                    {student.email}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border-none ${
                        student.active
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      {student.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {currentStudents.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              Bhai, koi student nahi mila!
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            Page {currentPage} of {totalPages || 1}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg font-bold"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronLeft size={16} className="mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg font-bold"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Students;
