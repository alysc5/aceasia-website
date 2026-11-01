import Link from "next/link";
import type { Metadata } from "next";
import { BRANDS } from "@/lib/catalogue";
import Placeholder from "@/components/Placeholder";

export const metadata: Metadata = { title: "Our Brands" };

export default function Brands() {
  return (
    <>
      <section className="hero"><div className="wrap" style={{ display: "block" }}>
        <h1 className="rise">{BRANDS.length} brands.<br />Thoughtfully chosen.</h1>
      </div></section>
      <section className="section wrap">
        {BRANDS.map((b, i) => (
          <Link key={b.slug} href={`/brands/${b.slug}`} className={`bRow rise d${Math.min(3, i)}`} style={{ borderLeft: `6px solid ${b.accent}` }}>
            {b.hero ? <img src={b.hero} alt="" className="rowImg" loading="lazy" /> : <Placeholder label={b.name} />}
            <div><h2>{b.name}</h2><p className="muted" style={{ margin: 0 }}>{b.category}</p></div>
            <span className="btn primary" aria-hidden="true">Explore brand →</span>
          </Link>
        ))}
      </section>
    </>
  );
}
