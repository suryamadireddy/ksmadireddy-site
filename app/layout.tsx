import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Krishna Surya Madireddy",
  description:
    "Platform PM building agentic AI systems with design sensibility.",
  openGraph: {
    title: "Krishna Surya Madireddy",
    description:
      "Platform PM building agentic AI systems with design sensibility.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Surya Madireddy",
    description:
      "Platform PM building agentic AI systems with design sensibility.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
