import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import enUS from "@shared/locales/en_US.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: enUS.metadata.siteTitle,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
