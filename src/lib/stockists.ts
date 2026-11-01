// Owner-supplied stockist list (2026-11-01). Addresses only where verified; otherwise a live map search.
export type Stockist = { name: string; note?: string; address?: string; website?: string; mapQuery: string };

export const STOCKISTS: Stockist[] = [
  { name: "Bubble Pets", mapQuery: "Bubble Pets Singapore" },
  { name: "CatSmart", note: "All outlets", mapQuery: "CatSmart Singapore" },
  { name: "June Pet House", mapQuery: "June Pet House Singapore" },
  { name: "Kohepets", mapQuery: "Kohepets Singapore" },
  { name: "Little Black Nose", mapQuery: "Little Black Nose Singapore" },
  { name: "Little Farms", note: "All outlets", mapQuery: "Little Farms Singapore" },
  { name: "Pawpykisses", mapQuery: "Pawpykisses Singapore" },
  { name: "Pet Master", note: "All outlets", mapQuery: "Pet Master Singapore" },
  { name: "Polypet", website: "https://polypet.com.sg/", mapQuery: "Polypet Singapore" },
  { name: "Pooch Image", mapQuery: "Pooch Image Singapore" },
  { name: "Posh Pet", mapQuery: "Posh Pet Singapore" },
  { name: "Super Paws", mapQuery: "Super Paws Singapore" },
  { name: "Wellfond Pets — Katong", mapQuery: "Wellfond Pets Katong Singapore" },
  { name: "Wellfond Pets — Thomson", address: "197 Upper Thomson Road, Singapore 574341", website: "https://www.wellfondpets.com.sg/", mapQuery: "Wellfond Pets 197 Upper Thomson Road Singapore 574341" },
];

export const ONLINE = [
  { name: "Lazada", url: "https://www.lazada.sg/" },
  { name: "RedMart", url: "https://www.lazada.sg/shop/redmart/" },
  { name: "Shopee", url: "https://shopee.sg/" },
  { name: "Watsons Online", url: "https://www.watsons.com.sg/" },
];

export const mapLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
