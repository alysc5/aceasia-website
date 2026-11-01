import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRANDS, CONTACT_EMAIL, brandBySlug, productsFor } from "@/lib/catalogue";
import Placeholder from "@/components/Placeholder";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const generateStaticParams = () => BRANDS.map((b) => ({ slug: b.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = brandBySlug((await params).slug);
  return b ? { title: `${b.name} in Singapore`, description: `${b.name} (${b.category.toLowerCase()}) from Ace Asia Pet Care, Singapore.` } : {};
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const b = brandBySlug((await params).slug);
  if (!b) notFound();
  const items = productsFor(b.slug);
  return (
    <>
      {b.hero ? (
        <section className="photoHero" style={{ backgroundImage: `linear-gradient(90deg, rgba(18,40,40,.72), rgba(18,40,40,.15) 65%), url(${b.hero})` }}>
          <div className="wrap">
            {b.logo && <img src={b.logo} alt={`${b.name} logo`} className="brandLogo rise" />}
            <h1 className="rise d1">Discover {b.name}.</h1>
            <p className="rise d2">{b.category}, available from Ace Asia Pet Care in Singapore.</p>
            <a href="#range" className="btn primary rise d3">Shop {b.name} →</a>
          </div>
        </section>
      ) : (
      <section className="hero" style={{ borderBottom: `6px solid ${b.accent}` }}>
        <div className="wrap">
          <div>
            <p className="small" style={{ letterSpacing: ".3em", textTransform: "uppercase", color: b.accent, fontWeight: 700 }}>{b.name}</p>
            <h1 className="rise">Discover {b.name}.</h1>
            <p className="rise d1">{b.category}, available from Ace Asia Pet Care in Singapore.</p>
          </div>
          <Placeholder label={b.name} className="heroArt rise d2" />
        </div>
      </section>
      )}
      <section className="section wrap" id="range">
        <div className="secHead"><h2>Our product range</h2></div>
        {items.length > 0 && <div className="pGrid">{items.slice(0, 12).map((p) => <ProductCard key={p.id} p={p} />)}</div>}
        {items.length > 12 && <p style={{ textAlign: "center", marginTop: 24 }}><Link href={`/shop?brand=${b.slug}`} className="btn ghost">See all {items.length} {b.name} products →</Link></p>}
        {items.length === 0 && <div className="notice">The {b.name} range is coming to our online store soon. Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</div>}
      </section>
      {b.gallery && <section className="section wrap" aria-label={`${b.name} moments`}>
        <div className="secHead"><h2>Good food. Brighter days.</h2></div>
        <div className="strip">{b.gallery.map((g) => <img key={g} src={g} alt="" loading="lazy" />)}</div>
      </section>}
    </>
  );
}
