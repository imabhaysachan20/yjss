"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, ArrowLeft, Eye } from "lucide-react";

function ContactEntries() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalMessage, setModalMessage] = useState(null);
  const router = useRouter();

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/submissions/contact");
      if (!response.ok) throw new Error("Failed to fetch submissions");
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((submission) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      searchQuery === "" ||
      submission.name?.toLowerCase().includes(searchLower) ||
      submission.email?.toLowerCase().includes(searchLower) ||
      submission.phone?.includes(searchQuery) ||
      submission.subject?.toLowerCase().includes(searchLower)
    );
  });

  const openModal = (message) => setModalMessage(message);
  const closeModal = () => setModalMessage(null);

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
          onClick={() => router.push("/admin/dashboard")}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-semibold">Contact Form Submissions</h2>
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
              placeholder="Search by name, email, or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button
          onClick={fetchSubmissions}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="rounded-md border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.name}</TableCell>
                <TableCell>{submission.email}</TableCell>
                <TableCell>{submission.phone}</TableCell>
                <TableCell>{submission.subject}</TableCell>
                <TableCell>
                  {submission.message.length > 50
                    ? submission.message.slice(0, 50) + "..."
                    : submission.message}
                  {submission.message.length > 50 && (
                    <Button variant="ghost" onClick={() => openModal(submission.message)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(submission.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Full Message</h3>
              <Button variant="ghost" onClick={closeModal}>
                X
              </Button>
            </div>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactEntries;
