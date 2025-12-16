import request from './request'
import type { Project } from '@/types/project'

export const getProjects = async (): Promise<Project[]> => {
    const { data } = await request.get('/projects')
    return data.data ?? data
}
