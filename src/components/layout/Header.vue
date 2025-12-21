<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header
      :class="[
      'sticky top-0 z-50 bg-white transition-all duration-300',
      scrolled ? 'shadow-sm' : ''
    ]"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex h-16 items-center justify-between">
        <!-- LOGO + BRAND -->
        <div
            class="group flex items-center gap-3 cursor-pointer
                 transition-transform duration-300
                 hover:-translate-y-0.5"
        >
          <img
              src="/images/logo.png"
              alt="Long Thanh Home"
              class="h-10 w-auto transition-transform duration-300
                   group-hover:scale-105"
          />

          <div
              class="text-base font-semibold text-gray-900
                   tracking-wide
                   transition-colors duration-300
                   group-hover:text-green-700"
          >
            Long Thanh Home
          </div>
        </div>

        <!-- MENU -->
        <nav class="hidden md:flex items-center gap-8">
          <!-- Active -->
          <a
              href="#"
              class="relative text-sm font-medium text-green-700
                   after:absolute after:left-0 after:-bottom-1
                   after:h-[2px] after:w-full after:bg-green-600"
          >
            Trang chủ
          </a>

          <!-- Normal -->
          <a
              v-for="item in ['Giới thiệu','Dịch vụ','Dự án','Tin tức','Liên hệ']"
              :key="item"
              href="#"
              class="relative text-sm font-medium text-gray-700
                   transition-all duration-200
                   hover:text-green-700
                   after:absolute after:left-0 after:-bottom-1
                   after:h-[2px] after:w-0 after:bg-green-600
                   after:transition-all after:duration-300
                   hover:after:w-full"
          >
            {{ item }}
          </a>
        </nav>

        <!-- CTA -->
        <div class="flex items-center gap-4">
          <a
              href="#contact"
              class="hidden md:inline-flex items-center
                   rounded-full bg-green-600
                   px-5 py-2 text-sm font-semibold text-white
                   transition-all duration-300
                   hover:bg-green-700
                   hover:-translate-y-0.5
                   hover:shadow-md"
          >
            Nhận tư vấn
          </a>

          <!-- Mobile -->
          <button
              class="md:hidden text-gray-700 text-xl
                   transition-transform duration-200
                   hover:scale-110"
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
