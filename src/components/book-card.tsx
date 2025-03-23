"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Book } from "@/types/book"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface BookCardProps {
  book: Book
  onClick?: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Check if this book is in favorites
    const storedFavorites = localStorage.getItem("favoriteBooks")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.some((fav: Book) => fav.id === book.id))
    }
  }, [book.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()

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

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="relative p-0">
        <div className="relative aspect-[2/3]">
          <Image
            src={
              book.coverImage ||
              "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/icons/file-text.svg"
            }
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="bg-background/80 hover:bg-background/90 absolute top-2 right-2 backdrop-blur-sm"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
          />
          <span className="sr-only">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="line-clamp-1 font-semibold">{book.title}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {book.author}
        </p>
        <div className="mt-2 flex w-full items-center justify-between">
          <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
            {book.genre}
          </span>
          <span className="text-muted-foreground text-xs">
            {book.publishedYear}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
