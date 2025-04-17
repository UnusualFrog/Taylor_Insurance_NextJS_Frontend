'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function GetQuote() {
  const [insuranceType, setInsuranceType] = useState("home")
  const [formData, setFormData] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checkedAuth, setCheckedAuth] = useState(false)
  const [customerId, setCustomerId] = useState("")
  const [homes, setHomes] = useState([]);
  const [autos, setAutos] = useState([]);
  const [userRole, setUserRole] = useState('');


  useEffect(() => {
    const loggedin = Cookies.get('loggedin') === 'true'
    const customer = Cookies.get('customerId');
    const role = Cookies.get('role')
    setIsLoggedIn(loggedin)
    setCustomerId(customer)
    setUserRole(role)
    setCheckedAuth(true)
  }, [])

  // Fetch homes and autos
useEffect(() => {
  if (isLoggedIn && customerId) {
    fetch(`http://localhost:8080/v1/homes/${customerId}`)
      .then(res => res.json())
      .then(data => {
        setHomes(Array.isArray(data.object) ? data.object : [])
      })
      .catch(err => console.error("Failed to fetch homes", err))

    fetch(`http://localhost:8080/v1/autos/${customerId}`)
      .then(res => res.json())
      .then(data => {
        setAutos(Array.isArray(data.object) ? data.object : [])
      })
      .catch(err => console.error("Failed to fetch autos", err))
  }
}, [isLoggedIn, customerId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isLoggedIn || !customerId) {
      alert("You must be logged in to get a quote.");
      return;
    }
  
    if (insuranceType === "home") {
      const { homeId, liability } = formData;
      const packagedQuote = false;
  
      if (!homeId || !liability) {
        alert("Please fill in all fields.");
        return;
      }
  
      try {
        const response = await fetch(
          `http://localhost:8080/v1/home_quotes/${customerId}/${homeId}?liability=${liability}&packagedQuote=${packagedQuote}`,
          { method: "POST" }
        );
        const data = await response.json();
  
        if (data.success) {
          alert("Home quote successfully created!");
        } else {
          alert(data.message || "Failed to create quote.");
        }
      } catch (err) {
        console.error("Error creating home quote:", err);
        alert("An error occurred while creating the quote.");
      }
    }
  
    // 🔥 NEW: Handle Auto Quote
    if (insuranceType === "auto") {
      const { autoId } = formData;
      const packagedQuote = false;
  
      if (!autoId) {
        alert("Please select a vehicle.");
        return;
      }
  
      try {
        const response = await fetch(
          `http://localhost:8080/v1/auto_quotes/${customerId}/${autoId}?packagedQuote=${packagedQuote}`,
          { method: "POST" }
        );
        const data = await response.json();
  
        if (data.success) {
          alert("Auto quote successfully created!");
        } else {
          alert(data.message || "Failed to create auto quote.");
        }
      } catch (err) {
        console.error("Error creating auto quote:", err);
        alert("An error occurred while creating the quote.");
      }
    }
  };
  
  
  

  if (!checkedAuth) return <div>Loading...</div>

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <Card className="bg-white/90 max-w-md shadow-lg p-6">
          <CardTitle className="text-xl text-gray-800">Login Required</CardTitle>
          <p className="mt-4 text-gray-600">
            You must be logged in to get a quote. Please{" "}
            <a href="/loginRegister" className="text-blue-600 underline">log in</a> or{" "}
            <a href="/loginRegister" className="text-blue-600 underline">register</a>.
          </p>
        </Card>
      </div>
    )
  }

  if (userRole === 'employee') {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <Card className="bg-white/90 max-w-md shadow-lg p-6">
          <CardTitle className="text-xl text-gray-800">Customer Access Only</CardTitle>
          <p className="mt-4 text-gray-600">
            You must be logged in on a <strong>customer account</strong> to get a quote.
          </p>
        </Card>
      </div>
    )
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

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {insuranceType === "home" ? (
              <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Home</label>
                <Select
                  onValueChange={(val) => handleChange({ target: { name: "homeId", value: val } })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your home" />
                  </SelectTrigger>
                  <SelectContent>
                    {homes.map((home) => (
                      <SelectItem key={home.id} value={home.id.toString()}>
                        {home.address.unit}-{home.address.street}, {home.address.city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Liability Limit</label>
                <Select
                  onValueChange={(val) => handleChange({ target: { name: "liability", value: val } })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select liability limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
          
            </>
            
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Vehicle</label>
                  <Select
                    onValueChange={(val) => handleChange({ target: { name: "autoId", value: val } })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose your vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {autos.map((auto) => (
                        <SelectItem key={auto.id} value={auto.id.toString()}>
                          {auto.year} {auto.make} {auto.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
