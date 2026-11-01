"use client";

import { useRef, useState } from "react";
import Placeholder from "./Placeholder";

// Thumbnails, swipe on phones, tap to zoom.
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  const x0 = useRef<number | null>(null);
  if (!images.length) return <Placeholder label={name} className="galMain" />;
  const go = (n: number) => setI((n + images.length) % images.length);
  return (
    <div className="gallery">
      <div className="thumbs" role="tablist" aria-label="Photos">
        {images.map((src, n) => (
          <button key={src} role="tab" aria-selected={n === i} className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`Photo ${n + 1}`}>
            <img src={src} alt="" />
          </button>
        ))}
      </div>
      <button className={`galMain ${zoom ? "zoom" : ""}`} aria-label={zoom ? "Zoom out" : "Zoom in"} onClick={() => setZoom(!zoom)}
        onTouchStart={(e) => { x0.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => { if (x0.current == null) return; const d = e.changedTouches[0].clientX - x0.current; if (Math.abs(d) > 40) { setZoom(false); go(i + (d < 0 ? 1 : -1)); } x0.current = null; }}>
        <img src={images[i]} alt={`${name}, photo ${i + 1} of ${images.length}`} />
      </button>
    </div>
  );
}
