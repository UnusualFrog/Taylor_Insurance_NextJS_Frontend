'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Account() {
  const [selectedSection, setSelectedSection] = useState("info")
  const [dataType, setDataType] = useState("auto")
  const [viewMode, setViewMode] = useState("policies")
  const [policies, setPolicies] = useState({ auto: [], home: [] })
  const [quotes, setQuotes] = useState({ auto: [], home: [] })
  const [customerData, setCustomerData] = useState(null)
  const router = useRouter()

  // check for and handle user log in
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [checkedAuth, setCheckedAuth] = useState(false)

  useEffect(() => {
    const loggedin = Cookies.get('loggedin') === 'true'
    const user = Cookies.get('username')
    const id = Cookies.get('customerId')

    if (loggedin && user && id) {
      setIsLoggedIn(true)
      setUsername(user)
      setCustomerId(id)
    }

    setCheckedAuth(true)
  }, []) // This will only run once on mount to check if the user is logged in

  useEffect(() => {
    if (isLoggedIn && customerId) {
      // Fetch customer details
      fetch(`http://localhost:8080/v1/customers/${customerId}`)
        .then(response => response.json())
        .then(data => {
          setCustomerData(data)
        })
        .catch(error => console.error('Error fetching customer data:', error))
  
      // Fetch home policies
      fetch(`http://localhost:8080/v1/home_policies/customers/${customerId}`)
        .then(response => response.json())
        .then(data => {
          // Check if data.object exists and is an array before updating state
          setPolicies(prevPolicies => ({
            ...prevPolicies,
            home: Array.isArray(data.object) ? data.object : [],
          }))
        })
        .catch(error => console.error('Error fetching home policies:', error))
  
      // Fetch home quotes
      fetch(`http://localhost:8080/v1/home_quotes/customers/${customerId}`)
        .then(response => response.json())
        .then(data => {
          // Check if data.object exists and is an array before updating state
          setQuotes(prevQuotes => ({
            ...prevQuotes,
            home: Array.isArray(data.object) ? data.object : [],
          }))
        })
        .catch(error => console.error('Error fetching home quotes:', error))
  
      // Fetch auto policies
      fetch(`http://localhost:8080/v1/auto_policies/customers/${customerId}`)
        .then(response => response.json())
        .then(data => {
          // Check if data.object exists and is an array before appending to policies
          setPolicies(prevPolicies => ({
            ...prevPolicies,
            auto: Array.isArray(data.object) ? data.object : [],
          }))
        })
        .catch(error => console.error('Error fetching auto policies:', error))
  
      // Fetch auto quotes
      fetch(`http://localhost:8080/v1/auto_quotes/customers/${customerId}`)
        .then(response => response.json())
        .then(data => {
          // Check if data.object exists and is an array before appending to quotes
          setQuotes(prevQuotes => ({
            ...prevQuotes,
            auto: Array.isArray(data.object) ? data.object : [],
          }))
        })
        .catch(error => console.error('Error fetching auto quotes:', error))
    }
    
  }, [isLoggedIn, customerId]) // Only run when `isLoggedIn` or `customerId` changes
  
  console.log("policies", policies);
  console.log("quotes", quotes);
  // Helper to render the remaining time for the quotes
  const renderTimer = (expiresAt) => {
    const diff = new Date(expiresAt) - new Date()
    const seconds = Math.floor(diff / 1000)
    if (seconds <= 0) return "Expired"
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hrs}h ${mins}m`
  }

  // Check if policy expires within 2 months
  const within2Months = (expiry) => {
    const expiryDate = new Date(expiry)
    const twoMonthsFromNow = new Date()
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2)
    return expiryDate <= twoMonthsFromNow
  }

  if (!checkedAuth) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">You're not logged in.</h1>
          <p className="mt-2 text-gray-600">
            Please <a href="/login" className="text-blue-500 underline">log in</a> or <a href="/register" className="text-blue-500 underline">register</a>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-10">
      <Card className="w-full max-w-5xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-2">
            <AvatarImage src="/TInsurance-landing-logo.png" />
            <AvatarFallback>TI</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gray-800">Account</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-[200px] w-full flex flex-col gap-4 border-r border-gray-200 pr-4">
            <Button
              variant={selectedSection === "info" ? "default" : "secondary"}
              onClick={() => setSelectedSection("info")}
            >
              Account Info
            </Button>
            <Button
              variant={selectedSection === "auto" ? "default" : "secondary"}
              onClick={() => setSelectedSection("auto")}
            >
              Auto
            </Button>
            <Button
              variant={selectedSection === "home" ? "default" : "secondary"}
              onClick={() => setSelectedSection("home")}
            >
              Home
            </Button>
            <Button
              variant={selectedSection === "password" ? "default" : "secondary"}
              onClick={() => setSelectedSection("password")}
            >
              Password Change
            </Button>
          </div>

          {/* Main Panel */}
          <div className="w-full">
            {selectedSection === "info" && (
              <div className="space-y-4">
                {/* Customer info */}
                <h2 className="text-xl font-semibold">Customer Info</h2>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Customer ID:</strong> {customerId}</p>
                {/* Add more fields as needed */}
              </div>
            )}

            {selectedSection === "password" && (
              <form className="space-y-4">
                <Input type="password" placeholder="Current Password" />
                <Input type="password" placeholder="New Password" />
                <Input type="password" placeholder="Confirm New Password" />
                <Button type="submit">Update Password</Button>
              </form>
            )}

            {(selectedSection === "auto" || selectedSection === "home") && (
              <>
                <Tabs value={viewMode} className="mb-4">
                  <TabsList>
                    <TabsTrigger value="policies" onClick={() => setViewMode("policies")}>
                      Policies
                    </TabsTrigger>
                    <TabsTrigger value="quotes" onClick={() => setViewMode("quotes")}>
                      Quotes
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {viewMode === "policies" ? (
                  <>
                    <h2 className="font-semibold mb-2">{selectedSection === 'home' ? 'Home Policies' : 'Auto Policies'}</h2>
                    {policies[selectedSection].length === 0 ? (
                      <Button variant="link" onClick={() => router.push(`/${selectedSection}-policy`)}>
                        No Current Active Policies
                      </Button>
                    ) : (
                      <table className="w-full border text-sm mb-6">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Expires In</th>
                          </tr>
                        </thead>
                        <tbody>
                          {policies[selectedSection].map((policy) => (
                            <tr key={policy.id}>
                              <td className="border px-4 py-2">{policy.id}</td>
                              <td className="border px-4 py-2">{policy.type}</td>
                              <td className="border px-4 py-2">{within2Months(policy.expiresAt) ? renderTimer(policy.expiresAt) : 'Expired'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold mb-2">{selectedSection === 'home' ? 'Home Quotes' : 'Auto Quotes'}</h2>
                    <table className="w-full border text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2">ID</th>
                          <th className="border px-4 py-2">Type</th>
                          <th className="border px-4 py-2">Expires In</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(quotes[selectedSection]) && quotes[selectedSection].length > 0 ? (
                          quotes[selectedSection].map((q) => (
                            <tr key={q.id}>
                              <td className="border px-4 py-2">{q.id}</td>
                              <td className="border px-4 py-2">{q.type}</td>
                              <td className="border px-4 py-2">{renderTimer(q.expiresAt)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">No quotes available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
