import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/catalogue";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="Ace Asia Pet Care home"><img src="/img/logo.png" alt="Ace Asia Pet Care" className="logoImg small" /></Link>
        <Link href="/brands">Our Brands</Link><Link href="/shop">Shop</Link><Link href="/our-story">Our Story</Link><Link href="/stockists">Stockists</Link><Link href="/become-a-stockist">Become a stockist</Link><Link href="/contact">Contact</Link>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <span className="note">Free Singapore delivery from S$150</span>
      </div>
    </footer>
  );
}
