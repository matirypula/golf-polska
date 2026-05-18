"use client";

import Link from "next/link";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { Venue } from "@/lib/venues";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function VenuesMap({ venues }: { venues: Venue[] }) {
  const validVenues = venues.filter(
    (venue) => venue.latitude && venue.longitude
  );

  delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
      <MapContainer
        center={([52.237049, 21.017532] as any)}
        zoom={6}
        scrollWheelZoom={true}
        className="h-[700px] w-full"
      >
        <TileLayer
          attribution={"OpenStreetMap" as any}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validVenues.map((venue) => (
          <Marker
            key={venue.slug}
            position={[Number(venue.latitude), Number(venue.longitude)] as any}
          >
            <Popup>
              <div>
                <div className="font-bold">{venue.name}</div>
                <div>{venue.city}</div>
                <Link href={`/obiekt/${venue.slug}`}>Zobacz obiekt</Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}