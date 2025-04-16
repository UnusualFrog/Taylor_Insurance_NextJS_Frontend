'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false)
  const [checkedAuth, setCheckedAuth] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isEmployee = Cookies.get('role') === 'employee'
    const isAdmin = Cookies.get('admin') === 'true' // Set this cookie on login if needed

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
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-blue-700">Admin-Only Panel</h1>
      <p className="text-gray-600 mt-2">You have access because you're an admin.</p>
    </div>
  )
}
