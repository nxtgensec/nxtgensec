import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import VisitorBadge from "@/components/visitor-badge"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "NxtGenSec - Securing Digital Assets",
  description:
    "Leading innovation in cybersecurity, AI, blockchain, and business transformation. Offering cutting-edge tools, training, and internship programs.",
  keywords:
    "cybersecurity, AI, blockchain, IoT, business transformation, tech training, internships, next-generation technology",
  authors: [{ name: "NxtGenSec" }],
  creator: "NxtGenSec",
  publisher: "NxtGenSec",
  robots: "index, follow",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
    ],
  },
  openGraph: {
    title: "NxtGenSec - Securing Digital Assets",
    description: "Leading innovation in cybersecurity, AI, blockchain, and business transformation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NxtGenSec - Securing Digital Assets",
    description: "Leading innovation in cybersecurity, AI, blockchain, and business transformation.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="bg-gray-950 text-white min-h-screen">
        <VisitorBadge />
        {children}
      </body>
    </html>
  )
}
