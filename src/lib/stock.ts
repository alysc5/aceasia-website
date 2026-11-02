// Out-of-stock list from the owner's published Google Sheet (CSV). Columns: id, Brand, Product, Status.
// Status "OOS" (or 0 / out of stock / sold out) hides the Add-to-bag button and blocks checkout.
export const STOCK_CSV_URL = process.env.STOCK_CSV_URL ?? "";

function parseCsv(text: string): string[][] {
  const rows: string[][] = []; let row: string[] = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

const OOS = /^(oos|0|out of stock|sold out|no)$/i;

export async function getOutOfStock(): Promise<string[]> {
  if (!/^https:\/\/docs\.google\.com\//.test(STOCK_CSV_URL)) return [];
  try {
    const r = await fetch(STOCK_CSV_URL, { next: { revalidate: 300 } });
    if (!r.ok) return [];
    const rows = parseCsv(await r.text());
    const head = rows[0]?.map((h) => h.trim().toLowerCase()) ?? [];
    const iId = head.indexOf("id"), iSt = head.indexOf("status");
    if (iId < 0 || iSt < 0) return [];
    return rows.slice(1).filter((x) => OOS.test((x[iSt] ?? "").trim())).map((x) => (x[iId] ?? "").trim()).filter(Boolean);
  } catch { return []; }
}
