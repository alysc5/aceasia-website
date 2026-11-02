import { NextResponse } from "next/server";
import { getOutOfStock } from "@/lib/stock";

export const revalidate = 300; // re-read the sheet at most every 5 minutes

export async function GET() {
  return NextResponse.json({ oos: await getOutOfStock() }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
