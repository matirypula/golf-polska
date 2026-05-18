import { VenuesMapClient } from "@/components/VenuesMapClient";
import { getAllVenues } from "@/lib/venues";

export default async function MapaPage() {
  const venues = await getAllVenues();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <VenuesMapClient venues={venues} />
      </div>
    </main>
  );
}