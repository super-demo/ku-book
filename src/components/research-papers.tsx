"use client"

import { ResearchCard } from "@/components/research-card"
import { ResearchDetail } from "@/components/research-detail"
import { Input } from "@/components/ui/input"
import type { ResearchPaper } from "@/types/research"
import { useEffect, useState } from "react"
import SuperAppSDK from "../lib/sdk/typescript/main"

export function ResearchPapers() {
  const [papers, setPapers] = useState<ResearchPaper[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const sdk = await SuperAppSDK.create("super-secret-key")

        const result = await sdk.callFunction(
          "Ku Book",
          "Ku Research",
          "get-research",
          {}
        )
        setPapers(result.papers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching research papers:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPapers = papers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-6">
        <Input
          placeholder="Search research papers by title, author, field, or abstract..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="h-[300px] animate-pulse rounded-lg border p-4"
            >
              <div className="bg-muted mb-4 h-40 w-full rounded-md"></div>
              <div className="bg-muted mb-2 h-4 w-3/4 rounded"></div>
              <div className="bg-muted h-4 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredPapers.map((paper) => (
            <ResearchCard
              key={paper.id}
              paper={paper}
              onClick={() => setSelectedPaper(paper)}
            />
          ))}
        </div>
      )}

      {!loading && filteredPapers.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No research papers found matching your search.
          </p>
        </div>
      )}

      <ResearchDetail
        paper={selectedPaper}
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />
    </div>
  )
}
