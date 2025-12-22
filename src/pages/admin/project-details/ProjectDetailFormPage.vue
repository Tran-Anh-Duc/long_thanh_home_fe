<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import {
  getProjectDetail,
  createProjectDetail,
  updateProjectDetail,
} from '@/api/projectDetail.api'
import type { ProjectDetail } from '@/types/projectDetail'

import { useAuthStore } from '@/stores/auth.store'
import { PERMISSIONS } from '@/constants/permissions'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const saving = ref(false)

const form = ref<ProjectDetail | null>(null)
const thumbnailFile = ref<File | null>(null)
const previewThumbnail = ref<string | null>(null)

const isEdit = computed(() => !!route.params.id)

/**
 * 👉 CHECK PERMISSION
 */
const canSave = computed(() => {
  return isEdit.value
      ? auth.hasPermission(PERMISSIONS.PROJECT_DETAIL_UPDATE)
      : auth.hasPermission(PERMISSIONS.PROJECT_DETAIL_CREATE)
})

/**
 * 👉 BLOCK TRUY CẬP NẾU KHÔNG CÓ QUYỀN
 */
const checkPermission = () => {
  if (!canSave.value) {
    alert('Bạn không có quyền thực hiện thao tác này')
    router.push('/admin/projects')
  }
}

const fetchDetail = async () => {
  loading.value = true
  try {
    const projectId = route.params.projectId as string

    if (isEdit.value) {
      const data = await getProjectDetail(route.params.id as string)
      data.meta = data.meta ?? {}
      form.value = data
      previewThumbnail.value = data.thumbnail
    } else {
      form.value = {
        id: 0,
        project_id: Number(projectId),
        title: '',
        type: '',
        summary: '',
        description: '',
        thumbnail: null,
        meta: {},
        created_at: null,
        updated_at: null,
      }
    }
  } finally {
    loading.value = false
  }
}

const onThumbnailChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  thumbnailFile.value = file
  previewThumbnail.value = URL.createObjectURL(file)
}

const goBackToList = () => {
  if (!form.value) return
  router.push(`/admin/projects/${form.value.project_id}/details`)
}

const onSave = async () => {
  if (!form.value || !canSave.value) return

  saving.value = true
  try {
    const fd = new FormData()

    fd.append('project_id', String(form.value.project_id))
    fd.append('title', form.value.title)
    fd.append('type', form.value.type ?? '')
    fd.append('summary', form.value.summary ?? '')
    fd.append('description', form.value.description ?? '')

    Object.entries(form.value.meta).forEach(([k, v]) => {
      fd.append(`meta[${k}]`, String(v))
    })

    if (thumbnailFile.value) {
      fd.append('thumbnail', thumbnailFile.value)
    }

    if (isEdit.value) {
      await updateProjectDetail(form.value.id, fd)
      alert('Cập nhật chi tiết dự án thành công')
    } else {
      await createProjectDetail(fd)
      alert('Thêm chi tiết dự án thành công')
    }

    goBackToList()
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  checkPermission()
  fetchDetail()
})
</script>

<template>
  <div>
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">
          {{ isEdit ? 'Edit Project Detail' : 'Create Project Detail' }}
        </h1>
        <p class="text-gray-500">
          {{ isEdit
            ? 'Chỉnh sửa nội dung chi tiết dự án'
            : 'Thêm mới nội dung chi tiết dự án'
          }}
        </p>
      </div>

      <button
          class="rounded bg-gray-200 px-3 py-2 text-sm hover:bg-gray-300"
          @click="goBackToList"
      >
        ← Quay lại
      </button>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-gray-400">
      Loading...
    </div>

    <!-- FORM -->
    <div
        v-else-if="form"
        class="max-w-3xl space-y-5 rounded bg-white p-6 shadow"
    >
      <!-- TITLE -->
      <div>
        <label class="mb-1 block text-sm font-medium">Title</label>
        <input
            v-model="form.title"
            type="text"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <!-- TYPE -->
      <div>
        <label class="mb-1 block text-sm font-medium">Type</label>
        <input
            v-model="form.type"
            type="text"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <!-- SUMMARY -->
      <div>
        <label class="mb-1 block text-sm font-medium">Summary</label>
        <textarea
            v-model="form.summary"
            rows="3"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <!-- DESCRIPTION -->
      <div>
        <label class="mb-1 block text-sm font-medium">Description</label>
        <textarea
            v-model="form.description"
            rows="6"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <!-- THUMBNAIL -->
      <div>
        <label class="mb-1 block text-sm font-medium">Thumbnail</label>
        <input type="file" accept="image/*" @change="onThumbnailChange" />
        <img
            v-if="previewThumbnail"
            :src="previewThumbnail"
            class="mt-2 h-32 rounded object-cover"
        />
      </div>

      <!-- META -->
      <div>
        <label class="mb-1 block text-sm font-medium">SEO Meta</label>
        <input
            v-model="form.meta.seo_title"
            placeholder="SEO title"
            class="mb-2 w-full rounded border px-3 py-2"
        />
        <textarea
            v-model="form.meta.seo_description"
            placeholder="SEO description"
            rows="2"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <!-- ACTION -->
      <div class="flex justify-end gap-2 pt-4">
        <button
            class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            @click="goBackToList"
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
