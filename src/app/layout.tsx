import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MU-TH-UR 6000 Terminal - Weyland-Yutani Corporation",
  description: "Interactive MU-TH-UR 6000 computer terminal simulation from the Alien universe. Experience authentic ship systems, crew management, and emergency protocols aboard the USCSS Nostromo.",
  keywords: "MU-TH-UR, MUTHUR, Alien, Nostromo, Weyland-Yutani, terminal, sci-fi, simulation",
  authors: [{ name: "Weyland-Yutani Corporation" }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="antialiased w-full h-screen max-h-screen overflow-hidden">
        <main className="w-full h-full max-h-screen overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
