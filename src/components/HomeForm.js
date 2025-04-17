'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

export default function HomeForm({ mode = 'create', homeData = {}, customerId, onSuccess }) {
  const [form, setForm] = useState({
    dateBuilt: homeData.dateBuilt || '',
    homeValue: homeData.homeValue || '',
    heatingType: homeData.heatingType || 'OTHER_HEATING',
    location: homeData.location || 'URBAN',
    dwellingType: homeData.typeOfDwelling || 'STANDALONE',
    unit: '',
    street: '',
    city: '',
    province: '',
    postalCode: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Step 1: Create the address
      const addressUrl = new URL("http://localhost:8080/v1/addresses")
      addressUrl.searchParams.append("unit", form.unit || 0)
      addressUrl.searchParams.append("street", form.street)
      addressUrl.searchParams.append("city", form.city)
      addressUrl.searchParams.append("province", form.province)
      addressUrl.searchParams.append("postalCode", form.postalCode)

      const addressResponse = await fetch(addressUrl.toString(), {
        method: "POST",
      })

      const addressData = await addressResponse.json()

      if (!addressData.success) {
        alert("Failed to create address: " + addressData.message)
        return
      }

      const addressId = addressData.object.id

     // Step 2: Create the home using the returned address ID
    const homeUrl = `http://localhost:8080/v1/homes/${addressId}/${customerId}` +
    `?dateBuilt=${form.dateBuilt}` +
    `&homeValue=${form.homeValue}` +
    `&heatingType=${form.heatingType}` +
    `&location=${form.location}` +
    `&dwellingType=${form.dwellingType}`
    
    const homeResponse = await fetch(homeUrl, {
        method: "POST",
    })

      const homeData = await homeResponse.json()

      if (homeData.success) {
        alert("Home created successfully!")
        if (onSuccess) onSuccess(homeData.object)
      } else {
        alert("Failed to create home: " + homeData.message)
      }

    } catch (err) {
      console.error("Error creating home:", err)
      alert("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="font-semibold">Address Info</div>
      <Input name="unit" type="number" placeholder="Unit #" value={form.unit} onChange={handleChange} />
      <Input name="street" type="text" placeholder="Street" value={form.street} onChange={handleChange} required />
      <Input name="city" type="text" placeholder="City" value={form.city} onChange={handleChange} required />
      <Input name="province" type="text" placeholder="Province" value={form.province} onChange={handleChange} required />
      <Input name="postalCode" type="text" placeholder="Postal Code" value={form.postalCode} onChange={handleChange} required />

      <div className="font-semibold">Home Details</div>
      <Input name="dateBuilt" type="date" placeholder="Date Built" value={form.dateBuilt} onChange={handleChange} required />
      <Input name="homeValue" type="number" placeholder="Home Value" value={form.homeValue} onChange={handleChange} required />

      <Select value={form.heatingType} onValueChange={(val) => setForm(prev => ({ ...prev, heatingType: val }))}>
        <SelectTrigger><SelectValue placeholder="Heating Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="OIL_HEATING">Oil</SelectItem>
          <SelectItem value="WOOD_HEATING">Wood</SelectItem>
          <SelectItem value="ELECTRIC_HEATING">Electric</SelectItem>
          <SelectItem value="GAS_HEATING">Gas</SelectItem>
          <SelectItem value="OTHER_HEATING">Other</SelectItem>
        </SelectContent>
      </Select>

      <Select value={form.location} onValueChange={(val) => setForm(prev => ({ ...prev, location: val }))}>
        <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="URBAN">Urban</SelectItem>
          <SelectItem value="RURAL">Rural</SelectItem>
        </SelectContent>
      </Select>

      <Select value={form.dwellingType} onValueChange={(val) => setForm((prev) => ({ ...prev, dwellingType: val }))} >
      <SelectTrigger>
        <SelectValue placeholder="Dwelling Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="STANDALONE">Standalone</SelectItem>
        <SelectItem value="BUNGALOW">Bungalow</SelectItem>
        <SelectItem value="ATTACHED">Attached</SelectItem>
        <SelectItem value="SEMI_ATTACHED">Semi-Attached</SelectItem>
        <SelectItem value="OTHER_DWELLING">Other</SelectItem>
      </SelectContent>
    </Select>


      <Button type="submit" className="w-full">{mode === 'create' ? 'Create Home' : 'Update Home'}</Button>
    </form>
  )
}
