import PageHero from "@/components/PageHero";
import { CONTACT_EMAIL } from "@/lib/catalogue";
import { ONLINE, STOCKISTS, mapLink } from "@/lib/stockists";

export const metadata = { title: "Stockists", description: "Where to buy Ace Asia Pet Care brands in Singapore, in store and online." };

export default function Stockists() {
  return (
    <>
      <PageHero img="/img/ambrosia/life-10.webp" title="Find us near you." text="Our brands are available at these pet shops across Singapore, and online." />
      <section className="section wrap" aria-labelledby="shopsH">
        <div className="secHead"><h2 id="shopsH">In store</h2><p className="muted small">{STOCKISTS.length} stockists, A to Z</p></div>
        <div className="stockGrid">
          {STOCKISTS.map((s) => (
            <article key={s.name} className="stockCard rise">
              <h3>{s.name}</h3>
              {s.note && <span className="tag">{s.note}</span>}
              {s.address && <p className="small">{s.address}</p>}
              <div className="actions" style={{ marginTop: "auto" }}>
                <a className="btn ghost small" href={mapLink(s.mapQuery)} target="_blank" rel="noopener noreferrer">{s.note ? "Find outlets" : "View on map"} ↗</a>
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
        <div><h2 style={{ marginBottom: 4 }}>Want to stock our brands?</h2><p className="muted" style={{ margin: 0 }}>Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p></div>
      </div></section>
    </>
  );
}
