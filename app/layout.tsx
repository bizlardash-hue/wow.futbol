import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WOW.FUTBOL — Every Match. Every Moment.",
    template: "%s | WOW.FUTBOL",
  },
  description:
    "Your destination for football fixtures, results, competitions, club profiles, player statistics and the stories shaping the game.",
  applicationName: "WOW.FUTBOL",
  metadataBase: new URL("https://wow.futbol"),
  openGraph: {
    title: "WOW.FUTBOL — Every Match. Every Moment.",
    description:
      "Football, without the noise. Follow the game with fixtures, results, stories and statistics.",
    siteName: "WOW.FUTBOL",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#081b16",
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
