<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getImageUrl } from '@/utils/image'
import { getNews } from '@/api/news.api'

/* ================= TYPES ================= */
interface NewsItem {
  id: number
  title: string
  thumbnail?: string | null
  excerpt?: string | null
  published_at?: string | null
  category?: {
    id: number
    name: string
  } | null
}

/* ================= STATE ================= */
const newsList = ref<NewsItem[]>([])
const loading = ref(false)

/* ================= API ================= */
const fetchNews = async () => {
  loading.value = true
  try {
    newsList.value = await getNews()
  } finally {
    loading.value = false
  }
}

/* ================= LIFECYCLE ================= */
onMounted(fetchNews)
</script>

<template>
  <section class="bg-gray-50 py-20">
    <div class="mx-auto max-w-7xl px-4">
      <!-- Title -->
      <h2 class="mb-12 text-center text-3xl font-bold">
        Tin tức & cập nhật
      </h2>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500">
        Đang tải tin tức...
      </div>

      <!-- Masonry -->
      <div
          v-else
          class="columns-1 gap-6
               sm:columns-2
               lg:columns-3
               [column-fill:_balance]"
      >
        <router-link
            v-for="item in newsList"
            :key="item.id"
            :to="{ name: 'news-detail', params: { id: item.id } }"
            class="mb-6 block break-inside-avoid"
        >
          <article
              class="rounded-xl bg-white shadow
                   transition-shadow hover:shadow-xl
                   flex flex-col h-[420px]"
          >
            <!-- Image -->
            <div class="h-[220px] overflow-hidden rounded-t-xl">
              <img
                  :src="getImageUrl(item.thumbnail)"
                  :alt="item.title"
                  loading="lazy"
                  class="h-full w-full object-cover
                       transition-transform duration-500
                       hover:scale-105"
              />
            </div>

            <!-- Content -->
            <div class="flex flex-1 flex-col p-5">
              <div class="flex items-center justify-between text-xs text-gray-500">
                <span
                    v-if="item.category"
                    class="rounded-full bg-blue-100 px-2 py-0.5 text-blue-600"
                >
                  {{ item.category.name }}
                </span>
                <span>{{ item.published_at }}</span>
              </div>

              <h3 class="mt-3 font-semibold leading-snug line-clamp-2">
                {{ item.title }}
              </h3>

              <p
                  v-if="item.excerpt"
                  class="mt-2 text-sm text-gray-600 line-clamp-3"
              >
                {{ item.excerpt }}
              </p>
            </div>
          </article>
        </router-link>
      </div>
    </div>
  </section>
</template>
