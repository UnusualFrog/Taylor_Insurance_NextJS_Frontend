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
    const [createMode, setCreateMode] = useState(false)
    const [quoteFormData, setQuoteFormData] = useState({ liability: '', packagedQuote: false, make: '', model: '', year: '' })

  
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
                <Button onClick={() => setViewMode('create')} className={viewMode === 'create' ? 'border-2 border-blue-600' : ''}>
                    Create Quote
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
  <table className="w-full border text-sm mb-6">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">ID</th>
        <th className="border px-4 py-2">Premium</th>
        {selectedSection === 'auto' ? (
          <>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Year</th>
          </>
        ) : (
          <th className="border px-4 py-2">Address</th>
        )}
        <th className="border px-4 py-2">Effective</th>
        <th className="border px-4 py-2">Expires</th>
      </tr>
    </thead>
    <tbody>
      {policies[selectedSection].map(p => {
        const premium = p.premium?.toFixed(2)
        const auto = p.auto
        const home = p.home
        const address = home?.address
          ? `${home.address.unit ? home.address.unit + '-' : ''}${home.address.street}, ${home.address.city}, ${home.address.province} ${home.address.postalCode}`
          : ''

        return (
          <tr key={p.id}>
            <td className="border px-4 py-2">{p.id}</td>
            <td className="border px-4 py-2">${premium}</td>
            {selectedSection === 'auto' ? (
              <>
                <td className="border px-4 py-2">{auto?.make}</td>
                <td className="border px-4 py-2">{auto?.model}</td>
                <td className="border px-4 py-2">{auto?.year}</td>
              </>
            ) : (
              <td className="border px-4 py-2">{address}</td>
            )}
            <td className="border px-4 py-2">{p.effectiveDate}</td>
            <td className="border px-4 py-2">{p.endDate}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)}

                  </>
                ) : viewMode === 'quotes' ? (
                  <>
                    <h3 className="font-semibold mb-2">{selectedSection === 'home' ? 'Home Quotes' : 'Auto Quotes'}</h3>
{quotes[selectedSection].length === 0 ? (
  <p>No quotes found.</p>
) : (
  <table className="w-full border text-sm mb-6">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">ID</th>
        <th className="border px-4 py-2">Premium</th>
        {selectedSection === 'auto' ? (
          <>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Year</th>
          </>
        ) : (
          <th className="border px-4 py-2">Address</th>
        )}
        <th className="border px-4 py-2">Generated</th>
        <th className="border px-4 py-2">Expires In</th>
      </tr>
    </thead>
    <tbody>
      {quotes[selectedSection].map(q => {
        const premium = q.premium?.toFixed(2)
        const auto = q.auto
        const home = q.home
        const address = home?.address
          ? `${home.address.unit ? home.address.unit + '-' : ''}${home.address.street}, ${home.address.city}, ${home.address.province} ${home.address.postalCode}`
          : ''

        const expiryDate = new Date(q.generationDate)
        expiryDate.setFullYear(expiryDate.getFullYear() + 1)

        const timeRemaining = (() => {
          const diff = expiryDate - new Date()
          if (diff <= 0) return "Expired"
          const mins = Math.floor(diff / (1000 * 60)) % 60
          const hrs = Math.floor(diff / (1000 * 60 * 60)) % 24
          const days = Math.floor(diff / (1000 * 60 * 60 * 24))
          return `${days}d ${hrs}h ${mins}m`
        })()

        return (
          <tr key={q.id}>
            <td className="border px-4 py-2">{q.id}</td>
            <td className="border px-4 py-2">${premium}</td>
            {selectedSection === 'auto' ? (
              <>
                <td className="border px-4 py-2">{auto?.make}</td>
                <td className="border px-4 py-2">{auto?.model}</td>
                <td className="border px-4 py-2">{auto?.year}</td>
              </>
            ) : (
              <td className="border px-4 py-2">{address}</td>
            )}
            <td className="border px-4 py-2">{q.generationDate}</td>
            <td className="border px-4 py-2">{timeRemaining}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)}

                  </>
                ) : (
                  // This is the create mode section
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Create {selectedSection === 'home' ? 'Home' : 'Auto'} Quote</h3>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        e.preventDefault()
                        console.log('Submit quote data:', quoteFormData)
                        alert('Quote created (not hooked up yet)')
                      }}
                    >
                      {selectedSection === 'home' ? (
                        <>
                          <div>
                            <label className="block text-sm">Liability ($)</label>
                            <input
                              type="number"
                              className="w-full border px-2 py-1 rounded"
                              name="liability"
                              value={quoteFormData.liability}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, liability: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm">Packaged Quote?</label>
                            <select
                              className="w-full border px-2 py-1 rounded"
                              value={quoteFormData.packagedQuote}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, packagedQuote: e.target.value === 'true' })}
                            >
                              <option value="false">No</option>
                              <option value="true">Yes</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-sm">Make</label>
                            <input
                              className="w-full border px-2 py-1 rounded"
                              name="make"
                              value={quoteFormData.make}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, make: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm">Model</label>
                            <input
                              className="w-full border px-2 py-1 rounded"
                              name="model"
                              value={quoteFormData.model}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, model: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm">Year</label>
                            <input
                              type="number"
                              className="w-full border px-2 py-1 rounded"
                              name="year"
                              value={quoteFormData.year}
                              onChange={(e) => setQuoteFormData({ ...quoteFormData, year: e.target.value })}
                            />
                          </div>
                        </>
                      )}
                      <Button type="submit">Submit Quote</Button>
                    </form>
                  </div>
                )}

            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
