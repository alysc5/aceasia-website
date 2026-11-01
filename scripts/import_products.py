# Turns the owner's product sheet into public catalogue data.
# Wholesale price and margin are NEVER exported (they stay private).
import openpyxl, json, re, sys
ws = openpyxl.load_workbook(sys.argv[1], data_only=True).active
BRAND = {"Ambrosia": "ambrosia", "Boss Dog": "boss-dog", "Fourflax": "fourflax", "Welcome Studio": "welcome-studio", "Doggyman": "doggyman",
         "Codos": "codos", "Nobu Pets": "nobupets", "Smart Paws": "smart-paws", "Superpets": "superpets", "Herchy": "herchy", "Zippy Paws": "zippypaws"}
def money(v):
    if v is None: return None
    try: return round(float(str(v).replace("$", "").replace(",", "").strip()) * 100)
    except ValueError: return None
def cat(brand, n):
    n = n.lower()
    if brand in ("ambrosia", "boss-dog") or re.search(r"\b(food|treat|kibble|freeze)", n): return "Food"
    if brand == "fourflax": return "Supplements"
    if brand == "zippypaws" or "toy" in n: return "Toys"
    if re.search(r"pee|wipe|brush|clipper|shampoo|groom|nozzle|tray", n): return "Wipes & Care"
    return "Accessories"
out, brand, flags, seen = [], None, [], set()
for r in ws.iter_rows(min_row=2, values_only=True):
    sku, name, unit, retailer, _margin, rrp = r[1:7]
    if name and not sku and retailer is None:
        brand = next((v for k, v in BRAND.items() if str(name).startswith(k)), None); continue
    if not name or not brand: continue
    a, b = money(retailer), money(rrp)
    price = b
    if a and b and b < a: price = a; flags.append(str(name).split("\n")[0][:70])  # columns look swapped
    sid = str(sku).split(".")[0] if sku else re.sub(r"\W+", "-", str(name).lower())[:40]
    pid = f"{brand}-{sid}"
    if pid in seen: continue
    seen.add(pid)
    lines = str(name).strip().split("\n")
    out.append({"id": pid, "brand": brand, "name": lines[0].strip(), "note": " ".join(l.strip() for l in lines[1:]),
                "category": cat(brand, lines[0]), "unit": str(unit or "").strip(), "priceCents": price,
                "description": (r[8] or "").strip(), "ingredients": (r[9] or "").strip(), "analysis": (r[10] or "").strip(), "images": []})
json.dump(out, open("src/data/products.json", "w"), ensure_ascii=False, indent=0)
print(len(out), "products;", len(flags), "price columns swapped:", flags[:3])
