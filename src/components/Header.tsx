"use client";

import Link from "next/link";
import { useState } from "react";
import { useBasket } from "./Basket";
import { BRANDS } from "@/lib/catalogue";

export default function Header() {
  const { count, open } = useBasket();
  const [menu, setMenu] = useState(false);
  return (
    <header className="hdr">
      <div className="wrap">
        <button className="iconBtn menuBtn" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>☰</button>
        <Link href="/" className="logo logoRow" aria-label="Ace Asia Pet Care home"><img src="/img/logo-dog.png" alt="" className="logoDog" /><span className="logoText"><b>Ace Asia</b><i>Pet Care</i></span></Link>
        <nav className={`nav ${menu ? "open" : ""}`} aria-label="Main" onClick={() => setMenu(false)}>
          <div className="navDrop">
            <Link href="/brands" aria-haspopup="true">Our Brands <span aria-hidden="true">▾</span></Link>
            <div className="dropMenu" role="menu">
              {BRANDS.map((b) => <Link key={b.slug} href={`/brands/${b.slug}`} role="menuitem">{b.name}</Link>)}
              <Link href="/brands" role="menuitem" className="dropAll">See all brands →</Link>
            </div>
          </div>
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
