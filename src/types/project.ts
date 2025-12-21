export interface Project {
    id: number
    title: string
    slug: string

    thumbnail?: string | null
    location?: string | null
    price_from?: number | null

    description?: string | null
    is_active: boolean
    sort_order?: number

    project_category?: {
        id: number
        name: string
        slug: string
    }

    created_at: string
    updated_at: string
}
