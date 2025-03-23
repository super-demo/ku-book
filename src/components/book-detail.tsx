"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import type { Book } from "@/types/book"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface BookDetailProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
}

export function BookDetail({ book, isOpen, onClose }: BookDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (book) {
      // Check if this book is in favorites
      const storedFavorites = localStorage.getItem("favoriteBooks")
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites)
        setIsFavorite(favorites.some((fav: Book) => fav.id === book.id))
      }
    }
  }, [book])

  const toggleFavorite = () => {
    if (!book) return

    const storedFavorites = localStorage.getItem("favoriteBooks")
    let favorites: Book[] = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      favorites = favorites.filter((fav: Book) => fav.id !== book.id)
    } else {
      favorites.push(book)
    }

    localStorage.setItem("favoriteBooks", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  if (!book) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{book.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4 sm:grid-cols-[200px_1fr]">
          <div className="relative mx-auto aspect-[2/3] sm:mx-0">
            <Image
              src={
                book.coverImage ||
                "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/file-text.svg"
              }
              alt={book.title}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                Author
              </h4>
              <p>{book.author}</p>
            </div>
            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                Publisher
              </h4>
              <p>{book.publisher}</p>
            </div>
            <div className="flex gap-4">
              <div>
                <h4 className="text-muted-foreground text-sm font-medium">
                  Year
                </h4>
                <p>{book.publishedYear}</p>
              </div>
              <div>
                <h4 className="text-muted-foreground text-sm font-medium">
                  Pages
                </h4>
                <p>{book.pages}</p>
              </div>
              <div>
                <h4 className="text-muted-foreground text-sm font-medium">
                  Genre
                </h4>
                <p>{book.genre}</p>
              </div>
            </div>
            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                ISBN
              </h4>
              <p>{book.isbn}</p>
            </div>
            <div>
              <h4 className="text-muted-foreground text-sm font-medium">
                Description
              </h4>
              <p className="text-sm">{book.description}</p>
            </div>
            <Button
              variant="outline"
              className="gap-2"
              onClick={toggleFavorite}
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
