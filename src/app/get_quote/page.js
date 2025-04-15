'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function GetQuote() {
  const [insuranceType, setInsuranceType] = useState("home")
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-4xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="pt-6 text-center">
          <CardTitle className="text-2xl text-gray-800">Get a Quote</CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Insurance Type:</label>
            <Select value={insuranceType} onValueChange={setInsuranceType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Insurance Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Insurance</SelectItem>
                <SelectItem value="auto">Auto Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {insuranceType === "home" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Home Value</label>
                  <Input type="number" name="homeValue" onChange={handleChange} placeholder="e.g. 250000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dwelling Type</label>
                  <Input type="text" name="dwellingType" onChange={handleChange} placeholder="e.g. Bungalow" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heating Type</label>
                  <Select name="heatingType" onValueChange={(val) => handleChange({ target: { name: "heatingType", value: val } })}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select heating type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OIL">OIL</SelectItem>
                      <SelectItem value="ELECTRIC">ELECTRIC</SelectItem>
                      <SelectItem value="WOOD">WOOD</SelectItem>
                      <SelectItem value="OTHER">OTHER</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                  <Input type="text" name="make" onChange={handleChange} placeholder="e.g. Toyota" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <Input type="text" name="model" onChange={handleChange} placeholder="e.g. Corolla" />
                </div>
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <Input type="number" name="year" onChange={handleChange} placeholder="e.g. 2022" />
                </div>
              </>
            )}

            <div className="col-span-full">
              <Button type="submit" className="w-full h-[50px] text-lg font-semibold mt-4">
                Get Quote
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
