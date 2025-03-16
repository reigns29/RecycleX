'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Bell,
  Package,
  MessageSquare,
  History,
  Settings,
  ChevronRight,
  DollarSign,
  Truck,
  Star,
} from 'lucide-react';

const TRANSACTIONS = [
  {
    id: 1,
    date: '2024-03-15',
    type: 'Plastic',
    amount: '50kg',
    price: '$25.00',
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-03-14',
    type: 'Metal',
    amount: '30kg',
    price: '$36.00',
    status: 'Processing',
  },
  {
    id: 3,
    date: '2024-03-13',
    type: 'E-waste',
    amount: '20kg',
    price: '$40.00',
    status: 'Completed',
  },
];

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New message from GreenTech',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    title: 'Transaction completed',
    time: '5 hours ago',
    read: true,
  },
  {
    id: 3,
    title: 'Price update for metal',
    time: '1 day ago',
    read: true,
  },
];

export default function DashboardPage() {
  const [userType, setUserType] = useState<'seller' | 'buyer'>('seller');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-green-800">John Doe</h2>
                  <p className="text-sm text-gray-500">Premium Member</p>
                </div>
              </div>

              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Overview
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Messages
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <History className="h-4 w-4 mr-2" />
                  History
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold text-green-800 mb-3">Notifications</h3>
              <div className="space-y-3">
                {NOTIFICATIONS.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-2 rounded-lg ${
                      notification.read ? 'bg-white' : 'bg-green-50'
                    }`}
                  >
                    <Bell className={`h-4 w-4 mt-1 ${
                      notification.read ? 'text-gray-400' : 'text-green-600'
                    }`} />
                    <div>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-600' : 'text-gray-800 font-medium'
                      }`}>
                        {notification.title}
                      </p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue={userType} className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-green-800">Dashboard</h1>
                <TabsList>
                  <TabsTrigger value="seller">Seller View</TabsTrigger>
                  <TabsTrigger value="buyer">Buyer View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="seller" className="space-y-6">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Package className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Recycled</p>
                        <p className="text-xl font-semibold text-green-800">250 kg</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Earnings</p>
                        <p className="text-xl font-semibold text-green-800">$125.50</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Truck className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active Pickups</p>
                        <p className="text-xl font-semibold text-green-800">3</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Recent Transactions */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">
                    Recent Transactions
                  </h2>
                  <div className="space-y-4">
                    {TRANSACTIONS.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Package className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">{transaction.type}</p>
                            <p className="text-sm text-gray-500">{transaction.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{transaction.price}</p>
                          <p className="text-sm text-gray-500">{transaction.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="buyer" className="space-y-6">
                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Package className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Materials Bought</p>
                        <p className="text-xl font-semibold text-green-800">1,250 kg</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="text-xl font-semibold text-green-800">4.8/5.0</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Active Chats</p>
                        <p className="text-xl font-semibold text-green-800">12</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Active Listings */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-green-800 mb-4">
                    Active Material Requests
                  </h2>
                  <div className="space-y-4">
                    {['Plastic', 'Metal', 'E-waste'].map((material) => (
                      <div
                        key={material}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Package className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">{material}</p>
                            <p className="text-sm text-gray-500">5 offers received</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}