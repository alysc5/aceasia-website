import PageHero from "@/components/PageHero";
import StockistForm from "./StockistForm";

export const metadata = { title: "Become a stockist", description: "Stock Ace Asia Pet Care brands in your shop. Send us your details to get started." };

export default function BecomeStockist() {
  return (
    <>
      <PageHero wide pos="right 12%" img="/img/banner-become-stockist.webp" title="Stock our brands." text="Run a pet shop, groomer or clinic in Singapore? Tell us about your business and we'll be in touch." />
      <section className="section wrap"><StockistForm /></section>
    </>
  );
}
