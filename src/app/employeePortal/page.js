'use client'

import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export default function EmployeeDashboard() {
  const [username, setUsername] = useState('')

  useEffect(() => {
    const storedUsername = Cookies.get('username')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  return (
    <main className="max-w-xl mx-auto mt-10 px-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-800">
        Welcome, {username || 'Employee'}!
      </h1>
      <p className="text-gray-700">
        This is your employee portal dashboard. You can manage inventory,
        check internal updates, and view reports here.
      </p>

      <div className="mt-6 p-4 bg-blue-100 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <ul className="list-disc pl-5 mt-2 text-blue-900">
          <li>View today's reports</li>
          <li>Check internal messages</li>
          <li>Manage your profile</li>
        </ul>
      </div>
    </main>
  )
}
