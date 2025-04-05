import Icon from '@/public/ico/favicon.ico'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import './globals.css'

export const metadata: Metadata = {
  title: '什么都没有哦',
  description: '这是一个空白的 Next.js 应用',
  keywords: 'Next.js, React, 空白应用',
  icons: {
    icon: Icon.src,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body className="min-h-screen">
        <ToastContainer hideProgressBar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
