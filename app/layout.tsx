// app/layout.tsx

import type { Metadata } from "next";
import RouteLoader from "@/components/RouteLoader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import Image from "next/image";
import { Roboto } from "next/font/google";
import "../styles/layout/globals.scss";
import "react-datepicker/dist/react-datepicker.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Treatly",
  description: "Your clinic booking platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <div className="hero">
          <RouteLoader />
          <Navbar />
          <main className="content">{children}</main>
          <div className="bgParallaxScroll"></div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
