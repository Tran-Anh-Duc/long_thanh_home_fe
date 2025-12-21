<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { services } from './mock/services'

const current = ref(0)
const total = services.length

let timer: number | undefined

const startAutoSlide = () => {
  stopAutoSlide()
  timer = window.setInterval(() => {
    next()
  }, 4000) // 4s
}

const stopAutoSlide = () => {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

const next = () => {
  current.value = (current.value + 1) % total
  startAutoSlide()
}

const prev = () => {
  current.value = (current.value - 1 + total) % total
  startAutoSlide()
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  stopAutoSlide()
})

</script>

<template>
  <section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-center text-2xl md:text-3xl font-bold mb-10">
        DỊCH VỤ CỦA CHÚNG TÔI
      </h2>

      <div class="relative">
        <!-- VIEWPORT -->
        <div class="overflow-hidden">
          <!-- SLIDER -->
          <div
              class="flex transition-transform duration-[1200ms] ease-out"
              :style="{ transform: `translateX(-${current * 100}%)` }"
          >
            <!-- SLIDE -->
            <div
                v-for="(slide, slideIndex) in services"
                :key="slideIndex"
                class="min-w-full grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              <!-- ITEM -->
              <div
                  v-for="item in slide"
                  :key="item.id"
                  class="bg-white rounded-lg shadow p-4"
              >
                <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-[280px] object-cover rounded-md"
                />

                <h3 class="mt-4 text-center font-semibold">
                  {{ item.title }}
                </h3>

                <p class="mt-2 text-sm text-center text-gray-600">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- PREV -->
        <button
            @click="prev"
            class="absolute left-[-20px] top-1/2 -translate-y-1/2
                 z-10 bg-white border rounded-full w-10 h-10
                 flex items-center justify-center shadow
                 hover:bg-gray-100"
        >
          ‹
        </button>

        <!-- NEXT -->
        <button
            @click="next"
            class="absolute right-[-20px] top-1/2 -translate-y-1/2
                 z-10 bg-white border rounded-full w-10 h-10
                 flex items-center justify-center shadow
                 hover:bg-gray-100"
        >
          ›
        </button>
      </div>
    </div>
  </section>
</template>
