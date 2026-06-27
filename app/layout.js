import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/provider/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

import ScrollButtons from "@/components/shared/ScrollButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fable",
  description: "Fable Ebook Sharing Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <ScrollButtons />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}