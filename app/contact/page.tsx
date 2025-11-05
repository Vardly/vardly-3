"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-[#F9FBFF] px-6 py-20">
      {/* Header */}
      <div className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1976D2] mb-4">
          Kontakta oss
        </h1>
        <p className="text-lg text-gray-600">
          Har du frågor eller vill samarbeta med oss? Fyll i formuläret eller
          kontakta oss direkt via e-post eller telefon.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid sm:grid-cols-3 gap-8 mb-14 max-w-4xl w-full text-center">
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <Mail className="mx-auto text-[#1976D2]" size={32} />
          <h3 className="text-lg font-semibold mt-3">E-post</h3>
          <p className="text-gray-600 mt-1">kontakt.vardly@gmail.com</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <Phone className="mx-auto text-[#1976D2]" size={32} />
          <h3 className="text-lg font-semibold mt-3">Telefon</h3>
          <p className="text-gray-600 mt-1">+46 72-014 8008</p>
          <p className="text-gray-600">+46 70-895 9771</p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <MapPin className="mx-auto text-[#1976D2]" size={32} />
          <h3 className="text-lg font-semibold mt-3">Adress</h3>
          <p className="text-gray-600 mt-1">Stockholm, Sverige</p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl space-y-6">
        <div>
          <label className="block text-gray-700 text-sm mb-1">Namn</label>
          <input
            type="text"
            placeholder="Ditt namn"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">E-post</label>
          <input
            type="email"
            placeholder="namn@exempel.se"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm mb-1">Meddelande</label>
          <textarea
            placeholder="Skriv ditt meddelande här..."
            rows={5}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-[#1976D2] text-white py-3 rounded-lg font-semibold hover:bg-[#1565C0] transition"
        >
          <Send size={18} />
          <span>Skicka meddelande</span>
        </button>
      </form>

      {/* Footer note */}
      <p className="text-gray-500 text-sm mt-10">
        Vi svarar vanligtvis inom 24 timmar. Tack för att du kontaktar Vårdly 💙
      </p>
    </main>
  );
}
