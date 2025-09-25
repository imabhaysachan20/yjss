"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, ArrowLeft, Eye } from 'lucide-react';
import { exportToExcel } from "@/utils/exportToExcel";

export default function PadAvedanAdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const router = useRouter();
  const limit = 20;

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.currentPage?.toString() || '1',
        limit: limit.toString(),
      });
      if (committeeFilter !== 'all') queryParams.append('committee', committeeFilter);
      if (searchQuery) queryParams.append('search', searchQuery);

      const response = await fetch(`/api/admin/submissions/padAvedan?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch submissions');
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data.submissions);
        setPagination(data.data.pagination);
      } else {
        throw new Error(data.error || 'Unknown API error');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('PadAvedanAdminPage rendered');
    fetchSubmissions();
  }, [committeeFilter, searchQuery, pagination.currentPage]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesCommittee = committeeFilter === 'all' || submission.executiveCommittee === committeeFilter;
    const matchesSearch = searchQuery === '' ||
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.serialNumber.includes(searchQuery) ||
      (submission.email && submission.email.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCommittee && matchesSearch;
  });

  const uniqueCommittees = [...new Set(submissions.map(submission => submission.executiveCommittee))].sort();

  const getLocationString = (submission) => {
    const { zone, mandal, district, vidansabha, ward } = submission;
    return [zone, mandal, district, vidansabha, ward].filter(Boolean).join(', ');
  };

  const getExportData = () => {
    return filteredSubmissions.map(submission => ({
      SerialNumber: submission.serialNumber,
      Name: submission.name,
      "Father's Name": submission.fatherName,
      "Birth Date": new Date(submission.birthDate).toLocaleDateString(),
      Education: submission.education,
      "Aadhar Number": submission.aadharNumber,
      "Executive ID": submission.executiveId,
      Phone: submission.phone,
      Email: submission.email,
      Address: submission.address,
      Position: submission.position,
      Committee: submission.executiveCommittee,
      Experience: submission.experience,
      Location: getLocationString(submission),
      "Application Date": new Date(submission.applicationDate).toLocaleDateString(),
      "Submitted On": new Date(submission.submittedAt).toLocaleDateString(),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
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
        <h2 className="text-2xl font-semibold">Pad Avedan Submissions</h2>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => exportToExcel(getExportData(), "PadAvedanSubmissions")}
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
              placeholder="Search by name, serial number, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={committeeFilter} onValueChange={setCommitteeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by committee" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Committees</SelectItem>
            {uniqueCommittees.map(committee => (
              <SelectItem key={committee} value={committee}>{committee}</SelectItem>
            ))}
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
              <TableHead>Application</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.serialNumber}</TableCell>
                <TableCell>
                  {submission.name}
                  <br />
                  {submission.email}
                  <br />
                  {submission.phone}
                </TableCell>
                <TableCell>
                  {submission.position}
                  <br />
                  {submission.executiveCommittee}
                </TableCell>
                <TableCell>{getLocationString(submission)}</TableCell>
                <TableCell>
                  {new Date(submission.submittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedSubmission(submission)}
                    title="View"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span>
          Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalCount} entries)
        </span>
        <div>
          <Button
            variant="outline"
            disabled={!pagination.hasPrevPage}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
            className="mr-2"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={!pagination.hasNextPage}
            onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
          >
            Next
          </Button>
        </div>
      </div>

      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Pad Avedan Entries</h2>
            <p><strong>Serial Number:</strong> {selectedSubmission.serialNumber}</p>
            <p><strong>Name:</strong> {selectedSubmission.name}</p>
            <p><strong>Father’s Name:</strong> {selectedSubmission.fatherName}</p>
            <p><strong>Birth Date:</strong> {new Date(selectedSubmission.birthDate).toLocaleDateString()}</p>
            <p><strong>Education:</strong> {selectedSubmission.education}</p>
            <p><strong>Aadhar Number:</strong> {selectedSubmission.aadharNumber}</p>
            <p><strong>Executive ID:</strong> {selectedSubmission.executiveId}</p>
            <p><strong>Phone:</strong> {selectedSubmission.phone}</p>
            <p><strong>Email:</strong> {selectedSubmission.email}</p>
            <p><strong>Address:</strong> {selectedSubmission.address}</p>
            <p><strong>Position:</strong> {selectedSubmission.position}</p>
            <p><strong>Committee:</strong> {selectedSubmission.executiveCommittee}</p>
            <p><strong>Experience:</strong> {selectedSubmission.experience}</p>
            <p><strong>Location:</strong> {getLocationString(selectedSubmission)}</p>
            <p><strong>Application Date:</strong> {new Date(selectedSubmission.applicationDate).toLocaleDateString()}</p>
            <p><strong>Submitted On:</strong> {new Date(selectedSubmission.submittedAt).toLocaleDateString()}</p>
            <Button
              onClick={() => setSelectedSubmission(null)}
              className="mt-4 bg-blue-500 hover:bg-blue-600"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}