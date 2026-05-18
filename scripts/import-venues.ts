import fs from 'node:fs';
import { parse } from 'csv-parse/sync';
import slugify from 'slugify';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function toNumber(value?: string) {
  if (!value) return null;
  const parsed = Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function toArray(value?: string) {
  if (!value) return [];
  return value.split(/[;,]/).map((x) => x.trim()).filter(Boolean);
}

function normalizeRow(row: Record<string, string>) {
  const name = row.name || row.nazwa;
  const city = row.city || row.miasto || '';
  const region = row.region || row.wojewodztwo || '';
  const slug = row.slug || slugify([name, city].filter(Boolean).join(' '), {
    lower: true,
    strict: true,
  });

  return {
    slug,
    name,
    type: row.type || row.typ || 'Obiekt golfowy',
    region,
    city,
    address: row.address || row.adres || null,
    latitude: toNumber(row.latitude || row.lat),
    longitude: toNumber(row.longitude || row.lng || row.lon),
    holes: toNumber(row.holes || row.dolki),
    par: toNumber(row.par),
    rating: toNumber(row.rating || row.ocena),
    reviews_count: toNumber(row.reviews_count || row.liczba_opinii),
    website: row.website || row.www || null,
    phone: row.phone || row.telefon || null,
    email: row.email || null,
    booking_url: row.booking_url || null,
    facilities: toArray(row.facilities || row.udogodnienia),
    description: row.description || row.opis || null,
    seo_title: row.seo_title || null,
    seo_description: row.seo_description || null,
    status: row.status || 'needs_review',
    source_urls: toArray(row.source_urls || row.zrodla),
  };
}

async function main() {
  const filePath = process.argv[2];
  if (!filePath) throw new Error('Missing CSV path');

  const csv = fs.readFileSync(filePath, 'utf8');
  const records = parse(csv, { columns: true, skip_empty_lines: true }) as Record<string, string>[];
  const venues = records.map(normalizeRow).filter((x) => x.name);

  const { error } = await supabase
    .from('golf_venues')
    .upsert(venues, { onConflict: 'slug' });

  if (error) throw error;
  console.log('Imported venues:', venues.length);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
