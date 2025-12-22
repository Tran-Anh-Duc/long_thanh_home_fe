import request from './request'

export interface Partner {
    id: number
    name: string
    logo?: string | null
    website?: string | null
    sort_order?: number | null
    is_active: boolean
}

/* PUBLIC / ADMIN */
export const getPartners = async (): Promise<Partner[]> => {
    const res = await request.get('/partners')
    return res.data.data
}

export const getPartner = async (
    id: number | string,
): Promise<Partner> => {
    const res = await request.get(`/partners/${id}`)
    return res.data.data
}

/* CREATE */
export const createPartner = async (
    data: FormData,
): Promise<Partner> => {
    const res = await request.post('/partners', data)
    return res.data.data
}

/* UPDATE – ❗ DÙNG POST */
export const updatePartner = async (
    id: number | string,
    data: FormData,
): Promise<Partner> => {
    const res = await request.post(`/partners/${id}`, data)
    return res.data.data
}

/* DELETE */
export const deletePartner = async (id: number | string) => {
    await request.delete(`/partners/${id}`)
}
