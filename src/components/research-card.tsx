"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { ResearchPaper } from "@/types/research"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface ResearchCardProps {
  paper: ResearchPaper
  onClick?: () => void
}

export function ResearchCard({ paper, onClick }: ResearchCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Check if this paper is in favorites
    const storedFavorites = localStorage.getItem("favoriteResearch")
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites)
      setIsFavorite(favorites.some((fav: ResearchPaper) => fav.id === paper.id))
    }
  }, [paper.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()

    const storedFavorites = localStorage.getItem("favoriteResearch")
    let favorites: ResearchPaper[] = storedFavorites
      ? JSON.parse(storedFavorites)
      : []

    if (isFavorite) {
      favorites = favorites.filter((fav: ResearchPaper) => fav.id !== paper.id)
    } else {
      favorites.push(paper)
    }

    localStorage.setItem("favoriteResearch", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="relative p-0">
        <div className="relative aspect-video">
          <Image
            src={
              paper.coverImage ||
              "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.2/svgs/solid/book.svg"
            }
            alt={paper.title}
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
        <h3 className="line-clamp-2 font-semibold">{paper.title}</h3>
        <p className="text-muted-foreground mb-2 line-clamp-1 text-sm">
          {paper.authors}
        </p>
        <div className="mb-2 flex flex-wrap gap-1">
          {paper.classifications.slice(0, 2).map((classification, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {classification}
            </Badge>
          ))}
          {paper.classifications.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{paper.classifications.length - 2}
            </Badge>
          )}
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
            {paper.field}
          </span>
          <span className="text-muted-foreground text-xs">
            {paper.publishedYear}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
