import { CONTACT_EMAIL } from "@/lib/catalogue";
export const metadata = { title: "Stockists" };
export default function Page() {
  return (
    <section className="hero"><div className="wrap" style={{ display: "block" }}>
      <h1 className="rise">Stockists</h1>
      <p className="rise d1">Coming soon. For now, email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </div></section>
  );
}
