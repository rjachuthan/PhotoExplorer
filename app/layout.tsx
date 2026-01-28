import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Photo Explorer - Browse AI-Generated Images & Models",
  description: "Explore AI-generated images and models from the CivitAI community. Browse checkpoints, LORAs, ControlNets, and more.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
