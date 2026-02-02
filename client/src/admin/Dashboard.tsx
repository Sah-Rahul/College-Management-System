"use client";

import AdminLayout from "../admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  BookOpen,
  ClipboardList,
  ShoppingCart,
  Bell,
  BarChart3,
  DollarSign,
  CheckSquare,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";

const Dashboard = () => { 
  const stats = {
    totalStudents: 1240,
    activeStudents: 980,
    totalTeachers: 75,
    activeCourses: 56,
    newEnrollmentsToday: 12,
    newEnrollmentsWeek: 84,
    pendingAssignments: 32,
    pendingQuizzes: 14,
    revenueThisMonth: 12450,
    recentOrders: 8,
    upcomingEvents: 3,
    notifications: 5,
  };

  return (
    <AdminLayout>
      <div className="space-y-8 pb-8"> 
        <div className="relative">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-600/10 blur-3xl -z-10" />
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl font-bold bg-linear-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
                Dashboard Overview
              </h2>
              <p className="text-muted-foreground mt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-600" />
                Welcome back! Here's your platform insights
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="px-4 py-2 text-sm font-medium border-violet-200 bg-violet-50 text-violet-700"
              >
                Last updated: Just now
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-violet-50 to-violet-100/50 hover:shadow-xl hover:shadow-violet-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-violet-600/0 to-violet-600/5 group-hover:from-violet-600/5 group-hover:to-violet-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full blur-3xl group-hover:bg-violet-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-violet-500 to-violet-600 text-white shadow-lg shadow-violet-500/50">
                  <Users size={24} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1">
                  <TrendingUp size={12} />
                  +12%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-violet-900">
                {stats.totalStudents.toLocaleString()}
              </div>
              <CardTitle className="text-sm font-medium text-violet-700">
                Total Students
              </CardTitle>
              <div className="flex items-center gap-2 pt-2 border-t border-violet-200">
                <div className="flex-1">
                  <div className="h-1.5 bg-violet-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-violet-500 to-violet-600 rounded-full"
                      style={{
                        width: `${(stats.activeStudents / stats.totalStudents) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-violet-600 font-medium">
                  {stats.activeStudents} active
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-fuchsia-50 to-fuchsia-100/50 hover:shadow-xl hover:shadow-fuchsia-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-fuchsia-600/0 to-fuchsia-600/5 group-hover:from-fuchsia-600/5 group-hover:to-fuchsia-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-400/10 rounded-full blur-3xl group-hover:bg-fuchsia-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-fuchsia-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50">
                  <BookOpen size={24} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1">
                  <TrendingUp size={12} />
                  +8%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-fuchsia-900">
                {stats.totalTeachers}
              </div>
              <CardTitle className="text-sm font-medium text-fuchsia-700">
                Total Teachers
              </CardTitle>
              <p className="text-xs text-fuchsia-600 pt-2 border-t border-fuchsia-200">
                68 active instructors teaching
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-cyan-50 to-cyan-100/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-cyan-600/0 to-cyan-600/5 group-hover:from-cyan-600/5 group-hover:to-cyan-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/50">
                  <ClipboardList size={24} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1">
                  <TrendingUp size={12} />
                  +15%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-cyan-900">
                {stats.activeCourses}
              </div>
              <CardTitle className="text-sm font-medium text-cyan-700">
                Active Courses
              </CardTitle>
              <p className="text-xs text-cyan-600 pt-2 border-t border-cyan-200">
                12 new courses this semester
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-emerald-50 to-emerald-100/50 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-600/0 to-emerald-600/5 group-hover:from-emerald-600/5 group-hover:to-emerald-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-3xl group-hover:bg-emerald-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50">
                  <CheckSquare size={24} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1">
                  <TrendingUp size={12} />
                  +24%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-emerald-900">
                {stats.newEnrollmentsWeek}
              </div>
              <CardTitle className="text-sm font-medium text-emerald-700">
                New Enrollments
              </CardTitle>
              <div className="flex gap-4 pt-2 border-t border-emerald-200 text-xs text-emerald-600">
                <span>
                  Today:{" "}
                  <span className="font-semibold">
                    {stats.newEnrollmentsToday}
                  </span>
                </span>
                <span>
                  Week:{" "}
                  <span className="font-semibold">
                    {stats.newEnrollmentsWeek}
                  </span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-amber-50 to-amber-100/50 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-amber-600/0 to-amber-600/5 group-hover:from-amber-600/5 group-hover:to-amber-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/50">
                  <ClipboardList size={24} />
                </div>
                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-0 gap-1">
                  <TrendingDown size={12} />
                  -5%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-amber-900">
                {stats.pendingAssignments}
              </div>
              <CardTitle className="text-sm font-medium text-amber-700">
                Pending Tasks
              </CardTitle>
              <div className="flex gap-4 pt-2 border-t border-amber-200 text-xs text-amber-600">
                <span>
                  Assignments:{" "}
                  <span className="font-semibold">
                    {stats.pendingAssignments}
                  </span>
                </span>
                <span>
                  Quizzes:{" "}
                  <span className="font-semibold">{stats.pendingQuizzes}</span>
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-purple-50 to-purple-100/50 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-purple-600/0 to-purple-600/5 group-hover:from-purple-600/5 group-hover:to-purple-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl group-hover:bg-purple-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/50">
                  <DollarSign size={24} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1">
                  <TrendingUp size={12} />
                  +18%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-purple-900">
                ${stats.revenueThisMonth.toLocaleString()}
              </div>
              <CardTitle className="text-sm font-medium text-purple-700">
                Revenue
              </CardTitle>
              <p className="text-xs text-purple-600 pt-2 border-t border-purple-200">
                This month's total earnings
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-rose-50 to-rose-100/50 hover:shadow-xl hover:shadow-rose-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-rose-600/0 to-rose-600/5 group-hover:from-rose-600/5 group-hover:to-rose-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-400/10 rounded-full blur-3xl group-hover:bg-rose-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/50">
                  <ShoppingCart size={24} />
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0 gap-1">
                  <TrendingUp size={12} />
                  +10%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-rose-900">
                {stats.recentOrders}
              </div>
              <CardTitle className="text-sm font-medium text-rose-700">
                Recent Orders
              </CardTitle>
              <p className="text-xs text-rose-600 pt-2 border-t border-rose-200">
                Transactions in last 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-blue-50 to-blue-100/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-blue-600/0 to-blue-600/5 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl group-hover:bg-blue-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50">
                  <Calendar size={24} />
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">
                  This week
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-blue-900">
                {stats.upcomingEvents}
              </div>
              <CardTitle className="text-sm font-medium text-blue-700">
                Upcoming Events
              </CardTitle>
              <p className="text-xs text-blue-600 pt-2 border-t border-blue-200">
                Scheduled events coming up
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-linear-to-br from-indigo-50 to-indigo-100/50 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-600/0 to-indigo-600/5 group-hover:from-indigo-600/5 group-hover:to-indigo-600/10 transition-all duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-3xl group-hover:bg-indigo-400/20 transition-all duration-500" />
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-linear-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/50 relative">
                  <Bell size={24} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 border-2 border-white rounded-full animate-pulse" />
                </div>
                <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-0">
                  Unread
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="relative space-y-2">
              <div className="text-3xl font-bold text-indigo-900">
                {stats.notifications}
              </div>
              <CardTitle className="text-sm font-medium text-indigo-700">
                Notifications
              </CardTitle>
              <p className="text-xs text-indigo-600 pt-2 border-t border-indigo-200">
                New alerts requiring attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="relative overflow-hidden rounded-2xl border-0 bg-linear-to-br from-slate-50 to-slate-100 p-6">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          <div className="relative flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                Platform Performance
              </h3>
              <p className="text-sm text-slate-600">
                Overall engagement and activity metrics
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">94%</div>
                <div className="text-xs text-slate-600">Satisfaction</div>
              </div>
              <div className="w-px h-12 bg-slate-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">87%</div>
                <div className="text-xs text-slate-600">Completion</div>
              </div>
              <div className="w-px h-12 bg-slate-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">4.8</div>
                <div className="text-xs text-slate-600">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
