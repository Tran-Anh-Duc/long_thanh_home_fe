export interface CoreValueItem {
    id: number
    title: string
    description: string
    icon: string
}

export const coreValues: CoreValueItem[] = [
    {
        id: 1,
        title: 'Minh bạch & chính trực',
        description:
            'Trung thực trong pháp lý, rõ ràng trong chính sách, bảo vệ quyền lợi khách hàng',
        icon: 'handshake',
    },
    {
        id: 2,
        title: 'Hướng đến cộng đồng',
        description:
            'Nhà ở xã hội không phải sản phẩm thương mại đơn thuần, mà là sứ mệnh xã hội',
        icon: 'users',
    },
    {
        id: 3,
        title: 'Chuyên nghiệp & tận tâm',
        description:
            'Tư vấn cá nhân hóa, phù hợp hoàn cảnh từng đối tượng chính sách',
        icon: 'heart',
    },
    {
        id: 4,
        title: 'Phát triển bền vững',
        description:
            'Đồng hành dài hạn cùng chủ đầu tư, cơ quan quản lý và người dân',
        icon: 'trending-up',
    },
]
