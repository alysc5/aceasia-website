import CheckoutForm from "./CheckoutForm";
export const metadata = { title: "Checkout" };
export default function Page() {
  return <section className="section wrap"><h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>Checkout</h1><CheckoutForm /></section>;
}
