import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/inter";
import "./globals.css";
import { BasketProvider } from "@/components/Basket";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: { default: "Ace Asia Pet Care | Pet brands in Singapore", template: "%s | Ace Asia Pet Care" },
  description: "Ace Asia Pet Care brings Ambrosia, Fourflax, Boss Dog, ZippyPaws and more pet brands to pet owners and retailers in Singapore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-SG">
      <body>
        <BasketProvider>
          <a href="#main" className="srOnly">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </BasketProvider>
      </body>
    </html>
  );
}
