<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPartners, type Partner } from '@/api/partner.api'
import request from '@/api/request'
import { getImageUrl } from '@/utils/image'

const router = useRouter()
const partners = ref<Partner[]>([])
const loading = ref(false)

const fetchPartners = async () => {
  loading.value = true
  try {
    partners.value = await getPartners()
  } finally {
    loading.value = false
  }
}

const deletePartner = async (id: number) => {
  if (!confirm('Xoá đối tác này?')) return
  await request.delete(`/partners/${id}`)
  fetchPartners()
}

onMounted(fetchPartners)
</script>

<template>
  <div class="p-6">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Đối tác</h1>

      <button
          @click="router.push({ name: 'admin-partner-create' })"
          class="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
      >
        + Thêm đối tác
      </button>
    </div>

    <div v-if="loading" class="text-gray-500">
      Đang tải dữ liệu...
    </div>

    <table
        v-else
        class="w-full overflow-hidden rounded bg-white shadow"
    >
      <thead class="bg-gray-100 text-left text-sm">
      <tr>
        <th class="p-3">Logo</th>
        <th class="p-3">Tên</th>
        <th class="p-3">Website</th>
        <th class="p-3">Thứ tự</th>
        <th class="p-3 text-right">Hành động</th>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="item in partners"
          :key="item.id"
          class="border-t text-sm"
      >
        <td class="p-3">
          <img
              v-if="item.logo"
              :src="getImageUrl(item.logo)"
              class="h-8 object-contain"
          />
        </td>

        <td class="p-3 font-medium">
          {{ item.name }}
        </td>

        <td class="p-3">
          <a
              v-if="item.website"
              :href="item.website"
              target="_blank"
              class="text-emerald-600 hover:underline"
          >
            {{ item.website }}
          </a>
        </td>

        <td class="p-3">
          {{ item.sort_order }}
        </td>

        <td class="p-3 text-right space-x-2">
          <button
              @click="router.push({ name: 'admin-partner-edit', params: { id: item.id } })"
              class="text-blue-600 hover:underline"
          >
            Sửa
          </button>
          <button
              @click="deletePartner(item.id)"
              class="text-red-600 hover:underline"
          >
            Xoá
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
