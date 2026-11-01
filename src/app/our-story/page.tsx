import Link from "next/link";
import PageHero from "@/components/PageHero";
import { BRANDS } from "@/lib/catalogue";

export const metadata = { title: "Our Story", description: "Ace Asia Pet Care has brought better-quality pet food and supplies to Singapore since 2020." };

// Based on the owner's original site copy ("Since 2020", better-quality items, peace of mind). No new claims added.
export default function OurStory() {
  return (
    <>
      <PageHero wide img="/img/banner-story.webp" title={<>Good things for pets.<br />Peace of mind for you.</>} text="Since 2020" />
      <section className="section wrap">
        <div className="storyCard rise" style={{ margin: "0 auto" }}>
          <h2>It started with a simple question.</h2>
          <p>Every pet owner wants the same thing: good food and good products for the furry family members they love. But finding them isn&apos;t always easy.</p>
          <p>That&apos;s why Ace Asia Pet Care began in 2020. We set out to bring better-quality pet food, supplements and supplies to Singapore, so owners can choose with confidence and enjoy real peace of mind.</p>
          <p>Today we bring {BRANDS.length} brands to pet lovers across Singapore. You&apos;ll find them at pet shops around the island, and online.</p>
        </div>
      </section>
      <section className="section wrap">
        <div className="secHead"><h2>The brands we bring</h2></div>
        <div className="chips" style={{ gap: 10 }}>
          {BRANDS.map((b) => <Link key={b.slug} href={`/brands/${b.slug}`} className="chip">{b.name}</Link>)}
        </div>
      </section>
      <section className="wrap"><div className="band">
        <div><h2 style={{ marginBottom: 4 }}>Where to find us</h2><p className="muted" style={{ margin: 0 }}>See our stockists, or say hello.</p></div>
        <div className="actions" style={{ marginTop: 0 }}><Link href="/stockists" className="btn dark">Stockists →</Link><Link href="/contact" className="btn ghost">Contact us</Link></div>
      </div></section>
    </>
  );
}
