'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function EmployeeLayout({ children }) {
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

  return <>{children}</>
}
