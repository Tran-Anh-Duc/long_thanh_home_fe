<template>
  <section class="relative h-[70vh] w-full overflow-hidden">
    <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 transition-opacity duration-700"
        :class="index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'"
    >
      <!-- Image -->
      <img
          :src="slide.image"
          class="h-full w-full object-cover"
          alt=""
      />

      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Content -->
      <div class="absolute inset-0 flex items-center">
        <div class="container mx-auto px-4">
          <div class="max-w-xl text-white">
            <h1 class="mb-4 text-4xl font-bold">
              {{ slide.title }}
            </h1>
            <p class="mb-6 text-lg text-gray-200">
              {{ slide.subtitle }}
            </p>
            <RouterLink
                :to="slide.ctaLink"
                class="inline-block rounded bg-primary px-6 py-3 font-semibold"
            >
              {{ slide.ctaText }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Dots -->
    <div class="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
      <button
          v-for="(_, i) in slides"
          :key="i"
          class="h-2.5 w-2.5 rounded-full"
          :class="i === currentIndex ? 'bg-white' : 'bg-white/50'"
          @click="setSlide(i)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { heroSlides, type HeroSlide } from './mock/heroSlider'

/** ✅ khai báo slides có type rõ ràng */
const slides = heroSlides as HeroSlide[]

/** ✅ ref có kiểu number */
const currentIndex = ref<number>(0)

let timer: number | undefined

const setSlide = (index: number) => {
  currentIndex.value = index
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length
}

onMounted(() => {
  timer = window.setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
