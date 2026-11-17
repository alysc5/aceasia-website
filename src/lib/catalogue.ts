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
  hero?: string; // brand card/banner photo
  lightBanner?: boolean; // dark text on a light banner
  banner?: string; // wide designed banner (overrides hero on brand page)
  tagline?: string; // owner-approved line
  gallery?: string[];
  story?: string[]; // owner-supplied brand copy only
  why?: string[]; // why Ace Asia brought the brand to Singapore (owner-approved)
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
  { slug: "ambrosia", name: "Ambrosia", category: "Ultra premium pet food", website: "https://ambrosiapetfood.com/", accent: "#a5672f", logo: "/img/ambrosia/logo.webp", hero: "/img/ambrosia/life-1.webp", gallery: [2,3,4,5,6,7,8,9,10].map((n) => `/img/ambrosia/life-${n}.webp`), story: ["Ambrosia is an ultra-premium dog and cat food designed in Greece by Petouch International, a privately owned Greek pet food company based in Athens. It takes its name from ambrosia, the food of the ancient Greek gods.", "The range is built around pets' natural, meat-first nutritional needs. Recipes are grain-free and follow a \"same protein and fat source\" approach, which helps make them gentle on sensitive tummies.", "There are two series, Classic and Mediterranean Diet, with more than 24 recipes sold in about 34 countries across Europe and Asia. The Mediterranean Diet series adds olive oil, herbs, fruits and vegetables, with more than 70% of its protein coming from animal ingredients."], why: ["We wanted a grain-free food that we would be happy to feed our own dogs and cats, with clear, simple ingredients.", "Ambrosia's one-protein recipes give Singapore owners of pets with sensitive skin or tummies an easy option to try, and its Mediterranean recipes bring something new to the shelf here."] },
  { slug: "fourflax", name: "Fourflax", category: "Natural supplements for cats & dogs", website: "https://www.fourflax.co.nz/", accent: "#2f5b3f", logo: "/img/fourflax/logo.webp", hero: "/img/ambrosia/life-5.webp", story: ["Fourflax is a family-owned and run business based in Ashburton, New Zealand.", "Its parent company was started more than 20 years ago by seven farmers who grew linseed (flax). It has since become New Zealand's largest producer of cold-pressed, New Zealand-grown flax seed oil.", "Every Fourflax product starts with flax seed grown on the Canterbury Plains, fully traceable from field to bottle. Their flax seed oil naturally contains over 60% Omega 3. The range covers daily oils and targeted support for dogs and cats, such as skin and coat, joints and digestion."], why: ["Fish oil isn't for every pet (or every owner's nose!). Fourflax gives Singapore pet owners a plant-based Omega 3 that is easy to add to any meal.", "We like that it comes from one traceable source of New Zealand farms, so we always know where it comes from."] },
  { slug: "boss-dog", name: "Boss Dog", category: "Freeze-dried raw diet for dogs", website: "https://bossnationbrands.com/", accent: "#e1122a", logo: "/img/boss-dog/logo.webp", hero: "/img/boss-dog/card.webp", banner: "/img/boss-dog/hero.webp", lightBanner: true, story: ["Boss Dog is made by Boss Nation Brands, founded in Seattle, USA. The founder created the brand for his own dogs and cat, with a focus on gut and digestive health.", "Its Freeze-Dried Raw Diet starts with quality animal protein, adds vegetables and fruits, then freeze-dries everything into bite-sized Nuggs. Each serving is infused with probiotics: 500 million per cup.", "Nuggs can be served as a complete meal, a topper, a mixer or a training treat. The range has won a SuperZoo BlogPaws Best of Show award (2022) and a Pet Business Industry Recognition Award."], why: ["Raw feeding is growing in Singapore, but fresh raw food is hard to store and handle. Freeze-dried Nuggs give owners the raw experience with no freezer and no mess.", "The added probiotics fit how we think about feeding: a happy gut makes a happy dog."] },
  { slug: "zippypaws", name: "ZippyPaws", category: "Playful dog toys", accent: "#ff6f91", hero: "/img/zippypaws/card.webp", banner: "/img/zippypaws/hero.webp", lightBanner: true, gallery: ["/img/zippypaws/avocado-life.webp","/img/zippypaws/picnic-life.webp","/img/zippypaws/monkey-life1.webp","/img/zippypaws/cupcake-life.webp","/img/zippypaws/reindeer-life.webp","/img/zippypaws/pig-life.webp","/img/zippypaws/monkey-life2.webp"], story: ["ZippyPaws is a dog toy brand from California, USA, making tails wag since 2011. Their motto: \"Designed by dog people, for dog people.\"", "Their mission is to create beautifully designed, high-quality products for the modern dog and dog owner. Toys are quality-checked and tested, and their stuffing is made from 100% recycled materials.", "The range includes plush toys, tough toys, interactive toys and enrichment feeders."], why: ["Singapore homes are small, and dogs need play to stay happy indoors. ZippyPaws makes fun, well-made toys that stand up to daily play.", "Their designs are simply joyful, and we love bringing that to Singapore dog owners."] },
  { slug: "nobupets", name: "Nobu Pets", category: "Anti-bacterial pee pads", accent: "#2a3a8c", logo: "/img/nobupets/logo.webp", hero: "/img/nobupets/card.webp", banner: "/img/nobupets/hero.webp", story: ["At Nobu Pets, we are passionate fur parents creating the best for our furkids. When we couldn't find products that we love and trust, we decided to create these products ourselves. We have dedicated ourselves to creating safe and functional items that are of excellent quality.", "The Nobu pad is a safe and effective way to potty-train your puppy. It has built in attractant, quick-drying elements, and it eliminates harmful bacteria and unpleasant odours. With seven layers of protection to avoid leaks, you can rest easy, knowing that your home will stay clean and fresh!"], why: ["Nobu Pets was made by fur parents who could not find a pee pad they trusted, so they made their own. We share that thinking: practical, good-quality basics that keep Singapore homes clean and fresh while puppies learn."] },
  { slug: "smart-paws", name: "Smart Paws", category: "Pee trays", accent: "#8a949a", hero: "/img/smart-paws/card.webp", banner: "/img/smart-paws/hero.webp", lightBanner: true },
  { slug: "herchy", name: "Herchy", category: "Pet water nozzles", website: "https://herchy.com.tw/", accent: "#3a8fb7", hero: "/img/herchy/card.webp", banner: "/img/herchy/hero.webp", lightBanner: true, story: ["Herchy is a pet accessories brand from Taiwan. Its drinking nozzles turn an ordinary plastic bottle into a pet water dispenser."], why: ["Simple, practical and reusable: one nozzle and any standard bottle give pets clean drinking water in a pen, crate or cage."] },
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

// Owner's delivery rule (2026-11-01): Singapore only, 3-5 business days, S$10 below S$150, free from S$150.
export const DELIVERY_FEE_CENTS = 1000;
export const FREE_DELIVERY_FROM_CENTS = 15000;
export const deliveryFor = (subtotal: number) => (subtotal >= FREE_DELIVERY_FROM_CENTS ? 0 : DELIVERY_FEE_CENTS);
export const DELIVERY_TEXT = "Singapore only, 3–5 business days. S$10 delivery, free for orders of S$150 and above. If no one is home, we'll leave your parcel at the doorstep. No self-collection.";
