import { CONTACT_EMAIL } from "@/lib/catalogue";
import PageHero from "@/components/PageHero";
export const metadata = { title: "Stockists" };
export default function Page() {
  return (
    <PageHero img="/img/ambrosia/life-10.webp" title="Stockists">
      <p className="rise d1">Coming soon. For now, email us at <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#fff" }}>{CONTACT_EMAIL}</a>.</p>
    </PageHero>
  );
}
