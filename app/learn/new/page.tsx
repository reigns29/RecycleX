"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, we would first upload the image to a storage service
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: selectedImage || "https://placeholder.com/image.jpg",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      // Redirect to blogs listing page
      window.location.href = "/learn";
    } catch (error) {
      console.error("Error creating blog post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Create Blog Post
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <div
                className={`relative h-48 border-2 border-dashed rounded-lg ${
                  selectedImage ? "bg-gray-50" : "bg-gray-50 hover:bg-gray-100"
                } transition-colors`}
              >
                <input
                  type="file"
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedImage}
                      alt="Blog cover"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      Change Image
                    </Button>
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload cover image
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KNOWLEDGE_BASE">Knowledge Base</SelectItem>
                  <SelectItem value="RECYCLING_STORY">
                    Recycling Story
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Write your blog content here..."
                className="h-64"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish Blog Post"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
