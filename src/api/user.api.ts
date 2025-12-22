import request from './request'

export interface User {
    id: number
    name: string
    email: string
    role?: {
        id: number
        name: string
        slug: string
    }
}

export const getUsers = async () => {
    const res = await request.get<User[]>('/auth/users')
    return res.data
}
