import PageHero from "@/components/PageHero";
import { ONLINE, STOCKISTS, mapLink } from "@/lib/stockists";

export const metadata = { title: "Stockists", description: "Where to buy Ace Asia Pet Care brands in Singapore, in store and online." };

export default function Stockists() {
  return (
    <>
      <PageHero img="/img/ambrosia/life-10.webp" title="Find us near you." text="Our brands are available at these pet shops across Singapore, and online." />
      <section className="section wrap" aria-labelledby="shopsH">
        <div className="secHead"><h2 id="shopsH">In store</h2><p className="muted small">{STOCKISTS.length} stockists, A to Z · tap an address for directions</p></div>
        <div className="stockGrid">
          {STOCKISTS.map((s) => (
            <article key={s.name} className="stockCard rise">
              <h3>{s.name}</h3>
              {s.outlets.length > 1 && <span className="tag">{s.outlets.length} outlets</span>}
              <ul className="outlets">
                {s.outlets.map((o) => (
                  <li key={o.address}>
                    {o.label && <strong>{o.label}</strong>}
                    <a href={mapLink(`${s.name} ${o.address}`)} target="_blank" rel="noopener noreferrer">{o.address} ↗</a>
                  </li>
                ))}
              </ul>
              <div className="actions" style={{ marginTop: "auto" }}>
                {s.mapQuery && <a className="btn ghost small" href={mapLink(s.mapQuery)} target="_blank" rel="noopener noreferrer">View on map ↗</a>}
                {s.website && <a className="btn ghost small" href={s.website} target="_blank" rel="noopener noreferrer">Website ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section wrap" aria-labelledby="onlineH">
        <div className="secHead"><h2 id="onlineH">Online</h2></div>
        <div className="stockGrid">
          {ONLINE.map((o) => (
            <a key={o.name} className="stockCard online" href={o.url} target="_blank" rel="noopener noreferrer"><h3>{o.name}</h3><span className="arrow" aria-hidden="true">↗</span></a>
          ))}
        </div>
      </section>
      <section className="wrap"><div className="band">
        <div><h2 style={{ marginBottom: 4 }}>Want to stock our brands?</h2><p className="muted" style={{ margin: 0 }}>Tell us about your shop and we&apos;ll get you set up.</p></div>
        <a href="/become-a-stockist" className="btn dark">Become a stockist →</a>
      </div></section>
    </>
  );
}
