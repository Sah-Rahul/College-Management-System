"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "./AdminLayout";
import { toast } from "sonner";
import {
  ICategory,
  createCategoryAPI,
  deleteCategoryAPI,
  getAllCategoryAPI,
} from "../Api/services/category.service";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loading from "../components/Loading";
import CategoryCard from "./CategoryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";
import CategoriesUpdateModal from "./CategoriesUpdateModal";

const Categories = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const [editCategory, setEditCategory] = useState<ICategory | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const fetchCategories = async () => {
    setFetching(true);
    const { data, error } = await getAllCategoryAPI();
    setFetching(false);
    if (error) return toast.error(error);
    if (data) setCategories(data);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Category name is required");

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("categoryImage", image);

    setLoading(true);
    const { error } = await createCategoryAPI(formData);
    setLoading(false);

    if (error) return toast.error(error);
    toast.success("Category created successfully!");
    setName("");
    setImage(null);
    setModalOpen(false);
    fetchCategories();
  };

  const handleEditOpen = (cat: ICategory) => {
    setEditCategory(cat);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const { error } = await deleteCategoryAPI(id);
    if (error) return toast.error(error);
    toast.success("Category deleted!");
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <Card className="w-76   border-teal-500">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Categories
              </CardTitle>
              <LayoutGrid className="h-4 w-4 text-teal-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-500">
                {categories.length}
              </div>
            </CardContent>
          </Card>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#0f1729] border border-[#1a2744] text-white">
              <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 mt-2">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#1a2744] hover:border-teal-500/60 rounded-xl p-5 cursor-pointer transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                  />
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-teal-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                      <span className="text-teal-500 text-2xl">↑</span>
                      <span className="text-sm">Upload image (optional)</span>
                    </div>
                  )}
                </label>

                <input
                  type="text"
                  placeholder="Category Name *"
                  className="w-full p-3 rounded-lg border border-[#1a2744] bg-[#080d1a] text-white placeholder:text-gray-600 focus:outline-none focus:border-teal-500 transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create Category"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {fetching ? (
            <Loading />
          ) : categories.length === 0 ? (
            <p className="text-gray-400 col-span-4 text-center py-16">
              No categories found.{" "}
              <button
                onClick={() => setModalOpen(true)}
                className="text-teal-400 hover:underline"
              >
                Create one →
              </button>
            </p>
          ) : (
            categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                item={cat}
                onDelete={handleDelete}
                onEdit={handleEditOpen}
              />
            ))
          )}
        </div>

        <CategoriesUpdateModal
          category={editCategory}
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onUpdated={fetchCategories}
        />
      </div>
    </AdminLayout>
  );
};

export default Categories;
