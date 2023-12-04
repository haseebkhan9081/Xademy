import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from '@/components/providers/react-hot-toast';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Xademy',
  description: 'Made with ❤️ by Haseeb khan ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<ClerkProvider> 
    <html lang="en">
      <body className={inter.className}>
        <ConfettiProvider/>
        <ToastProvider/>
        {children}
        
        </body>
    </html>
    </ClerkProvider>
  )
}
