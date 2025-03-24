"use client"

import { Books } from "@/components/books"
import { ResearchPapers } from "@/components/research-papers"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex items-baseline justify-between">
        <h1 className="mb-6 text-3xl font-bold">Ku Book</h1>
        {/* <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/sign" })}
        >
          Sign Out
        </Button> */}
      </div>
      <Tabs defaultValue="books" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="research">Research Papers</TabsTrigger>
        </TabsList>
        <TabsContent value="books">
          <Books />
        </TabsContent>
        <TabsContent value="research">
          <ResearchPapers />
        </TabsContent>
      </Tabs>
    </main>
  )
}
