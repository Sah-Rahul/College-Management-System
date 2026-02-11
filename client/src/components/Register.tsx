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
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { axiosInstance } from "@/constant/axiosInstance";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  success: boolean;
  message: string;
  data?: any;
};

const registerFetcher = async (
  url: string,
  { arg }: { arg: RegisterPayload }
) => {
  const { data } = await axiosInstance.post<RegisterResponse>(url, arg, {
    withCredentials: true,
  });
  return data;
};

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<RegisterPayload>({
    name: "",
    email: "",
    password: "",
  });

  const { trigger, isMutating, error } = useSWRMutation(
    "/auth/register",
    registerFetcher
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await trigger(formData);

      console.log("Register success:", res);

      // optional: redirect
      router.push("/auth/login");
    } catch (err) {
      console.log("Register failed:", err);
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
            Start your journey with{" "}
            <span className="text-[#0ab89c]">smart learning.</span>
          </h1>

          <div className="space-y-6 mt-10">
            <div className="flex gap-4">
              <BookOpen className="h-5 w-5 text-[#0ab89c]" />
              <div>
                <p className="text-white font-semibold">Learn from Experts</p>
                <p className="text-sm text-zinc-400">
                  Curated courses with real-world projects
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <LayoutDashboard className="h-5 w-5 text-[#0ab89c]" />
              <div>
                <p className="text-white font-semibold">Build Your Profile</p>
                <p className="text-sm text-zinc-400">
                  Track growth & earn certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <form onSubmit={handleSubmit} className="w-full max-w-105 space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-zinc-900">
              Student Registration
            </h2>
            <p className="text-zinc-500">
              Create your account to start learning today.
            </p>
          </div>

          {/* error UI */}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error?.response?.data?.message ||
                error?.message ||
                "Something went wrong"}
            </div>
          )}

          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                disabled={isMutating}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@university.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isMutating}
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
                disabled={isMutating}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 -translate-y-1/2 text-zinc-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 cursor-pointer"
              disabled={isMutating}
            >
              {isMutating ? "Creating..." : "Create Account"}
            </Button>
          </div>

          <p className="text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
              href={"/auth/login"}
              className="font-bold text-[#0ab89c] cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
