"use client";
import { useState } from "react";

type Review = {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
};

export default function ReviewsSection({
  reviews,
  clinicId,
}: {
  reviews: Review[];
  clinicId: number;
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [allReviews, setAllReviews] = useState(reviews);

  const average =
    allReviews.length > 0
      ? (
          allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
        ).toFixed(1)
      : "–";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinicId, rating, comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setAllReviews((prev) => [data, ...prev]);
        setComment("");
      } else {
        alert(data.error || "Något gick fel");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm mt-8">
      <h2 className="text-xl font-semibold mb-2">Recensioner</h2>
      <p className="text-gray-600 mb-4">Genomsnittligt betyg: ⭐ {average}</p>

      <ul className="space-y-3 mb-6">
        {allReviews.map((r) => (
          <li key={r.id} className="border-b pb-2">
            <p className="font-medium">⭐ {r.rating}</p>
            {r.comment && <p className="text-gray-700">{r.comment}</p>}
            <p className="text-xs text-gray-500">
              {new Date(r.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
        {allReviews.length === 0 && (
          <p className="text-gray-500">Inga recensioner ännu.</p>
        )}
      </ul>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-2 rounded-lg"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} stjärnor
            </option>
          ))}
        </select>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Skriv en kommentar..."
          rows={3}
          className="w-full border p-2 rounded-lg"
        ></textarea>
        <button
          disabled={submitting}
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Skickar..." : "Skicka recension"}
        </button>
      </form>
    </section>
  );
}
