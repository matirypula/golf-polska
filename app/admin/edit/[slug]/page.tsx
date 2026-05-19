"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AdminGuard } from "@/components/AdminGuard";

export default function EditVenuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    city: "",
    region: "",
    type: "",
    address: "",
    description: "",
    image: "",
    images: [] as string[],
    holes: "",
    par: "",
    rating: "",
    featured: false,
  });

  useEffect(() => {
    async function load() {
      const resolved = await params;
      setSlug(resolved.slug);

      const { data, error } = await supabase
        .from("venues")
        .select("*")
        .eq("slug", resolved.slug)
        .single();

      if (error) {
        setMessage(`Błąd pobierania: ${error.message}`);
        return;
      }

      if (data) {
        setForm({
          name: data.name || "",
          slug: data.slug || "",
          city: data.city || "",
          region: data.region || "",
          type: data.type || "",
          address: data.address || "",
          description: data.description || "",
          image: data.image || "",
          images: data.images || [],
          holes: data.holes ? String(data.holes) : "",
          par: data.par ? String(data.par) : "",
          rating: data.rating ? String(data.rating) : "",
          featured: data.featured || false,
          
        });
      }
    }

    load();
  }, [params]);

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
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

    const { error } = await supabase
      .from("venues")
      .update({
        name: form.name,
        slug: form.slug,
        city: form.city,
        featured: form.featured,
        region: form.region,
        type: form.type,
        address: form.address,
        description: form.description,
        image: form.image,
        images: form.images,
        holes: form.holes ? Number(form.holes) : null,
        par: form.par ? Number(form.par) : null,
        rating: form.rating ? Number(form.rating) : null,
      })
      .eq("slug", slug);

    setSaving(false);

    if (error) {
      setMessage(`Błąd: ${error.message}`);
      return;
    }

    setMessage("Zapisano zmiany ✅");
    window.location.href = `/obiekt/${form.slug}`;
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
            Edytuj obiekt
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <div>
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
  <label className="mb-2 block text-sm font-bold text-slate-600">
    Upload nowego zdjęcia
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

  {uploading && (
    <div className="mt-3 text-sm font-bold text-emerald-600">
      Uploadowanie zdjęcia...
    </div>
  )}
</div>
            {[
              ["name", "Nazwa obiektu"],
              ["slug", "Slug"],
              ["city", "Miasto"],
              ["region", "Województwo"],
              ["type", "Typ obiektu"],
              ["address", "Adres"],
              ["image", "URL zdjęcia"],
              ["holes", "Dołki"],
              ["par", "Par"],
              ["rating", "Ocena"],
            ].map(([field, label]) => (
              
              <input
                key={field}
                value={String(form[field as keyof typeof form] ?? "")}
                onChange={(e) => updateField(field, e.target.value)}
                placeholder={label}
                className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
              />
            ))}

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Opis"
              rows={6}
              className="rounded-2xl bg-slate-100 px-5 py-4 font-semibold outline-none"
            />
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 font-semibold">
  <input
    type="checkbox"
    checked={form.featured}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        featured: e.target.checked,
      }))
    }
  />

  Polecany obiekt
</label>

            <button
              type="submit"
              disabled={saving}
              className="rounded-2xl bg-slate-950 px-6 py-5 text-lg font-black text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {saving ? "Zapisywanie..." : "Zapisz zmiany"}
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