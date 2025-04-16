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
  const [policies, setPolicies] = useState([])
  const [quotes, setQuotes] = useState([])
  const router = useRouter()

  const fetchDummyData = () => {
    setPolicies([{ id: 1, type: dataType, expiry: "2025-06-10" }])
    setQuotes([{ id: 1, type: dataType, expiresAt: new Date(Date.now() + 86400000).toISOString() }])
  }

  const renderTimer = (expiresAt) => {
    const diff = new Date(expiresAt) - new Date()
    const seconds = Math.floor(diff / 1000)
    if (seconds <= 0) return "Expired"
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hrs}h ${mins}m`
  }

  const within2Months = (expiry) => {
    const expiryDate = new Date(expiry)
    const twoMonthsFromNow = new Date()
    twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2)
    return expiryDate <= twoMonthsFromNow
  }

  useEffect(() => {
    if (selectedSection === "auto" || selectedSection === "home") {
      setDataType(selectedSection)
      setViewMode("policies")
      fetchDummyData()
    }
  }, [selectedSection])

  // check for and handle user log in
  const [isLoggedIn, setIsLoggedLogIn] = useState(false);
  const [username, setUsername] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const loggedin = Cookies.get('loggedin') === 'true';
    const user = Cookies.get('username');
    const id = Cookies.get('csutomerId');

    if(loggedin && user) {
      setIsLoggedLogIn(true);
      setUsername(user);
      setCustomerId(id);
    }

    setCheckedAuth(true);
  }, [])

  // Wait until cookies are checked before rendering 
  // TODO: remove this or make it pretty
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
          {/* TODO: update all this based on the users logged in info, right now only username is updated. 
          also remove this as a form/ don't let them edit it. */}
          <div className="w-full">
            {selectedSection === "info" && (
              <form className="space-y-4">
                <Input placeholder="Full Name" />
                <Input placeholder={username} />
                <Input type="date" />
                <div className="space-y-2 border rounded p-4">
                  <Input placeholder="Street" />
                  <Input placeholder="City" />
                  <Input placeholder="Province" />
                  <Input placeholder="Postal Code" />
                </div>
              </form>
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
                    <h2 className="font-semibold mb-2">Policies</h2>
                    {policies.length === 0 ? (
                      <Button variant="link" onClick={() => router.push("/policy")}>
                        Create Policy
                      </Button>
                    ) : (
                      <table className="w-full border text-sm mb-6">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Type</th>
                            <th className="border px-4 py-2">Expiry</th>
                            <th className="border px-4 py-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {policies.map((p) => (
                            <tr key={p.id}>
                              <td className="border px-4 py-2">{p.id}</td>
                              <td className="border px-4 py-2">{p.type}</td>
                              <td className="border px-4 py-2">{p.expiry}</td>
                              <td className="border px-4 py-2">
                                {within2Months(p.expiry) && (
                                  <Button variant="link" className="text-green-600 p-0 h-auto">
                                    Renew
                                  </Button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold mb-2">Quotes</h2>
                    <table className="w-full border text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border px-4 py-2">ID</th>
                          <th className="border px-4 py-2">Type</th>
                          <th className="border px-4 py-2">Expires In</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((q) => (
                          <tr key={q.id}>
                            <td className="border px-4 py-2">{q.id}</td>
                            <td className="border px-4 py-2">{q.type}</td>
                            <td className="border px-4 py-2">{renderTimer(q.expiresAt)}</td>
                          </tr>
                        ))}
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
