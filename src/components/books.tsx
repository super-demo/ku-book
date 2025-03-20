"use client"

import { useState } from "react"
import { BookCard } from "@/components/book-card"
import { BookDetail } from "@/components/book-detail"
import { Input } from "@/components/ui/input"
import type { Book } from "@/types/book"
import { mockBooks } from "@/data/mock-books"

export function Books() {
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <div className="mb-6">
        <Input
          placeholder="Search books by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onClick={() => setSelectedBook(book)} />
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}

      <BookDetail book={selectedBook} isOpen={!!selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  )
}

