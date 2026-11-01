import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact us", description: "Questions, orders or stockist enquiries. Get in touch with Ace Asia Pet Care." };

export default function Contact() {
  return (
    <>
      <PageHero wide img="/img/banner-contact.webp" title="Let's talk." text="Questions about a product, an order, or stocking our brands? We'd love to hear from you." />
      <section className="section wrap"><Suspense><ContactForm /></Suspense></section>
    </>
  );
}
