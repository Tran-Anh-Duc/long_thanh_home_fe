import request from './request'
import type { ProjectCategory } from '@/types/projectCategory'

export const getProjectCategories = async (): Promise<ProjectCategory[]> => {
    const res = await request.get('/project-categories')
    return res.data.data
}

export const getProjectCategory = async (
    id: number | string,
): Promise<ProjectCategory> => {
    const res = await request.get(`/project-categories/${id}`)
    return res.data.data
}

export const createProjectCategory = (data: FormData) => {
    return request.post('/project-categories', data)
}

export const updateProjectCategory = (
    id: number | string,
    data: FormData,
) => {
    return request.put(`/project-categories/${id}`, data)
}
