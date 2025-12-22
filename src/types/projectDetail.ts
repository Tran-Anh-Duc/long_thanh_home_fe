export interface ProjectDetailMeta {
    seo_title?: string
    seo_description?: string
}

export interface ProjectDetail {
    id: number
    project_id: number
    title: string
    thumbnail: string | null
    type: string | null
    summary: string | null
    description: string | null
    meta: ProjectDetailMeta
    created_at: string | null
    updated_at: string | null
}

