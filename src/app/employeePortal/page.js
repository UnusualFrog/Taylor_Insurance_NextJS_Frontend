'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function EmployeePortalDashboard() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUsername = Cookies.get('username')
    if (storedUsername) setUsername(storedUsername)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <Card className="w-full max-w-4xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="flex flex-col items-center pt-6">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="/TInsurance-landing-logo.png" />
            <AvatarFallback>EMP</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gray-800">
            Welcome, {username || 'Employee'}!
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 pb-8 space-y-6">
          <p className="text-gray-700 text-center">
            Use the buttons below to manage customer accounts, view policies, or create new customers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="w-full sm:w-auto" onClick={() => router.push('/employeeViewCustomers')}>
              View Customer Quotes & Policies
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => router.push('/employeeResetCustomerPassword')}>
              Reset a Customers Password
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => router.push('/employeeCreateCustomers')}>
              Create New Customer
            </Button>
            <Button className="w-full sm:w-auto" onClick={() => router.push('/employeeReports')}>
              Run Report
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
