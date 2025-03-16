"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs";
import { BookOpen, DollarSign, Recycle, Upload, LogIn } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Recycle className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-semibold text-green-800">
              RecycleX
            </span>
          </Link>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link href="/upload">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-900 hover:bg-green-50"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Sell Recyclables
                </Button>
              </Link>
              <Link href="/buyers">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-900 hover:bg-green-50"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Find Buyers
                </Button>
              </Link>
              <Link href="/buyers/new">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-900 hover:bg-green-50"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Register(Buyer)
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  variant="ghost"
                  className="text-green-700 hover:text-green-900 hover:bg-green-50"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Educational Resources
                </Button>
              </Link>
              <div className="flex justify-center items-center">
                <SignedOut>
                  <SignInButton />
                  {/* <SignUpButton /> */}
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
