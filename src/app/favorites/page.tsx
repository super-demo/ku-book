"use client"

import { BookCard } from "@/components/book-card"
import { ResearchCard } from "@/components/research-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ResearchPaper } from "@/types/research"
import { useEffect, useState } from "react"
import { Book } from "../../types/book"

export default function FavoritesPage() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([])
  const [favoriteResearch, setFavoriteResearch] = useState<ResearchPaper[]>([])

  useEffect(() => {
    // Load favorites from localStorage
    const storedBooks = localStorage.getItem("favoriteBooks")
    const storedResearch = localStorage.getItem("favoriteResearch")

    if (storedBooks) {
      setFavoriteBooks(JSON.parse(storedBooks))
    }

    if (storedResearch) {
      setFavoriteResearch(JSON.parse(storedResearch))
    }
  }, [])

  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">Your Favorites</h1>
      <Tabs defaultValue="books" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="books">
            Books ({favoriteBooks.length})
          </TabsTrigger>
          <TabsTrigger value="research">
            Research Papers ({favoriteResearch.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          {favoriteBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favoriteBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                You haven't added any books to your favorites yet.
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="research">
          {favoriteResearch.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favoriteResearch.map((paper) => (
                <ResearchCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                You haven't added any research papers to your favorites yet.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
