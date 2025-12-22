<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getNewsDetail,
  createNews,
  updateNews,
  type News,
} from '@/api/news.api'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const saving = ref(false)

const isEdit = computed(() => !!route.params.id)

const form = ref<News>({
  id: 0,
  title: '',
  content: '',
  thumbnail: null,
})

const thumbnailFile = ref<File | null>(null)
const previewThumbnail = ref<string | null>(null)

const fetchData = async () => {
  if (!isEdit.value) return

  loading.value = true
  try {
    const data = await getNewsDetail(route.params.id as string)
    form.value = data
    previewThumbnail.value = data.thumbnail
        ? `http://localhost:8000/storage/${data.thumbnail}`
        : null
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

const onSave = async () => {
  saving.value = true
  try {
    const fd = new FormData()
    fd.append('title', form.value.title)
    fd.append('content', form.value.content)

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

    <div v-if="loading">Loading...</div>

    <div
        v-else
        class="max-w-3xl space-y-4 rounded bg-white p-6 shadow"
    >
      <div>
        <label class="mb-1 block text-sm font-medium">Title</label>
        <input
            v-model="form.title"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">Content</label>
        <textarea
            v-model="form.content"
            rows="8"
            class="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium">Thumbnail</label>
        <input type="file" accept="image/*" @change="onThumbnailChange" />

        <img
            v-if="previewThumbnail"
            :src="previewThumbnail"
            class="mt-3 h-40 rounded object-cover"
        />
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <button
            class="rounded bg-gray-200 px-4 py-2"
            @click="router.push('/admin/news')"
        >
          Cancel
        </button>

        <button
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            :disabled="saving"
            @click="onSave"
        >
          {{ saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>
