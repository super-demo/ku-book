"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Book } from "@/types/book"

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
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
      <CardContent className="p-0 relative">
        <div className="aspect-[2/3] relative">
          <Image
            src={book.coverImage || "/placeholder.svg?height=450&width=300"}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4">
        <h3 className="font-semibold line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
        <div className="flex items-center justify-between w-full mt-2">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{book.genre}</span>
          <span className="text-xs text-muted-foreground">{book.publishedYear}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

