'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from './ui/card'
import { Switch } from './ui/switch'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'
import { Badge } from './ui/badge'
import { Eye } from 'lucide-react'
import { Prompt } from './../types'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
    prompt: Prompt
    onStatusChange: (id: string, newStatus: 'active' | 'inactive') => void
    onViewDetails?: (prompt: Prompt) => void
}

export function PromptCard({ prompt, onStatusChange, onViewDetails } : Props ) {
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    const newStatus = prompt.status === 'active' ? 'inactive' : 'active'
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prompts/${prompt.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        onStatusChange(prompt.id, newStatus)
        toast.success('Prompt updated', {
          description: `Status changed to ${newStatus.toUpperCase()}`
        })
      } else {
        throw new Error('Failed to update')
      }
    } catch (error) {
      console.error('Error updating prompt', error)
      toast.error('Failed to update prompt', {
        description: 'Please try again later.'
      })
    } finally {
        setLoading(false)
    }
  }

  return (
    <Card className="w-full h-full flex flex-col justify-between border-green-200 hover:shadow-lg hover:border-green-400 transition-all duration-300 bg-lime-50/60">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base">{prompt.title}</CardTitle>
          {onViewDetails && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(prompt)}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  View details
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <CardDescription className="flex flex-wrap gap-1">
          {prompt.tags.map(tag => (
            <span
              key={tag}
              className="inline-block text-xs bg-muted px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-4">{prompt.content}</p>
      </CardContent>
      <div className="px-6 pb-4 pt-2 mt-auto flex justify-end items-center gap-1">
        <Badge
          variant="outline"
          className={
            prompt.status === "active"
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : "bg-gray-100 text-gray-500 border-gray-300"
          }
        >
          {prompt.status.toUpperCase()}
        </Badge>
        <Switch
          checked={prompt.status === 'active'}
          onCheckedChange={handleToggle}
          disabled={loading}
        />
      </div>
      <CardFooter className="text-xs text-muted-foreground text-center pt-2">
        Created at: {new Date(prompt.created_at).toLocaleString()}
      </CardFooter>
    </Card>
  )
}