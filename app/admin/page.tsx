"use client";
import Link from "next/link";
import { getVenues } from "@/lib/venues";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminPage() {
  const router = useRouter();
  const [venues, setVenues] = useState<any[]>([]);

useEffect(() => {
  loadVenues();
}, []);

async function loadVenues() {
  const { data } = await supabase
    .from("venues")
    .select("*")
    .order("created_at", { ascending: false });

  if (data) {
    setVenues(data);
  }
}
async function deleteVenue(slug: string) {
  const confirmDelete = confirm("Na pewno usunąć obiekt?");

  if (!confirmDelete) return;

  const { error } = await supabase
    .from("venues")
    .delete()
    .eq("slug", slug);

  if (error) {
    alert(error.message);
    return;
  }

  loadVenues();
}

async function toggleFeatured(slug: string, featured: boolean) {
  const { error } = await supabase
    .from("venues")
    .update({
      featured: !featured,
    })
    .eq("slug", slug);

  if (error) {
    alert(error.message);
    return;
  }

  loadVenues();
}


async function logout() {
  await supabase.auth.signOut();
  router.push("/admin/login");
}
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-black text-slate-950">
              Panel admina
            </h1>

            <p className="mt-3 text-xl text-slate-500">
              Zarządzanie obiektami golfowymi
            </p>
          </div>

          <div className="flex gap-3">
  <Link
    href="/admin/new"
    className="rounded-2xl bg-emerald-600 px-6 py-4 text-lg font-black text-white transition hover:bg-emerald-700"
  >
    Dodaj obiekt
  </Link>

  <button
    onClick={logout}
    className="rounded-2xl border border-slate-300 px-6 py-4 text-lg font-black text-slate-700 transition hover:bg-slate-100"
  >
    Wyloguj
  </button>
</div>
        </div>

        <div className="overflow-x-auto rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <table className="min-w-[900px] w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-500">
                  Obiekt
                </th>

                <th className="px-6 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-500">
                  Miasto
                </th>

                <th className="px-6 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-500">
                  Region
                </th>

                <th className="px-6 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-500">
                  Typ
                </th>

                <th className="px-6 py-5 text-left text-sm font-black uppercase tracking-wider text-slate-500">
  Featured
</th>

                <th className="px-6 py-5 text-right text-sm font-black uppercase tracking-wider text-slate-500">
                  Akcje
                </th>
              </tr>
            </thead>

            <tbody>
              {venues.map((venue) => (
                <tr
                  key={venue.slug}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          venue.image ||
                          "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80"
                        }
                        alt={venue.name}
                        className="h-16 w-24 rounded-xl object-cover"
                      />

                      <div>
                        <div className="text-lg font-black text-slate-950">
                          {venue.name}
                        </div>

                        <div className="text-sm text-slate-500">
                          {venue.slug}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-700">
                    {venue.city}
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-700">
                    {venue.region}
                  </td>

                  <td className="px-6 py-5 font-semibold text-slate-700">
                    {venue.type}
                  </td>

                  <td className="px-6 py-5">
  <button
    onClick={() =>
      toggleFeatured(venue.slug, venue.featured)
    }
    className={
      venue.featured
        ? "rounded-full bg-emerald-100 px-3 py-1 text-sm font-black text-emerald-700"
        : "rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-500"
    }
  >
    {venue.featured ? "TAK" : "NIE"}
  </button>
</td>

                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-3">
                      <button
  onClick={() => deleteVenue(venue.slug)}
  className="rounded-xl bg-red-500 px-4 py-2 font-bold text-white transition hover:bg-red-600"
>
  Usuń
</button>
                      <Link
                        href={`/obiekt/${venue.slug}`}
                        className="rounded-xl border border-slate-200 px-4 py-2 font-bold text-slate-700 transition hover:bg-slate-100"
                      >
                        Podgląd
                      </Link>

                      <Link
                        href={`/admin/edit/${venue.slug}`}
                        className="rounded-xl bg-slate-950 px-4 py-2 font-bold text-white transition hover:bg-slate-800"
                      >
                        Edytuj
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}