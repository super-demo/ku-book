import type { Metadata } from "next"

import { Providers } from "@/components/providers"
import "@/styles/globals.css"
import { Navbar } from "../components/navbar"

export const metadata: Metadata = {
  title: "Ku Book",
  description: "Ku Book"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
