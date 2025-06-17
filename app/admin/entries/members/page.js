"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, RefreshCw, ArrowLeft } from 'lucide-react'

function MembershipEntries() {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [areaTypeFilter, setAreaTypeFilter] = useState('all')
  const [stateFilter, setStateFilter] = useState('all')
  const router = useRouter()

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/submissions/members')
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
    const matchesPayment = paymentFilter === 'all' || member.paymentStatus === paymentFilter
    const matchesAreaType = areaTypeFilter === 'all' || member.areaType === areaTypeFilter
    const matchesState = stateFilter === 'all' || member.state === stateFilter
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.mob.includes(searchQuery) ||
      (member.district && member.district.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesPayment && matchesAreaType && matchesState && matchesSearch
  })

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500'
      case 'pending': return 'bg-yellow-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getAreaTypeColor = (areaType) => {
    return areaType === 'rural' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  }

  const uniqueStates = [...new Set(members.map(member => member.state))].sort()

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
        <h2 className="text-2xl font-semibold">Membership Entries</h2>
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
              placeholder="Search by name, phone, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All States</SelectItem>
            {uniqueStates.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {stateFilter === 'Uttar Pradesh' && (
          <Select value={areaTypeFilter} onValueChange={setAreaTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by area type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="rural">Rural</SelectItem>
              <SelectItem value="urban">Urban</SelectItem>
            </SelectContent>
          </Select>
        )}
        <Select value={paymentFilter} onValueChange={setPaymentFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchMembers} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>WhatsApp</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>State</TableHead>
              {stateFilter === 'Uttar Pradesh' && (
                <>
                  <TableHead>District</TableHead>
                  <TableHead>Lok Sabha</TableHead>
                  <TableHead>Vidhan Sabha</TableHead>
                  <TableHead>Area Type</TableHead>
                  <TableHead>Location Details</TableHead>
                </>
              )}
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
                <TableCell>{`${member.name} ${member.lname}`}</TableCell>
                <TableCell>{member.mob}</TableCell>
                <TableCell>{member.whatno}</TableCell>
                <TableCell>{member.address}</TableCell>
                <TableCell>{member.state}</TableCell>
                {member.state === 'Uttar Pradesh' && (
                  <>
                    <TableCell>{member.district}</TableCell>
                    <TableCell>{member.loksabha}</TableCell>
                    <TableCell>{member.vidansabha}</TableCell>
                    <TableCell>
                      <Badge className={getAreaTypeColor(member.areaType)}>
                        {member.areaType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {member.areaType === 'rural' ? (
                        <span>Block: {member.block}<br/>Gram Panchayat: {member.gramPanchayat}</span>
                      ) : (
                        <span>Ward: {member.ward}</span>
                      )}
                    </TableCell>
                  </>
                )}
                <TableCell>{member.paymentId}</TableCell>
                <TableCell>{member.orderId}</TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(member.paymentStatus)}>
                    {member.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(member.membershipDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MembershipEntries
