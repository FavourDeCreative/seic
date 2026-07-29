import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
export const metadata: Metadata = {
  title: {
    default: "Salvation Empire Church International",
    template: "%s | Salvation Empire Church International",
  },
  description:
    "Welcome to Salvation Empire Church International (A.K.A City of Peace).",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="bg-white text-neutral-900 overflow-x-hidden">
        <Navbar /> <main>{children}</main> <Footer />
      </body>
    </html>
  );
}
