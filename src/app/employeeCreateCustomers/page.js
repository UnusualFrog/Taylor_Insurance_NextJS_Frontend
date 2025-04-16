// file: app/employeePortal/createCustomer/page.js
'use client'

import { useState } from 'react'
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
    const [authorized, setAuthorized] = useState(false)
      const [checkedAuth, setCheckedAuth] = useState(false)
      const router = useRouter()
    
      useEffect(() => {
        const loggedIn = Cookies.get('loggedin') === 'true'
        const role = Cookies.get('role')
    
        if (loggedIn && role === 'employee') {
          setAuthorized(true)
        } 
        else if(!loggedIn) {
          router.push('/employeeLogIn')
        }
        else {
            router.push('/unauthorized')
        }
    
        setCheckedAuth(true)
      }, [])
    
      if (!checkedAuth) return <div>Loading...</div>
      if (!authorized) return null
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
      // 1. Create the address
      const addressRes = await fetch('http://localhost:8080/v1/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          unit: formData.unit,
          street: formData.street,
          city: formData.city,
          province: formData.province,
          postalCode: formData.postalCode,
        })
      })

      const addressData = await addressRes.json()
      if (!addressData.success || !addressData.object) {
        throw new Error('Address creation failed')
      }

      const addressId = addressData.object.id

      // 2. Register customer with the address ID
      const customerRes = await fetch(`http://localhost:8080/v1/register/${addressId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          username: formData.username,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthday: formData.birthday,
          email: formData.email,
        })
      })

      const customerData = await customerRes.json()
      if (customerData.success) {
        setError(false)
        setMessage("Customer successfully registered!")
      } else {
        setError(true)
        setMessage(customerData.message || "Registration failed")
      }

    } catch (err) {
      console.error(err)
      setError(true)
      setMessage("Something went wrong. Please try again.")
    }
  }

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
