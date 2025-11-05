"use client";

import { Star, MapPin, Syringe, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Exempeldata (du kan byta till API senare)
const clinics = [
  {
    name: "VaccinDirekt Stockholm City",
    address: "Sveavägen 45, Stockholm",
    rating: 4.8,
    reviews: 235,
    logo: "/logos/vaccindirekt.png",
    treatments: [
      { name: "TBE-vaccin", price: "395 kr" },
      { name: "Influensavaccin", price: "295 kr" },
      { name: "Hepatit A+B", price: "695 kr" },
    ],
  },
  {
    name: "Min Doktor Vårdcentral & Vaccin",
    address: "Kungsgatan 12, Göteborg",
    rating: 4.6,
    reviews: 182,
    logo: "/logos/mindoktor.png",
    treatments: [
      { name: "TBE-vaccin", price: "375 kr" },
      { name: "Resevaccin (Thailands-paket)", price: "1 150 kr" },
      { name: "Covid-19 booster", price: "Gratis" },
    ],
  },
  {
    name: "Vaccinationsgruppen Malmö",
    address: "Södra Förstadsgatan 21, Malmö",
    rating: 4.9,
    reviews: 97,
    logo: "/logos/vaccinationsgruppen.png",
    treatments: [
      { name: "TBE-vaccin", price: "415 kr" },
      { name: "Hepatit A", price: "460 kr" },
      { name: "Gula febern", price: "780 kr" },
    ],
  },
];

export default function KlinikerPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F9FBFF] text-gray-900">
      {/* Navbar with Home button */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white border-b shadow-sm fixed top-0 left-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#1976D2] hover:text-blue-700 font-semibold transition"
        >
          <Home size={20} />
          <span>Hem</span>
        </Link>

        <h1 className="text-lg sm:text-xl font-bold text-gray-800">
          Vaccinationsmottagningar
        </h1>

        <div className="hidden sm:block text-sm text-gray-500 font-medium">
          Vårdly 💙
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center pt-32 pb-20 bg-gradient-to-b from-[#E3F2FD] to-white px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1976D2] mb-6">
          Jämför vaccinationsmottagningar 💉
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Se priser, behandlingar och recensioner — hitta rätt klinik för ditt vaccin.
        </p>
      </section>

      {/* Filter / Search */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Sök klinik eller stad..."
          className="w-full sm:w-1/2 border border-gray-300 rounded-full px-5 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <select className="border border-gray-300 rounded-full px-5 py-3 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <option>Sortera efter: Högst betyg</option>
          <option>Sortera efter: Lägst pris (TBE)</option>
          <option>Sortera efter: Närmast mig</option>
        </select>
      </div>

      {/* Clinic Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 pb-20">
        {clinics.map((clinic, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={clinic.logo}
                alt={clinic.name}
                width={60}
                height={60}
                className="rounded-lg object-contain"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {clinic.name}
                </h3>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                  <MapPin size={16} />
                  <span>{clinic.address}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-yellow-500 mb-4">
              <Star size={18} fill="currentColor" />
              <span className="font-medium text-gray-800">
                {clinic.rating}
              </span>
              <span className="text-gray-500 text-sm">
                ({clinic.reviews} recensioner)
              </span>
            </div>

            {/* Treatments */}
            <div className="flex flex-col gap-3 mb-6">
              {clinic.treatments.map((t, j) => (
                <div
                  key={j}
                  className="flex justify-between border-b border-gray-100 pb-2"
                >
                  <div className="flex items-center gap-2">
                    <Syringe size={16} className="text-[#1976D2]" />
                    <span className="font-medium text-gray-700">{t.name}</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{t.price}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="#"
              className="mt-auto text-center bg-[#1976D2] text-white py-3 rounded-full font-semibold hover:bg-[#1565C0] transition"
            >
              Boka tid hos {clinic.name.split(" ")[0]}
            </Link>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Vårdly. Alla rättigheter förbehållna.
      </footer>
    </main>
  );
}
