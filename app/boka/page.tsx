'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get('providerId');
  const serviceId = searchParams.get('serviceId');
  const slotId = searchParams.get('slotId');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId,
          serviceId,
          slotId,
          customer: { name, email, phone },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConfirmation(data.reference);
      } else {
        setError('Bokningen misslyckades');
      }
    } catch (err) {
      setError('Något gick fel');
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Bokningsbekräftelse</h1>
        <p>Tack för din bokning! Din referens är {confirmation}.</p>
      </main>
    );
  }

  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4">Boka tid</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Namn</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Telefon</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Bokar...' : 'Boka'}
        </button>
      </form>
    </main>
  );
}
