'use client'

import { useEffect, useState } from 'react'
import { PromptCard } from '@/components/PromptCard'
import { PromptModal } from '@/components/PromptModal'
import { PromptDetailModal } from '@/components/PromptDetailModal'
import { Button } from '@/components/ui/button'
import { Prompt } from '@/types'
import { cn, baseApiUrl } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [tagFilter, setTagFilter] = useState<string | null>(null)


  useEffect(() => {
    fetch(`${baseApiUrl}/prompts`)
      .then(res => res.json())
      .then(data => setPrompts(data))
      .catch(err => console.error('Error loading prompts', err))
  }, [])

  const allTags = Array.from(
    new Set(prompts.flatMap((p) => p.tags))
  ).sort()

  const handleStatusChange = (id: string, newStatus: 'active' | 'inactive') => {
    setPrompts(prev =>
      prev.map(prompt =>
        prompt._id === id ? { ...prompt, status: newStatus } : prompt
      )
    )
  }

  const handleNewPrompt = (prompt: Prompt) => {
    setPrompts(prev => [prompt, ...prev])
  }

  const filteredPrompts = prompts
  .filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    if (tagFilter && !p.tags.includes(tagFilter)) return false
    return true
  })
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Published Prompts</h1>
        <PromptModal onPromptCreated={handleNewPrompt} />
      </div>
      {filteredPrompts.length === 0 && <p className="text-muted-foreground">No prompts found.</p>}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            className={"border-emerald-300 text-emerald-700 hover:bg-emerald-50"}
            onClick={() => {setTagFilter(null); setStatusFilter('all')}}
          >
            Clear filters
          </Button>
          {['all', 'active', 'inactive'].map((status) => (
            <Button
              key={status}
              variant="outline"
              className={cn(
                "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
                statusFilter === status && "bg-emerald-600 text-white hover:bg-emerald-600"
              )}
              onClick={() => setStatusFilter(status as 'all' | 'active' | 'inactive')}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            className={cn(
              "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
              tagFilter === null && "bg-emerald-600 text-white hover:bg-emerald-600"
            )}
            onClick={() => setTagFilter(null)}
          >
            All Tags
          </Button>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant="outline"
              className={cn(
                "border-emerald-300 text-emerald-700 hover:bg-emerald-50",
                tagFilter === tag && "bg-emerald-600 text-white hover:bg-emerald-600"
              )}
              onClick={() => setTagFilter(tag)}
            >
              #{tag}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrompts.map((prompt, index) => (
          <motion.div
            key={prompt._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <PromptCard
              prompt={prompt}
              onStatusChange={handleStatusChange}
              onViewDetails={setSelectedPrompt}
            />
          </motion.div>
        ))}
      </div>
      <PromptDetailModal
        prompt={selectedPrompt}
        open={!!selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
      />
    </main>
  )
}

