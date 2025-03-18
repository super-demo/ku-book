import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import BookList from "./_components/book-list"
import { BookProvider } from "./_components/book-porvider"

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center md:mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Ku Book
            </h1>
            <p className="text-muted-foreground">
              Discover and save your favorite books
            </p>
          </div>
          <Button asChild>
            <Link href="/home/add-book" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Book
            </Link>
          </Button>
        </header>
        <BookProvider>
          <BookList />
        </BookProvider>
      </div>
    </main>
  )
}
