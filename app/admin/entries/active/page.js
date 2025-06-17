"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw, ArrowLeft } from 'lucide-react'
import { exportToExcel } from "@/utils/exportToExcel"

function ActiveMembersEntries() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/submissions/active')
      if (!response.ok) throw new Error('Failed to fetch members')
      const data = await response.json()
      setMembers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const filteredMembers = members.filter(member => {
    const searchLower = searchQuery.toLowerCase()
    return searchQuery === '' || 
      member.name?.toLowerCase().includes(searchLower) ||
      member.lname?.toLowerCase().includes(searchLower) ||
      member.mob?.includes(searchQuery) ||
      member.district?.toLowerCase().includes(searchLower) ||
      member.block?.toLowerCase().includes(searchLower) ||
      member.gramPanchayat?.toLowerCase().includes(searchLower)
  })

  // Helper to format data for Excel export
  const getExportData = () => {
    return filteredMembers.map(member => ({
      Id: member.userId,
      Name: member.name,
      "Last Name": member.lname,
      Mobile: member.mob,
      WhatsApp: member.whatno,
      Address: member.address,
      State: member.state,
      District: member.district,
      "Lok Sabha": member.loksabha,
      "Vidhan Sabha": member.vidansabha,
      "Area Type": member.areaType,
      Block: member.block,
      "Gram Panchayat": member.gramPanchayat,
      Ward: member.ward,
      "Payment ID": member.paymentId,
      "Order ID": member.orderId,
      "Payment Status": member.paymentStatus,
      "Membership Date": new Date(member.membershipDate).toLocaleDateString(),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/admin/dashboard')}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Active Members</h2>
      </div>

      {/* Export to Excel Button */}
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => exportToExcel(getExportData(), "ActiveMembers")}
        >
          Export to Excel
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by name, mobile, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={fetchMembers} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>State</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Lok Sabha</TableHead>
              <TableHead>Vidhan Sabha</TableHead>
              <TableHead>Area Type</TableHead>
              <TableHead>Block</TableHead>
              <TableHead>Gram Panchayat</TableHead>
              <TableHead>Ward</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Membership Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.userId}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.lname}</TableCell>
                <TableCell>{member.mob}</TableCell>
                <TableCell>{member.whatno}</TableCell>
                <TableCell>{member.address}</TableCell>
                <TableCell>{member.state}</TableCell>
                <TableCell>{member.district}</TableCell>
                <TableCell>{member.loksabha}</TableCell>
                <TableCell>{member.vidansabha}</TableCell>
                <TableCell>{member.areaType}</TableCell>
                <TableCell>{member.block}</TableCell>
                <TableCell>{member.gramPanchayat}</TableCell>
                <TableCell>{member.ward}</TableCell>
                <TableCell>{member.paymentId}</TableCell>
                <TableCell>{member.orderId}</TableCell>
                <TableCell>{member.paymentStatus}</TableCell>
                <TableCell>{new Date(member.membershipDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ActiveMembersEntries
