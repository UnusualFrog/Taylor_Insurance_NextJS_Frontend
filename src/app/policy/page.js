'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Policy() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-4xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="pt-6 text-center">
          <CardTitle className="text-2xl text-gray-800">Create Policy</CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Type</label>
              <Input placeholder="e.g. Auto or Home" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
              <Input placeholder="e.g. TI-00123" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <Input type="date" />
            </div>

            <div className="col-span-full">
              <Button type="submit" className="w-full h-[50px] text-lg font-semibold mt-4">
                Submit Policy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
    