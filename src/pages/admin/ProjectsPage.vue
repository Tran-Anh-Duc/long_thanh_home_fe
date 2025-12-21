<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getProjects, deleteProject } from '@/api/project.api'
import type { Project } from '@/types/project'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const loading = ref(false)
const projects = ref<Project[]>([])

async function fetchProjects() {
  loading.value = true
  try {
    const res = await getProjects()
    projects.value = res.data.data ?? res.data // tuỳ BE paginate hay không
  } finally {
    loading.value = false
  }
}

async function onDelete(project: Project) {
  if (!confirm(`Xoá dự án "${project.title}"?`)) return

  await deleteProject(project.id)
  await fetchProjects()
}

onMounted(fetchProjects)
</script>

<template>
<!--  <div class="mb-4 text-sm text-red-600">-->
<!--    Debug permission project.update:-->
<!--    {{ auth.hasPermission('project.update') }}-->
<!--  </div>-->
  <div>
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Quản lý dự án</h1>
        <p class="text-gray-500">Trang quản lý danh sách dự án</p>
      </div>

      <!-- ADD -->
      <button
          v-if="auth.hasPermission('project.create')"
          @click="router.push('/admin/projects/create')"
          class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        + Thêm dự án
      </button>
    </div>

    <!-- TABLE -->
    <div class="overflow-x-auto rounded bg-white shadow">
      <table class="w-full border-collapse">
        <thead class="bg-gray-100 text-left">
        <tr>
          <th class="border px-4 py-2">#</th>
          <th class="border px-4 py-2">Tên dự án</th>
          <th class="border px-4 py-2">Khu vực</th>
          <th class="border px-4 py-2">Giá từ</th>
          <th class="border px-4 py-2">Trạng thái</th>
          <th class="border px-4 py-2 text-center">Hành động</th>
        </tr>
        </thead>

        <tbody>
        <tr v-if="loading">
          <td colspan="6" class="px-4 py-6 text-center">
            Đang tải dữ liệu...
          </td>
        </tr>

        <tr
            v-for="(project, index) in projects"
            :key="project.id"
            class="hover:bg-gray-50"
        >
          <td class="border px-4 py-2">{{ index + 1 }}</td>
          <td class="border px-4 py-2 font-medium">
            {{ project.title }}
          </td>
          <td class="border px-4 py-2">
            {{ project.location || '-' }}
          </td>
          <td class="border px-4 py-2">
            {{ project.price_from ? project.price_from.toLocaleString() : '-' }}
          </td>
          <td class="border px-4 py-2">
              <span
                  :class="project.is_active ? 'text-green-600' : 'text-gray-400'"
              >
                {{ project.is_active ? 'Hoạt động' : 'Ẩn' }}
              </span>
          </td>

          <!-- ACTION -->
          <td class="border px-4 py-2 text-center space-x-2">
            <button
                v-if="auth.hasPermission('project.update')"
                @click="router.push(`/admin/projects/${project.id}/edit`)"
                class="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
            >
              ✏️ Sửa
            </button>

            <button
                v-if="auth.hasPermission('project.delete')"
                @click="onDelete(project)"
                class="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
            >
              🗑 Xoá
            </button>
          </td>
        </tr>

        <tr v-if="!loading && projects.length === 0">
          <td colspan="6" class="px-4 py-6 text-center text-gray-500">
            Chưa có dự án nào
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
