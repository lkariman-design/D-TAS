import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D-TAS | Digital Transformation Assessment System",
  description: "Assess your organisation's digital maturity across 5 dimensions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
