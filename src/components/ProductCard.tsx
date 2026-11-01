import Link from "next/link";
import { brandBySlug, formatPrice, niceName, type Product } from "@/lib/catalogue";
import Placeholder from "./Placeholder";

export default function ProductCard({ p }: { p: Product }) {
  const b = brandBySlug(p.brand);
  return (
    <Link href={`/products/${p.id}`} className="pCard">
      {p.images[0] && !/\.(mp4|webm|mov)$/i.test(p.images[0]) ? <img src={p.images[0]} alt={p.name} loading="lazy" /> : <Placeholder label={b?.name ?? p.name} />}
      <div className="body">
        <span className="pBrand">{b?.name}</span>
        <strong>{niceName(p.name)}</strong>
        <span className="small muted">{p.available === false ? "Currently unavailable" : formatPrice(p.priceCents)}</span>
        <span className="btn ghost small" style={{ marginTop: 8, justifyContent: "center" }}>View product</span>
      </div>
    </Link>
  );
}
