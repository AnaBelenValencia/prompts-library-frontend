'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Badge } from './ui/badge'
import { Prompt } from '@/types'

type Props = {
  prompt: Prompt | null
  open: boolean
  onClose: () => void
}

export function PromptDetailModal({ prompt, open, onClose }: Props) {
  if (!prompt) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg w-full border border-green-200 bg-lime-50 shadow-lg">
        <DialogHeader className="bg-lime-100 rounded-t-md px-6 py-4 mt-5">
          <DialogTitle className="text-emerald-800">{prompt.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map(tag => (
            <Badge key={tag} variant="secondary">#{tag}</Badge>
          ))}
        </div>
        <div className="border-t border-dashed border-green-200 my-4" />
        <div className="text-sm">
          <strong>Status:</strong>{" "}
          <span className={prompt.status === 'active' ? "text-green-600" : "text-gray-500"}>
            {prompt.status.toUpperCase()}
          </span>
        </div>
        <div className="text-xs text-muted-foreground">
          Created at: {new Date(prompt.created_at).toLocaleString()}
        </div>
      </DialogContent>
    </Dialog>
  )
}