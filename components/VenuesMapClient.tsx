"use client";

import dynamic from "next/dynamic";
import type { Venue } from "@/lib/venues";

const VenuesMap = dynamic(() => import("./VenuesMap"), {
  ssr: false,
});

export function VenuesMapClient({ venues }: { venues: Venue[] }) {
  return <VenuesMap venues={venues} />;
}