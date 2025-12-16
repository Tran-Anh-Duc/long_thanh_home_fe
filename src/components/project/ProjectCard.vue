<template>
  <div class="project-card">
    <img :src="project.thumbnail" alt="" />
    <div class="content">
      <h3>{{ project.name }}</h3>
      <p class="location">{{ project.location }}</p>
      <p class="price" v-if="project.price">{{ project.price }}</p>
      <RouterLink :to="`/projects/${project.id}`">Xem chi tiết</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types/project'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.project-card {
  border: 1px solid #eee;
  overflow: hidden;
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
}
.price {
  color: #d60000;
  font-weight: bold;
}
</style>
