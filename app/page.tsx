"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Recycle,
  Star,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const QUICK_LINKS = [
  { name: "Sell Recyclables", href: "/upload" },
  { name: "Find Buyers", href: "/buyers" },
  { name: "Educational Resources", href: "/learn" },
  { name: "About Us", href: "/about" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    message: "RecycleX made it so easy to sell my e-waste and earn money!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Restaurant Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    message:
      "The AI detection feature is incredibly accurate. Saved me so much time!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Environmental Activist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    message:
      "Finally, a platform that makes recycling profitable and efficient.",
    rating: 5,
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
                Transform Your Waste into Environmental Impact
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Join our sustainable community and make recycling easier than
                ever. Get paid for your recyclables while helping save the
                planet.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div>
                  <Link href="/upload">
                    <Button
                      size="lg"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Recycle className="mr-2 h-5 w-5" /> Start Recycling Now
                    </Button>
                  </Link>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  Learn How It Works
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80"
                alt="Recycling Process"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Waste Detection Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            AI-Powered Waste Detection
          </h2>
          <Card className="p-6 bg-white/80 backdrop-blur">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Upload or take a photo of your waste
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Input type="file" className="hidden" id="waste-photo" />
                  <Button
                    onClick={() =>
                      document.getElementById("waste-photo")?.click()
                    }
                    className="flex-1"
                  >
                    Upload Photo
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Use Camera
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-green-800">
                  Let AI Identify Your Recyclables
                </h3>
                <p className="text-gray-600">
                  Our advanced AI technology instantly identifies different
                  types of recyclable materials and provides you with the best
                  recycling options and current market rates.
                </p>
                <ul className="space-y-3">
                  {["Plastic", "Metal", "Paper", "Glass", "E-waste"].map(
                    (material) => (
                      <li
                        key={material}
                        className="flex items-center text-gray-700"
                      >
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        {material} Detection
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <div className="pt-8 pb-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-green-800 mb-12">
            What Our Users Say
          </h2>

          <div className="relative">
            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="overflow-hidden px-12">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4">
                      <img
                        src={TESTIMONIALS[currentTestimonial].image}
                        alt={TESTIMONIALS[currentTestimonial].name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className="flex justify-center mb-2">
                      {[...Array(TESTIMONIALS[currentTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-yellow-400 fill-current"
                          />
                        )
                      )}
                    </div>
                    <p className="text-lg text-gray-700 mb-4">
                      "{TESTIMONIALS[currentTestimonial].message}"
                    </p>
                    <p className="font-semibold text-green-800">
                      {TESTIMONIALS[currentTestimonial].name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {TESTIMONIALS[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About RecycleX</h3>
              <p className="text-gray-400">
                Making recycling easier and more profitable while helping save
                our planet.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  contact@recyclex.com
                </p>
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} RecycleX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
