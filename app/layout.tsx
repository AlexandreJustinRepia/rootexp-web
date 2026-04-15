import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RootEXP | Grow Your Wealth, Grow Your Life",
  description: "RootEXP is a gamified budgeting app where you grow a tree...",
  icons: {
    icon: "/icon-light.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground dark:bg-background-dark dark:text-foreground-dark antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
