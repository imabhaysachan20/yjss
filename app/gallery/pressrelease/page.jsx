
"use client";
import React, { useEffect, useState } from "react";
import { Download } from 'lucide-react';
import  PressReleaseModal  from "@/components/PressReleaseModal"; 
import { Skeleton } from "@/components/ui/skeleton"; 

function PressReleasePage() {
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPressRelease, setSelectedPressRelease] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/pressrelease");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setPressReleases(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  // Helper function to render a skeleton table for loading state
  const renderSkeleton = () => (
    Array.from({ length: 5 }).map((_, index) => (
      <tr key={index}>
        <td className="p-4"><Skeleton className="h-5 w-8" /></td>
        <td className="p-4"><Skeleton className="h-5 w-full" /></td>
        <td className="p-4"><Skeleton className="h-5 w-24" /></td>
        <td className="p-4 flex justify-center"><Skeleton className="h-6 w-6 rounded-full" /></td>
      </tr>
    ))
  );

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Press Releases</h1>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-800 w-16">No.</th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-800">Title</th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-800 w-40">Date</th>
                  <th scope="col" className="px-6 py-4 font-bold text-gray-800 text-center w-32">View/Download</th>
                </tr>
              </thead>
              <tbody>
                {loading ? renderSkeleton() : pressReleases.map((press, index) => (
                  <tr 
                    key={press._id} 
                    className="border-b hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => setSelectedPressRelease(press)}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">
                        {/* You can still highlight parts of the title if you want */}
                        {press.title} 
                    </td>
                    <td className="px-6 py-4 text-gray-600">{press.date}</td>
                    <td className="px-6 py-4 text-center">
                      <Download className="h-5 w-5 mx-auto text-blue-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Render the Modal */}
      <PressReleaseModal
        isOpen={!!selectedPressRelease}
        pressItem={selectedPressRelease}
        onClose={() => setSelectedPressRelease(null)}
      />
    </>
  );
}

export default PressReleasePage;