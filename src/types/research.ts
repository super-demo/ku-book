export interface ResearchPaper {
  id: string
  title: string
  authors: string
  abstract: string
  coverImage: string
  publishedYear: number
  field: string
  classifications: string[]
  doi?: string
  journal?: string
}

