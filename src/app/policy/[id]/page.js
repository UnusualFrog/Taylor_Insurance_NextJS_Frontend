'use client'

import { use, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Cookies from "js-cookie"

export default function Policy({ params }) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const type = searchParams.get("type") // expects 'auto' or 'home'
  const referrer = searchParams.get("referrer") // new param to track where we came from
  const [quoteData, setQuoteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!type || !id) return

    fetch(`http://localhost:8080/v1/${type}_policies/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.object) {
          setQuoteData(data.object)
        } else {
          console.error("Policy fetch failed", data)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Fetch error", err)
        setLoading(false)
      })
  }, [id, type])

  const handleRenew = async () => {
    // alert('good job you renewed');
    const endDate = new Date()
    endDate.setFullYear(endDate.getFullYear() + 2)
    const formattedEnd = endDate.toISOString().split('T')[0]
    // @RequestParam boolean activeStatus,
    //@RequestParam LocalDate endDate){

    const res = await fetch(`http://localhost:8080/v1/${type}_policies/${quoteData.id}?activeStatus=true&endDate=${formattedEnd}`, {
      method:'PUT'
    })

    const data = await res.json()

    if (data.success) {
      alert("Policy successfully renewed!")
      // Redirect based on referrer
      if (referrer === 'employeeView') {
        router.push("/employeeViewCustomers")
      } else {
        router.push("/account")
      }
    } else {
      alert(data.message || "Renew failed. If error persists please contact support")
    }
  }
  
  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this policy?")) {
      try {
        // Keep the original end date, only change activeStatus to false
        const res = await fetch(`http://localhost:8080/v1/${type}_policies/${quoteData.id}?activeStatus=false&endDate=${quoteData.endDate}`, {
          method: 'PUT'
        })
        
        const data = await res.json()
        
        if (data.success) {
          alert("Policy successfully cancelled.")
          // Redirect based on referrer
          if (referrer === 'employeeView') {
            router.push("/employeeViewCustomers")
          } else {
            router.push("/account")
          }
        } else {
          alert(data.message || "Cancellation failed. If error persists please contact support.")
        }
      } catch (error) {
        console.error("Error cancelling policy:", error)
        alert("Failed to cancel policy. Please try again.")
      }
    }
  }

  if (loading) return <div className="p-10">Loading...</div>
  if (!quoteData) return <div className="p-10 text-red-500">Policy not found.</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-10">
      <Card className="w-full max-w-3xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Policy Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-800">
          <p><strong>ID:</strong> {quoteData.id}</p>
          <p><strong>Premium:</strong> ${quoteData.premium?.toFixed(2)}</p>
          <p><strong>Effective:</strong> {quoteData.effectiveDate}</p>

          {type === "auto" && quoteData.auto && (
            <p><strong>Vehicle:</strong> {quoteData.auto.year} {quoteData.auto.make} {quoteData.auto.model}</p>
          )}

          {type === "home" && quoteData.home && (
            <p><strong>Property:</strong> {quoteData.home.address?.street}, {quoteData.home.address?.city}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-4">
            <Button onClick={handleRenew}>
              Renew Policy
            </Button>
            <Button onClick={handleCancel} variant="destructive">
              Cancel Policy
            </Button>
            <Button 
              onClick={() => {
                // Return based on referrer
                if (referrer === 'employeeView') {
                  router.push("/employeeViewCustomers")
                } else {
                  router.push("/account")
                }
              }} 
              variant="outline"
            >
              Return
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}