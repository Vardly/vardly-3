"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Mail, Sparkles, Info, ShieldCheck, Star, Compass } from "lucide-react";

export default function ComingSoonSplit() {
  const launchDate = useMemo(() => new Date("2026-02-10T10:00:00+01:00"), []);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const left = Math.max(0, Math.floor((launchDate.getTime() - now.getTime()) / 1000));
  const days = Math.floor(left / 86400);
  const hours = Math.floor((left % 86400) / 3600);
  const minutes = Math.floor((left % 3600) / 60);
  const seconds = left % 60;

  const totalSeconds = Math.max(
    1,
    Math.floor((launchDate.getTime() - (Date.now() - (launchDate.getTime() - now.getTime()))) / 1000) + 1
  );
  const pct = 1 - left / totalSeconds;
  const pctDisplay = Math.max(0, Math.min(100, Math.round(pct * 100)));

  function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = (form.get("name") as string) || "";
    const email = (form.get("email") as string) || "";
    const phone = (form.get("phone") as string) || "";
    const message = (form.get("message") as string) || "";

    const subject = encodeURIComponent("Vårdly – Kontakt (Coming Soon)");
    const body = encodeURIComponent(
      `Namn: ${name}\nE-post: ${email}\nTelefon: ${phone}\n\nMeddelande:\n${message}`
    );
    window.location.href = `mailto:kontakt@vardly.se?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4 overflow-visible">
          {/* Logga */}
          <div className="flex items-center flex-shrink-0">
            <Image src="/logo.png" alt="Vårdly" width={100} height={100} priority />
          </div>

          {/* Informativa fält på samma rad som loggan */}
          <div className="hidden sm:grid flex-grow grid-cols-4 gap-3 overflow-visible">
            <InfoCard
              icon={<Compass className="h-4 w-4" />}
              title="Sök nära dig"
              desc="Filtrera på avstånd, pris och behandling."
            />
            <InfoCard
              icon={<Star className="h-4 w-4" />}
              title="Äkta omdömen"
              desc="Relevanta recensioner som hjälper dig välja."
            />
            <InfoCard
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Verifierade kliniker"
              desc="Endast licensierade vårdgivare."
            />
            <InfoCard
              icon={<Info className="h-4 w-4" />}
              title="Transparent pris"
              desc="Se kostnad innan du bokar."
            />
          </div>

          {/* "COMING SOON"-indikator längst till höger */}
          <div className="hidden items-center gap-2 text-xs text-[#0D47A1]/80 md:flex">
            <Sparkles className="h-4 w-4" />
            COMING SOON
          </div>
        </div>
      </header>

      {/* Split layout */}
      <section className="mx-auto grid min-h-[calc(100vh-100px)] w-full max-w-7xl grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
        {/* Vänster: Hero med färgtema */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_10%_20%,#EAF2FF_0%,transparent_60%),radial-gradient(900px_600px_at_90%_30%,#EDF6FF_0%,transparent_60%),linear-gradient(180deg,#F8FBFF,white)]" />
          <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-[#64B5F6]/35 blur-[120px]" />
          <div className="absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-[#6D5DF6]/25 blur-[140px]" />

          <div className="relative flex h-full flex-col items-center justify-center px-6 py-14 md:items-start">
            {/* ANIMERAD COMING SOON */}
            <h1 className="text-center text-5xl font-extrabold leading-tight sm:text-6xl md:text-left md:text-7xl">
              <span className="animated-soon inline-block">COMING SOON</span>
            </h1>

            {/* Mindre underrubrik */}
            <p className="mt-3 text-center text-lg font-semibold text-gray-700 md:text-left md:text-xl">
              Hitta, jämför och boka vård
            </p>

            <p className="mt-2 max-w-xl text-center text-gray-600 md:text-left">
              Vi bygger en snabb, tydlig och färgstark upplevelse för att hitta rätt klinik — lansering inom kort.
            </p>

            {/* Countdown */}
            <div className="mt-8 grid w-full max-w-xl grid-cols-4 gap-3 md:max-w-lg">
              <TimeCell label="days" value={days} />
              <TimeCell label="hours" value={hours} />
              <TimeCell label="minutes" value={minutes} />
              <TimeCell label="seconds" value={seconds} />
            </div>

            {/* Progress + datum */}
            <div className="mt-4 w-full max-w-xl md:max-w-lg">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#E6EEFF]">
                <div
                  className="h-full w-0 bg-gradient-to-r from-[#0D47A1] via-[#11A3E3] to-[#6D5DF6]"
                  style={{ width: `${pctDisplay}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Planerad lansering:{" "}
                <b>
                  {launchDate.toLocaleDateString("sv-SE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </b>
              </p>
            </div>
          </div>
        </div>

        {/* Höger: Kontaktpanel */}
        <aside className="flex items-center justify-center bg-white px-6 py-14">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-center text-xl font-bold text-gray-900">Kontakta oss</h2>
            <p className="mt-1 text-center text-sm text-gray-500">Skriv ett meddelande så återkommer vi.</p>

            <form onSubmit={handleContact} className="mt-6 space-y-3">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ditt namn"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="Din e-post"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="Ditt telefonnummer"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Meddelande"
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0D47A1] via-[#11A3E3] to-[#6D5DF6] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.99]"
              >
                <Mail className="h-4 w-4" />
                Skicka
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
              <p>
                Eller mejla direkt:{" "}
                <a className="underline" href="mailto:kontakt@vardly.se">
                  kontakt@vardly.se
                </a>
              </p>
            </div>
          </div>
        </aside>
      </section>

      <footer className="border-t border-gray-100 py-8">
        <p className="text-center text-xs text-gray-500">© {new Date().getFullYear()} Vårdly</p>
      </footer>

      {/* Animering för "COMING SOON" */}
      <style jsx global>{`
        .animated-soon {
          background: linear-gradient(90deg, #0D47A1, #11A3E3, #6D5DF6, #11A3E3, #0D47A1);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradient-pan 8s linear infinite;
          white-space: nowrap;
        }
        @keyframes gradient-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </main>
  );
}

/* --------------------------- UI subcomponents --------------------------- */

function TimeCell({ label, value }: { label: string; value: number }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center justify-center rounded-full border border-[#A4C6FF]/50 bg-white/70 px-3 py-4 text-center text-[#0D47A1] backdrop-blur">
      <div className="text-2xl font-extrabold tabular-nums">{v}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider opacity-70">{label}</div>
    </div>
  );
}

/** InfoCard: klick öppnar en flytande panel under kortet (utan att trycka ner layouten). */
function InfoCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <details className="group relative rounded-xl border border-white/60 bg-white/80 p-3 shadow-sm backdrop-blur-md open:shadow-md transition overflow-visible">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0D47A1]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-[#0D47A1]/10 text-[#0D47A1]">
            {icon}
          </span>
          {title}
        </span>
        <span className="rounded-full border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] text-gray-600 transition group-open:rotate-90">
          →
        </span>
      </summary>

      {/* Flytande innehållspanel */}
      <div className="hidden group-open:block pointer-events-auto absolute left-0 top-full z-50 mt-2 w-[min(22rem,80vw)] rounded-2xl border border-gray-200 bg-white p-4 text-gray-600 shadow-xl">
        <p className="text-sm">{desc}</p>
      </div>
    </details>
  );
}
