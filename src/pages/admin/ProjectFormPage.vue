<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProject, updateProject, createProject } from '@/api/project.api'
import { getProjectCategories } from '@/api/category.api'
import { useToast } from '@/composables/useToast'

/* ================= ROUTER ================= */
const router = useRouter()
const route = useRoute()
const toast = useToast()

const projectId = route.params.id as string | undefined
const isEdit = computed(() => !!projectId)

/* ================= STATE ================= */
const loading = ref(false)
const errors = ref<Record<string, string[]>>({})

const form = ref({
  project_category_id: '',
  title: '',
  slug: '',
  location: '',
  price_from: '',
  description: '',
  is_active: true,
})

const categories = ref<any[]>([])
const thumbnail = ref<File | null>(null)
const existingThumbnail = ref<string | null>(null)

/* ================= LOAD DATA ================= */
onMounted(async () => {
  try {
    const cateRes = await getProjectCategories()
    categories.value = cateRes.data.data ?? cateRes.data

    if (isEdit.value && projectId) {
      const res = await getProject(projectId)
      const p = res.data.data ?? res.data

      form.value = {
        project_category_id: String(p.project_category_id),
        title: p.title,
        slug: p.slug,
        location: p.location ?? '',
        price_from: p.price_from ?? '',
        description: p.description ?? '',
        is_active: !!p.is_active,
      }

      existingThumbnail.value = p.thumbnail
    }
  } catch {
    toast.open('Không tải được dữ liệu dự án', 'error')
  }
})

/* ================= HANDLERS ================= */
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (input.files && input.files[0]) {
    thumbnail.value = input.files[0]
  }
}

async function submit() {
  loading.value = true
  errors.value = {}

  toast.open(
      isEdit.value ? 'Đang cập nhật dự án...' : 'Đang tạo dự án...',
      'loading'
  )

  try {
    const data = new FormData()

    Object.entries(form.value).forEach(([key, value]) => {
      if (key === 'is_active') {
        data.append('is_active', value ? '1' : '0')
      } else {
        data.append(key, value as any)
      }
    })

    if (thumbnail.value) {
      data.append('thumbnail', thumbnail.value)
    }

    if (isEdit.value && projectId) {
      await updateProject(projectId, data)
      toast.open('Cập nhật dự án thành công', 'success')
    } else {
      await createProject(data)
      toast.open('Tạo dự án mới thành công', 'success')
    }

    router.push('/admin/projects')
  } catch (e: any) {
    errors.value = e.response?.data?.errors || {}
    toast.open(
        e.response?.data?.message || 'Có lỗi xảy ra, vui lòng kiểm tra lại',
        'error'
    )
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold">
      {{ isEdit ? 'Cập nhật dự án' : 'Thêm dự án mới' }}
    </h1>

    <div class="rounded bg-white p-6 shadow">
      <!-- CATEGORY -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">
          Danh mục dự án <span class="text-red-500">*</span>
        </label>

        <select v-model="form.project_category_id" class="w-full border px-3 py-2">
          <option value="" disabled>-- Chọn danh mục --</option>
          <option v-for="c in categories" :key="c.id" :value="String(c.id)">
            {{ c.name }}
          </option>
        </select>

        <p v-if="errors.project_category_id" class="mt-1 text-sm text-red-500">
          {{ errors.project_category_id[0] }}
        </p>
      </div>

      <!-- TITLE -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Tên dự án *</label>
        <input v-model="form.title" class="w-full border px-3 py-2" />
      </div>

      <!-- SLUG -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Slug *</label>
        <input v-model="form.slug" class="w-full border px-3 py-2" />
      </div>

      <!-- THUMBNAIL -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Ảnh đại diện</label>

        <img
            v-if="existingThumbnail"
            :src="existingThumbnail"
            class="mb-2 h-32 rounded border object-cover"
        />

        <input type="file" accept="image/*" @change="onFileChange" />
      </div>

      <!-- LOCATION -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Khu vực</label>
        <input v-model="form.location" class="w-full border px-3 py-2" />
      </div>

      <!-- PRICE -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Giá từ</label>
        <input
            type="number"
            v-model="form.price_from"
            class="w-full border px-3 py-2"
        />
      </div>

      <!-- DESCRIPTION -->
      <div class="mb-4">
        <label class="mb-1 block font-medium">Mô tả</label>
        <textarea
            v-model="form.description"
            rows="4"
            class="w-full border px-3 py-2"
        />
      </div>

      <!-- ACTIVE -->
      <div class="mb-6 flex items-center gap-2">
        <input type="checkbox" v-model="form.is_active" />
        <span>Hoạt động</span>
      </div>

      <!-- ACTIONS -->
      <div class="flex gap-3">
        <button
            @click="submit"
            :disabled="loading"
            class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {{ loading ? 'Đang lưu...' : isEdit ? 'Cập nhật' : 'Lưu' }}
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
