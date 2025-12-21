import request from './request'
import type { Project } from '@/types/project'

export const getProjects = async (): Promise<Project[]> => {
    const res = await request.get('/projects')
    return res.data.data
}

export function getProject(id: number | string) {
    return request.get(`/projects/${id}`)
}

export function createProject(data: FormData) {
    return request.post('/projects', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export function updateProject(id: number | string, data: FormData) {
    return request.post(`/projects/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export function deleteProject(id: number) {
    return request.delete(`/projects/${id}`)
}