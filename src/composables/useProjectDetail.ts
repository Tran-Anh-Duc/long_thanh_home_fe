import { ref } from 'vue'
import { getProject } from '@/api/project.api'
import { getProjectDetail } from '@/api/projectDetail.api'

export function useProjectDetail() {
    const loading = ref(false)
    const project = ref<any>(null)
    const detail = ref<any>(null)

    const fetchAll = async (id: number | string) => {
        loading.value = true
        try {
            project.value = await getProject(id)
            detail.value = await getProjectDetail(id)
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        project,
        detail,
        fetchAll,
    }
}
