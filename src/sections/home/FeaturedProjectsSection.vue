<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getImageUrl } from '@/utils/image'
import { getProjects } from '@/api/project.api'
import { getProjectCategories } from '@/api/projectCategory.api'
import type { Project } from '@/types/project'

/* ================= TYPES ================= */
type CategorySlug = 'all' | string

interface ProjectCategory {
  id: number
  name: string
  slug: string
}

/* ================= STATE ================= */
const categories = ref<ProjectCategory[]>([
  { id: 0, name: 'Tất cả', slug: 'all' },
])

const projects = ref<Project[]>([])
const activeCategory = ref<CategorySlug>('all')
const loading = ref(false)

/* ================= API ================= */
const fetchCategories = async () => {
  const data = await getProjectCategories()
  categories.value = [
    { id: 0, name: 'Tất cả', slug: 'all' },
    ...data,
  ]
}

const fetchProjects = async () => {
  loading.value = true
  try {
    projects.value = await getProjects()
  } finally {
    loading.value = false
  }
}

/* ================= COMPUTED ================= */
const filteredProjects = computed(() => {
  if (activeCategory.value === 'all') return projects.value

  return projects.value.filter(
      (p) => p.project_category?.slug === activeCategory.value,
  )
})

/* ================= LIFECYCLE ================= */
onMounted(async () => {
  await fetchCategories()
  await fetchProjects()
})
</script>

<template>
  <section class="bg-white py-20">
    <div class="mx-auto max-w-7xl px-6">
      <!-- Title -->
      <h2 class="mb-10 text-center text-2xl font-bold uppercase md:text-3xl">
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
              : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-400 hover:text-emerald-600',
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
        <!-- Loading -->
        <div
            v-if="loading"
            key="loading"
            class="col-span-full text-center text-gray-400"
        >
          Đang tải dữ liệu...
        </div>

        <!-- Empty -->
        <div
            v-else-if="filteredProjects.length === 0"
            key="empty"
            class="col-span-full text-center text-gray-500"
        >
          Chưa có dự án phù hợp
        </div>

        <!-- Card -->
        <router-link
            v-for="project in filteredProjects"
            :key="project.id"
            :to="{ name: 'project-detail', params: { id: project.id } }"
            class="group relative block
         overflow-hidden rounded-2xl bg-white
         border border-gray-200
         transition-all duration-500
         hover:-translate-y-1 hover:shadow-xl"
        >
          <!-- Image -->
          <div class="relative h-56 overflow-hidden">
            <img
                :src="getImageUrl(project.thumbnail)"
                :alt="project.title"
                loading="lazy"
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
                v-if="project.project_category"
                class="absolute left-4 top-4 rounded-full
                     px-3 py-1 text-xs font-semibold text-white"
                :class="{
                'bg-emerald-600/90': project.project_category.slug === 'noxh',
                'bg-blue-600/90': project.project_category.slug === 'commercial',
                'bg-orange-600/90': project.project_category.slug === 'land',
              }"
            >
              {{ project.project_category.name }}
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
            <div
                class="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600"
            >
              Xem chi tiết
              <span
                  class="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </div>
        </router-link>
      </transition-group>
    </div>
  </section>
</template>

<style scoped>
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-enter-active {
  transition: all 0.5s ease;
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-leave-active {
  transition: all 0.4s ease;
}
</style>
