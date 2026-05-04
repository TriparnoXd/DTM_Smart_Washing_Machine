import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartWash AI - Intelligent Laundry System",
  description: "AI-powered washing machine with smart load balancing, detergent optimization, and energy efficiency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}