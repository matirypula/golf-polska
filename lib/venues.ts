import { supabase } from "./supabase";
export type Venue = {
  id: string;
  slug: string;
  name: string;
  type: string;
  region: string;
  city: string;
  address: string;
  holes: number;
  par: number;
  rating: number;
  featured?: boolean;
  latitude?: number;
  longitude?: number;
  description: string;
  image: string;
  gallery: string[];
  facilities: string[];
  website?: string;
  phone?: string;
  email?: string;
  seo_title?: string;
  seo_description?: string;
};

const DEMO_VENUES: Venue[] = [
  {
    id: "1",
    slug: "rosa-private-golf-club",
    name: "Rosa Private Golf Club",
    type: "Pole golfowe",
    region: "Śląskie",
    city: "Konopiska",
    address: "Rolnicza 1, Konopiska",
    holes: 18,
    par: 72,
    rating: 4.8,
    description:
      "Pełnowymiarowe pole mistrzowskie z rozbudowaną infrastrukturą treningową.",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Putting green"],
  },
  {
    id: "2",
    slug: "sand-valley-golf-resort",
    name: "Sand Valley Golf Resort",
    type: "Resort golfowy",
    region: "Warmińsko-mazurskie",
    city: "Pasłęk",
    address: "Sand Valley, Pasłęk",
    holes: 18,
    par: 72,
    rating: 4.7,
    description:
      "Resort golfowy z polem typu inland links i zapleczem noclegowym.",
    image:
      "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Hotel", "Restauracja"],
  },
  {
    id: "3",
    slug: "first-warsaw-golf",
    name: "First Warsaw Golf",
    type: "Pole golfowe",
    region: "Mazowieckie",
    city: "Rajszew",
    address: "Golfowa 44, Rajszew",
    holes: 18,
    par: 72,
    rating: 4.6,
    description:
      "Popularne pole golfowe w okolicach Warszawy z zapleczem treningowym i akademią.",
    image:
      "https://images.unsplash.com/photo-1620246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "4",
    slug: "krakow-valley-golf-country-club",
    name: "Kraków Valley Golf & Country Club",
    type: "Resort golfowy",
    region: "Małopolskie",
    city: "Paczółtowice",
    address: "Paczółtowice",
    holes: 18,
    par: 72,
    rating: 4.6,
    description:
      "Resort golfowy pod Krakowem z polem 18-dołkowym i rozbudowaną infrastrukturą.",
    image:
      "https://images.unsplash.com/photo-1591491719565-9cae8fd5d63c?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Hotel", "Restauracja"],
  },
  {
    id: "5",
    slug: "modry-las-golf-resort",
    name: "Modry Las Golf Resort",
    type: "Pole golfowe",
    region: "Zachodniopomorskie",
    city: "Choszczno",
    address: "Choszczno",
    holes: 18,
    par: 72,
    rating: 4.8,
    description:
      "Jedno z najbardziej rozpoznawalnych pól w Polsce, znane z naturalnego krajobrazu i leśnego charakteru.",
    image:
      "https://images.unsplash.com/photo-1530028828-25e8270793c5?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "6",
    slug: "toya-golf-country-club",
    name: "Toya Golf & Country Club",
    type: "Pole golfowe",
    region: "Dolnośląskie",
    city: "Wrocław",
    address: "okolice Wrocławia",
    holes: 18,
    par: 72,
    rating: 4.6,
    description:
      "Pole golfowe w regionie Wrocławia z zapleczem treningowym, akademią i częścią klubową.",
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "7",
    slug: "sierra-golf-club",
    name: "Sierra Golf Club",
    type: "Pole golfowe",
    region: "Pomorskie",
    city: "Pętkowice",
    address: "Pętkowice",
    holes: 18,
    par: 72,
    rating: 4.7,
    description:
      "Duży obiekt golfowy na Pomorzu z polem 18-dołkowym i rozbudowaną infrastrukturą klubową.",
    image:
      "https://images.unsplash.com/photo-1600679472829-3044539ce8ed?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "8",
    slug: "sobienie-krolewskie-golf-country-club",
    name: "Sobienie Królewskie Golf & Country Club",
    type: "Resort golfowy",
    region: "Mazowieckie",
    city: "Sobienie-Jeziory",
    address: "Sobienie-Jeziory",
    holes: 18,
    par: 72,
    rating: 4.6,
    description:
      "Resort golfowy pod Warszawą z polem 18-dołkowym, hotelem i zapleczem eventowym.",
    image:
      "https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Hotel", "Restauracja"],
  },
  {
    id: "9",
    slug: "mazury-golf-country-club",
    name: "Mazury Golf & Country Club",
    type: "Pole golfowe",
    region: "Warmińsko-mazurskie",
    city: "Naterki",
    address: "Naterki",
    holes: 18,
    par: 72,
    rating: 4.5,
    description:
      "Pole golfowe na Mazurach z zapleczem treningowym i spokojnym, zielonym otoczeniem.",
    image:
      "https://images.unsplash.com/photo-1595827432957-6bc5f9c16a73?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "10",
    slug: "gradi-golf-club",
    name: "Gradi Golf Club",
    type: "Pole golfowe",
    region: "Dolnośląskie",
    city: "Brzeźno",
    address: "Brzeźno",
    holes: 18,
    par: 72,
    rating: 4.5,
    description:
      "Pole golfowe w województwie dolnośląskim z driving range i przestrzenią klubową.",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "11",
    slug: "binowo-park-golf-club",
    name: "Binowo Park Golf Club",
    type: "Pole golfowe",
    region: "Zachodniopomorskie",
    city: "Binowo",
    address: "Binowo",
    holes: 18,
    par: 72,
    rating: 4.5,
    description:
      "Pole golfowe położone w okolicach Szczecina, z infrastrukturą dla graczy i początkujących.",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
  {
    id: "12",
    slug: "black-water-links",
    name: "Black Water Links",
    type: "Pole golfowe",
    region: "Wielkopolskie",
    city: "Poznań",
    address: "okolice Poznania",
    holes: 18,
    par: 72,
    rating: 4.6,
    description:
      "Nowoczesny obiekt golfowy w Wielkopolsce, dobry kierunek dla graczy z Poznania i okolic.",
    image:
      "https://images.unsplash.com/photo-1535132011086-b8818f016104?auto=format&fit=crop&w=1400&q=80",
      gallery: [
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=1400&q=80",
],
    facilities: ["Pole 18 dołków", "Driving range", "Akademia", "Restauracja"],
  },
];
export async function getVenues() {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("SUPABASE GET VENUES ERROR:", error);
    return DEMO_VENUES;
  }

  return data && data.length > 0 ? data : DEMO_VENUES;
}
export async function getVenueBySlug(slug: string) {
  const cleanSlug = slug.trim().toLowerCase();

  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("slug", cleanSlug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
  export async function getAllVenues() {
  const { data, error } = await supabase
    .from("venues")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
  export async function getFeaturedVenues() {
  const { data, error } = await supabase
    .from("venues")
    .select("*")
    .eq("featured", true);

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
}
  

