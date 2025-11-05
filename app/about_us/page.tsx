"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartPulse, Lightbulb, Users2, Globe2, Star } from "lucide-react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#E3F2FD] to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#BBDEFB,_transparent_70%)] pointer-events-none" />
        <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1976D2] mb-6 drop-shadow-sm">
          Vi är <span className="text-gray-900">Vårdly</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10">
          En svensk vårdplattform byggd för människor — inte system.  
          Vi förenklar vägen till rätt vård med teknik, transparens och omtanke.
        </p>
        <Link
          href="/landing"
          className="bg-[#1976D2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1565C0] transition shadow-md hover:shadow-lg"
        >
          Utforska plattformen
        </Link>

        {/* Floating icons */}
        <div className="absolute top-10 left-10 opacity-20">
          <HeartPulse size={80} />
        </div>
        <div className="absolute bottom-10 right-12 opacity-20">
          <Globe2 size={90} />
        </div>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center gap-16 px-8 py-20 max-w-6xl mx-auto">
        <div className="flex-1 relative">
          <Image
            src="/team-photo.jpg"
            alt="Vårdly team"
            width={600}
            height={400}
            className="rounded-3xl shadow-xl object-cover"
          />
          <div className="absolute -bottom-6 -right-6 bg-[#1976D2] text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg">
            🚀 100% Svenskutvecklat
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl font-bold mb-5 text-gray-900">
            Vår vision – framtidens vård på dina villkor
          </h2>
          <p className="text-gray-600 leading-relaxed mb-5">
            Vi grundade Vårdly med målet att göra vården lika enkel som att
            beställa hem mat – men med tryggheten, empatin och kvaliteten som
            vården kräver.
          </p>
          <p className="text-gray-600 leading-relaxed mb-5">
            Vi tror på transparens, teknologi och tillgänglighet.  
            Vårdly ska vara bron mellan patienter, kliniker och digital innovation.
          </p>
          <Link
            href="/kliniker"
            className="inline-flex items-center gap-2 mt-4 bg-[#1976D2] text-white rounded-full px-6 py-3 text-lg font-semibold hover:bg-[#1565C0] transition"
          >
            <Star size={18} /> Se våra kliniker
          </Link>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#F5F9FF] py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-14">
          Våra kärnvärden
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
            <Lightbulb className="text-[#1976D2] mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Innovation</h3>
            <p className="text-gray-600 leading-relaxed">
              Vi utvecklar digitala lösningar som gör vård mer tillgänglig och
              effektiv – utan att tappa mänskligheten.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
            <Users2 className="text-[#1976D2] mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Transparens</h3>
            <p className="text-gray-600 leading-relaxed">
              Vi tror på öppenhet. Priser, recensioner och tillgänglighet ska
              alltid vara tydliga för alla.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100">
            <HeartPulse className="text-[#1976D2] mx-auto mb-4" size={36} />
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Empati</h3>
            <p className="text-gray-600 leading-relaxed">
              Vård handlar om människor. Vi sätter patienten i centrum i allt vi
              gör — både digitalt och mänskligt.
            </p>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-b from-white to-[#E3F2FD]">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Vi bygger framtidens vård – tillsammans.
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Vill du samarbeta med oss, utveckla nya funktioner eller bli en del av
          vårt nätverk av kliniker?
        </p>
        <Link
          href="/contact"
          className="bg-[#1976D2] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1565C0] transition shadow-md hover:shadow-lg"
        >
          Kontakta oss
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Vårdly. Alla rättigheter förbehållna.
      </footer>
    </main>
  );
}
