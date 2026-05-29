import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pattrix | Cinematic Luxury Creative Agency",
  description:
    "Pattrix is a luxury creative agency for strategy, production, social media, and digital experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
