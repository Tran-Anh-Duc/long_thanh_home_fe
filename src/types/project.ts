export interface Project {
    id: number
    title: string
    slug: string
    location?: string
    price_from?: number
    is_active: boolean
    created_at: string
}
