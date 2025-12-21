<script setup lang="ts">
import { ref, computed } from 'vue'
import { projectCategories } from './mock/projectCategories'
import { projects } from './mock/projects'

type CategorySlug = 'all' | string

const categories = [
  { id: 0, name: 'Tất cả', slug: 'all' },
  ...projectCategories,
]

const activeCategory = ref<CategorySlug>('all')

const filteredProjects = computed(() => {
  if (!Array.isArray(projects)) return []

  if (activeCategory.value === 'all') return projects

  return projects.filter(
      p => p.categorySlug === activeCategory.value
  )
})
</script>

<template>
  <section class="bg-white py-20">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Title -->
      <h2 class="mb-10 text-center text-2xl md:text-3xl font-bold uppercase">
        DỰ ÁN NỔI BẬT
      </h2>

      <!-- Tabs -->
      <div class="mb-12 flex flex-wrap justify-center gap-3">
        <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.slug"
            :class="[
            'rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300',
            activeCategory === category.slug
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-400 hover:text-emerald-600'
          ]"
        >
          {{ category.name }}
        </button>
      </div>

      <!-- Project grid -->
      <transition-group
          name="fade-up"
          tag="div"
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <!-- Empty -->
        <div
            v-if="filteredProjects.length === 0"
            key="empty"
            class="col-span-full text-center text-gray-500"
        >
          Chưa có dự án phù hợp
        </div>

        <!-- Card -->
        <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group relative overflow-hidden rounded-2xl bg-white
                 border border-gray-200
                 transition-all duration-500
                 hover:-translate-y-1 hover:shadow-xl"
        >
          <!-- Image -->
          <div class="relative h-56 overflow-hidden">
            <img
                :src="project.thumbnail"
                alt=""
                class="h-full w-full object-cover
                     transition-transform duration-700
                     group-hover:scale-110"
            />

            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-gradient-to-t
                     from-black/50 via-black/20 to-transparent
                     opacity-0 transition-opacity duration-500
                     group-hover:opacity-100"
            ></div>

            <!-- Badge -->
            <span
                class="absolute left-4 top-4 rounded-full
                     bg-emerald-600/90 px-3 py-1
                     text-xs font-semibold text-white"
            >
              NOXH
            </span>
          </div>

          <!-- Content -->
          <div class="p-5">
            <h3 class="mb-1 text-base font-semibold text-gray-900">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ project.location }}
            </p>

            <!-- Action -->
            <div class="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600">
              Xem chi tiết
              <span class="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </section>
</template>
