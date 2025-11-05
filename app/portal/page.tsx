'use client';

import { useState, useEffect } from 'react';

export default function ProviderPortal() {
  const [profile, setProfile] = useState({ name: '', description: '', address: '', orgNumber: '' });
  const [services, setServices] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [newService, setNewService] = useState({ name: '', description: '', durationMin: 15, basePriceSEK: 0 });
  const [newSlot, setNewSlot] = useState({ serviceId: '', start: '', end: '' });

  useEffect(() => {
    fetch('/api/portal/profile').then(r => r.json()).then(d => {
      if (d.provider) {
        setProfile({
          name: d.provider.name || '',
          description: d.provider.description || '',
          address: d.provider.address || '',
          orgNumber: d.provider.orgNumber || ''
        });
      }
    });
    fetch('/api/portal/services').then(r => r.json()).then(d => setServices(d.services || []));
    fetch('/api/portal/slots').then(r => r.json()).then(d => setSlots(d.slots || []));
  }, []);

  const handleProfileChange = (e: any) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const saveProfile = async (e: any) => {
    e.preventDefault();
    await fetch('/api/portal/profile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(profile) });
    alert('Profil uppdaterad');
  };

  const handleServiceChange = (e: any) => setNewService({ ...newService, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value });
  const addService = async (e: any) => {
    e.preventDefault();
    await fetch('/api/portal/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newService) });
    const res = await fetch('/api/portal/services');
    const data = await res.json();
    setServices(data.services || []);
    setNewService({ name: '', description: '', durationMin: 15, basePriceSEK: 0 });
  };

  const handleSlotChange = (e: any) => setNewSlot({ ...newSlot, [e.target.name]: e.target.value });
  const addSlot = async (e: any) => {
    e.preventDefault();
    await fetch('/api/portal/slots', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newSlot) });
    const res = await fetch('/api/portal/slots');
    const data = await res.json();
    setSlots(data.slots || []);
    setNewSlot({ serviceId: '', start: '', end: '' });
  };

  return (
    <main className="p-4 space-y-8">
      <h1 className="text-2xl font-bold">Provider-portal</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Profil</h2>
        <form onSubmit={saveProfile} className="space-y-4 max-w-md">
          <input name="name" value={profile.name} onChange={handleProfileChange} className="w-full border p-2 rounded" placeholder="Kliniknamn" />
          <textarea name="description" value={profile.description} onChange={handleProfileChange} className="w-full border p-2 rounded" placeholder="Beskrivning" />
          <input name="address" value={profile.address} onChange={handleProfileChange} className="w-full border p-2 rounded" placeholder="Adress" />
          <input name="orgNumber" value={profile.orgNumber} onChange={handleProfileChange} className="w-full border p-2 rounded" placeholder="Organisationsnummer" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Spara profil</button>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Tjänster</h2>
        <ul className="space-y-2">
          {services.length ? services.map((s: any) => (<li key={s.id} className="border p-2 rounded">{s.name} – {s.basePriceSEK} kr</li>)) : <li>Inga tjänster hittades.</li>}
        </ul>
        <form onSubmit={addService} className="space-y-2 max-w-md mt-4">
          <input name="name" value={newService.name} onChange={handleServiceChange} className="w-full border p-2 rounded" placeholder="Namn" />
          <textarea name="description" value={newService.description} onChange={handleServiceChange} className="w-full border p-2 rounded" placeholder="Beskrivning" />
          <input type="number" name="durationMin" value={newService.durationMin} onChange={handleServiceChange} className="w-full border p-2 rounded" placeholder="Varaktighet (min)" />
          <input type="number" name="basePriceSEK" value={newService.basePriceSEK} onChange={handleServiceChange} className="w-full border p-2 rounded" placeholder="Pris (SEK)" />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Lägg till tjänst</button>
        </form>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Tider</h2>
        <ul className="space-y-2">
          {slots.length ? slots.map((slot: any) => (<li key={slot.id} className="border p-2 rounded">{slot.serviceId} – {slot.start} till {slot.end}</li>)) : <li>Inga tider hittades.</li>}
        </ul>
        <form onSubmit={addSlot} className="space-y-2 max-w-md mt-4">
          <input name="serviceId" value={newSlot.serviceId} onChange={handleSlotChange} className="w-full border p-2 rounded" placeholder="Tjänst-ID" />
          <input name="start" value={newSlot.start} onChange={handleSlotChange} className="w-full border p-2 rounded" placeholder="Start (ISO)" />
          <input name="end" value={newSlot.end} onChange={handleSlotChange} className="w-full border p-2 rounded" placeholder="Slut (ISO)" />
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Lägg till tid</button>
        </form>
      </section>
    </main>
  );
}
