import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, brandBySlug, formatPrice, productById } from "@/lib/catalogue";
import Gallery from "@/components/Gallery";
import AddToBag from "@/components/AddToBag";
import ProductCard from "@/components/ProductCard";

export const generateStaticParams = () => PRODUCTS.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const p = productById((await params).id);
  return p ? { title: p.name, description: p.description.slice(0, 155) || `${p.name} from Ace Asia Pet Care, Singapore.` } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const p = productById((await params).id);
  if (!p) notFound();
  const b = brandBySlug(p.brand);
  const more = PRODUCTS.filter((x) => x.brand === p.brand && x.id !== p.id).slice(0, 4);
  const unavailable = p.available === false || p.priceCents == null;
  return (
    <div className="wrap section">
      <nav className="small muted" aria-label="Breadcrumb"><Link href="/">Home</Link> › <Link href="/brands">Our Brands</Link> › <Link href={`/brands/${p.brand}`}>{b?.name}</Link></nav>
      <div className="pdp">
        <Gallery images={p.images} name={p.name} />
        <div className="rise">
          <p className="pBrand">{b?.name}</p>
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)" }}>{p.name}</h1>
          {p.note && <p className="muted">{p.note}</p>}
          <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--teal)" }}>{formatPrice(p.priceCents)}</p>
          <AddToBag id={p.id} disabled={unavailable} />
          <p className="small muted">Singapore delivery only.</p>
        </div>
      </div>
      <div className="accordions">
        {p.description && <details open><summary>Description</summary><p className="pre">{p.description}</p></details>}
        {p.ingredients && <details><summary>Ingredients</summary><p className="pre">{p.ingredients}</p></details>}
        {p.analysis && <details><summary>Nutritional analysis</summary><p className="pre">{p.analysis}</p></details>}
        <details><summary>Delivery</summary><p>We deliver within Singapore only. Self-collection is not available.</p></details>
      </div>
      {more.length > 0 && <section className="section"><div className="secHead"><h2>You may also like</h2></div><div className="pGrid">{more.map((x) => <ProductCard key={x.id} p={x} />)}</div></section>}
    </div>
  );
}
