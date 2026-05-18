"use client";

import { useState } from "react";

export function VenueGallery({
  images,
}: {
  images?: string[];
}) {
  const validImages =
    images?.filter((image) => image && image.trim() !== "") || [];

  const [active, setActive] = useState(validImages[0] || "");

  if (!validImages.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      <img
        src={active}
        alt=""
        className="h-[500px] w-full rounded-[2rem] object-cover"
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {validImages.map((image) => (
          <button
            key={image}
            onClick={() => setActive(image)}
            className={`overflow-hidden rounded-2xl border-4 ${
              active === image
                ? "border-emerald-500"
                : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt=""
              className="h-32 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}