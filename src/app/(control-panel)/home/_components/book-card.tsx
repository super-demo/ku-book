"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"
import Image from "next/image"

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

interface BookCardProps {
  book: Book
  isFavorite: boolean
  onFavorite: () => void
  onClick: () => void
}

export function BookCard({
  book,
  isFavorite,
  onFavorite,
  onClick
}: BookCardProps) {
  // Check if the image is a data URL (uploaded image)
  const isDataUrl = book.coverImage.startsWith("data:image/")

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-[3/4] cursor-pointer" onClick={onClick}>
        <Image
          src={
            book.coverImage ||
            "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD"
          }
          alt={book.title}
          fill
          className={cn(
            "object-cover",
            !isDataUrl && "bg-black" // Only add black background for placeholder images
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="text-xs font-normal">
            {book.category}
          </Badge>
        </div>
      </div>
      <CardContent className="flex-grow pt-4 pb-2">
        <div className="cursor-pointer space-y-1" onClick={onClick}>
          <h3 className="text-base font-semibold">{book.title}</h3>
          <p className="text-muted-foreground text-sm">{book.author}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end pt-0 pb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={(e) => {
            e.stopPropagation()
            onFavorite()
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={cn(
              "h-5 w-5",
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            )}
          />
        </Button>
      </CardFooter>
    </Card>
  )
}
