'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-lg bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="text-center pt-6">
          <CardTitle className="text-2xl text-gray-800">⚠️Unauthorized Access⚠️</CardTitle>
        </CardHeader>

        <Separator className="mb-4 mx-6" />

        <CardContent className="text-center space-y-4">
          <p className="text-gray-700 text-lg">
            You do not have the required permissions to access this area
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
