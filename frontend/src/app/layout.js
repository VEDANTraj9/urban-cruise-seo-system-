import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://urbancruise.in'),
  title: "Urban Cruise Delhi | Luxury Tempo Traveller & Bus Rentals",
  description: "Book luxury Tempo Travellers, Force Urbania, and executive charter buses with Urban Cruise Delhi for weddings, corporate events, and outstation trips.",
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' }
    ],
    shortcut: '/logo.png',
    apple: '/logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
