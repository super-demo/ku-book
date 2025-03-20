"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-background dark:bg-background-dark sticky top-0 z-10 border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="hidden text-xl font-bold sm:inline-block">
            Ku Book
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`hover:text-primary text-sm font-medium transition-colors ${
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className={`hover:text-primary text-sm font-medium transition-colors ${
              pathname === "/favorites"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            Favorites
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
