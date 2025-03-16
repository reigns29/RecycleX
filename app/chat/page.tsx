'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  MoreVertical,
  Phone,
  Video,
  User,
} from 'lucide-react';

const MESSAGES = [
  {
    id: 1,
    sender: 'buyer',
    text: 'Hi, I\'m interested in your recyclable materials.',
    time: '10:30 AM',
  },
  {
    id: 2,
    sender: 'seller',
    text: 'Hello! Yes, I have 50kg of plastic bottles available.',
    time: '10:31 AM',
  },
  {
    id: 3,
    sender: 'buyer',
    text: 'Great! What\'s the condition of the materials?',
    time: '10:32 AM',
  },
  {
    id: 4,
    sender: 'seller',
    text: 'They\'re all clean and sorted. Would you like to see some photos?',
    time: '10:33 AM',
  },
  {
    id: 5,
    sender: 'buyer',
    text: 'Yes, please share some pictures.',
    time: '10:34 AM',
  },
];

const CONTACTS = [
  {
    id: 1,
    name: 'GreenTech Recycling',
    lastMessage: 'Great! What\'s the condition of the materials?',
    time: '10:32 AM',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'EcoWaste Solutions',
    lastMessage: 'Thank you for the delivery',
    time: '9:45 AM',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Urban Recyclers',
    lastMessage: 'Can you send the invoice?',
    time: 'Yesterday',
    unread: 0,
    online: true,
  },
];

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState(CONTACTS[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <Card className="grid md:grid-cols-[320px,1fr] h-[calc(100vh-8rem)]">
          {/* Contacts Sidebar */}
          <div className="border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-green-800">Messages</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {CONTACTS.map((contact) => (
                <button
                  key={contact.id}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedContact.id === contact.id ? 'bg-green-50' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900 truncate">
                          {contact.name}
                        </p>
                        <p className="text-xs text-gray-500">{contact.time}</p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                    
                    {contact.unread > 0 && (
                      <div className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  {selectedContact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedContact.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedContact.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {MESSAGES.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === 'buyer' ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === 'buyer'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-green-600 text-white'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.sender === 'buyer' ? 'text-gray-500' : 'text-green-100'
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}