import { BookProvider } from "../_components/book-porvider"
import AddBookForm from "./_components/add-book-form"

export default function AddBookPage() {
  return (
    <main className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Add New Book
          </h1>
          <p className="text-muted-foreground">
            Add a new book, research paper, or magazine to your collection
          </p>
        </div>
        <BookProvider>
          <AddBookForm />
        </BookProvider>
      </div>
    </main>
  )
}
