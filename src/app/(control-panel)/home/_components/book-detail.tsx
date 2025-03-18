"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { Heart, X } from "lucide-react"
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

interface BookDetailProps {
  book: Book
  isFavorite: boolean
  onFavorite: () => void
  onClose: () => void
}

export function BookDetail({
  book,
  isFavorite,
  onFavorite,
  onClose
}: BookDetailProps) {
  // Check if the image is a data URL (uploaded image)
  const isDataUrl = book.coverImage.startsWith("data:image/")

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[600px] [&>button]:hidden">
        <DialogHeader className="flex flex-row items-start justify-between p-6 pb-0">
          <div>
            <DialogTitle className="text-xl">{book.title}</DialogTitle>
            <div className="mt-2">
              <Badge variant="secondary">{book.category}</Badge>
            </div>
          </div>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="grid gap-6 p-6 sm:grid-cols-2">
          <div className="relative aspect-[3/4] h-full max-h-[300px] sm:aspect-auto sm:max-h-none">
            <Image
              src={
                book.coverImage ||
                "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD"
              }
              alt={book.title}
              fill
              className={cn(
                "rounded-md object-cover",
                !isDataUrl && "bg-black" // Only add black background for placeholder images
              )}
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Author</h3>
              <p>{book.author}</p>
            </div>
            <div>
              <h3 className="font-semibold">Published</h3>
              <p>{book.publishedYear}</p>
            </div>
            <div>
              <h3 className="font-semibold">Genre</h3>
              <p>{book.genre}</p>
            </div>
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground text-sm">
                {book.description}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={onFavorite}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isFavorite ? "fill-red-500 text-red-500" : ""
                )}
              />
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
