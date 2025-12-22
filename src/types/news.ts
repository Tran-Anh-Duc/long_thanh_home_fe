// src/types/news.ts
export interface News {
    id: number
    title: string
    slug: string

    content?: string
    summary?: string
    excerpt?: string

    thumbnail?: string | null

    published_at?: string | null
    created_at?: string | null

    category?: {
        id: number
        name: string
    } | null
}
