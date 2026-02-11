"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { loginApi } from "@/constant/auth.api";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { trigger, isMutating, error } = useSWRMutation(
    "/auth/login",
    loginApi,
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await trigger({
        email: formData.email,
        password: formData.password,
      });

      toast.success(res.message);

      const role = res?.user?.role;

      if (role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else if (role === "STUDENT") {
        router.replace("/student/dashboard");
      } else if (role === "INSTRUCTOR") {
        router.replace("/instructor/dashboard");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-[-20%] right-[-10%] w-125 h-125 rounded-full bg-[#0ab89c] blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-125 h-125 rounded-full bg-teal-500 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-10 w-10 text-[#0ab89c] rounded-xl flex items-center justify-center">
              <GraduationCap className="text-[#0ab89c] h-6 w-6" />
            </div>
            <span className="text-white font-bold text-2xl">
              Educate Portal
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6">
            Unlock your potential with{" "}
            <span className="text-[#0ab89c]">innovative learning.</span>
          </h1>

          <div className="space-y-6 mt-10">
            <div className="flex gap-4">
              <BookOpen className="h-5 w-5 text-[#0ab89c]" />
              <div>
                <p className="text-white font-semibold">Hands-on Courses</p>
                <p className="text-sm text-zinc-400">
                  Learn practical skills through real projects
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <LayoutDashboard className="h-5 w-5 text-[#0ab89c]" />
              <div>
                <p className="text-white font-semibold">Grow Your Career</p>
                <p className="text-sm text-zinc-400">
                  Build a portfolio, earn certificates, and boost your resume
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-105 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-zinc-900">Student login</h2>
            <p className="text-zinc-500">
              Login to your account to start learning today.
            </p>
          </div>

          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="email">Student Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@university.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 -translate-y-1/2 text-zinc-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* ✅ error show */}
            {error && (
              <p className="text-sm text-red-600">
                {error?.response?.data?.message || "Login failed"}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-12 cursor-pointer"
              disabled={isMutating}
            >
              {isMutating ? "Logging in..." : "Login"}
            </Button>
          </div>

          <p className="text-center text-sm text-zinc-600">
            I don't have an account?{" "}
            <Link
              href={"/auth/register"}
              className="font-bold text-[#0ab89c] cursor-pointer"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
