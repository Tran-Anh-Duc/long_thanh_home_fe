<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/image'

import {
  getPartner,
  createPartner,
  updatePartner,
} from '@/api/partner.api'

const route = useRoute()
const router = useRouter()
const logoFile = ref<File | null>(null)
const logoPreview = ref('')
const isEdit = Boolean(route.params.id)
const onLogoChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  logoFile.value = file
  logoPreview.value = URL.createObjectURL(file)
}

/* ================= STATE ================= */
const loading = ref(false)
const toast = ref<{ type: 'success' | 'error'; message: string } | null>(null)

/* ================= FORM ================= */
const form = ref({
  name: '',
  website: '',
  sort_order: 0,
  is_active: true,
  logo: null as File | null,
  logo_preview: '',
})

/* ================= TOAST ================= */
const showToast = (type: 'success' | 'error', message: string) => {
  toast.value = { type, message }
  setTimeout(() => {
    toast.value = null
  }, 3000)
}

/* ================= FETCH DETAIL ================= */
const fetchDetail = async () => {
  const data = await getPartner(route.params.id as string)

  form.value.name = data.name
  form.value.website = data.website ?? ''
  form.value.sort_order = data.sort_order ?? 0
  form.value.is_active = data.is_active
  form.value.logo_preview = data.logo ?? ''
}

/* ================= SUBMIT ================= */
const submit = async () => {
  loading.value = true
  try {
    const data = new FormData()

    data.append('name', form.value.name)
    data.append('website', form.value.website)
    data.append('sort_order', String(form.value.sort_order))
    data.append('is_active', form.value.is_active ? '1' : '0')

    if (form.value.logo) {
      data.append('logo', form.value.logo)
    }

    if (isEdit) {
      await updatePartner(route.params.id as string, data)
      showToast('success', 'Cập nhật đối tác thành công')
    } else {
      await createPartner(data)
      showToast('success', 'Thêm đối tác thành công')
    }

    setTimeout(() => {
      router.push({ name: 'admin-partners' })
    }, 800)
  } catch (e: any) {
    showToast(
        'error',
        e?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại',
    )
  } finally {
    loading.value = false
  }
}

/* ================= LIFECYCLE ================= */
onMounted(() => {
  if (isEdit) fetchDetail()
})
</script>

<template>
  <div class="p-6 max-w-2xl relative">
    <!-- TOAST -->
    <div
        v-if="toast"
        class="absolute right-6 top-6 z-50 rounded px-4 py-2 text-white shadow"
        :class="toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'"
    >
      {{ toast.message }}
    </div>

    <h1 class="mb-6 text-2xl font-bold">
      {{ isEdit ? 'Sửa đối tác' : 'Thêm đối tác' }}
    </h1>

    <form @submit.prevent="submit" class="space-y-5">
      <!-- NAME -->
      <input
          v-model="form.name"
          placeholder="Tên đối tác"
          class="w-full rounded border p-2"
          required
      />

      <!-- WEBSITE -->
      <input
          v-model="form.website"
          placeholder="Website"
          class="w-full rounded border p-2"
      />

      <!-- SORT -->
      <input
          v-model.number="form.sort_order"
          type="number"
          placeholder="Thứ tự hiển thị"
          class="w-full rounded border p-2"
      />

      <!-- ACTIVE -->
      <label class="flex items-center gap-2">
        <input type="checkbox" v-model="form.is_active" />
        Hiển thị
      </label>

      <!-- LOGO -->
      <input
          type="file"
          accept="image/*"
          @change="onLogoChange"
      />

      <img
          v-if="logoPreview"
          :src="logoPreview"
          class="mt-2 h-24 rounded object-cover"
      />

      <!-- PREVIEW -->
      <img
          v-if="form.logo_preview"
          :src="getImageUrl(form.logo_preview)"
          class="h-24 rounded border object-contain bg-white"
      />

      <!-- SUBMIT -->
      <button
          :disabled="loading"
          class="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {{ loading ? 'Đang lưu...' : 'Lưu' }}
      </button>
    </form>
  </div>
</template>
