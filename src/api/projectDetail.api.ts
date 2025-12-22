import request from './request'
import type { ProjectDetail } from '@/types/projectDetail'

// list detail theo project
export const getProjectDetailsByProject = async (
    projectId: number | string,
) => {
    const res = await request.get(`/projects/${projectId}/details`)
    return res.data.data
}

// get 1 detail
export const getProjectDetail = async (
    id: number | string,
): Promise<ProjectDetail> => {
    const res = await request.get(`/project-details/${id}`)
    return res.data.data
}

export const updateProjectDetail = (
    id: number | string,
    data: FormData,
) => {
    return request.post(`/project-details/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export const createProjectDetail = (data: FormData) => {
    return request.post('/project-details', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

