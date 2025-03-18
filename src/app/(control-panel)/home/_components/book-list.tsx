"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { BookCard } from "./book-card"
import { BookDetail } from "./book-detail"
import { useBooks } from "./book-porvider"

interface Book {
  id: string
  title: string
  author: string
  coverImage: string
  description: string
  publishedYear: number
  genre: string
  category: string
}

export default function BookList() {
  const { books, favorites, categories, toggleFavorite } = useBooks()
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || book.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search books by title or author..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setSearchQuery("")}
            className="w-full sm:w-auto"
            disabled={!searchQuery}
          >
            Clear
          </Button>
        </div>

        <div className="overflow-auto pb-2">
          <Tabs
            defaultValue="all"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            <TabsList className="flex h-auto flex-nowrap overflow-x-auto">
              <TabsTrigger value="all" className="px-4">
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="px-4">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {selectedCategory !== "all" && (
          <div className="flex items-center">
            <Badge variant="outline" className="gap-1 px-3 py-1">
              {selectedCategory}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => setSelectedCategory("all")}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Clear filter</span>
              </Button>
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onFavorite={() => toggleFavorite(book.id)}
            onClick={() => setSelectedBook(book)}
          />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No books found. Try a different search term or category.
          </p>
        </div>
      )}

      {selectedBook && (
        <BookDetail
          book={selectedBook}
          isFavorite={favorites.includes(selectedBook.id)}
          onFavorite={() => toggleFavorite(selectedBook.id)}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}
