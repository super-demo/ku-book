"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react"

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

interface BookContextType {
  books: Book[]
  favorites: string[]
  categories: string[]
  toggleFavorite: (id: string) => void
  addBook: (book: Book) => Promise<void>
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export function useBooks() {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider")
  }
  return context
}

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // Load books data from localStorage or use sample data if none exists
    const savedBooks = localStorage.getItem("kubook-books")
    if (savedBooks) {
      const parsedBooks = JSON.parse(savedBooks) as Book[]
      setBooks(parsedBooks)

      // Extract unique categories from saved books
      const uniqueCategories = Array.from(
        new Set(parsedBooks.map((book) => book.category))
      ) as string[]
      setCategories(uniqueCategories)
    } else {
      setBooks(sampleBooks)

      // Extract unique categories from sample books
      const uniqueCategories = Array.from(
        new Set(sampleBooks.map((book) => book.category))
      )
      setCategories(uniqueCategories)
    }

    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("kubook-favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id]
    setFavorites(newFavorites)
    localStorage.setItem("kubook-favorites", JSON.stringify(newFavorites))
  }

  const addBook = async (book: Book): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const newBooks = [...books, book]
        setBooks(newBooks)

        // Save to localStorage
        localStorage.setItem("kubook-books", JSON.stringify(newBooks))

        // Update categories if needed
        if (!categories.includes(book.category)) {
          const newCategories = [...categories, book.category]
          setCategories(newCategories)
        }

        resolve()
      }, 500)
    })
  }

  return (
    <BookContext.Provider
      value={{ books, favorites, categories, toggleFavorite, addBook }}
    >
      {children}
    </BookContext.Provider>
  )
}

// Sample book data
const sampleBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    publishedYear: 1925,
    genre: "Classic Fiction",
    category: "Fiction"
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "The story of young Scout Finch, her brother Jem, and their father Atticus, as they navigate issues of race and class in their small Southern town during the Great Depression.",
    publishedYear: 1960,
    genre: "Classic Fiction",
    category: "Fiction"
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "A dystopian social science fiction novel that examines the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviors.",
    publishedYear: 1949,
    genre: "Dystopian Fiction",
    category: "Fiction"
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of the British Regency.",
    publishedYear: 1813,
    genre: "Romance",
    category: "Fiction"
  },
  {
    id: "5",
    title: "Quantum Physics Review",
    author: "Dr. Richard Feynman",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "A comprehensive review of quantum physics principles and their applications in modern technology. This research paper explores the fundamental concepts of quantum mechanics.",
    publishedYear: 2022,
    genre: "Physics",
    category: "Research"
  },
  {
    id: "6",
    title: "Climate Change Impact Analysis",
    author: "Dr. Sarah Johnson",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "An in-depth analysis of climate change impacts on global ecosystems. This research paper presents findings from a 10-year study across multiple climate zones.",
    publishedYear: 2023,
    genre: "Environmental Science",
    category: "Research"
  },
  {
    id: "7",
    title: "Artificial Intelligence Ethics",
    author: "Dr. Alan Turing Institute",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "A research paper examining the ethical implications of artificial intelligence development and deployment in society, with case studies and policy recommendations.",
    publishedYear: 2023,
    genre: "Computer Science",
    category: "Research"
  },
  {
    id: "8",
    title: "National Geographic",
    author: "National Geographic Society",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "Special edition exploring the wonders of the deep ocean, featuring stunning photography and articles by leading marine biologists.",
    publishedYear: 2023,
    genre: "Nature",
    category: "Magazine"
  },
  {
    id: "9",
    title: "Scientific American",
    author: "Scientific American, Inc.",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "Monthly issue covering breakthroughs in science and technology, with feature articles on space exploration and quantum computing.",
    publishedYear: 2023,
    genre: "Science",
    category: "Magazine"
  },
  {
    id: "10",
    title: "The New Yorker",
    author: "Condé Nast",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "Weekly magazine featuring journalism, commentary, criticism, essays, fiction, satire, cartoons, and poetry with a focus on current events.",
    publishedYear: 2023,
    genre: "Culture",
    category: "Magazine"
  },
  {
    id: "11",
    title: "Wired",
    author: "Condé Nast",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "Monthly publication focusing on emerging technologies and how they affect culture, the economy, and politics. This issue features AI advancements.",
    publishedYear: 2023,
    genre: "Technology",
    category: "Magazine"
  },
  {
    id: "12",
    title: "Neuroscience Advances",
    author: "Dr. Maya Rodriguez",
    coverImage:
      "https://scontent-bkk1-2.xx.fbcdn.net/v/t39.30808-6/476509205_555409170843779_2189911961991409505_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=dvVyY7fKDE4Q7kNvgEUsxY5&_nc_oc=Adm7pMZkVfAy3GQbposPMK9VpKk81CyRhNdrr2JqPgAp0TnQlYyuOJT7nelQ2oDVmBM&_nc_zt=23&_nc_ht=scontent-bkk1-2.xx&_nc_gid=eBOCDkseztFEgrAKMda5Xg&oh=00_AYGH3QWile1EBMI5YsbJZHdZDO8Ut6TAyNEjyCzqITjDEw&oe=67DF7CDD",
    description:
      "Research paper detailing recent advances in understanding brain plasticity and implications for treating neurological disorders.",
    publishedYear: 2022,
    genre: "Neuroscience",
    category: "Research"
  }
]
