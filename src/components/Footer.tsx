import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/catalogue";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <Link href="/" className="logo"><b style={{ fontSize: "1.2rem" }}>ACE ASIA</b><span>PET CARE</span></Link>
        <Link href="/brands">Our Brands</Link><Link href="/shop">Shop</Link><Link href="/our-story">Our Story</Link><Link href="/stockists">Stockists</Link>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <span className="note">Singapore delivery only</span>
      </div>
    </footer>
  );
}
