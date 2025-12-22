<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  getProjectCategory,
  createProjectCategory,
  updateProjectCategory,
} from '@/api/projectCategory.api'
import type { ProjectCategory } from '@/types/projectCategory'

import { useAuthStore } from '@/stores/auth.store'
import { PERMISSIONS } from '@/constants/permissions'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const saving = ref(false)

const isEdit = computed(() => !!route.params.id)

/**
 * 👉 CHECK PERMISSION THEO MODE
 */
const canSave = computed(() => {
  return isEdit.value
      ? auth.hasPermission(PERMISSIONS.PROJECT_CATEGORY_UPDATE)
      : auth.hasPermission(PERMISSIONS.PROJECT_CATEGORY_CREATE)
})

/**
 * 👉 REDIRECT SỚM NẾU KHÔNG CÓ QUYỀN
 */
const checkPermission = () => {
  if (!canSave.value) {
    alert('Bạn không có quyền thực hiện thao tác này')
    router.push('/admin/project-categories')
  }
}

const form = ref<ProjectCategory>({
  id: 0,
  name: '',
  slug: '',
  created_at: null,
  updated_at: null,
})

const fetchData = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const data = await getProjectCategory(route.params.id as string)
    form.value = data
  } finally {
    loading.value = false
  }
}

const onSave = async () => {
  if (!canSave.value) return

  saving.value = true
  try {
    const fd = new FormData()
    fd.append('name', form.value.name)
    fd.append('slug', form.value.slug)

    if (isEdit.value) {
      await updateProjectCategory(form.value.id, fd)
      alert('Cập nhật danh mục thành công')
    } else {
      await createProjectCategory(fd)
      alert('Thêm danh mục thành công')
    }

    router.push('/admin/project-categories')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  checkPermission()
  fetchData()
})
</script>

<template>
  <div>
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ isEdit ? 'Edit Project Category' : 'Create Project Category' }}
      </h1>

      <button
          class="rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300"
          @click="router.push('/admin/project-categories')"
      >
        ← Quay lại
      </button>
    </div>

    <div v-if="loading">Loading...</div>

    <div
        v-else
        class="max-w-xl space-y-4 rounded bg-white p-6 shadow"
    >
      <div>
        <label class="mb-1 block text-sm font-medium">Name</label>
        <input
            v-model="form.name"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">Slug</label>
        <input
            v-model="form.slug"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <!-- ACTION -->
      <div class="flex justify-end gap-2 pt-4">
        <button
            class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            @click="router.push('/admin/project-categories')"
        >
          Cancel
        </button>

        <button
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            :disabled="saving || !canSave"
            @click="onSave"
        >
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>
