"use client"

import Image from "next/image"
import { ExternalLink, Heart } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { ResearchPaper } from "@/types/research"
import { useState, useEffect } from "react"

interface ResearchDetailProps {
  paper: ResearchPaper | null
  isOpen: boolean
  onClose: () => void
}

export function ResearchDetail({ paper, isOpen, onClose }: ResearchDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (paper) {
      // Check if this paper is in favorites
      const storedFavorites = localStorage.getItem("favoriteResearch")
      if (storedFavorites) {
        const favorites = JSON.parse(storedFavorites)
        setIsFavorite(favorites.some((fav: ResearchPaper) => fav.id === paper.id))
      }
    }
  }, [paper])

  const toggleFavorite = () => {
    if (!paper) return

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

  if (!paper) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{paper.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="relative aspect-video w-full">
            <Image
              src={paper.coverImage || "/placeholder.svg?height=300&width=600"}
              alt={paper.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Authors</h4>
              <p>{paper.authors}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <h4 className="text-sm font-medium text-muted-foreground w-full">Classifications</h4>
              {paper.classifications.map((classification, index) => (
                <Badge key={index} variant="outline">
                  {classification}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Field</h4>
                <p>{paper.field}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Year</h4>
                <p>{paper.publishedYear}</p>
              </div>
              {paper.journal && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Journal</h4>
                  <p>{paper.journal}</p>
                </div>
              )}
              {paper.doi && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">DOI</h4>
                  <p className="flex items-center gap-1">
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {paper.doi}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </p>
                </div>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Abstract</h4>
              <p className="text-sm whitespace-pre-line">{paper.abstract}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2" onClick={toggleFavorite}>
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </Button>
              {paper.doi && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    View paper
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

