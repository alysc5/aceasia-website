import { Suspense } from "react";
import type { Metadata } from "next";
import ShopView from "./ShopView";

export const metadata: Metadata = { title: "Shop all products" };

export default function Shop() {
  return (
    <>
      <section className="hero"><div className="wrap" style={{ display: "block" }}>
        <h1 className="rise">Find their next favourite.</h1>
        <p className="rise d1">Food, supplements, toys and everyday essentials. Singapore delivery only.</p>
      </div></section>
      <Suspense><ShopView /></Suspense>
    </>
  );
}
