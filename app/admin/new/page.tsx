"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { AdminGuard } from "@/components/AdminGuard";

export default function NewVenuePage() {
    const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    city: "",
    region: "",
    type: "Pole golfowe",
    address: "",
    description: "",
    image: "",
    images: [] as string[],
    holes: "",
    par: "",
    rating: "",
    latitude: "",
    longitude: "",
    featured: false,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      slug:
        field === "name"
          ? value
              .toLowerCase()
              .replaceAll(" ", "-")
              .replaceAll("ą", "a")
              .replaceAll("ć", "c")
              .replaceAll("ę", "e")
              .replaceAll("ł", "l")
              .replaceAll("ń", "n")
              .replaceAll("ó", "o")
              .replaceAll("ś", "s")
              .replaceAll("ż", "z")
              .replaceAll("ź", "z")
          : prev.slug,
    }));
  }
async function uploadImage(file: File) {
  setUploading(true);

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("venue-images")
    .upload(fileName, file);

  if (error) {
    setUploading(false);
    alert(error.message);
    return null;
  }

  const { data } = supabase.storage
    .from("venue-images")
    .getPublicUrl(fileName);

  setUploading(false);

  return data.publicUrl;
}
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { data, error } = await supabase
  .from("venues")
  .insert({
    name: form.name,
    slug: form.slug,
    city: form.city,
    region: form.region,
    type: form.type,
    address: form.address,
    description: form.description,
    image: form.image,
    images: form.images,
    holes: form.holes ? Number(form.holes) : null,
    par: form.par ? Number(form.par) : null,
    rating: form.rating ? Number(form.rating) : null,
    latitude: form.latitude ? Number(form.latitude) : null,
    longitude: form.longitude ? Number(form.longitude) : null,
    featured: form.featured,
    facilities: ["Pole 18 dołków", "Driving range"],
  })
  .select()
  .single();

    setSaving(false);

    if (error) {
      setMessage(`Błąd: ${error.message}`);
      return;
    }

    console.log("INSERT DATA:", data);

if (data?.slug) {
  window.location.href = `/obiekt/${data.slug}`;
}

    setForm({
      name: "",
      slug: "",
      city: "",
      region: "",
      type: "Pole golfowe",
      address: "",
      description: "",
      image: "",
      images: [] as string[],
      holes: "",
      par: "",
      rating: "",
      latitude: "",
      longitude: "",
      featured: false,
    });
  }

  return (
  <AdminGuard>
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <a href="/admin" className="font-bold text-slate-600">
          ← Wróć do admina
        </a>

        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-black text-slate-950">
            Dodaj nowy obiekt
          </h1>

          <p className="mt-3 text-slate-600">
            Formularz dodaje obiekt bezpośrednio do Supabase.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Nazwa obiektu"
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
              required
            />

            <input
              value={form.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="slug"
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
              required
            />

            <div className="grid gap-5 md:grid-cols-2">
              <input
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                placeholder="Miasto"
                className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
                required
              />

              <input
                value={form.region}
                onChange={(e) => updateField("region", e.target.value)}
                placeholder="Województwo"
                className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
                required
              />
            </div>

            <select
              value={form.type}
              onChange={(e) => updateField("type", e.target.value)}
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            >
              <option>Pole golfowe</option>
              <option>Resort golfowy</option>
              <option>Driving range / akademia</option>
              <option>Indoor golf</option>
            </select>

            <input
              value={form.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Adres"
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            />
<div>
  <label className="mb-2 block text-sm font-bold text-slate-600">
    Upload zdjęcia
  </label>

  <input
    type="file"
    
    accept="image/*"
    onChange={async (e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const url = await uploadImage(file);

      if (url) {
        updateField("image", url);
      }
    }}
    className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4"
  />
  <div className="space-y-3">
  <div className="text-sm font-black uppercase tracking-wide text-slate-500">
    Galeria zdjęć
  </div>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={async (e) => {
      const files = e.target.files;
      if (!files) return;

      const urls: string[] = [];

      for (const file of Array.from(files)) {
        const url = await uploadImage(file);
        if (url) urls.push(url);
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...urls],
      }));
    }}
    className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4"
  />

  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {form.images.map((image) => (
      <img
        key={image}
        src={image}
        alt=""
        className="h-32 w-full rounded-2xl object-cover"
      />
    ))}
  </div>
</div>

  {uploading && (
    <div className="mt-3 text-sm font-bold text-emerald-600">
      Uploadowanie zdjęcia...
    </div>
  )}
</div>
            <input
              value={form.image}
              onChange={(e) => updateField("image", e.target.value)}
              placeholder="URL zdjęcia"
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            />

            <div className="grid gap-5 md:grid-cols-3">
              <input
                value={form.holes}
                onChange={(e) => updateField("holes", e.target.value)}
                placeholder="Dołki"
                className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
              />

              <input
                value={form.par}
                onChange={(e) => updateField("par", e.target.value)}
                placeholder="Par"
                className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
              />

              <input
                value={form.rating}
                onChange={(e) => updateField("rating", e.target.value)}
                placeholder="Ocena"
                className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
              />
              <input
  value={form.latitude}
  onChange={(e) => updateField("latitude", e.target.value)}
  placeholder="Latitude"
  className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
/>

<input
  value={form.longitude}
  onChange={(e) => updateField("longitude", e.target.value)}
  placeholder="Longitude"
  className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
/>
<label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold">
  <input
    type="checkbox"
    checked={form.featured}
    onChange={(e) =>
      setForm({
        ...form,
        featured: e.target.checked,
      })
    }
  />

  Polecany obiekt
</label>
            </div>

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Opis"
              rows={5}
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            />

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-slate-950 px-6 py-5 text-lg font-black text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? "Dodawanie..." : "Dodaj obiekt"}
            </button>

            {message && (
              <div className="rounded-2xl bg-slate-100 px-5 py-4 font-bold">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
</AdminGuard>
  );
}