"use client";
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext<Set<string>>(new Set());
export const useOutOfStock = () => useContext(Ctx);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [oos, setOos] = useState<Set<string>>(new Set());
  useEffect(() => {
    fetch("/api/stock").then((r) => r.json()).then((j) => setOos(new Set(j.oos ?? []))).catch(() => {});
  }, []);
  return <Ctx.Provider value={oos}>{children}</Ctx.Provider>;
}
