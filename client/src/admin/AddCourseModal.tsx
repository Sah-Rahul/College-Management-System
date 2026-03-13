"use client";

import { useEffect, useState } from "react";
import { getAllCategoryAPI } from "../Api/services/category.service";
import { createCourseApi } from "../Api/services/course.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddCourseModalProps {
  onClose: () => void;
}

interface Category {
  _id: string;
  name: string;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ onClose }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    curriculum: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    level: "",
    language: "",
    tags: "",
    prerequisites: "",
    learningOutcomes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategoryAPI();

      if (res.data) {
        setCategories(res.data);
      }
    } catch (error) {
      console.log("Category fetch error", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("curriculum", formData.curriculum);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("discountPercentage", formData.discount);
      data.append("categoryId", formData.category);
      data.append("level", formData.level);
      data.append("language", formData.language);
      data.append("tags", formData.tags);
      data.append("prerequisites", formData.prerequisites);
      data.append("learningOutcomes", formData.learningOutcomes);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      const res = await createCourseApi(data);

      console.log("Course created", res);

      onClose();
    } catch (error) {
      console.error("Create course error", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm z-50 p-4 py-10">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 md:p-8 relative my-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Create New Course
          </h2>
          <p className="text-sm text-gray-500">Fill course information below</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <Label>Course Title</Label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Complete Frontend Development"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Curriculum</Label>
            <Input
              name="curriculum"
              value={formData.curriculum}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Discount %</Label>
            <Input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Category</Label>

            <Select
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Level</Label>

            <Select
              onValueChange={(value) => handleSelectChange("level", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Language</Label>
            <Input
              name="language"
              value={formData.language}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label>Tags</Label>
            <Input name="tags" value={formData.tags} onChange={handleChange} />
          </div>

          <div className="md:col-span-2">
            <Label>Prerequisites</Label>
            <Input
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label>Learning Outcomes</Label>
            <Textarea
              name="learningOutcomes"
              value={formData.learningOutcomes}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <Label>Course Thumbnail</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files) {
                setThumbnail(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="flex justify-end gap-3 mt-8 border-t pt-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            Create Course
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
