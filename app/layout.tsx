import './globals.css';
import type { Metadata } from 'next';
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Golf Polska — pola golfowe i driving range',
  description: 'Największa baza pól golfowych, driving range i akademii golfa w Polsce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
