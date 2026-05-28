import { Plus_Jakarta_Sans } from 'next/font/google'
import Nav         from '@/components/Nav'
import Cursor      from '@/components/Cursor'
import ProgressBar from '@/components/ProgressBar'
import LayoutShell from './LayoutShell'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata = {
  title: 'MakeMyDocuments – Trusted Document Services, Bangalore',
  description: 'Fast, reliable document services — PAN card, passport, visa, agreements, and more. Click it, Get it.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jakarta.className} suppressHydrationWarning>
        <Cursor />
        <Nav />
        <ProgressBar />
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  )
}
