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
import { Users, Calendar } from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  email: string;
  joinedDate: string;
  specialization: string;
  avatar?: string;
  active: boolean;
}

const Teacher = () => {
  const allTeachers: Teacher[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Teacher ${i + 1}`,
    email: `teacher${i + 1}@lms.com`,
    joinedDate: `2023-${(i % 12) + 1}-0${(i % 28) + 1}`,
    specialization: ["Math", "Physics", "Chemistry", "Biology"][i % 4],
    avatar: `https://i.pravatar.cc/150?img=${i + 50}`,
    active: i % 2 === 0,
  }));

  const totalTeachers = allTeachers.length;
  const activeTeachers = allTeachers.filter((t) => t.active).length;
  const inactiveTeachers = totalTeachers - activeTeachers;

  const [search, setSearch] = useState("");
  const filteredTeachers = allTeachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users size={24} className="text-[#0AB99D]" /> Teachers
          </h2>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teachers..."
            className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-3xl font-bold">{totalTeachers}</span>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Active Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 text-lg font-bold">
                {activeTeachers}
              </Badge>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Inactive Teachers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge
                variant="destructive"
                className="px-4 py-1 text-lg font-bold"
              >
                {inactiveTeachers}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-bold">Teacher</TableHead>
                <TableHead className="font-bold">Email</TableHead>
                <TableHead className="font-bold">Joined Date</TableHead>
                <TableHead className="font-bold">Specialization</TableHead>
                <TableHead className="font-bold text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow
                  key={teacher.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border">
                        <AvatarImage src={teacher.avatar} />
                        <AvatarFallback className="bg-[#0AB99D] text-white font-bold">
                          {teacher.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-semibold text-gray-700">
                        {teacher.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {teacher.email}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} className="text-gray-400" />
                      {teacher.joinedDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold uppercase">
                      {teacher.specialization}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border-none ${
                        teacher.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {teacher.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="p-4 bg-gray-50 border-t">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Showing total {filteredTeachers.length} records
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Teacher;
