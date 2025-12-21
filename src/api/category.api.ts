import request from './request'

export function getProjectCategories() {
    return request.get('/project-categories')
}
