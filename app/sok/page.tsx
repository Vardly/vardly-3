'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamisk import av Leaflet-komponenter (förhindrar SSR-problem)
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import('react-leaflet').then(m => m.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import('react-leaflet').then(m => m.Marker),       { ssr: false });
const Popup        = dynamic(() => import('react-leaflet').then(m => m.Popup),        { ssr: false });

interface Provider {
  id: string;
  name: string;
  description: string | null;
  lat: number | null;
  lng: number | null;
  slug: string;
}

interface Service {
  id: string;
  name: string;
}

export default function SearchPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading]     = useState(false);
  const [filters, setFilters]     = useState({ minPrice: '', maxPrice: '', serviceId: '', radiusKm: '', date: '' });
  const [services, setServices]   = useState<Service[]>([]);
  const [coords, setCoords]       = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

  // Hämta alla tjänster (vaccintypslista) till dropdown
  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => setServices(data.services || []))
      .catch(() => setServices([]));
  }, []);

  // Hämta kliniker när filter eller position ändras
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (coords.lat !== null && coords.lng !== null) {
      params.append('lat', coords.lat.toString());
      params.append('lng', coords.lng.toString());
    }
    if (filters.radiusKm)  params.append('radiusKm',  filters.radiusKm);
    if (filters.serviceId) params.append('serviceId', filters.serviceId);
    if (filters.minPrice)  params.append('minPrice',  filters.minPrice);
    if (filters.maxPrice)  params.append('maxPrice',  filters.maxPrice);
    if (filters.date)      params.append('when',      filters.date);

    fetch(`/api/providers/search?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        setProviders(data.providers || []);
        setLoading(false);
      })
      .catch(() => {
        setProviders([]);
        setLoading(false);
      });
  }, [filters, coords]);

  // Geolokaliseringsknapp
  const handleGeo = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setFilters(f => ({ ...f, radiusKm: f.radiusKm || '5' }));
        },
        () => alert('Kunde inte hämta din position')
      );
    } else {
      alert('Geolocation stöds inte av din webbläsare');
    }
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Sök lediga tider</h1>

      {/* Filterpanel med geolokaliseringsknapp */}
      <div className="space-y-2">
        <button onClick={handleGeo} className="px-4 py-2 bg-blue-600 text-white rounded">
          Använd min position
        </button>
        <div className="flex flex-wrap gap-2">
          <input
            type="number"
            placeholder="Min pris"
            value={filters.minPrice}
            onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
            className="border p-2"
          />
          <input
            type="number"
            placeholder="Max pris"
            value={filters.maxPrice}
            onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
            className="border p-2"
          />
          <select
            value={filters.serviceId}
            onChange={e => setFilters({ ...filters, serviceId: e.target.value })}
            className="border p-2"
          >
            <option value="">Alla tjänster</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Max avstånd (km)"
            value={filters.radiusKm}
            onChange={e => setFilters({ ...filters, radiusKm: e.target.value })}
            className="border p-2"
          />
          <input
            type="date"
            value={filters.date}
            onChange={e => setFilters({ ...filters, date: e.target.value })}
            className="border p-2"
          />
        </div>
      </div>

      {/* Visning av kliniker eller laddningsindikator */}
      {loading ? (
        <p>Laddar...</p>
      ) : providers.length === 0 ? (
        <p>Inga kliniker hittades.</p>
      ) : (
        <ul className="space-y-2">
          {providers.map(provider => (
            <li key={provider.id} className="border p-2 rounded">
              <h2 className="text-lg font-semibold">
                <Link href={`/klinik/${provider.slug}`}>{provider.name}</Link>
              </h2>
              <p>{provider.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Karta med markörer */}
      <div className="h-80 w-full">
        <MapContainer
          center={[coords.lat ?? 59.3293, coords.lng ?? 18.0686]}
          zoom={coords.lat && coords.lng ? 12 : 10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {providers
            .filter(p => p.lat !== null && p.lng !== null)
            .map(p => (
              <Marker key={p.id} position={[p.lat!, p.lng!]}>
                <Popup>
                  <strong>{p.name}</strong>
                  <br />
                  {p.description}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </main>
  );
}
