<template>
  <div class="project-card">
    <img
        :src="project.thumbnail || fallbackImage"
        :alt="project.title"
    />

    <div class="content">
      <h3>{{ project.title }}</h3>

      <p class="location" v-if="project.location">
        {{ project.location }}
      </p>

      <p class="price" v-if="project.price_from">
        Từ {{ formatPrice(project.price_from) }} đ
      </p>

      <RouterLink :to="`/projects/${project.slug}`">
        Xem chi tiết
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types/project'

defineProps<{
  project: Project
}>()

const fallbackImage =
    'https://via.placeholder.com/400x250?text=No+Image'

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN')
}
</script>

<style scoped>
.project-card {
  border: 1px solid #eee;
  overflow: hidden;
  border-radius: 6px;
}

.project-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.content {
  padding: 12px;
}

.location {
  color: #666;
  font-size: 14px;
}

.price {
  color: #d60000;
  font-weight: bold;
  margin: 6px 0;
}
</style>
