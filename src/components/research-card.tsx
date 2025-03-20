"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ResearchPaper } from "@/types/research"

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
    let favorites: ResearchPaper[] = storedFavorites ? JSON.parse(storedFavorites) : []

    if (isFavorite) {
      favorites = favorites.filter((fav: ResearchPaper) => fav.id !== paper.id)
    } else {
      favorites.push(paper)
    }

    localStorage.setItem("favoriteResearch", JSON.stringify(favorites))
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-md" onClick={onClick}>
      <CardContent className="p-0 relative">
        <div className="aspect-video relative">
          <Image
            src={paper.coverImage || "/placeholder.svg?height=300&width=500"}
            alt={paper.title}
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
        <h3 className="font-semibold line-clamp-2">{paper.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{paper.authors}</p>
        <div className="flex flex-wrap gap-1 mb-2">
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
        <div className="flex items-center justify-between w-full">
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{paper.field}</span>
          <span className="text-xs text-muted-foreground">{paper.publishedYear}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

