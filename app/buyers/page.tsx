'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, MapPin, Star, Phone, Filter } from 'lucide-react';

const BUYERS = [
  {
    id: 1,
    name: 'GreenTech Recycling Co.',
    rating: 4.8,
    distance: '2.5',
    materials: ['Plastic', 'Metal'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'EcoWaste Solutions',
    rating: 4.6,
    distance: '3.8',
    materials: ['E-waste', 'Metal'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Urban Recyclers Ltd.',
    rating: 4.9,
    distance: '5.2',
    materials: ['Plastic', 'Paper'],
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
  },
];

export default function BuyersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('distance');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800">Find Buyers</h1>
            <p className="text-gray-600 mt-2">Connect with trusted recycling partners in your area</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Nearest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Best Price</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUYERS.map((buyer) => (
            <Card key={buyer.id} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={buyer.image}
                  alt={buyer.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-800">{buyer.name}</h3>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <span>{buyer.rating} / 5.0</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{buyer.distance} km away</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {buyer.materials.map((material) => (
                      <span
                        key={material}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-6">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Buyer
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}