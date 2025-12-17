<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <!-- Title -->
      <h2 class="mb-8 text-center text-2xl font-bold uppercase">
        DỰ ÁN NỔI BẬT
      </h2>

      <!-- Tabs (GRID - KHÔNG BAO GIỜ BỊ ĐẨY) -->
      <div class="mb-10 flex justify-center gap-2">
        <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.slug"
            class="w-[260px] rounded-lg border border-primary
         px-5 py-2 text-sm font-semibold
         bg-white text-primary
         cursor-pointer
         transition-all duration-300 ease-out

         hover:bg-gray-100
         hover:border-emerald-400
         hover:ring-2 hover:ring-emerald-300/40

         active:bg-gray-200
         active:border-emerald-500

         focus-visible:outline-none
         focus-visible:ring-2 focus-visible:ring-emerald-400/40"
        >
          {{ category.name.toUpperCase() }}
        </button>

      </div>
      <!-- Project grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Empty state -->
        <div
            v-if="filteredProjects.length === 0"
            class="col-span-full text-center text-gray-500"
        >
          Chưa có dự án phù hợp
        </div>

        <!-- Project cards -->
        <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="overflow-hidden rounded border transition hover:shadow-lg"
        >
          <img
              :src="project.thumbnail"
              class="h-48 w-full object-cover"
              alt=""
          />
          <div class="p-4">
            <h3 class="mb-1 text-base font-semibold">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ project.location }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectCategories } from './mock/projectCategories'
import { projects } from './mock/projects'

type CategorySlug = 'all' | string

const categories = Object.freeze([
  { id: 0, name: 'Tất cả', slug: 'all' },
  ...projectCategories,
])

const activeCategory = ref<CategorySlug>('all')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects
  return projects.filter(p => p.categorySlug === activeCategory.value)
})
</script>
