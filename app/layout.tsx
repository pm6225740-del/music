import type { Metadata } from "next";
import { Geist, Geist_Mono, Pirata_One, Quintessential } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pirataOne = Pirata_One({
  weight: "400",
  variable: "--font-pirata-one",
  subsets: ["latin"],
});

const quintessential = Quintessential({
  weight: "400",
  variable: "--font-quintessential",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "music",
  description: "music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pirataOne.variable} ${quintessential.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
