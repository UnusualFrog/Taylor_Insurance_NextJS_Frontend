'use client'

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {
  Card, CardHeader, CardTitle, CardContent
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'

import {
  Avatar, AvatarImage, AvatarFallback
} from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function ViewCustomers() {
    const [authorized, setAuthorized] = useState(false)
    const [checkedAuth, setCheckedAuth] = useState(false)
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [customers, setCustomers] = useState([])
    const [selectedCustomerId, setSelectedCustomerId] = useState(null)
    const [selectedSection, setSelectedSection] = useState('home')
    const [viewMode, setViewMode] = useState('policies')
    const [policies, setPolicies] = useState({ home: [], auto: [] })
    const [quotes, setQuotes] = useState({ home: [], auto: [] })
  
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
  

    
  

  useEffect(() => {
    const storedUsername = Cookies.get('username')
    if (storedUsername) setUsername(storedUsername)

    fetch('http://localhost:8080/v1/customers')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.object)) {
          setCustomers(data.object)
        }
      })
      .catch(err => console.error('Error fetching customers:', err))
  }, [])

  useEffect(() => {
    if (!selectedCustomerId || !authorized || !checkedAuth) return

    const base = `http://localhost:8080/v1`

    fetch(`${base}/home_policies/customers/${selectedCustomerId}`)
      .then(res => res.json())
      .then(data => setPolicies(prev => ({
        ...prev,
        home: Array.isArray(data.object) ? data.object : []
      })))

    fetch(`${base}/auto_policies/customers/${selectedCustomerId}`)
      .then(res => res.json())
      .then(data => setPolicies(prev => ({
        ...prev,
        auto: Array.isArray(data.object) ? data.object : []
      })))

    fetch(`${base}/home_quotes/customers/${selectedCustomerId}`)
      .then(res => res.json())
      .then(data => setQuotes(prev => ({
        ...prev,
        home: Array.isArray(data.object) ? data.object : []
      })))

    fetch(`${base}/auto_quotes/customers/${selectedCustomerId}`)
      .then(res => res.json())
      .then(data => setQuotes(prev => ({
        ...prev,
        auto: Array.isArray(data.object) ? data.object : []
      })))
  }, [selectedCustomerId])

    if (!checkedAuth) return <div>Loading...</div>
    if (!authorized) return null

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-10">
      <Card className="w-full max-w-5xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="h-20 w-20 mb-4">
            <AvatarImage src="/TInsurance-landing-logo.png" />
            <AvatarFallback>EMP</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl text-gray-800">Customer View</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 px-6 pb-6 text-gray-800">
          <Select onValueChange={setSelectedCustomerId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map(c => (
                <SelectItem key={c.id} value={c.id.toString()}>
                  {c.id} - {c.firstName} {c.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCustomerId && (
            <div className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <strong>Customer:</strong>{' '}
                {customers.find(c => c.id.toString() === selectedCustomerId)?.firstName}{' '}
                {customers.find(c => c.id.toString() === selectedCustomerId)?.lastName}
              </div>

              <div className="flex gap-2 flex-wrap mb-2">
                <Button onClick={() => setViewMode('policies')} className={viewMode === 'policies' ? 'border-2 border-blue-600' : ''}>
                  View Policies
                </Button>
                <Button onClick={() => setViewMode('quotes')} className={viewMode === 'quotes' ? 'border-2 border-blue-600' : ''}>
                  View Quotes
                </Button>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                <Button onClick={() => setSelectedSection('home')} className={selectedSection === 'home' ? 'border-2 border-blue-600' : ''}>
                  Home
                </Button>
                <Button onClick={() => setSelectedSection('auto')} className={selectedSection === 'auto' ? 'border-2 border-blue-600' : ''}>
                  Auto
                </Button>
              </div>

              {viewMode === 'policies' ? (
                <>
                  <h3 className="font-semibold mb-2">{selectedSection === 'home' ? 'Home Policies' : 'Auto Policies'}</h3>
                  {policies[selectedSection].length === 0 ? (
                    <p>No policies found.</p>
                  ) : (
                    <table className="w-full text-sm border">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">ID</th>
                          <th className="border px-2 py-1">Type</th>
                          <th className="border px-2 py-1">Expires</th>
                        </tr>
                      </thead>
                      <tbody>
                        {policies[selectedSection].map(p => (
                          <tr key={p.id}>
                            <td className="border px-2 py-1">{p.id}</td>
                            <td className="border px-2 py-1">{p.type}</td>
                            <td className="border px-2 py-1">{p.expiresAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-semibold mb-2">{selectedSection === 'home' ? 'Home Quotes' : 'Auto Quotes'}</h3>
                  {quotes[selectedSection].length === 0 ? (
                    <p>No quotes found.</p>
                  ) : (
                    <table className="w-full text-sm border">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">ID</th>
                          <th className="border px-2 py-1">Type</th>
                          <th className="border px-2 py-1">Expires</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotes[selectedSection].map(q => (
                          <tr key={q.id}>
                            <td className="border px-2 py-1">{q.id}</td>
                            <td className="border px-2 py-1">{q.type}</td>
                            <td className="border px-2 py-1">{q.expiresAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
