create extension if not exists pg_trgm;
create extension if not exists unaccent;

create table if not exists golf_venues (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type text not null,
  region text,
  city text,
  address text,
  latitude numeric,
  longitude numeric,
  holes int,
  par int,
  rating numeric,
  reviews_count int,
  website text,
  phone text,
  email text,
  booking_url text,
  facilities text[],
  description text,
  seo_title text,
  seo_description text,
  status text default 'needs_review' check (status in ('raw','needs_review','verified','duplicate','closed')),
  source_urls text[],
  last_verified_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists golf_venues_slug_idx on golf_venues(slug);
create index if not exists golf_venues_region_idx on golf_venues(region);
create index if not exists golf_venues_city_idx on golf_venues(city);
create index if not exists golf_venues_type_idx on golf_venues(type);
create index if not exists golf_venues_status_idx on golf_venues(status);
create index if not exists golf_venues_name_trgm_idx on golf_venues using gin (name gin_trgm_ops);

create or replace function golf_venues_search(search_query text)
returns setof golf_venues as $$
  select *
  from golf_venues
  where
    search_query is null
    or search_query = ''
    or unaccent(name) ilike '%' || unaccent(search_query) || '%'
    or unaccent(coalesce(city, '')) ilike '%' || unaccent(search_query) || '%'
    or unaccent(coalesce(region, '')) ilike '%' || unaccent(search_query) || '%'
    or unaccent(type) ilike '%' || unaccent(search_query) || '%'
  order by
    case when status = 'verified' then 0 else 1 end,
    rating desc nulls last,
    name asc;
$$ language sql stable;
