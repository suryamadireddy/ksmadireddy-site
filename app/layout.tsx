import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ColorSchemeToggle } from "./components/ColorSchemeToggle";
import { THEME_CSS_VARS } from "./theme-colors";
import "./globals.css";

const themeInitScript = `(function(){try{var s=localStorage.getItem("ksm-site-color-scheme");var scheme=s==="light"?"light":"dark";var vars=${JSON.stringify(THEME_CSS_VARS)};var v=vars[scheme];var r=document.documentElement;for(var k in v)r.style.setProperty(k,v[k]);if(scheme==="light"){r.dataset.colorScheme="light";r.classList.add("light");r.style.colorScheme="light";}else{r.style.colorScheme="dark";}}catch(e){}})();`;

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {children}
        <ColorSchemeToggle />
      </body>
    </html>
  );
}
