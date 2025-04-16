'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function AutoForm({ customerId, autoToEdit = null, onSuccess }) {
  const [make, setMake] = useState(autoToEdit?.make || '')
  const [model, setModel] = useState(autoToEdit?.model || '')
  const [year, setYear] = useState(autoToEdit?.year || '')

  const isEdit = !!autoToEdit

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isEdit
      ? `http://localhost:8080/v1/autos/${autoToEdit.id}`
      : `http://localhost:8080/v1/autos/${customerId}`

    const method = isEdit ? 'PUT' : 'POST'
    const body = new URLSearchParams({
      make,
      model,
      year
    })

    const response = await fetch(url + (isEdit ? `?${body.toString()}` : ''), {
      method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...(isEdit ? {} : { body }),
    })

    const data = await response.json()
    if (data.success) {
      alert(isEdit ? "Vehicle updated!" : "Vehicle created!")
      onSuccess?.()
    } else {
      alert(data.message || "Something went wrong")
    }
  }

  return (
    <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Make</label>
        <Input value={make} onChange={(e) => setMake(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Model</label>
        <Input value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year</label>
        <Input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
      </div>
      <Button type="submit">{isEdit ? 'Update Vehicle' : 'Add Vehicle'}</Button>
    </form>
  )
}
