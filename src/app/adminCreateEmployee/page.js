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

export default function CreateEmployeePage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checkedAuth, setCheckedAuth] = useState(false)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: ''
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

  const hasEmptyField = () => {
    return Object.values(formData).some((val) => val.trim() === '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (hasEmptyField()) {
      setError(true)
      setMessage('All fields must be filled out.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError(true)
      setMessage('Passwords do not match.')
      return
    }

    try {
      const url = new URL('http://localhost:8080/v1/admins/register')
      url.searchParams.append('firstName', formData.firstName)
      url.searchParams.append('lastName', formData.lastName)
      url.searchParams.append('email', formData.email)
      url.searchParams.append('username', formData.username)
      url.searchParams.append('password', formData.password)

      const res = await fetch(url.toString(), {
        method: 'POST'
      })
      const data = await res.json()

      if (data.success) {
        setError(false)
        setMessage('Employee registered successfully!')
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          email: ''
        })
      } else {
        setError(true)
        setMessage(data.message || 'Employee registration failed.')
      }
    } catch (err) {
      console.error('Error registering employee:', err)
      setError(true)
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (!checkedAuth) return <div>Loading...</div>
  if (!authorized) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-2xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="pt-6 text-center">
          <CardTitle className="text-2xl text-gray-800">Register New Employee</CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the form to add a new employee (admin) account.
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

            <div className="col-span-full">
              {message && (
                <p className={`text-center mb-2 ${error ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </p>
              )}
              <Button
                type="submit"
                className="w-full h-[50px] text-lg font-semibold"
                disabled={hasEmptyField()}
              >
                Register Employee
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
