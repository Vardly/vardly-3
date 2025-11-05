'use client';

import { useState, useEffect } from 'react';

interface Reports {
  providerCount: number;
  bookingCount: number;
  userCount: number;
}

export default function AdminDashboard() {
  const [reports, setReports] = useState<Reports | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/reports')
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      {loading ? (
        <p>Laddar statistik...</p>
      ) : reports ? (
        <ul className="space-y-2">
          <li>Antal vårdgivare: {reports.providerCount}</li>
          <li>Antal bokningar: {reports.bookingCount}</li>
          <li>Antal användare: {reports.userCount}</li>
        </ul>
      ) : (
        <p>Det gick inte att hämta statistiken.</p>
      )}
    </main>
  );
}
