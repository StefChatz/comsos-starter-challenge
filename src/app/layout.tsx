import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MarsProvider from './ MarsProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cosmos Starter Challenge',
  description: 'Create your first Cosmos dApp',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MarsProvider>{children}</MarsProvider>
      </body>
    </html>
  );
}
