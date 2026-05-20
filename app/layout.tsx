import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Axel Zeed - Home",
    template: "%s | Axel Zeed"
  },
  description: "Lead Researcher and Scientist Vtuber from Zeryuz Corp. Specialist in HMV technology and digital soul virtualization.",
  icons: {
    icon: "/Assets/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-vh-100 antialiased">
        <div className="scanline-overlay"></div>
        <div className="scanline-move"></div>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
