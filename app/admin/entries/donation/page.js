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
import { exportToExcel } from "@/utils/exportToExcel"

function SupportFormEntries() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/submissions/donation')
      if (!response.ok) throw new Error('Failed to fetch submissions')
      const data = await response.json()
      setSubmissions(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = statusFilter === 'all' || submission.paymentStatus === statusFilter
    const matchesSearch = searchQuery === '' || 
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.mob.includes(searchQuery) ||
      submission.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.block?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.gramPanchayat?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'success': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  // Add this helper to format data for Excel export
  const handleExportToExcel = () => {
    // Define headers in the same order as the table
    const headers = [
      "Id",
      "Name",
      "Last Name",
      "Mobile",
      "WhatsApp",
      "Address",
      "State",
      "District",
      "Lok Sabha",
      "Vidhan Sabha",
      "Area Type",
      "Block",
      "Gram Panchayat",
      "Ward",
      "Amount",
      "Payment ID",
      "Order ID",
      "Payment Status",
      "Date"
    ];
    // Map filtered submissions to match the headers
    const data = filteredSubmissions.map((submission) => [
      submission.userId || "",
      submission.name || "",
      submission.lname || "",
      submission.mob || "",
      submission.whatno || "",
      submission.address || "",
      submission.state || "",
      submission.district || "",
      submission.loksabha || "",
      submission.vidansabha || "",
      submission.areaType || "",
      submission.block || "",
      submission.gramPanchayat || "",
      submission.ward || "",
      submission.amount ? `₹${submission.amount}` : "",
      submission.paymentId || "",
      submission.orderId || "",
      submission.paymentStatus || "pending",
      submission.membershipDate ? new Date(submission.membershipDate).toLocaleDateString() : ""
    ]);
    exportToExcel(headers, data, "donation_entries.xlsx");
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
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/admin/dashboard')}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Donation Form Entries</h2>
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleExportToExcel} variant="outline" className="flex items-center gap-2">
          Export to Excel
        </Button>
        <Button onClick={fetchSubmissions} variant="outline" className="flex items-center gap-2">
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
              <TableHead>Amount</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.userId}</TableCell>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.lname}</TableCell>
                <TableCell>{submission.mob}</TableCell>
                <TableCell>{submission.whatno}</TableCell>
                <TableCell>{submission.address}</TableCell>
                <TableCell>{submission.state}</TableCell>
                <TableCell>{submission.district}</TableCell>
                <TableCell>{submission.loksabha}</TableCell>
                <TableCell>{submission.vidansabha}</TableCell>
                <TableCell>{submission.areaType}</TableCell>
                <TableCell>{submission.block}</TableCell>
                <TableCell>{submission.gramPanchayat}</TableCell>
                <TableCell>{submission.ward}</TableCell>
                <TableCell>₹{submission.amount}</TableCell>
                <TableCell>{submission.paymentId}</TableCell>
                <TableCell>{submission.orderId}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(submission.paymentStatus)}>
                    {submission.paymentStatus || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(submission.membershipDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default SupportFormEntries
