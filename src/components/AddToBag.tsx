"use client";

import { useState } from "react";
import { useBasket } from "./Basket";
import { useOutOfStock } from "./Stock";

export default function AddToBag({ id, disabled: off }: { id: string; disabled: boolean }) {
  const { add, open } = useBasket();
  const oos = useOutOfStock().has(id);
  const disabled = off || oos;
  const [qty, setQty] = useState(1);
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <span>Quantity</span>
        <div className="qty">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span>{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(Math.min(99, qty + 1))}>+</button>
        </div>
      </div>
      <button className="btn primary" disabled={disabled} onClick={(e) => { add({ id, size: "", qty }); open(e.currentTarget); }}>
        {disabled ? "Currently unavailable" : "Add to bag"}
      </button>
    </div>
  );
}
