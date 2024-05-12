import type { Metadata } from "next";
import { Nunito_Sans as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/redux/providers";
import { cn } from "@/lib/utils";
import Metrics from "./metrics";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Seek | Yash Baranwal",
  description: "Made with  by a Frontend Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body   className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        
        {/* microsoft clairty integration to track user's activity */}
        <Metrics />
      </body>
    </html>
  );
}
