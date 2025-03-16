"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Tag, Phone, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const MATERIAL_OPTIONS = [
  "Plastic",
  "Metal",
  "Paper",
  "Glass",
  "E-waste",
  "Aluminum",
  "Cardboard",
  "Batteries",
];

export default function BuyerRegistrationPage() {
  const { user } = useUser();
  console.log(user);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    bio: "",
  });
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMaterialToggle = (material: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const handleLocationAutoFill = () => {
    console.log("boom");
    console.log("geolocation" in navigator);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position.coords.latitude);
        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=b224447f320d485c894cdca017748275`
          );
          const data = await response.json();
          console.log(data);
          if (data.results?.[0]?.formatted) {
            setFormData((prev) => ({
              ...prev,
              location: data.results[0].formatted,
            }));
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData, selectedMaterials);

    try {
      const response = await fetch("/api/buyers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          preferredCategories: selectedMaterials,
          maxPrice: 0, // Default max price
          latitude: 0, // These would come from geocoding the location
          longitude: 0,
          userId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register");
      }

      // Redirect to success page or dashboard
      window.location.href = "/buyers";
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Register as a Buyer
        </h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="pl-10"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="pl-10"
                  placeholder="Your contact number"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="pl-10"
                  placeholder="Your business location"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={handleLocationAutoFill}
                >
                  Auto-fill
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Materials You Buy
              </label>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_OPTIONS.map((material) => (
                  <Button
                    key={material}
                    type="button"
                    variant={
                      selectedMaterials.includes(material)
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleMaterialToggle(material)}
                    className={
                      selectedMaterials.includes(material) ? "bg-green-600" : ""
                    }
                  >
                    <Tag className="h-4 w-4 mr-1" />
                    {material}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Tell us about your business and current material prices..."
                className="h-32"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register as Buyer"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
