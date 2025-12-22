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
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Title -->
      <h2 class="mb-4 text-center text-2xl font-bold uppercase md:text-3xl">
        Đối tác của chúng tôi
      </h2>

      <p class="mb-12 text-center text-gray-500">
        Chúng tôi hợp tác cùng các chủ đầu tư, đơn vị phát triển và thương hiệu bất động sản uy tín
      </p>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500">
        Đang tải dữ liệu...
      </div>

      <!-- Logo grid -->
      <div
          v-else
          class="grid grid-cols-2 gap-6
               sm:grid-cols-3
               md:grid-cols-4
               lg:grid-cols-6"
      >
        <a
            v-for="item in partners"
            :key="item.id"
            :href="item.website || 'javascript:void(0)'"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-center
                 rounded-xl border border-gray-200
                 bg-white p-6
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:border-emerald-400
                 hover:shadow-lg"
        >
          <img
              v-if="item.logo"
              :src="getImageUrl(item.logo)"
              :alt="item.name"
              class="max-h-14 object-contain
                   grayscale transition-all duration-300
                   group-hover:grayscale-0"
          />
          <span
              v-else
              class="text-sm font-semibold text-gray-500"
          >
            {{ item.name }}
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
