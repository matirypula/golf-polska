# Golf Polska Starter

Starter repo pod portal golfowy w Polsce.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase/Postgres
- CSV import pipeline

## Start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Supabase

1. Utwórz projekt w Supabase.
2. Wklej SQL z `supabase/schema.sql` do SQL Editor.
3. Uzupełnij `.env.local`.
4. Odpal import:

```bash
pnpm import:venues
```

## Strony

- `/` katalog + wyszukiwarka
- `/obiekt/[slug]` profil obiektu
- `/mapa` mapa placeholder
- `/admin` panel weryfikacji placeholder
