'use client'

import { use, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"

export default function QuoteDetails({ params }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const type = searchParams.get("type") // expects 'auto' or 'home'
  const [quoteData, setQuoteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!type || !id) return

    fetch(`http://localhost:8080/v1/${type}_quotes/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.object) {
          setQuoteData(data.object)
        } else {
          console.error("Quote fetch failed", data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch error", err)
        setLoading(false)
      })
  }, [id, type])

  const handleActivate = async () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const effectiveDate = tomorrow.toISOString().split('T')[0]

    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 2)
    const formattedEnd = endDate.toISOString().split('T')[0]

    const res = await fetch(`http://localhost:8080/v1/${type}_policies/${id}?effectiveDate=${effectiveDate}&endDate=${formattedEnd}&activeStatus=true`, {
      method: "POST"
    })

    const data = await res.json()

    if (data.success) {
      alert("Quote successfully activated!")
      router.push("/account")
    } else {
      alert(data.message || "Activation failed.")
    }
  }

  if (loading) return <div className="p-10">Loading...</div>
  if (!quoteData) return <div className="p-10 text-red-500">Quote not found.</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-10">
      <Card className="w-full max-w-3xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Quote Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-800">
          <p><strong>ID:</strong> {quoteData.id}</p>
          <p><strong>Premium:</strong> ${quoteData.premium?.toFixed(2)}</p>
          <p><strong>Generated:</strong> {quoteData.generationDate}</p>

          {type === "auto" && quoteData.auto && (
            <p><strong>Vehicle:</strong> {quoteData.auto.year} {quoteData.auto.make} {quoteData.auto.model}</p>
          )}

          {type === "home" && quoteData.home && (
            <p><strong>Property:</strong> {quoteData.home.address?.street}, {quoteData.home.address?.city}</p>
          )}

          <Button onClick={handleActivate} className="mt-4">
            Activate Quote
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
