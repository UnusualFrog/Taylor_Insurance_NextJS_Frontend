'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 pt-24">

      <Card className="w-full max-w-lg bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="text-center pt-6">
          <CardTitle className="text-2xl text-gray-800">Contact Us</CardTitle>
        </CardHeader>

        <Separator className="mb-4 mx-6" />

        <CardContent className="space-y-6">
          <p className="text-gray-700 text-center text-lg">
            Need help with your policy or quote? We're happy to assist.
          </p>

          <div className="text-left space-y-2 border p-4 rounded-md bg-white shadow-sm">
            <p className="text-gray-800 font-medium">📞 Phone:</p>
            <a href="tel:XXX-XXX-XXXX" className="text-blue-600 ml-2 hover:underline">
              XXX-XXX-XXXX
            </a>

            <p className="text-gray-800 font-medium pt-4">📧 Email:</p>
            <a href="mailto:josh@taylorinsurance.com" className="text-blue-600 ml-2 hover:underline">
              josh@taylorinsurance.com
            </a>
          </div>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Name</label>
              <Input id="name" name="name" placeholder="Your full name" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="How can we help you?"
                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <Button type="submit" className="w-full">Send Message</Button>
          </form>

          <p className="text-xs text-center text-gray-500 pt-6">
            &copy; 2025 Taylor Insurance. All rights reserved.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
