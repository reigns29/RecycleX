import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  MessageSquare,
  Truck,
  Package,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';

const BUYER_PROFILE = {
  id: 1,
  name: 'GreenTech Recycling Co.',
  logo: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
  description:
    'Leading recycling company with over 10 years of experience in sustainable waste management. We specialize in processing various types of recyclable materials with state-of-the-art facilities.',
  rating: 4.8,
  reviews: 156,
  location: {
    address: '123 Eco Street, Green City, GC 12345',
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  operatingHours: '8:00 AM - 6:00 PM',
  materials: [
    { name: 'Plastic', price: '0.50' },
    { name: 'Metal', price: '1.20' },
    { name: 'Paper', price: '0.30' },
    { name: 'E-waste', price: '2.00' },
  ],
  certifications: ['ISO 14001', 'Green Business Certified', 'EPA Approved'],
};

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ];
}

export default function BuyerProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-lg overflow-hidden">
                  <img
                    src={BUYER_PROFILE.logo}
                    alt={BUYER_PROFILE.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-green-800">{BUYER_PROFILE.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{BUYER_PROFILE.rating}</span>
                    <span className="text-gray-500">({BUYER_PROFILE.reviews} reviews)</span>
                  </div>
                  <p className="mt-4 text-gray-600">{BUYER_PROFILE.description}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Materials We Accept</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {BUYER_PROFILE.materials.map((material) => (
                  <div
                    key={material.name}
                    className="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-green-600" />
                      <span className="font-medium">{material.name}</span>
                    </div>
                    <span className="font-semibold text-green-700">${material.price}/kg</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Location</h2>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                {/* Google Maps iframe would go here */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map View
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-green-800 mb-4">Business Hours</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{BUYER_PROFILE.operatingHours}</span>
              </div>

              <h3 className="font-semibold text-green-800 mt-6 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{BUYER_PROFILE.location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>contact@greentech.com</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message Buyer
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="tel:+15551234567">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-green-800 mb-4">Certifications</h3>
              <div className="space-y-2">
                {BUYER_PROFILE.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center gap-2 p-2 bg-green-50 rounded-md text-sm text-green-700"
                  >
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    {cert}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}