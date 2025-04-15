'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-lg bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="text-center pt-6">
          <CardTitle className="text-2xl text-gray-800">Contact Us</CardTitle>
        </CardHeader>

        <Separator className="mb-4 mx-6" />

        <CardContent className="text-center space-y-4">
          <p className="text-gray-700 text-lg">
            Need help with your policy or quote?
            We're happy to assist.
          </p>

          <div className="text-left space-y-2 border p-4 rounded-md bg-white shadow-sm">
            <p className="text-gray-800 font-medium">📞 Phone:</p>
            <p className="text-gray-600 ml-2">XXX-XXX-XXXX</p>

            <p className="text-gray-800 font-medium pt-4">📧 Email:</p>
            <p className="text-gray-600 ml-2">josh@taylorinsurance.com</p>
          </div>

          <p className="text-xs text-gray-500 pt-6">
            &copy; 2025 Taylor Insurance. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
