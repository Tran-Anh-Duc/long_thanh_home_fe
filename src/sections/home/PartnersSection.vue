<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPartners, type Partner } from '@/api/partner.api'
import { getImageUrl } from '@/utils/image'

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

onMounted(fetchPartners)
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Title -->
      <h2 class="text-center text-3xl font-bold">
        Đối tác của chúng tôi
      </h2>

      <p class="mx-auto mt-3 max-w-2xl text-center text-gray-600">
        Chúng tôi hợp tác cùng các chủ đầu tư, đơn vị phát triển và thương hiệu
        bất động sản uy tín trên toàn quốc
      </p>

      <!-- Loading -->
      <div v-if="loading" class="mt-12 text-center text-gray-500">
        Đang tải dữ liệu...
      </div>

      <!-- Logo Grid -->
      <div
          v-else
          class="mt-12 grid grid-cols-2 gap-8
               items-center
               sm:grid-cols-3
               md:grid-cols-4"
      >
        <a
            v-for="partner in partners"
            :key="partner.id"
            :href="partner.website || 'javascript:void(0)'"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-center
                 rounded-xl bg-white p-6
                 shadow-sm transition-all duration-300
                 hover:shadow-md"
        >
          <img
              v-if="partner.logo"
              :src="getImageUrl(partner.logo)"
              :alt="partner.name"
              class="max-h-10 w-auto object-contain
                   opacity-70 transition-all duration-300
                   group-hover:opacity-100"
          />

          <span
              v-else
              class="text-sm font-semibold text-gray-500"
          >
            {{ partner.name }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
