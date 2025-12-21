export interface ServiceItem {
    id: number
    title: string
    description: string
    image: string
}

export const services: ServiceItem[][] = [
    [
        {
            id: 1,
            title: 'Tư vấn hồ sơ NOXH',
            description: 'Tư vấn, làm hồ sơ mua – thuê – thuê mua NOXH đúng quy định',
            image: 'https://images.pexels.com/photos/4427541/pexels-photo-4427541.jpeg',
        },
        {
            id: 2,
            title: 'Ủy quyền pháp lý',
            description: 'Đại diện ủy quyền pháp lý, chuẩn bị giấy tờ và nộp hồ sơ',
            image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg',
        },
    ],
    [
        {
            id: 3,
            title: 'Theo dõi hồ sơ',
            description: 'Theo dõi tiến độ hồ sơ, hỗ trợ bổ sung giấy tờ',
            image: 'https://images.pexels.com/photos/4427541/pexels-photo-4427541.jpeg',
        },
        {
            id: 4,
            title: 'Hỗ trợ sau bán',
            description: 'Hỗ trợ thủ tục pháp lý sau khi nhận nhà',
            image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg',
        },
    ],
]
