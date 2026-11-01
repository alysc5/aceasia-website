"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BRANDS, CATEGORIES, PRODUCTS } from "@/lib/catalogue";
import ProductCard from "@/components/ProductCard";

const PAGE = 24;
export default function ShopView() {
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") ?? "");
  const [cat, setCat] = useState(sp.get("category") ?? "All");
  const [brands, setBrands] = useState<string[]>(sp.get("brand") ? [sp.get("brand")!] : []);
  const [sort, setSort] = useState("featured");
  const [shown, setShown] = useState(PAGE);
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  let list = PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && (!brands.length || brands.includes(p.brand))
    && words.every((w) => `${p.name} ${p.brand}`.toLowerCase().includes(w)));
  if (sort === "low") list = [...list].sort((a, b) => (a.priceCents ?? 1e9) - (b.priceCents ?? 1e9));
  if (sort === "high") list = [...list].sort((a, b) => (b.priceCents ?? -1) - (a.priceCents ?? -1));
  const toggle = (s: string) => { setBrands(brands.includes(s) ? brands.filter((x) => x !== s) : [...brands, s]); setShown(PAGE); };

  return (
    <section className="section wrap">
      <div className="filters">
        <label className="srOnly" htmlFor="shopQ">Search products</label>
        <input id="shopQ" className="field" placeholder="Search products…" value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} />
        <div className="chips" role="group" aria-label="Category">
          {["All", ...CATEGORIES].map((c) => <button key={c} className={`chip ${cat === c ? "on" : ""}`} aria-pressed={cat === c} onClick={() => { setCat(c); setShown(PAGE); }}>{c}</button>)}
        </div>
        <details className="brandFilter">
          <summary>Filter by brand{brands.length ? ` (${brands.length})` : ""}</summary>
          <div className="checks">{BRANDS.map((b) => <label key={b.slug}><input type="checkbox" checked={brands.includes(b.slug)} onChange={() => toggle(b.slug)} /> {b.name}</label>)}</div>
        </details>
        <label className="small">Sort by{" "}
          <select className="field" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
          </select>
        </label>
      </div>
      <p className="small muted" aria-live="polite">{list.length} products{(brands.length || cat !== "All" || q) && <> · <button className="linkBtn" onClick={() => { setQ(""); setCat("All"); setBrands([]); }}>Clear all</button></>}</p>
      {list.length === 0 ? <div className="notice">No products match. Try clearing a filter.</div> :
        <div className="pGrid">{list.slice(0, shown).map((p) => <ProductCard key={p.id} p={p} />)}</div>}
      {shown < list.length && <div style={{ textAlign: "center", marginTop: 24 }}><button className="btn ghost" onClick={() => setShown(shown + PAGE)}>Show more</button></div>}
    </section>
  );
}
