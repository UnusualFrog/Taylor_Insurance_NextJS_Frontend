'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function EmployeeReports() {
  const [reportType, setReportType] = useState(null)
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState(null)

  const fetchReport = async (type) => {
    setLoading(true)
    setReportType(type)
    setSummary(null)

    const endpoint = type === 'home' ? 'home_policies' : 'auto_policies'

    try {
      const res = await fetch(`http://localhost:8080/v1/${endpoint}`)
      const data = await res.json()
      if (data.success && Array.isArray(data.object)) {
        const activeOnly = data.object.filter(p => p.active)

        // Aggregate calculations
        const total = activeOnly.length
        const totalPremium = activeOnly.reduce((sum, p) => sum + (p.premium || 0), 0)
        const avgPremium = total > 0 ? (totalPremium / total) : 0
        const totalBasePremium = activeOnly.reduce((sum, p) => sum + (p.basePremium || 0), 0)

        setSummary({
          total,
          avgPremium,
          totalPremium,
          totalBasePremium
        })

        setReportData(activeOnly)
      }
    } catch (err) {
      console.error('Error fetching report:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-10">
      <Card className="w-full max-w-5xl bg-white/90 shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-800">Generate Policy Report</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 px-4">
          <div className="flex gap-4 justify-center">
            <Button onClick={() => fetchReport('home')}>Home Policies</Button>
            <Button onClick={() => fetchReport('auto')}>Auto Policies</Button>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : reportType && (
            <div className="space-y-4">
              {summary && (
                <div className="bg-gray-50 p-4 rounded shadow-sm border text-sm">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Summary</h3>
                  <p><strong>Total Active Policies:</strong> {summary.total}</p>
                  <p><strong>Average Premium:</strong> ${summary.avgPremium.toFixed(2)}</p>
                  <p><strong>Total Premium Collected:</strong> ${summary.totalPremium.toFixed(2)}</p>
                  <p><strong>Total Base Premiums:</strong> ${summary.totalBasePremium.toFixed(2)}</p>
                </div>
              )}

              <h3 className="text-lg font-semibold mt-6 mb-2">Active {reportType} Policies</h3>
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Customer</th>
                    <th className="border px-4 py-2">Premium</th>
                    <th className="border px-4 py-2">Effective</th>
                    <th className="border px-4 py-2">Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((p) => (
                    <tr key={p.id}>
                      <td className="border px-4 py-2">{p.id}</td>
                      <td className="border px-4 py-2">
                        {p.home?.customer?.firstName || p.auto?.customer?.firstName}{' '}
                        {p.home?.customer?.lastName || p.auto?.customer?.lastName}
                      </td>
                      <td className="border px-4 py-2">${p.premium?.toFixed(2)}</td>
                      <td className="border px-4 py-2">{p.effectiveDate}</td>
                      <td className="border px-4 py-2">{p.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
