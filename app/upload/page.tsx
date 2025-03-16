"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Camera, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

interface DetectionResult {
  material: string;
  price_per_kg: Number;
  sustainability_score: Number;
  disposal_instructions: string[];
  carbon_emissions_saved: Number;
  contaminants_precautions: string[];
  market_demand: string;
  recycled_uses: string[];
  confidence: Number;
}

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [detectionResult, setDetectionResult] =
    useState<DetectionResult | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const analyzeImage = async (file: File) => {
    try {
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      const response = await axios.post("/api/analysis", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);

      // if (!response.ok) {
      //   throw new Error("Analysis failed");
      // }

      const result = await response.data;
      setDetectionResult(result);
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setUploadProgress(0);

      // Create a local preview
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Analyze the image
      await analyzeImage(file);

      // Complete the progress
      setUploadProgress(100);
      setIsLoading(false);
      clearInterval(interval);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      await handleImageUpload(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleImageUpload(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Sell Your Recyclables
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <div
                className={`relative h-80 border-2 border-dashed rounded-lg transition-colors ${
                  dragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  className="hidden"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                {selectedImage ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedImage}
                      alt="Selected waste"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="px-8 text-sm text-gray-500 text-center">
                      Drag and drop your image here, or
                      <button
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                        className="text-green-600 hover:text-green-700 font-medium mx-1"
                      >
                        browse
                      </button>
                      to choose a file
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supported formats: JPG, PNG, HEIC
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Button variant="outline" className="flex-1">
                  <Camera className="h-4 w-4 mr-2" />
                  Use Camera
                </Button>
              </div>
            </Card>

            {isLoading && (
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing image...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Detection Results
              </h2>

              {!detectionResult ? (
                <div className="text-center py-12 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-3" />
                  <p>Upload an image to see AI detection results</p>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Material</span>
                    <span className="font-medium">
                      {detectionResult.material}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Price</span>
                    <span className="font-medium text-green-600">
                      INR {detectionResult.price_per_kg && detectionResult.price_per_kg.toFixed(2)}/kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Carbon Emissions Saved
                    </span>
                    <span className="font-medium">
                      {detectionResult.carbon_emissions_saved.toFixed(2)} kg CO₂
                    </span>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-semibold">
                      Disposal Instructions
                    </h3>
                    <ul className="list-disc list-inside pl-4 text-gray-800">
                      {detectionResult.disposal_instructions.map(
                        (step, index) => (
                          <li key={index} className="mb-1">
                            {step}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-semibold">Precautions</h3>
                    <ul className="list-disc list-inside pl-4 text-gray-800">
                      {detectionResult.contaminants_precautions.map(
                        (precaution, index) => (
                          <li key={index} className="mb-1">
                            {precaution}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-semibold">Common Uses After Recycling</h3>
                    <ul className="list-disc list-inside pl-4 text-gray-800">
                      {detectionResult.recycled_uses.map(
                        (precaution, index) => (
                          <li key={index} className="mb-1">
                            {precaution}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Market Demand</span>
                    <span className="font-medium">
                      {detectionResult.market_demand}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">AI Confidence</span>
                    <span className="font-medium">
                      {detectionResult.confidence.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
              <Link href="/buyers" className="block mt-2">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Find Buyers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
