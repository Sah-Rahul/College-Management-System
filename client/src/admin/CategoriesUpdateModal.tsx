"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ICategory, updateCategoryAPI } from "../Api/services/category.service";
import { toast } from "sonner";

interface Props {
  category: ICategory | null;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const CategoriesUpdateModal = ({
  category,
  open,
  onClose,
  onUpdated,
}: Props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setPreview(category.image?.public_url || null);
      setImage(null);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    if (!name.trim()) return toast.error("Category name is required");

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("categoryImage", image);

    setLoading(true);
    const { error } = await updateCategoryAPI(category._id, formData);
    setLoading(false);

    if (error) return toast.error(error);
    toast.success("Category updated!");
    onClose();
    onUpdated();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0f1729] border border-[#1a2744] text-white">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#1a2744] hover:border-teal-500/60 rounded-xl p-5 cursor-pointer transition-colors relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImage(file);
                setPreview(file ? URL.createObjectURL(file) : preview);
              }}
            />
            {preview ? (
              <img
                src={preview}
                className="w-20 h-20 rounded-full object-cover ring-2 ring-teal-500"
              />
            ) : (
              <div className="text-gray-500">Upload new image (optional)</div>
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
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesUpdateModal;
