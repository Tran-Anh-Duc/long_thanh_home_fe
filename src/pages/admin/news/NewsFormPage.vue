<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getNewsDetail,
  createNews,
  updateNews,
} from '@/api/news.api'

/* ================= TYPES (FORM RIÊNG) ================= */
interface NewsForm {
  id: number
  title: string
  content: string
  thumbnail: string | null
}

/* ================= ROUTER ================= */
const route = useRoute()
const router = useRouter()

/* ================= STATE ================= */
const loading = ref(false)
const saving = ref(false)

const isEdit = computed(() => !!route.params.id)

/* ================= FORM ================= */
const form = ref<NewsForm>({
  id: 0,
  title: '',
  content: '',
  thumbnail: null,
})

const thumbnailFile = ref<File | null>(null)
const previewThumbnail = ref<string>('')

/* ================= FETCH DETAIL ================= */
const fetchData = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const data = await getNewsDetail(route.params.id as string)

    form.value.id = data.id
    form.value.title = data.title
    form.value.content = data.content ?? ''
    form.value.thumbnail = data.thumbnail ?? null

    previewThumbnail.value = data.thumbnail
        ? `http://localhost:8000/storage/${data.thumbnail}`
        : ''
  } catch (e) {
    alert('Không tải được dữ liệu tin tức')
  } finally {
    loading.value = false
  }
}

/* ================= THUMBNAIL ================= */
const onThumbnailChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  thumbnailFile.value = file
  previewThumbnail.value = window.URL.createObjectURL(file)
}

/* ================= SAVE ================= */
const onSave = async () => {
  if (saving.value) return

  saving.value = true
  try {
    const fd = new FormData()
    fd.append('title', form.value.title)
    fd.append('content', form.value.content) // luôn là string

    if (thumbnailFile.value) {
      fd.append('thumbnail', thumbnailFile.value)
    }

    if (isEdit.value) {
      await updateNews(form.value.id, fd)
      alert('Cập nhật tin thành công')
    } else {
      await createNews(fd)
      alert('Thêm tin thành công')
    }

    router.push('/admin/news')
  } catch (e) {
    alert('Lưu dữ liệu thất bại')
  } finally {
    saving.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <div>
    <!-- HEADER -->
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">
        {{ isEdit ? 'Edit News' : 'Create News' }}
      </h1>

      <button
          class="rounded bg-gray-200 px-3 py-2 hover:bg-gray-300"
          @click="router.push('/admin/news')"
      >
        ← Quay lại
      </button>
    </div>

    <div v-if="loading" class="py-10 text-center">Loading...</div>

    <div
        v-else
        class="max-w-3xl space-y-4 rounded bg-white p-6 shadow"
    >
      <!-- TITLE -->
      <div>
        <label class="mb-1 block text-sm font-medium">Title</label>
        <input
            v-model="form.title"
            class="w-full rounded border px-3 py-2"
            placeholder="Nhập tiêu đề"
        />
      </div>

      <!-- CONTENT -->
      <div>
        <label class="mb-1 block text-sm font-medium">Content</label>
        <textarea
            v-model="form.content"
            rows="8"
            class="w-full rounded border px-3 py-2"
            placeholder="Nhập nội dung"
        />
      </div>

      <!-- THUMBNAIL -->
      <div>
        <label class="mb-1 block text-sm font-medium">Thumbnail</label>
        <input
            type="file"
            accept="image/*"
            @change="onThumbnailChange"
        />

        <img
            v-if="previewThumbnail"
            :src="previewThumbnail"
            class="mt-3 h-40 rounded object-cover"
        />
      </div>

      <!-- ACTION -->
      <div class="flex justify-end gap-2 pt-4">
        <button
            class="rounded bg-gray-200 px-4 py-2"
            @click="router.push('/admin/news')"
        >
          Cancel
        </button>

        <button
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            :disabled="saving"
            @click="onSave"
        >
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>
