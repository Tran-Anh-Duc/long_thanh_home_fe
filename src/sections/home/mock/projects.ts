export interface ProjectItem {
    id: number
    categorySlug: string
    title: string
    location: string
    thumbnail: string
}

export const projects: ProjectItem[] = [
    {
        id: 1,
        categorySlug: 'nha-o-xa-hoi',
        title: 'NOXH Kim Chung – Đông Anh',
        location: 'Hà Nội',
        thumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    },
    {
        id: 2,
        categorySlug: 'nha-o-xa-hoi',
        title: 'NOXH Thượng Thanh',
        location: 'Long Biên',
        thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    },
    {
        id: 3,
        categorySlug: 'chung-cu-gia-re',
        title: 'Chung cư giá rẻ Hoài Đức',
        location: 'Hà Nội',
        thumbnail: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    },
]
