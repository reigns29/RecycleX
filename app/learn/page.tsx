"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Recycle,
  Droplet,
  Zap,
  TreePine,
  Battery,
  Newspaper,
  AlertCircle,
  Info,
  ArrowRight,
  BookOpen,
  Plus,
} from "lucide-react";

const MATERIALS = [
  {
    name: "Plastic",
    icon: Droplet,
    description: "Different types of plastic and how to identify them",
    facts: [
      "Recycling 1 ton of plastic saves 7.4 cubic yards of landfill space",
      "It takes 450 years for a plastic bottle to decompose",
    ],
  },
  {
    name: "Metal",
    icon: Recycle,
    description: "Guide to recycling various metals and their values",
    facts: [
      "Recycling aluminum saves 95% of the energy needed to produce new aluminum",
      "A recycled aluminum can returns to the shelf in just 60 days",
    ],
  },
  {
    name: "E-waste",
    icon: Battery,
    description: "Safe disposal of electronic waste and components",
    facts: [
      "Only 12.5% of e-waste is recycled globally",
      "E-waste contains valuable metals like gold, silver, and platinum",
    ],
  },
  {
    name: "Paper",
    icon: Newspaper,
    description: "Paper recycling process and environmental impact",
    facts: [
      "Recycling 1 ton of paper saves 17 trees",
      "Paper can be recycled up to 7 times before fibers become too short",
    ],
  },
];

const IMPACT_STATS = [
  {
    title: "Energy Saved",
    value: "2.5M kWh",
    description: "Through recycling initiatives",
    icon: Zap,
  },
  {
    title: "Trees Preserved",
    value: "50,000+",
    description: "By recycling paper products",
    icon: TreePine,
  },
  {
    title: "Waste Diverted",
    value: "10,000 tons",
    description: "From landfills annually",
    icon: Recycle,
  },
];

const blogs = [
  {
    id: 1,
    title: "Test Blog",
    description: "Test Description",
    createdAt: "",
    category: "Recycling Guide",
    imageUrl: "",
  },
];

export default function LearnPage() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "KNOWLEDGE_BASE":
        return <BookOpen className="h-5 w-5" />;
      case "RECYCLING_STORY":
        return <Newspaper className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Learn About Recycling
          </h1>
          <Link href="/learn/new">
            <Button className="w-1/4 bg-green-600 hover:bg-green-700">
              Publish your Blog
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto my-4">
            Discover how your recycling efforts make a real impact on our
            environment and learn the best practices for different materials.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {IMPACT_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6 text-center">
                <Icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800">
                  {stat.value}
                </h3>
                <h4 className="font-semibold text-gray-700 mb-2">
                  {stat.title}
                </h4>
                <p className="text-gray-600">{stat.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Materials Guide */}
        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Recycling Materials Guide
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {MATERIALS.map((material) => {
            const Icon = material.icon;
            return (
              <Card key={material.name} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      {material.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{material.description}</p>
                    <div className="space-y-2">
                      {material.facts.map((fact, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Info className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{fact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tips Section */}
        <Card className="p-8 bg-green-50 border-none">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Pro Tips for Better Recycling
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-800">
                    Clean Before Recycling
                  </h4>
                  <p className="text-gray-600">
                    Rinse containers and remove food residue to prevent
                    contamination
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-800">
                    Check Local Guidelines
                  </h4>
                  <p className="text-gray-600">
                    Different areas have different recycling capabilities
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-800">
                    Separate Materials
                  </h4>
                  <p className="text-gray-600">
                    Keep different types of recyclables separate for better
                    processing
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-800">
                    Avoid Contamination
                  </h4>
                  <p className="text-gray-600">
                    Keep recyclables free from non-recyclable materials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {/* <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Recycling Blog</h1>
          <Link href="/learn/new">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden">
              <div className="h-48 relative">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                    {getCategoryIcon(blog.category)}
                    <span>
                      {blog.category === "KNOWLEDGE_BASE"
                        ? "Knowledge Base"
                        : "Recycling Story"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  {formatDate(blog.createdAt)}
                </p>
                <p className="text-gray-600 line-clamp-3">{blog.description}</p>
                <Button variant="outline" className="w-full mt-4">
                  Read More
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet.</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
