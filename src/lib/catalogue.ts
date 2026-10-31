// Single source of truth for brands and products.
// RULE: only approved facts go here. No invented prices, ingredients, benefits, stockists or policies.
// Products stay empty until the owner approves catalogue data (stock lives in QuickBooks; no sync yet).

export type Brand = {
  slug: string;
  name: string;
  category: string; // plain, factual category only
  website?: string;
  accent: string; // per-brand accent, used sparingly
  logo?: string; // approved logo path, added later from the Brand Kit
};

export type Product = {
  id: string;
  brand: string; // brand slug
  name: string;
  category: "Food" | "Supplements" | "Toys" | "Wipes & Care" | "Accessories";
  images: string[]; // approved photos only
  sizes: { label: string; available: boolean }[];
  priceCents?: number; // undefined = price not approved yet
  summary?: string;
};

export const BRANDS: Brand[] = [
  { slug: "ambrosia", name: "Ambrosia", category: "Pet food", website: "https://ambrosiapetfood.com/", accent: "#a5672f" },
  { slug: "fourflax", name: "Fourflax", category: "Pet supplements", website: "https://www.fourflax.co.nz/", accent: "#2f5b3f" },
  { slug: "boss-dog", name: "Boss Dog", category: "Dog food", website: "https://bossnationbrands.com/", accent: "#7a2430" },
  { slug: "zippypaws", name: "ZippyPaws", category: "Pet toys", accent: "#8a6fc9" },
  { slug: "nobupets", name: "Nobupets", category: "Pet care essentials", accent: "#3f7f86" },
];

export const PRODUCTS: Product[] = [];

export const CONTACT_EMAIL = "hello@aceasiapetcare.com";

export const brandBySlug = (s: string) => BRANDS.find((b) => b.slug === s);
export const productsFor = (slug: string) => PRODUCTS.filter((p) => p.brand === slug);
export const formatPrice = (c?: number) => (c === undefined ? "Price coming soon" : `S$${(c / 100).toFixed(2)}`);
