import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Prompt Manager',
  description: 'Manage and publish AI prompts',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background antialiased">
        <main className="container mx-auto px-4">{children}</main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
