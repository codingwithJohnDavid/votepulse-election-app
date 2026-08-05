import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { StateProvider } from '@/lib/state-context'
import { ProfileProvider } from '@/lib/profile-context'
import { FloatingActionProvider } from '@/lib/floating-action-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'VotePulse — Your Voice, Your Vote',
  description:
    'Discover candidates, explore issues, and see how America is voting in real time. A civic participation app built for the midterm elections.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#6b35c8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <FloatingActionProvider>
          <StateProvider>
            <ProfileProvider>{children}</ProfileProvider>
          </StateProvider>
        </FloatingActionProvider>
      </body>
    </html>
  )
}
