import { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ShopView from "./ShopView";

export const metadata: Metadata = { title: "Shop all products" };

export default function Shop() {
  return (
    <>
      <PageHero img="/img/hero-home.webp" title="Find their next favourite." text="Food, supplements, toys and everyday essentials. Singapore delivery only." />
      <Suspense><ShopView /></Suspense>
    </>
  );
}
