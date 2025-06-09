import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://FIEF-nohell.github.io/colr"),
  title: "Colr - Color Guesser Game",
  description:
    "Colr is a simple game where you try to match a random RGB colour in as few guesses as possible.",
  openGraph: {
    title: "Colr - Color Guesser Game",
    description:
      "Colr challenges you to guess a random RGB value. Can you match the colour in five tries?",
    type: "website",
    url: "https://FIEF-nohell.github.io/colr",
    images: [
      {
        url: "/colr.webp",
        width: 1200,
        height: 630,
        alt: "Screenshot of the Colr game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colr - Color Guesser Game",
    images: ["/colr.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
