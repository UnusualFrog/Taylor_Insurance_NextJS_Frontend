'use client'

import Cookies from 'js-cookie'
import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import HomeForm from '@/components/HomeForm'
import AutoForm from '@/components/AutoForm'

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
  const [homes, setHomes] = useState([])
  const [autos, setAutos] = useState([])

  const [showAddHome, setShowAddHome] = useState(false)
  const [showAddAuto, setShowAddAuto] = useState(false)

  const router = useRouter()

  // check for and handle user log in
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [customerId, setCustomerId] = useState('')
  const [checkedAuth, setCheckedAuth] = useState(false)

  // Function to fetch homes data
  const fetchHomes = useCallback(() => {
    if (customerId) {
      fetch(`http://localhost:8080/v1/homes/${customerId}`)
        .then(res => res.json())
        .then(data => setHomes(Array.isArray(data.object) ? data.object : []))
        .catch(error => console.error('Error fetching customer homes', error))
    }
  }, [customerId])

  // Function to fetch autos data
  const fetchAutos = useCallback(() => {
    if (customerId) {
      fetch(`http://localhost:8080/v1/autos/${customerId}`)
        .then(res => res.json())
        .then(data => setAutos(Array.isArray(data.object) ? data.object : []))
        .catch(error => console.error('Error fetching customer autos', error))
    }
  }, [customerId])

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
          setCustomerData(data.object)
        })
        .catch(error => console.error('Error fetching customer data:', error))

      // Fetch home policies
      fetch(`http://localhost:8080/v1/home_policies/actives/${customerId}`)
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
      fetch(`http://localhost:8080/v1/home_quotes/actives/${customerId}`)
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
      fetch(`http://localhost:8080/v1/auto_policies/actives/${customerId}`)
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
      fetch(`http://localhost:8080/v1/auto_quotes/actives/${customerId}`)
        .then(response => response.json())
        .then(data => {
          // Check if data.object exists and is an array before appending to quotes
          setQuotes(prevQuotes => ({
            ...prevQuotes,
            auto: Array.isArray(data.object) ? data.object : [],
          }))
        })
        .catch(error => console.error('Error fetching auto quotes:', error))

      // Fetch homes and autos
      fetchHomes()
      fetchAutos()
    }

  }, [isLoggedIn, customerId, fetchHomes, fetchAutos]) // Only run when `isLoggedIn` or `customerId` changes

  console.log("policies", policies);
  console.log("quotes", quotes);
  console.log("Customer Data: ", customerData);
  console.log("Homes: ", homes);
  console.log("Autos: ", autos);

  // Helper to render the remaining time for the quotes
  const renderTimer = (expiresAt) => {
    const diff = new Date(expiresAt) - new Date()
    if (diff <= 0) return "Expired"

    const totalMinutes = Math.floor(diff / 1000 / 60)
    const days = Math.floor(totalMinutes / (60 * 24))
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
    const mins = totalMinutes % 60

    let result = ''
    if (days > 0) result += `${days}d `
    if (hours > 0) result += `${hours}h `
    if (mins > 0) result += `${mins}m`

    return result.trim()
  }

  // Check if policy expires within 2 months
  const within2Months = (generationDate) => {
    const expiry = new Date(generationDate)
    expiry.setMonth(expiry.getMonth() + 2)
    return expiry <= new Date()
  }

  // Handlers for successful form submissions
  const handleHomeAdded = () => {
    setShowAddHome(false)
    fetchHomes() // Refetch homes data
  }

  const handleAutoAdded = () => {
    setShowAddAuto(false)
    fetchAutos() // Refetch autos data
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
            Please <a href="/loginRegister" className="text-blue-500 underline">log in</a> or <a href="/loginRegister" className="text-blue-500 underline">register</a>.
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
            {selectedSection === "info" && customerData && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Account Info</h2>

                <div>
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <div className="border rounded-md px-3 py-2 bg-white text-gray-800">
                    {customerData.firstName} {customerData.lastName}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <div className="border rounded-md px-3 py-2 bg-white text-gray-800">
                    {customerData.username}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="border rounded-md px-3 py-2 bg-white text-gray-800">
                    {customerData.email}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Birth Date</label>
                  <div className="border rounded-md px-3 py-2 bg-white text-gray-800">
                    {customerData.birthday}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <div className="border rounded-md px-3 py-2 bg-white text-gray-800">
                    {customerData.address.unit}, {customerData.address.street}, {customerData.address.city}, {customerData.address.province}, {customerData.address.postalCode}
                  </div>
                </div>
              </div>
            )}
            {selectedSection === "password" && (
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault()
                  const { target } = e
                  const oldPassword = e.target.oldPassword.value
                  const newPassword = e.target.newPassword.value
                  const confirmPassword = e.target.confirmPassword.value

                  if (newPassword !== confirmPassword) {
                    alert("New passwords do not match!")
                    return
                  }

                  const response = await fetch(`http://localhost:8080/v1/customers/reset/${customerId}?oldPassword=${oldPassword}&newPassword=${newPassword}`, {
                    method: "PUT"
                  })

                  const data = await response.json()

                  if (data.success) {
                    alert("Password changed successfully!")
                    target.reset();
                  } else {
                    alert(data.message || "Password change failed.")
                  }
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="oldPassword">
                    Current Password
                  </label>
                  <Input name="oldPassword" id="oldPassword" type="password" placeholder="Enter current password" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="newPassword">
                    New Password
                  </label>
                  <Input name="newPassword" id="newPassword" type="password" placeholder="Enter new password" required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="confirmPassword">
                    Confirm New Password
                  </label>
                  <Input name="confirmPassword" id="confirmPassword" type="password" placeholder="Confirm new password" required />
                </div>
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
                    <TabsTrigger value="manage" onClick={() => setViewMode("manage")}>
                      Manage
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
                            <th className="border px-4 py-2">Premium</th>
                            {selectedSection === 'auto' ? (
                              <>
                                <th className="border px-4 py-2">Make</th>
                                <th className="border px-4 py-2">Model</th>
                                <th className="border px-4 py-2">Year</th>
                              </>
                            ) : (
                              <th className="border px-4 py-2">Address</th>
                            )}
                            <th className="border px-4 py-2">Effective</th>
                            <th className="border px-4 py-2">Expires</th>
                            <th className="border px-4 py-2">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {policies[selectedSection].map((policy) => {
                            const effective = policy.effectiveDate;
                            const end = policy.endDate;
                            const premium = policy.premium?.toFixed(2);

                            const auto = policy.auto;
                            const home = policy.home;

                            const address = home?.address
                              ? `${home.address.unit ? `${home.address.unit}-` : ""}${home.address.street}, ${home.address.city}, ${home.address.province} ${home.address.postalCode}`
                              : '';

                            return (
                              <tr key={policy.id}>
                                <td className="border px-4 py-2">{policy.id}</td>
                                <td className="border px-4 py-2">${premium}</td>
                                {selectedSection === 'auto' ? (
                                  <>
                                    <td className="border px-4 py-2">{auto?.make}</td>
                                    <td className="border px-4 py-2">{auto?.model}</td>
                                    <td className="border px-4 py-2">{auto?.year}</td>
                                  </>
                                ) : (
                                  <td className="border px-4 py-2">{address}</td>
                                )}
                                <td className="border px-4 py-2">{effective}</td>
                                <td className="border px-4 py-2">{end}</td>
                                <td className="border px-4 py-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push(`/policy/${policy.id}?type=${selectedSection}`)}
                                  >
                                    View
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>

                      </table>
                    )}
                  </>
                ) : viewMode === "quotes" ? (
                  <>
                    <h2 className="font-semibold mb-2">{selectedSection === 'home' ? 'Home Quotes' : 'Auto Quotes'}</h2>
                    <table className="w-full border text-sm mb-6">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2">ID</th>
                          <th className="border px-4 py-2">Premium</th>
                          {selectedSection === 'auto' ? (
                            <>
                              <th className="border px-4 py-2">Make</th>
                              <th className="border px-4 py-2">Model</th>
                              <th className="border px-4 py-2">Year</th>
                            </>
                          ) : (
                            <th className="border px-4 py-2">Address</th>
                          )}
                          <th className="border px-4 py-2">Generated</th>
                          <th className="border px-4 py-2">Expires In</th>
                          <th className="border px-4 py-2">Action</th>
                        </tr>
                      </thead>


                      <tbody>
                        {Array.isArray(quotes[selectedSection]) && quotes[selectedSection].length > 0 ? (
                          quotes[selectedSection].map((q) => {
                            const expiryDate = new Date(q.generationDate)
                            expiryDate.setFullYear(expiryDate.getFullYear() + 1)

                            const addr = q.home?.address
                            const address = addr
                              ? `${addr.unit ? addr.unit + '-' : ''}${addr.street}, ${addr.city}, ${addr.province.toUpperCase()}, ${addr.postalCode.toUpperCase()}`
                              : 'N/A'

                            return (
                              <tr key={q.id}>
                                <td className="border px-4 py-2">{q.id}</td>
                                <td className="border px-4 py-2">${q.premium?.toFixed(2)}</td>

                                {selectedSection === 'auto' ? (
                                  <>
                                    <td className="border px-4 py-2">{q.auto?.make}</td>
                                    <td className="border px-4 py-2">{q.auto?.model}</td>
                                    <td className="border px-4 py-2">{q.auto?.year}</td>
                                  </>
                                ) : (
                                  <td className="border px-4 py-2">{address}</td>
                                )}

                                <td className="border px-4 py-2">{q.generationDate}</td>
                                <td className="border px-4 py-2">{renderTimer(expiryDate)}</td>
                                <td className="border px-4 py-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => router.push(`/quote/${q.id}?type=${selectedSection}`)}
                                  >
                                    View
                                  </Button>

                                </td>
                              </tr>
                            )
                          })
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">No quotes available</td>
                          </tr>
                        )}
                      </tbody>

                    </table>
                  </>
                ) : viewMode === "manage" && (
                  <>
                    <h2 className="text-xl font-bold mb-4">
                      {selectedSection === "home" ? "Manage Homes" : "Manage Vehicles"}
                    </h2>

                    {selectedSection === "home" ? (
                      <div>
                        <Button onClick={() => setShowAddHome(!showAddHome)} className="mb-4">
                          {showAddHome ? "Cancel" : "Add New Home"}
                        </Button>

                        {showAddHome && (
                          <HomeForm
                            customerId={customerId}
                            onSuccess={handleHomeAdded}
                          />
                        )}

                        <ul className="space-y-3">
                          {homes.map((home) => (
                            <li key={home.id} className="border rounded p-3">
                              <p><strong>Value:</strong> ${home.homeValue?.toLocaleString()}</p>
                              <p><strong>Built:</strong> {home.dateBuilt}</p>
                              <p><strong>Address:</strong> {home.address.unit ? `${home.address.unit}-` : ""}{home.address.street}, {home.address.city}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <Button onClick={() => setShowAddAuto(!showAddAuto)} className="mb-4">
                          {showAddAuto ? "Cancel" : "Add New Vehicle"}
                        </Button>

                        {showAddAuto && (
                          <AutoForm
                            customerId={customerId}
                            onSuccess={handleAutoAdded}
                          />
                        )}

                        <ul className="space-y-3">
                          {autos.map((auto) => (
                            <li key={auto.id} className="border rounded p-3">
                              <p>{auto.year} {auto.make} {auto.model}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
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