'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Label } from './ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { Prompt } from '@/types'
import { baseApiUrl } from '@/lib/utils'

type Props = {
  onPromptCreated?: (prompt: Prompt) => void
}

export function PromptModal({ onPromptCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !content) {
      toast.warning('Title and content are required')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`${baseApiUrl}/prompts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()),
          status: 'inactive'
        }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success('Prompt created')
        onPromptCreated?.(data)
        setTitle('')
        setContent('')
        setTags('')
        setOpen(false)
      } else {
        throw new Error(data.message || 'Something went wrong')
      }
    } catch (err) {
      console.error(err)
      toast.error('Error creating prompt')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border border-emerald-400 text-emerald-700 hover:bg-emerald-50"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            Add new prompt
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-lg w-full border border-green-200 bg-lime-50 shadow-lg">
        <DialogHeader className="bg-lime-100 rounded-t-md px-6 py-4 mt-3">
          <DialogTitle className="text-emerald-800">Create New Prompt</DialogTitle>
        </DialogHeader>
        <div className="border-t border-dashed border-green-200 my-4" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title" className="mb-2">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short title"
              required
            />
          </div>

          <div>
            <Label htmlFor="content" className="mb-2">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full prompt text"
              required
            />
          </div>

          <div>
            <Label htmlFor="tags" className="mb-2">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. chatbot, moderation"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {loading ? 'Creating...' : 'Create Prompt'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
