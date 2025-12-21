import request from './request'


export function getProjects(params?: {
    page?: number
    per_page?: number
}) {
    return request.get('/projects', { params })
}

export function getProject(id: number) {
    return request.get(`/projects/${id}`)
}

export function createProject(data: FormData) {
    return request.post('/projects', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export function updateProject(id: number, data: any) {
    return request.post(`/projects/${id}`, data)
}

export function deleteProject(id: number) {
    return request.delete(`/projects/${id}`)
}