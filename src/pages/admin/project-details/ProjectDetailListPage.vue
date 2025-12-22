<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getProjectDetailsByProject } from '@/api/projectDetail.api'
import type { ProjectDetail } from '@/types/projectDetail'

import { useAuthStore } from '@/stores/auth.store'
import { PERMISSIONS } from '@/constants/permissions'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const details = ref<ProjectDetail[]>([])

/**
 * 👉 CHECK PERMISSION
 */
const canView = computed(() =>
    auth.hasPermission(PERMISSIONS.PROJECT_DETAIL_VIEW)
)

const canCreate = computed(() =>
    auth.hasPermission(PERMISSIONS.PROJECT_DETAIL_CREATE)
)

const canEdit = computed(() =>
    auth.hasPermission(PERMISSIONS.PROJECT_DETAIL_UPDATE)
)

const fetchData = async () => {
  if (!canView.value) return

  loading.value = true
  try {
    const projectId = route.params.projectId as string
    details.value = await getProjectDetailsByProject(projectId)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!canView.value) {
    alert('Bạn không có quyền xem chi tiết dự án')
    router.push('/admin/projects')
    return
  }

  fetchData()
})
</script>

<template>
  <div>
    <!-- HEADER + CREATE -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Project Details</h1>

      <button
          v-if="canCreate"
          class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          @click="
          router.push(
            `/admin/projects/${route.params.projectId}/details/create`
          )
        "
      >
        + Thêm chi tiết
      </button>
    </div>

    <div v-if="loading" class="text-gray-400">
      Loading...
    </div>

    <div v-else class="rounded bg-white shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50">
        <tr>
          <th class="border-b px-4 py-3 text-left">Title</th>
          <th class="border-b px-4 py-3 text-left">Type</th>
          <th class="border-b px-4 py-3 text-right">Action</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="detail in details"
            :key="detail.id"
            class="hover:bg-gray-50"
        >
          <td class="border-b px-4 py-2">
            {{ detail.title }}
          </td>

          <td class="border-b px-4 py-2">
            {{ detail.type || '-' }}
          </td>

          <td class="border-b px-4 py-2 text-right">
            <button
                v-if="canEdit"
                class="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                @click="
                  router.push(
                    `/admin/project-details/${detail.id}/edit`
                  )
                "
            >
              Edit
            </button>
          </td>
        </tr>

        <tr v-if="!details.length">
          <td colspan="3" class="px-4 py-6 text-center text-gray-400">
            Chưa có chi tiết
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
