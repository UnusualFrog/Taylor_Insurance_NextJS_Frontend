'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false)
  const [checkedAuth, setCheckedAuth] = useState(false)
  const router = useRouter()

  const [username, setUsername] = useState('')
  
    useEffect(() => {
      const storedUsername = Cookies.get('username')
      if (storedUsername) setUsername(storedUsername)
    }, [])

  useEffect(() => {
    const isEmployee = Cookies.get('role') === 'employee'
    const isAdmin = Cookies.get('isAdmin') === 'true' // Set this cookie on login if needed

    if (isAdmin && isEmployee) {
      setAuthorized(true)
    } else {
      router.push('/unauthorized')
    }

    setCheckedAuth(true)
  }, [])

  if (!checkedAuth) return <div>Loading admin page...</div>
  if (!authorized) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
          <Card className="w-full max-w-3xl bg-white/90 shadow-xl rounded-xl">
            <CardHeader className="flex flex-col items-center pt-6">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/TInsurance-landing-logo.png" />
                <AvatarFallback>EMP</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl text-gray-800">
                Welcome, {username || 'Employee'} to the Admin Portal!
              </CardTitle>
              You have access because you're an admin.
            </CardHeader>
    
            <CardContent className="px-6 pb-8 space-y-6">
              <p className="text-gray-700 text-center">
                Use the buttons below to employee customer accounts or modify risk factors.
              </p>
    
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="w-full sm:w-auto" onClick={() => router.push('/adminCreateEmployee')}>
                  Create New Employee
                </Button>
                <Button className="w-full sm:w-auto" onClick={() => router.push('/adminRiskFactor')}>
                  Manage Risk Factor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    // <div className="text-center mt-10">
    //   <h1 className="text-3xl font-bold text-blue-700">Admin-Only Panel</h1>
    //   <p className="text-gray-600 mt-2">You have access because you're an admin.</p>
    // </div>
  )
}
