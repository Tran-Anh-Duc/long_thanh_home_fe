<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getImageUrl } from '@/utils/image'

/* ✅ API ĐÚNG – DÙNG LẠI CÁI BẠN ĐÃ CÓ */
import { getProject } from '@/api/project.api'
import { getProjectDetailsByProject } from '@/api/projectDetail.api'

import type { Project } from '@/types/project'
import type { ProjectDetail } from '@/types/projectDetail'

/* ================= STATE ================= */
const route = useRoute()

const project = ref<Project | null>(null)
const details = ref<ProjectDetail[]>([])
const loading = ref(false)

const projectId = computed(() => Number(route.params.id))

/* ================= FETCH ================= */
const fetchData = async () => {
  loading.value = true
  try {
    project.value = await getProject(projectId.value)
    details.value = await getProjectDetailsByProject(projectId.value)
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>

<template>
  <section class="bg-gray-50 py-10">
    <div class="mx-auto max-w-6xl px-4">
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
            <router-link to="/projects" class="hover:text-emerald-600">
              Dự án
            </router-link>
          </li>
          <li>›</li>
          <li class="font-medium text-gray-700">
            {{ project?.title }}
          </li>
        </ol>
      </nav>

      <!-- Loading -->
      <div v-if="loading" class="py-20 text-center text-gray-500">
        Đang tải chi tiết dự án...
      </div>

      <!-- Content -->
      <div v-else-if="project">
        <!-- Project header -->
        <div class="mb-8 overflow-hidden rounded-2xl bg-white shadow">
          <img
              v-if="project.thumbnail"
              :src="getImageUrl(project.thumbnail)"
              :alt="project.title"
              class="h-[380px] w-full object-cover"
          />

          <div class="p-6">
            <h1 class="mb-2 text-3xl font-bold">
              {{ project.title }}
            </h1>
            <p class="text-gray-500">
              {{ project.location }}
            </p>
          </div>
        </div>

        <!-- Project description -->
        <div
            v-if="project.description"
            class="mb-10 rounded-2xl bg-white p-6 shadow prose max-w-none"
            v-html="project.description"
        />

        <!-- Project details (HIỂN THỊ HẾT – KHÔNG CLICK) -->

      </div>

      <!-- Empty --><!-- Project details -->
      <div v-if="details.length" class="space-y-10">
        <!-- Project details -->
        <!-- Project details: Timeline -->
        <div v-if="details.length" class="mt-16">
          <h2 class="mb-10 text-2xl font-bold">
            Lộ trình & giai đoạn dự án
          </h2>

          <div class="relative space-y-10">
            <!-- Vertical line -->
            <div class="absolute left-6 top-0 h-full w-px bg-emerald-200"></div>

            <div
                v-for="(item, index) in details"
                :key="item.id"
                class="relative flex gap-8"
            >
              <!-- Step number -->
              <div class="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center
                  rounded-full bg-emerald-600 text-white font-bold shadow">
                {{ index + 1 }}
              </div>

              <!-- Content card -->
              <div class="flex-1 rounded-2xl bg-white p-6 shadow space-y-5">
                <!-- Title -->
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ item.title }}
                </h3>

                <!-- Type badge -->
                <span
                    v-if="item.type"
                    class="inline-block rounded-full bg-emerald-100
                 px-3 py-1 text-xs font-semibold text-emerald-700"
                >
          {{ item.type }}
        </span>

                <!-- Thumbnail -->
                <img
                    v-if="item.thumbnail"
                    :src="getImageUrl(item.thumbnail)"
                    :alt="item.title"
                    class="mt-4 w-full rounded-xl object-cover"
                />

                <!-- Summary -->
                <div
                    v-if="item.summary"
                    class="rounded-lg bg-gray-50 p-4 text-gray-700"
                >
                  {{ item.summary }}
                </div>

                <!-- Description -->
                <div
                    v-if="item.description"
                    class="prose max-w-none"
                    v-html="item.description"
                />

                <!-- SEO (ẩn nhẹ, không gây nhiễu) -->
                <div
                    v-if="item.meta"
                    class="mt-6 border-t pt-4 text-sm text-gray-500"
                >
                  <div class="font-semibold text-gray-700 mb-1">
                    Thông tin SEO
                  </div>
                  <div v-if="item.meta.seo_title">
                    <strong>Title:</strong> {{ item.meta.seo_title }}
                  </div>
                  <div v-if="item.meta.seo_description">
                    <strong>Description:</strong> {{ item.meta.seo_description }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div v-else class="py-20 text-center text-gray-500">
        Không tìm thấy dự án
      </div>
    </div>
  </section>
</template>
