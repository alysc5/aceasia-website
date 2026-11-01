// Single source of truth for brands and products.
// RULE: only approved facts go here. No invented prices, ingredients, benefits, stockists or policies.
// Products stay empty until the owner approves catalogue data (stock lives in QuickBooks; no sync yet).

export type Brand = {
  slug: string;
  name: string;
  category: string; // plain, factual category only
  website?: string;
  accent: string; // per-brand accent, used sparingly
  logo?: string; // approved logo (white, for dark photos)
  hero?: string; // brand banner photo
  tagline?: string; // owner-approved line
  gallery?: string[];
};

import data from "@/data/products.json";

export type Category = "Food" | "Supplements" | "Toys" | "Wipes & Care" | "Accessories";
export const CATEGORIES: Category[] = ["Food", "Supplements", "Toys", "Wipes & Care", "Accessories"];

// From the owner's product sheet (scripts/import_products.py). Public fields only.
export type Product = {
  id: string; brand: string; name: string; note: string; category: Category; unit: string;
  priceCents: number | null; description: string; ingredients: string; analysis: string;
  images: string[]; available?: boolean; hidden?: boolean; // available=false shows "Currently unavailable"
};

export const BRANDS: Brand[] = [
  { slug: "ambrosia", name: "Ambrosia", category: "Ultra premium pet food", website: "https://ambrosiapetfood.com/", accent: "#a5672f", logo: "/img/ambrosia/logo.webp", hero: "/img/ambrosia/life-1.webp", gallery: [2,3,4,5,6,7,8,9,10].map((n) => `/img/ambrosia/life-${n}.webp`) },
  { slug: "fourflax", name: "Fourflax", category: "Natural supplements for cats & dogs", website: "https://www.fourflax.co.nz/", accent: "#2f5b3f", logo: "/img/fourflax/logo.webp", hero: "/img/ambrosia/life-5.webp" },
  { slug: "boss-dog", name: "Boss Dog", category: "Freeze-dried dog food", website: "https://bossnationbrands.com/", accent: "#7a2430" },
  { slug: "zippypaws", name: "ZippyPaws", category: "Pet toys", accent: "#8a6fc9" },
  { slug: "nobupets", name: "Nobu Pets", category: "Pee pads", accent: "#3f7f86" },
  { slug: "smart-paws", name: "Smart Paws", category: "Pee trays", accent: "#6b8f71" },
  { slug: "welcome-studio", name: "Welcome Studio", category: "Cushions", accent: "#c98a8a" },
  { slug: "doggyman", name: "Doggyman", category: "Grooming", accent: "#c9a23c" },
  { slug: "codos", name: "Codos", category: "Pet clippers", accent: "#4a5a6a" },
  { slug: "superpets", name: "Superpets", category: "Bowls", accent: "#5b8fb9" },
  { slug: "herchy", name: "Herchy", category: "Water nozzles", accent: "#d47fa6" },
];

// hidden = owner asked to keep off the site for now (e.g. waiting for photos)
export const PRODUCTS = (data as Product[]).filter((p) => !p.hidden);
export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);

export const CONTACT_EMAIL = "hello@aceasiapetcare.com";

export const brandBySlug = (s: string) => BRANDS.find((b) => b.slug === s);
export const productsFor = (slug: string) => PRODUCTS.filter((p) => p.brand === slug);
export const formatPrice = (c?: number | null) => (c == null ? "Price coming soon" : `S$${(c / 100).toFixed(2)}`);

// Sheet names are ALL CAPS; show them in friendly title case. Units (1.5Kg, 100g, GF) stay readable.
export function niceName(n: string) {
  return n.replace(/\s+/g, " ").trim().toLowerCase()
    .replace(/(^|[\s(&,/-])([a-z])/g, (_, a, b) => a + b.toUpperCase())
    .replace(/\b(\d+(?:\.\d+)?)(kg|g|ml|l|oz|cm)\b/gi, (_, a, u) => a + u.toLowerCase())
    .replace(/\bGf\b/g, "Grain-Free").replace(/\. \(/g, " (");
}
