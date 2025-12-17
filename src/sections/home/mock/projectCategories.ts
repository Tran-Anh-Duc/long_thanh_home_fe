export interface ProjectCategory {
    id: number
    name: string
    slug: string
}

export const projectCategories: ProjectCategory[] = [
    {
        id: 1,
        name: 'Dự án NOXH',
        slug: 'nha-o-xa-hoi',
    },
    {
        id: 2,
        name: 'Dự án thương mại',
        slug: 'chung-cu-gia-re',
    },
    {
        id: 3,
        name: 'Nhà đất Hà Nội chính chủ',
        slug: 'nha-dat-ha-noi',
    },
]
