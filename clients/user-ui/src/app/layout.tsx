import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';
import { Providers } from './providers/NextUiProvider';

const naum = Nanum_Gothic({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-Naum',
});
export const metadata: Metadata = {
  title: '자연샘',
  description: '자연샘 FoodDelivery',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${naum.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
