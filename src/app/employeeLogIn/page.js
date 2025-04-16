'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { loginEmployee } from '@/lib/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function EmployeeLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const router = useRouter()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const data = await loginEmployee(formData.username, formData.password)
  
    if (data.message && data.object?.id) {
      Cookies.set('loggedin', 'true')
      Cookies.set('role', data.role) // should be "employee"
      Cookies.set('employeeId', data.object.id)
      Cookies.set('username', data.object.username)
      Cookies.set('isAdmin', data.object.admin) // Optional admin flag
  
      router.push('/employeePortal')
    } else {
      alert(data.message || "Employee login failed.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-400 px-4">
      <Card className="bg-white/95 max-w-md shadow-lg w-full p-6 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Employee Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <Input name="username" onChange={handleChange} required />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input name="password" type="password" onChange={handleChange} required />
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
