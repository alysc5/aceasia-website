import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BRANDS, CONTACT_EMAIL, brandBySlug, productsFor } from "@/lib/catalogue";
import Placeholder from "@/components/Placeholder";

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
      <section className="section wrap">
        <div className="secHead"><h2>Our product range</h2></div>
        {items.length === 0 && <div className="notice">The {b.name} range is coming to our online store soon. Questions? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</div>}
      </section>
    </>
  );
}
