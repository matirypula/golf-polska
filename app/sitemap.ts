import type { MetadataRoute } from "next";
import { getAllVenues } from "@/lib/venues";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://golfpolska.pl";

  const venues = await getAllVenues();

  const venueUrls = venues.map((venue) => ({
    url: `${baseUrl}/obiekt/${venue.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/mapa`,
      lastModified: new Date(),
    },

    {
      url: `${baseUrl}/admin/login`,
      lastModified: new Date(),
    },

    ...venueUrls,
  ];
}