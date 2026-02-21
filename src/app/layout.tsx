import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Texas Power Search",
  description: "Compare electricity plans in Texas by ZIP code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
