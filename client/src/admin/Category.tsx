"use client";

import React, { useState, useEffect } from "react";
import AdminLayout from "./Layout";
import { Plus, Package } from "lucide-react";
import {
  createCategoryAPI,
  getAllCategoryAPI,
  deleteCategoryAPI,
  updateCategoryAPI,
} from "@/services/category.service";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import CategoryCard, { Categories } from "./CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const CategoryPage = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Categories | null>(
    null,
  );
  const [form, setForm] = useState<{
    title: string;
    file: File | null;
    preview: string;
  }>({
    title: "",
    file: null,
    preview: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await getAllCategoryAPI();
    if (!error && data?.data) setCategories(data.data);
    else setCategories([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    setDeleting(id);
    const { error } = await deleteCategoryAPI(id);
    if (!error) fetchCategories();
    else alert(error);
    setDeleting(null);
  };

  const handleEdit = (category: Categories) => {
    setEditingCategory(category);
    setForm({
      title: category.categoryName,
      file: null,
      preview: category.categoryImage,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.file && !editingCategory) {
      setError("Image is required");
      return;
    }
    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("categoryName", form.title);
    if (form.file) formData.append("categoryImage", form.file);

    const result = editingCategory
      ? await updateCategoryAPI(editingCategory._id, formData)
      : await createCategoryAPI(formData);

    if (result.error) setError(result.error);
    else {
      fetchCategories();
      setShowModal(false);
      setEditingCategory(null);
      setForm({ title: "", file: null, preview: "" });
    }
    setSubmitting(false);
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-linear-to-br from-[#09b89b] to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-100">Total Categories</p>
                <h3 className="text-4xl font-bold mt-2">{categories.length}</h3>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <Package size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <button
            onClick={() => {
              setEditingCategory(null);
              setForm({ title: "", file: null, preview: "" });
              setError(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#09b89b] text-white px-4 py-2 rounded-lg hover:bg-[#047260] cursor-pointer transition shadow-md"
          >
            <Plus size={18} /> Add Category
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="w-full max-w-70 h-82 rounded-2xl"
                />
              ))
            : categories.map((cat) => (
                <CategoryCard
                  key={cat._id}
                  category={cat}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  deletingId={deleting}
                />
              ))}
        </div>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
            <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[95%] max-w-md bg-white rounded-2xl p-8 shadow-2xl z-50 outline-none border-none">
              <div className="flex justify-between items-center mb-6">
                <DialogTitle className="text-2xl font-bold text-gray-800">
                  {editingCategory ? "Update Category" : "Add New Category"}
                </DialogTitle>
                <DialogClose className="p-1 hover:bg-gray-100 rounded-full transition" />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 mb-4 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full border border-gray-200 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setForm({
                          ...form,
                          file,
                          preview: URL.createObjectURL(file),
                        });
                      }
                    }}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#09b89b] hover:file:bg-blue-100"
                    disabled={submitting}
                  />
                  {form.preview && (
                    <div className="relative w-full h-40 rounded-lg overflow-hidden border mt-2">
                      <img
                        src={form.preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#09b89b] text-white py-3 rounded-xl font-semibold hover:bg-[#076d5c] cursor-pointer disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {editingCategory ? "Updating..." : "Creating..."}
                    </>
                  ) : editingCategory ? (
                    "Save Changes"
                  ) : (
                    "Create Category"
                  )}
                </button>
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default CategoryPage;
