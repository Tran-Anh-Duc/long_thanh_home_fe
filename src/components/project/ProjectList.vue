<template>
  <div class="grid">
    <ProjectCard
        v-for="item in projects"
        :key="item.id"
        :project="item"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectCard from './ProjectCard.vue'
import type { Project } from '@/types/project'

// 👉 đổi true / false để bật API thật
const USE_API = false

const projects = ref<Project[]>([])

onMounted(async () => {
  if (USE_API) {
    const { getProjects } = await import('@/api/project.api')
    projects.value = await getProjects()
  } else {
    const { mockProjects } = await import('@/mocks/projects.mock')
    projects.value = mockProjects
  }
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
</style>
