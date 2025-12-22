import request from './request'

export interface News {
    id: number
    title: string
    slug: string
    thumbnail?: string | null
    excerpt?: string | null
    published_at?: string | null
    category?: {
        id: number
        name: string
    } | null
}


export const getNews = async (): Promise<News[]> => {
    const res = await request.get('/news')
    return res.data.data
}

export const getNewsDetail = async (id: number | string): Promise<News> => {
    const res = await request.get(`/news/${id}`)
    return res.data.data
}

export const createNews = (data: FormData) => {
    return request.post('/news', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}

export const updateNews = (id: number | string, data: FormData) => {
    return request.post(`/news/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })
}
