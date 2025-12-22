const BASE_URL = import.meta.env.VITE_API_BASE_URL

export function getImageUrl(path?: string | null) {
    if (!path) {
        return '/images/placeholder.jpg' // ảnh fallback
    }

    // đã là url đầy đủ
    if (path.startsWith('http')) {
        return path
    }

    // ảnh từ storage Laravel
    return `${BASE_URL}/storage/${path}`
}
