// Owner-supplied stockist list and addresses (2026-11-01). Outlets link to Google Maps by address.
export type Outlet = { label?: string; address: string };
export type Stockist = { name: string; website?: string; outlets: Outlet[]; mapQuery?: string };

export const STOCKISTS: Stockist[] = [
  { name: "Bubble Pets", website: "https://bubblepets.com.sg/", outlets: [{ address: "1 Tampines North Drive 1, Singapore" }] },
  { name: "CatSmart", website: "https://catsmart.com.sg/", outlets: [
    { label: "Bukit Batok", address: "Blk 153 Bukit Batok Street 11 #01-290, Singapore 650153" },
    { label: "Jalan Leban", address: "14 Jalan Leban, Singapore 577553" },
    { label: "Loyang Point", address: "258 Pasir Ris Street 21, Loyang Point #02-01, Singapore 510258" },
  ] },
  { name: "June's Pet House", website: "https://junespethouse.com.sg/", outlets: [{ address: "5 Eng Kong Terrace, Singapore 598977" }] },
  { name: "Kohepets", website: "https://www.kohepets.com.sg/", outlets: [{ label: "MEGA@Woodlands", address: "39 Woodlands Close, Singapore 737856" }] },
  { name: "Little Black Nose", website: "https://littleblacknose.sg/", outlets: [{ label: "Kensington Square", address: "2 Jalan Lokam #01-42, Singapore 537846" }] },
  { name: "Little Farms", outlets: [
    { label: "Katong Point", address: "451 Joo Chiat Road #01-01, Singapore 427664" },
    { label: "River Valley", address: "Valley Point, 491 River Valley Road #01-20, Singapore 248371" },
    { label: "Sentosa Cove", address: "1 Cove Avenue #02-13/14, Sentosa, Singapore 098537" },
    { label: "Serangoon Garden", address: "MyVillage, 1 Maju Avenue #01-12 to 19, Singapore 556679" },
    { label: "Tanglin", address: "Tanglin Mall, 163 Tanglin Road #02-136, Singapore 247933" },
    { label: "Tanjong Pagar", address: "Guoco Tower, 7 Wallich Street #B2-06, Singapore 078884" },
  ] },
  { name: "Pawpy Kisses", website: "https://www.pawpykisses.com/", outlets: [{ label: "Urban Heritage", address: "232 Balestier Road, Singapore 329694" }] },
  { name: "Pet Master", outlets: [
    { label: "Bukit Timah", address: "26 Greenwood Avenue, Singapore 289224" },
    { label: "Mega Store, East Coast Park", address: "920 Parkland Green #01-03 to 08, East Coast Park (C1 Carpark), Singapore 449875" },
    { label: "Sembawang", address: "411 Sembawang Road, Singapore 758388" },
  ] },
  { name: "Polypet", website: "https://polypet.com.sg/", outlets: [{ label: "Clementi", address: "109 Clementi Street 11 #01-27/29, Singapore 120109" }] },
  { name: "Pooch Image", outlets: [], mapQuery: "Pooch Image Singapore" },
  { name: "Posh Pets", outlets: [{ label: "Cassia Crescent", address: "32 Cassia Crescent #01-64, Singapore 390032" }] },
  { name: "Super Paws", website: "https://www.superpaws.sg/", outlets: [{ label: "Mandai", address: "27 Mandai Estate, Singapore 729931" }] },
  { name: "Wellfond Pets", website: "https://www.wellfondpets.com.sg/", outlets: [
    { label: "Katong", address: "328 Tanjong Katong Road, Singapore 437105" },
    { label: "Thomson", address: "197 Upper Thomson Road, Singapore 574341" },
  ] },
];

export const ONLINE = [
  { name: "Lazada", url: "https://www.lazada.sg/" },
  { name: "RedMart", url: "https://www.lazada.sg/shop/redmart/" },
  { name: "Shopee", url: "https://shopee.sg/aceasiapetcare" },
  { name: "Watsons Online", url: "https://www.watsons.com.sg/promo-pets" },
];

export const mapLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
