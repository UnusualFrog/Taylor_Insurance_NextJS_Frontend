'use client'

import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'

export default function CreateCustomerPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checkedAuth, setCheckedAuth] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    unit: '',
    street: '',
    city: '',
    province: '',
    postalCode: ''
  })

  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const loggedIn = Cookies.get('loggedin') === 'true'
    const role = Cookies.get('role')

    if (loggedIn && role === 'employee') {
      setAuthorized(true)
    } else if (!loggedIn) {
      router.push('/employeeLogIn')
    } else {
      router.push('/unauthorized')
    }

    setCheckedAuth(true)
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError(true)
      setMessage("Passwords do not match.")
      return
    }

    try {
      // Step 1: Create address
      const addressUrl = new URL("http://localhost:8080/v1/addresses")
      addressUrl.searchParams.append("unit", formData.unit || 0)
      addressUrl.searchParams.append("street", formData.street)
      addressUrl.searchParams.append("city", formData.city)
      addressUrl.searchParams.append("province", formData.province)
      addressUrl.searchParams.append("postalCode", formData.postalCode)

      const addressRes = await fetch(addressUrl.toString(), {
        method: "POST"
      })
      const addressData = await addressRes.json()

      if (!addressData.success || !addressData.object?.id) {
        setError(true)
        setMessage("Failed to create address: " + addressData.message)
        return
      }

      const addressId = addressData.object.id

      // Step 2: Create customer
      const customerUrl = new URL("http://localhost:8080/v1/customers/register")
      customerUrl.searchParams.append("firstName", formData.firstName)
      customerUrl.searchParams.append("lastName", formData.lastName)
      customerUrl.searchParams.append("birthday", formData.birthday)
      customerUrl.searchParams.append("email", formData.email)
      customerUrl.searchParams.append("username", formData.username)
      customerUrl.searchParams.append("password", formData.password)
      customerUrl.searchParams.append("addressId", addressId)

      const customerRes = await fetch(customerUrl.toString(), {
        method: "POST"
      })
      const customerData = await customerRes.json()

      if (customerData.success) {
        setError(false)
        setMessage("Customer registered successfully!")
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          birthday: '',
          email: '',
          unit: '',
          street: '',
          city: '',
          province: '',
          postalCode: ''
        })
      } else {
        setError(true)
        setMessage(customerData.message || "Customer registration failed.")
      }
    } catch (err) {
      console.error("Error creating customer:", err)
      setError(true)
      setMessage("Something went wrong. Please try again.")
    }
  }

  if (!checkedAuth) return <div>Loading...</div>
  if (!authorized) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-3xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="pt-6 text-center">
          <CardTitle className="text-2xl text-gray-800">Create New Customer</CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the form to register a new customer account.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <Input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            <Input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required className="col-span-full" />

            <div className="col-span-full font-semibold">Address Info</div>
            <Input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} />
            <Input name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
            <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <Input name="province" placeholder="Province" value={formData.province} onChange={handleChange} required />
            <Input name="postalCode" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} required />

            <div className="col-span-full">
              <Button type="submit" className="w-full h-[50px] text-lg font-semibold">
                Register Customer
              </Button>
              {message && (
                <p className={`text-center mt-2 ${error ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
