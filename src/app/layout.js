import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";

import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: {
    default: "HMP PGSD FKIP Unismuh Makassar | Selayang Pandang",
    template: "%s | HMP PGSD FKIP Unismuh Makassar",
  },

  description:
    "Digital Selayang Pandang Himpunan Mahasiswa Program Studi Pendidikan Guru Sekolah Dasar FKIP Universitas Muhammadiyah Makassar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${plusJakartaSans.variable}`}>
        {/* Global smooth scrolling */}
        <SmoothScroll />

        {/* Global navigation */}
        <Navbar />

        {/* Page content */}
        {children}

        {/* Global footer */}
        <Footer />
      </body>
    </html>
  );
}
