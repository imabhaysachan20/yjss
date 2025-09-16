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
import { Search, RefreshCw, ArrowLeft, Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function SupportFormEntries() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [areaTypeFilter, setAreaTypeFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProblem, setSelectedProblem] = useState('')
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter()

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/submissions/supportForm')
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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/submit/update-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({formId: id, status: newStatus })
      })
     if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error === 'Support form not found'
            ? 'The selected form was not found.'
            : errorData.error === 'Invalid status'
            ? 'Invalid status selected.'
            : errorData.error || 'Failed to update status'
        );
      }
      fetchSubmissions() // Refresh the list
    } catch (err) {
      setError(err.message)
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter
    const matchesAreaType = areaTypeFilter === 'all' || submission.areaType === areaTypeFilter
    const matchesSearch = searchQuery === '' || 
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.phone.includes(searchQuery) ||
      submission.district.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesAreaType && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500'
      case 'in_progress': return 'bg-blue-500'
      case 'resolved': return 'bg-green-500'
      case 'rejected': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getAreaTypeColor = (areaType) => {
    return areaType === 'rural' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  }

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
        <h2 className="text-2xl font-semibold">Support Form Entries</h2>
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
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={fetchSubmissions} variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Lok Sabha</TableHead>
              <TableHead>Vidhan Sabha</TableHead>
              <TableHead>Area Type</TableHead>
              <TableHead>Location Details</TableHead>
              <TableHead>Problem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.phone}</TableCell>
                <TableCell>{submission.district}</TableCell>
                <TableCell>{submission.loksabha}</TableCell>
                <TableCell>{submission.vidansabha}</TableCell>
                <TableCell>
                  <Badge className={getAreaTypeColor(submission.areaType)}>
                    {submission.areaType}
                  </Badge>
                </TableCell>
                <TableCell>
                  {submission.areaType === 'rural' ? (
                    <span>Block: {submission.block}<br/>Gram Panchayat: {submission.gramPanchayat}</span>
                  ) : (
                    <span>Ward: {submission.ward}</span>
                  )}
                </TableCell>
                <TableCell className="max-w-[200px] truncate">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        {submission.problem.substring(0, 50)}...
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl overflow-scroll max-h-screen">
                      <DialogHeader>
                        <DialogTitle>Problem Details</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 whitespace-pre-wrap">
                        {submission.problem}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(submission.status)}>
                    {submission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    value={submission.status}
                    onValueChange={(value) => handleStatusUpdate(submission._id, value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
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
