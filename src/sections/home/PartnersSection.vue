<script setup lang="ts">
import { partners } from './mock/partners'
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Title -->
      <h2 class="text-center text-3xl font-bold">
        Đối tác của chúng tôi
      </h2>

      <p class="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
        Chúng tôi hợp tác cùng các chủ đầu tư, đơn vị phát triển và thương hiệu
        bất động sản uy tín trên toàn quốc
      </p>

      <!-- Logo Grid -->
      <div
          class="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 items-center"
      >
        <a
            v-for="partner in partners"
            :key="partner.id"
            :href="partner.website"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-center
                 rounded-xl bg-white p-6
                 shadow-sm hover:shadow-md
                 transition-all duration-300"
        >
          <img
              :src="partner.logo"
              :alt="partner.name"
              class="max-h-10 w-auto object-contain
         opacity-70 transition-all duration-300
         group-hover:opacity-100"
          />
        </a>
      </div>
    </div>
  </section>
</template>
