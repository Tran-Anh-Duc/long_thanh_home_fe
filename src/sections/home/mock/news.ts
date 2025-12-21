export interface NewsItem {
    id: number
    title: string
    excerpt: string
    image: string
    date: string
    category: string
}

export const newsList: NewsItem[] = [
    {
        id: 1,
        title: 'Bắc Ninh mở bán NOXH giá từ 16,8 triệu/m²',
        excerpt:
            'Bắc Ninh chính thức mở bán dự án nhà ở xã hội tại phường Ninh...',
        image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        date: '07/08/2025',
        category: 'NOXH',
    },
    {
        id: 2,
        title: 'Vì sao Rice City Long Châu chậm tiến độ?',
        excerpt:
            'Phân tích các nguyên nhân khiến dự án Rice City Long Châu chậm...',
        image: 'https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg',
        date: '30/07/2025',
        category: 'Phân tích',
    },
    {
        id: 3,
        title: 'NOXH Hạ Đình bán giai đoạn 1',
        excerpt:
            'Dự án NOXH Hạ Đình mở bán 365 căn hộ trong giai đoạn đầu...',
        image: 'https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg',
        date: '20/07/2025',
        category: 'Dự án',
    },
    {
        id: 4,
        title:'[HOT] Chính sách mới về nhà ở xã hội',
        excerpt:
            'Chính sách mới giúp người lao động, công chức dễ tiếp cận NOXH...',
        image: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg',
        date: '16/07/2025',
        category: 'Chính sách',
    },
    {
        id: 5,
        title: 'Những khu vực NOXH tiềm năng năm 2025',
        excerpt:
            'Tổng hợp các khu vực đang và sắp triển khai dự án NOXH...',
        image: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg',
        date: '10/07/2025',
        category: 'Thị trường',
    },
]
