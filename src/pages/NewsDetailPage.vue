<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getImageUrl } from '@/utils/image'
import { getNewsDetail } from '@/api/news.api'
import type { News } from '@/types/news'
import type { NewsDetail } from '@/api/news.api'

const route = useRoute()
const router = useRouter()

const news = ref<News | null>(null)
const loading = ref(false)

const newsId = computed(() => Number(route.params.id))

const fetchData = async () => {
  loading.value = true
  try {
    const news = ref<NewsDetail | null>(null)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <section class="bg-gray-50 py-10">
    <div class="mx-auto max-w-4xl px-4">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm text-gray-500">
        <ol class="flex flex-wrap items-center gap-2">
          <li>
            <router-link to="/" class="hover:text-emerald-600">
              Trang chủ
            </router-link>
          </li>
          <li>›</li>
          <li>
            <router-link to="/news" class="hover:text-emerald-600">
              Tin tức
            </router-link>
          </li>
          <li>›</li>
          <li class="font-medium text-gray-700 line-clamp-1">
            {{ news?.title }}
          </li>
        </ol>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="py-20 text-center text-gray-500">
        Đang tải bài viết...
      </div>

      <!-- Content -->
      <article
          v-else-if="news"
          class="overflow-hidden rounded-2xl bg-white shadow"
      >
        <!-- Cover -->
        <img
            v-if="news.thumbnail"
            :src="getImageUrl(news.thumbnail)"
            :alt="news.title"
            class="h-[420px] w-full object-cover"
        />

        <div class="p-6 md:p-8">
          <!-- Category -->
          <span
              v-if="news.category"
              class="mb-3 inline-block rounded-full
                   bg-emerald-100 px-3 py-1
                   text-xs font-semibold text-emerald-700"
          >
            {{ news.category.name }}
          </span>

          <!-- Title -->
          <h1 class="mb-4 text-3xl font-bold leading-tight">
            {{ news.title }}
          </h1>

          <!-- Meta -->
          <div class="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span v-if="news.published_at">
              🕒 {{ news.published_at }}
            </span>
            <span>
              👁️ Tin tức
            </span>
          </div>

          <!-- Summary -->
          <div
              v-if="news.summary"
              class="mb-8 border-l-4 border-emerald-500
                   bg-emerald-50 p-4 text-gray-700 italic"
          >
            {{ news.summary }}
          </div>

          <!-- Content -->
          <div
              class="prose max-w-none prose-img:rounded-xl
                   prose-h2:mt-10 prose-h2:font-bold
                   prose-p:leading-relaxed"
              v-html="news.content"
          />

          <!-- Divider -->
          <div class="my-10 h-px bg-gray-200"></div>

          <!-- Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4">
            <button
                @click="router.push('/')"
                class="text-sm font-semibold text-emerald-600 hover:underline"
            >
              ← Quay lại danh sách tin
            </button>

            <!-- Share (placeholder) -->
            <div class="flex items-center gap-3 text-sm text-gray-500">
              <span>Chia sẻ:</span>
              <button class="hover:text-emerald-600">Facebook</button>
              <button class="hover:text-emerald-600">Zalo</button>
            </div>
          </div>
        </div>
      </article>

      <!-- Empty -->
      <div v-else class="py-20 text-center text-gray-500">
        Không tìm thấy bài viết
      </div>
    </div>
  </section>
</template>
