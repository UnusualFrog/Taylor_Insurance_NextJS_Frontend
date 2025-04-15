'use client'

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

export default function Quote() {
  const [quoteType, setQuoteType] = useState("home")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-4xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="pt-6 text-center">
          <CardTitle className="text-2xl text-gray-800">View Quote</CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote ID</label>
              <Input placeholder="e.g. Q-1001" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote Type</label>
              <Select value={quoteType} onValueChange={setQuoteType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quote type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Premium Amount</label>
              <Input placeholder="e.g. $999.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote Expiry</label>
              <Input type="date" />
            </div>

            <div className="col-span-full">
              <Button type="submit" className="w-full h-[50px] text-lg font-semibold mt-4">
                Confirm Quote
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}