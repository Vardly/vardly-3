"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#E6F4FF] px-6 relative">
      {/* Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 bg-[#1976D2] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#1565C0] transition"
      >
        <Home size={18} />
        <span className="font-semibold">Hem</span>
      </Link>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mt-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Skapa konto
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Registrera dig för att boka tider och hitta vård nära dig.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Fullständigt namn
            </label>
            <input
              type="text"
              placeholder="Ditt namn"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              E-postadress
            </label>
            <input
              type="email"
              placeholder="namn@exempel.se"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Lösenord
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Registrera dig
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Har du redan ett konto?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Logga in här
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} Vårdly
      </p>
    </main>
  );
}
