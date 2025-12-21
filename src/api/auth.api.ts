import request from './request'

export interface LoginPayload {
    email: string
    password: string
}

export function loginApi(data: LoginPayload) {
    return request.post('/auth/login', data)
}

export function logoutApi() {
    return request.post('/auth/logout')
}

export function getMe() {
    return request.get('/auth/me')
}

export function getPermissions() {
    return request.get('/auth/permissions')
}
