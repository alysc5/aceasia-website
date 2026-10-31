"use client";

import Link from "next/link";
import { useState } from "react";
import { useBasket } from "./Basket";

export default function Header() {
  const { count, open } = useBasket();
  const [menu, setMenu] = useState(false);
  return (
    <header className="hdr">
      <div className="wrap">
        <button className="iconBtn menuBtn" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
        <Link href="/" className="logo" aria-label="Ace Asia Pet Care home"><b>ACE ASIA</b><span>PET CARE</span></Link>
        <nav className={`nav ${menu ? "open" : ""}`} aria-label="Main" onClick={() => setMenu(false)}>
          <Link href="/brands">Our Brands</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/our-story">Our Story</Link>
          <Link href="/stockists">Stockists</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <form className="search" action="/shop" role="search">
          <label htmlFor="q" className="srOnly">Search</label>
          <input id="q" name="q" placeholder="Search for products, brands…" />
          <span aria-hidden="true">⌕</span>
        </form>
        <button className="iconBtn" aria-label={`Open bag, ${count} items`} onClick={(e) => open(e.currentTarget)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          {count > 0 && <span className="badge">{count}</span>}
        </button>
      </div>
    </header>
  );
}
