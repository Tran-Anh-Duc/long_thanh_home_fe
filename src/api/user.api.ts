import request from './request'

export interface Role {
    id: number
    name: string
    slug: string
}

export interface User {
    id: number
    name: string
    email: string
    role?: Role | null
}

/**
 * GET ALL USERS
 * API trả về dạng:
 * {
 *   success: true,
 *   data: User[]
 * }
 */
export const getUsers = async (): Promise<User[]> => {
    const res = await request.get('/auth/users')
    return res.data.data // 👈 BẮT BUỘC PHẢI .data.data
}
