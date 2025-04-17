'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function EmployeeResetCustomerPassword() {
  const router = useRouter()
  const [customers, setCustomers] = useState([])
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const role = Cookies.get('role')
    const loggedIn = Cookies.get('loggedin') === 'true'
    if (!loggedIn) router.push('/employeeLogIn')
    if (loggedIn && role !== 'employee') router.push('/unauthorized')

    fetch('http://localhost:8080/v1/customers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.object)) {
          setCustomers(data.object)
        }
      })
      .catch(err => console.error('Error fetching customers:', err))
  }, [router])

  const handleReset = async (e) => {
    e.preventDefault()

    if (!selectedCustomerId || !newPassword || !confirmPassword) {
      alert("All fields are required.")
      return
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.")
      return
    }

    const selectedCustomer = customers.find(c => c.id.toString() === selectedCustomerId)
    if (!selectedCustomer) {
      alert("Selected customer not found.")
      return
    }

    const addressId = selectedCustomer.address?.id
    if (!addressId) {
      alert("Customer address not found.")
      return
    }

    const payload = new URLSearchParams({
      firstName: selectedCustomer.firstName,
      lastName: selectedCustomer.lastName,
      birthday: selectedCustomer.birthday,
      email: selectedCustomer.email,
      username: selectedCustomer.username,
      password: newPassword,
      addressId: addressId.toString()
    })

    try {
      const res = await fetch(`http://localhost:8080/v1/employees/customers/${selectedCustomerId}?${payload.toString()}`, {
        method: 'PUT'
      })

      const data = await res.json()
      if (data.success) {
        alert("Password reset successfully!")
        setSelectedCustomerId('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        alert(data.message || "Failed to reset password.")
      }
    } catch (err) {
      console.error('Error resetting password:', err)
      alert("Something went wrong.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-10">
      <Card className="w-full max-w-xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="/TInsurance-landing-logo.png" />
            <AvatarFallback>EMP</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gray-800 text-center">
            Reset Customer Password
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Select Customer</label>
              <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.id} - {c.firstName} {c.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">New Password</label>
              <Input
                type="password"
                placeholder="Enter new customer password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm New Password</label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-lg font-semibold">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
