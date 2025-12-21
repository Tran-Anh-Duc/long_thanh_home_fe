<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { coreValues } from './mock/coreValues'
import Icon from '@/components/shared/Icon.vue'

const values = coreValues
const show = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
  )

  const el = document.getElementById('core-values')
  if (el) observer.observe(el)
})
</script>


<template>
  <section
      id="core-values"
      class="bg-white py-20 transition-all duration-700 ease-out"
      :class="show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
  >
    <div class="max-w-7xl mx-auto px-6">
      <div
          class="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
            v-for="item in values"
            :key="item.id"
            class="group flex flex-col items-center
                 transition-all duration-500
                 hover:-translate-y-2"
        >
          <!-- Icon -->
          <div
              class="mb-5 flex h-16 w-16 items-center justify-center
                   rounded-full bg-primary/10
                   transition-all duration-500
                   group-hover:bg-primary/20
                   group-hover:scale-110"
          >
            <Icon
                :name="item.icon"
                class="text-primary transition-transform duration-500
                     group-hover:scale-110"
                :size="28"
            />
          </div>

          <!-- Title -->
          <h3
              class="mb-3 text-lg font-semibold text-gray-900
                   transition-colors duration-300
                   group-hover:text-primary"
          >
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm leading-relaxed text-gray-600">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

