'use client'

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-blue-500 to-indigo-600 pt-40 px-4">
      <Card className="w-full max-w-6xl shadow-xl">
        <CardContent className="flex flex-col sm:flex-row items-center gap-8 p-6 sm:p-12">

          {/* Logo Section */}
          <div className="flex-shrink-0 w-full sm:w-1/3 flex justify-center">
            <Image 
              src="/TInsurance-landing-logo.png" 
              alt="Company Logo" 
              className="w-full max-w-[300px] md:max-w-[500px] h-auto"
              width={800}
              height={800} 
            />
          </div>

          {/* Text + Button Section */}
          <div className="flex flex-col justify-center items-center space-y-6 w-full sm:w-2/3">
            <div className="text-center text-gray-800 text-2xl font-semibold">
              <p>Taylor-Made Protection for You.</p>
              <p>Get A Quote or Login Below to Get Started</p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4 w-full flex-wrap">
              <Link href="/get_quote" className="w-[200px]">
                <Button className="w-full h-[50px] text-lg shadow-md">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/loginRegister" className="w-[200px]">
                <Button className="w-full h-[50px] text-lg shadow-md">
                  Login / Register
                </Button>
              </Link>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
