// app/admin/entries/padAvedan/page.js
"use client";
import React, { useState, useEffect } from 'react';

export default function PadAvedanAdminPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    console.log('PadAvedanAdminPage rendered');
    fetch('/api/admin/submissions/padAvedan?page=1&limit=20')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        if (data.success) setSubmissions(data.data.submissions);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  return (
    <div>
      <h1>Pad Avedan Submissions</h1>
      <ul>
        {submissions.map(sub => (
          <li key={sub._id}>{sub.name} - {sub.serialNumber}</li>
        ))}
      </ul>
    </div>
  );
}