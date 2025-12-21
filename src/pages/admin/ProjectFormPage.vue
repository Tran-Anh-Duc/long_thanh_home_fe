<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { createProject } from '@/api/project.api'
import { getProjectCategories } from '@/api/category.api'

const router = useRouter()

const loading = ref(false)
const errors = ref<Record<string, string[]>>({})

// form state
const form = ref({
  project_category_id: '',
  title: '',
  slug: '',
  location: '',
  price_from: '',
  description: '',
  is_active: true,
})

const thumbnail = ref<File | null>(null)

// categories
const categories = ref<any[]>([])

onMounted(async () => {
  const res = await getProjectCategories()
  categories.value = res.data.data

})

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    thumbnail.value = target.files[0]
  }
}

async function submit() {
  loading.value = true
  errors.value = {}

  try {
    const data = new FormData()

    Object.entries(form.value).forEach(([key, value]) => {
      data.append(key, value as any)
    })

    if (thumbnail.value) {
      data.append('thumbnail', thumbnail.value)
    }

    await createProject(data)
    router.push('/admin/projects')
  } catch (e: any) {
    errors.value = e.response?.data?.errors || {}
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <!--  <div class="text-xs text-red-500">-->
  <!--    {{ categories }}-->
  <!--  </div>-->
  <div>
    <h1 class="mb-6 text-2xl font-bold">Thêm dự án mới</h1>

    <div class="rounded bg-white p-6 shadow">
      <!-- Category -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Danh mục dự án *</label>
        <select
            v-if="categories.length"
            v-model="form.project_category_id"
            class="w-full border px-3 py-2"
        >
          <option value="" disabled>
            {{ categories.length ? '-- Chọn danh mục --' : 'Đang tải danh mục...' }}
          </option>

          <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
          >
            {{ c.name }}
          </option>
        </select>
      </div>

      <!-- Title -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Tên dự án *</label>
        <input v-model="form.title" class="w-full border px-3 py-2" />
      </div>

      <!-- Slug -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Slug *</label>
        <input v-model="form.slug" class="w-full border px-3 py-2" />
      </div>

      <!-- Thumbnail -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Ảnh đại diện</label>
        <input type="file" accept="image/*" @change="onFileChange" />
      </div>

      <!-- Location -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Khu vực</label>
        <input v-model="form.location" class="w-full border px-3 py-2" />
      </div>

      <!-- Price -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Giá từ</label>
        <input type="number" v-model="form.price_from" class="w-full border px-3 py-2" />
      </div>

      <!-- Description -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Mô tả</label>
        <textarea v-model="form.description" rows="4" class="w-full border px-3 py-2" />
      </div>

      <!-- Active -->
      <div class="mb-6 flex items-center gap-2">
        <input type="checkbox" v-model="form.is_active" />
        <span>Hoạt động</span>
      </div>

      <!-- Actions -->
      <div class="flex gap-3">
        <button
            @click="submit"
            :disabled="loading"
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {{ loading ? 'Đang lưu...' : 'Lưu' }}
        </button>

        <button
            @click="router.back()"
            class="rounded bg-gray-300 px-4 py-2"
        >
          Huỷ
        </button>
      </div>
    </div>
  </div>
</template>

