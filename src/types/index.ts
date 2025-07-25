export type Prompt = {
  _id: string
  title: string
  content: string
  tags: string[]
  status: 'active' | 'inactive'
  created_at: string
}