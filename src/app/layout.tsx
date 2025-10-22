import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono'
})

export const metadata: Metadata = {
  title: 'Monarch Group',
  description: 'Monarch Group - A dedicated, thesis-driven cryptocurrency fund focused on long-term investments in crypto infrastructure and decentralized protocols.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://unavatar.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://unavatar.io" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className={spaceMono.variable}>
        {children}
      </body>
    </html>
  )
}
