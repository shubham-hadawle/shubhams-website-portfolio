import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/effects/ThemeProvider";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { AmbientLayer } from "@/components/effects/AmbientLayer";
import { GlobalGrid } from "@/components/effects/GlobalGrid";
import { CommandPalette } from "@/components/CommandPalette";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/Toaster";
import { personal } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const SITE_URL = "https://shubham-hadawle.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${personal.name} · Software & AI/ML Engineer`,
    template: `%s · ${personal.name}`,
  },
  description: personal.tagline,
  applicationName: `${personal.name} · Portfolio`,
  authors: [{ name: personal.name, url: personal.socials.linkedin }],
  creator: personal.name,
  keywords: [
    "Shubham Hadawle",
    "Software Engineer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Data Scientist",
    "Northeastern University",
    "Khoury College",
    "GraphRAG",
    "LLMs",
    "Transformers",
    "Next.js",
    "PyTorch",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${personal.name} · Software & AI/ML Engineer`,
    description: personal.tagline,
    siteName: personal.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} · Software & AI/ML Engineer`,
    description: personal.tagline,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon_image.png", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon_image.png", type: "image/png" }],
    apple: [{ url: "/favicon_image.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingScreen />
          <GlobalGrid />
          <AmbientLayer />
          <CustomCursor />
          <CommandPalette />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-background"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
