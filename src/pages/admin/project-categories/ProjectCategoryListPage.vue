<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getProjectCategories } from '@/api/projectCategory.api'
import type { ProjectCategory } from '@/types/projectCategory'

import { useAuthStore } from '@/stores/auth.store'
import { PERMISSIONS } from '@/constants/permissions'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const items = ref<ProjectCategory[]>([])

const fetchData = async () => {
  loading.value = true
  try {
    items.value = await getProjectCategories()
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Project Categories</h1>

      <button
          v-if="auth.hasPermission(PERMISSIONS.PROJECT_CATEGORY_CREATE)"
          class="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          @click="router.push('/admin/project-categories/create')"
      >
        + Thêm danh mục
      </button>
    </div>

    <div v-if="loading" class="text-gray-400">Loading...</div>

    <div v-else class="rounded bg-white shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50">
        <tr>
          <th class="border-b px-4 py-3 text-left">Name</th>
          <th class="border-b px-4 py-3 text-left">Slug</th>
          <th class="border-b px-4 py-3 text-right">Action</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="item in items"
            :key="item.id"
            class="hover:bg-gray-50"
        >
          <td class="border-b px-4 py-2">
            {{ item.name }}
          </td>
          <td class="border-b px-4 py-2 text-gray-500">
            {{ item.slug }}
          </td>
          <td class="border-b px-4 py-2 text-right">
            <button
                v-if="auth.hasPermission(PERMISSIONS.PROJECT_CATEGORY_UPDATE)"
                class="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                @click="
                  router.push(
                    `/admin/project-categories/${item.id}/edit`
                  )
                "
            >
              Edit
            </button>
          </td>
        </tr>

        <tr v-if="!items.length">
          <td colspan="3" class="px-4 py-6 text-center text-gray-400">
            Chưa có danh mục
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
