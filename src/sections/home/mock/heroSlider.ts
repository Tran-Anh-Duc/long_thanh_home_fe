export interface HeroSlide {
    id: number
    title: string
    subtitle: string
    image: string
    ctaText: string
    ctaLink: string
}

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: 'Nhà ở xã hội – Giá phù hợp',
        subtitle: 'Hỗ trợ hồ sơ nhanh – Tỷ lệ duyệt cao',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
        ctaText: 'Xem dự án',
        ctaLink: '/projects',
    },
    {
        id: 2,
        title: 'Dự án pháp lý minh bạch',
        subtitle: 'Thông tin chính xác – Cập nhật liên tục',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
        ctaText: 'Tìm hiểu ngay',
        ctaLink: '/news',
    },
    {
        id: 3,
        title: 'Hỗ trợ người lao động',
        subtitle: 'Tư vấn 1–1 – Không phát sinh chi phí',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        ctaText: 'Liên hệ tư vấn',
        ctaLink: '/contact',
    },
]
