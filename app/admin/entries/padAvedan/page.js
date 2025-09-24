"use client"
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { toast } from "sonner"

function PadAvedanPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [committeeFilter, setCommitteeFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({})
  const [statistics, setStatistics] = useState({})

  
  const limit = 20

  useEffect(() => {
    fetchSubmissions()
  }, [currentPage, statusFilter, committeeFilter, searchTerm])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString()
      })
      
      if (statusFilter !== 'all') queryParams.append('status', statusFilter)
      if (committeeFilter !== 'all') queryParams.append('committee', committeeFilter)
      if (searchTerm) queryParams.append('search', searchTerm)
      
      const response = await fetch(`/api/admin/submissions/padAvedan`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch submissions')
      }
      
      const data = await response.json()
      
      if (data.success) {
        setSubmissions(data.data.submissions)
        setPagination(data.data.pagination)
        setStatistics(data.data.statistics)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
      toast.error('Failed to fetch submissions')
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (applicationId, newStatus) => {
    // Status management removed - view only mode
  }

  const getLocationString = (submission) => {
    if (submission.state === 'Uttar Pradesh') {
      const parts = [
        submission.zone,
        submission.mandal,
        submission.district,
        submission.vidansabha
      ]
      
      if (submission.areaType === 'rural' && submission.gramPanchayat) {
        parts.push(submission.gramPanchayat)
      } else if (submission.areaType === 'urban' && submission.ward) {
        parts.push(submission.ward)
      }
      
      return parts.filter(Boolean).join(', ')
    }
    return submission.state
  }

  const exportToCSV = () => {
    const headers = [
      'Serial Number', 'Name', 'Father Name', 'Email', 'Phone',
      'Position', 'Committee', 'State', 'Status', 'Application Date', 'Created At'
    ]
    
    const csvData = submissions.map(submission => [
      submission.serialNumber,
      submission.name,
      submission.fatherName,
      submission.email,
      submission.phone,
      submission.position,
      submission.executiveCommittee,
      submission.state,
      submission.status,
      new Date(submission.applicationDate).toLocaleDateString(),
      new Date(submission.createdAt).toLocaleDateString()
    ])
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pad_avedan_submissions_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">पद आवेदन Management</h1>
          <p className="text-gray-600">Manage position application submissions</p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{statistics.total || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">{statistics.thisMonth || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{statistics.thisWeek || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600">{statistics.today || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or serial number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Applications" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Applications</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={committeeFilter} onValueChange={setCommitteeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Committees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Committees</SelectItem>
                {statistics.byCommittee?.map((committee) => (
                  <SelectItem key={committee._id} value={committee._id}>
                    {committee._id} ({committee.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              onClick={() => {
                setStatusFilter('all')
                setCommitteeFilter('all')
                setSearchTerm('')
                setCurrentPage(1)
              }}
            >
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{submission.serialNumber}</p>
                        <p className="text-sm text-gray-500">{submission.applicationNumber}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{submission.name}</p>
                        <p className="text-sm text-gray-500">{submission.email}</p>
                        <p className="text-sm text-gray-500">{submission.phone}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{submission.position}</p>
                        <p className="text-sm text-gray-500">{submission.executiveCommittee}</p>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{getLocationString(submission)}</p>
                    </td>
                    
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    
                    <td className="px-6 py-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Application Details - {submission.serialNumber}</DialogTitle>
                          </DialogHeader>
                          
                          {selectedSubmission && (
                            <div className="space-y-6">
                              {/* Personal Information */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <User className="w-5 h-5 mr-2" />
                                  Personal Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Name</Label>
                                    <p className="font-medium">{selectedSubmission.name}</p>
                                  </div>
                                  <div>
                                    <Label>Father's Name</Label>
                                    <p className="font-medium">{selectedSubmission.fatherName}</p>
                                  </div>
                                  <div>
                                    <Label>Birth Date</Label>
                                    <p className="font-medium">
                                      {new Date(selectedSubmission.birthDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Education</Label>
                                    <p className="font-medium">{selectedSubmission.education || 'Not specified'}</p>
                                  </div>
                                  <div>
                                    <Label>Aadhar Number</Label>
                                    <p className="font-medium">{selectedSubmission.aadharNumber}</p>
                                  </div>
                                  <div>
                                    <Label>Executive ID</Label>
                                    <p className="font-medium">{selectedSubmission.executiveId}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Contact Information */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <Phone className="w-5 h-5 mr-2" />
                                  Contact Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Phone</Label>
                                    <p className="font-medium">{selectedSubmission.phone}</p>
                                  </div>
                                  <div>
                                    <Label>Email</Label>
                                    <p className="font-medium">{selectedSubmission.email}</p>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <Label>Address</Label>
                                  <p className="font-medium">{selectedSubmission.address}</p>
                                </div>
                              </div>

                              {/* Position Information */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <Award className="w-5 h-5 mr-2" />
                                  Position Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Applied Position</Label>
                                    <p className="font-medium">{selectedSubmission.position}</p>
                                  </div>
                                  <div>
                                    <Label>Executive Committee</Label>
                                    <p className="font-medium">{selectedSubmission.executiveCommittee}</p>
                                  </div>
                                </div>
                                {selectedSubmission.experience && (
                                  <div className="mt-2">
                                    <Label>Previous Experience</Label>
                                    <p className="font-medium">{selectedSubmission.experience}</p>
                                  </div>
                                )}
                              </div>

                              {/* Location Information */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <MapPin className="w-5 h-5 mr-2" />
                                  Location Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>State</Label>
                                    <p className="font-medium">{selectedSubmission.state}</p>
                                  </div>
                                  {selectedSubmission.state === 'Uttar Pradesh' && (
                                    <>
                                      <div>
                                        <Label>Zone</Label>
                                        <p className="font-medium">{selectedSubmission.zone}</p>
                                      </div>
                                      <div>
                                        <Label>Mandal</Label>
                                        <p className="font-medium">{selectedSubmission.mandal}</p>
                                      </div>
                                      <div>
                                        <Label>District</Label>
                                        <p className="font-medium">{selectedSubmission.district}</p>
                                      </div>
                                      <div>
                                        <Label>Loksabha</Label>
                                        <p className="font-medium">{selectedSubmission.loksabha}</p>
                                      </div>
                                      <div>
                                        <Label>Vidansabha</Label>
                                        <p className="font-medium">{selectedSubmission.vidansabha}</p>
                                      </div>
                                      <div>
                                        <Label>Area Type</Label>
                                        <p className="font-medium">{selectedSubmission.areaType}</p>
                                      </div>
                                      {selectedSubmission.areaType === 'rural' && (
                                        <>
                                          <div>
                                            <Label>Block</Label>
                                            <p className="font-medium">{selectedSubmission.block}</p>
                                          </div>
                                          <div>
                                            <Label>Gram Panchayat</Label>
                                            <p className="font-medium">{selectedSubmission.gramPanchayat}</p>
                                          </div>
                                        </>
                                      )}
                                      {selectedSubmission.areaType === 'urban' && (
                                        <div>
                                          <Label>Ward</Label>
                                          <p className="font-medium">{selectedSubmission.ward}</p>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* Application Information */}
                              <div>
                                <h3 className="text-lg font-semibold mb-4 flex items-center">
                                  <FileText className="w-5 h-5 mr-2" />
                                  Application Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Application Date</Label>
                                    <p className="font-medium">
                                      {new Date(selectedSubmission.applicationDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div>
                                    <Label>Submitted On</Label>
                                    <p className="font-medium">
                                      {new Date(selectedSubmission.createdAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {((pagination.currentPage - 1) * limit) + 1} to{' '}
            {Math.min(pagination.currentPage * limit, pagination.totalCount)} of{' '}
            {pagination.totalCount} results
          </p>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={!pagination.hasPrevPage}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <span className="flex items-center px-4 py-2 text-sm">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
              disabled={!pagination.hasNextPage}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PadAvedanPage