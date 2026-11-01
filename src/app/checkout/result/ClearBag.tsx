"use client";
import { useEffect, useRef } from "react";
import { useBasket } from "@/components/Basket";
// Empties the bag once after a confirmed payment.
export default function ClearBag() {
  const { lines, clear } = useBasket();
  const done = useRef(false);
  useEffect(() => { if (!done.current && lines.length) { done.current = true; clear(); } }, [lines, clear]);
  return null;
}
