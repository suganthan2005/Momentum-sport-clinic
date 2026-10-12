import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Momentum After 50+ | Move well from home",
  description:
    "Guided physiotherapy programs for knee, shoulder, neck, and back pain, designed for life after 50.",
  openGraph: {
    title: "Momentum After 50+ | Move well from home",
    description: "Find a guided physiotherapy program built around the movement you want back.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
