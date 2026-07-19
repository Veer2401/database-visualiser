import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { WebVitalsMonitor } from "@/components/WebVitalsMonitor";
import PageLoader from "@/components/PageLoader";
import FontProvider from "@/components/common/FontProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Schema View - PostgreSQL Database Design Tool",
  description: "A visual PostgreSQL database design tool for creating, managing, and visualizing database schemas with an intuitive drag-and-drop interface.",
  keywords: ["PostgreSQL", "database", "schema", "design", "tables", "relationships", "visualizer"],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      >
        <FontProvider>
          <PageLoader />
          <WebVitalsMonitor />
          {children}
        </FontProvider>
      </body>
    </html>
  );
}
