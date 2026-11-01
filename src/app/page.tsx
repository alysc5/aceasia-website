import Link from "next/link";
import { BRANDS, PRODUCTS } from "@/lib/catalogue";
import BrandCard from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div>
            <h1 className="rise">Good brands.<br />Happier pets.</h1>
            <p className="rise d1">Pet food, supplements, toys and everyday essentials from brands we carry in Singapore.</p>
            <div className="actions rise d2">
              <Link href="/brands" className="btn primary">Explore our brands →</Link>
              <Link href="/shop" className="btn ghost">Shop all</Link>
            </div>
          </div>
          <img src="/img/hero-home.webp" alt="A golden retriever and a tabby cat relaxing together on a cosy blanket" className="heroArt heroImg rise d2" />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="brandsH">
        <div className="secHead"><h2 id="brandsH">Our Brands</h2><p className="muted small"><Link href="/brands">See all {BRANDS.length} brands →</Link></p></div>
        <div className="brandGrid">{BRANDS.slice(0, 5).map((b, i) => <BrandCard key={b.slug} b={b} i={i} />)}</div>
      </section>

      <section className="section wrap" aria-labelledby="favH">
        <div className="secHead"><h2 id="favH">Curated Favourites</h2></div>
        <div className="pGrid">{BRANDS.slice(0, 5).map((b) => PRODUCTS.find((p) => p.brand === b.slug && p.priceCents != null)).filter((p) => p !== undefined).map((p) => <ProductCard key={p.id} p={p} />)}</div>
        {PRODUCTS.length === 0 && <div className="notice">Our online catalogue is being prepared. In the meantime, email us and we&apos;ll help you find the right product.</div>}
      </section>

      <section className="wrap">
        <div className="band">
          <div><h2 style={{ marginBottom: 4 }}>Great brands for your shelves.</h2><p className="muted" style={{ margin: 0 }}>Retailers in Singapore: talk to us about carrying our brands.</p></div>
          <Link href="/become-a-stockist" className="btn dark">Become a stockist →</Link>
        </div>
      </section>
    </>
  );
}
