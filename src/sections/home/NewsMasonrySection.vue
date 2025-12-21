<script setup lang="ts">
import { newsList } from './mock/news'
</script>

<template>
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Title -->
      <h2 class="text-center text-3xl font-bold mb-12">
        Tin tức & cập nhật
      </h2>

      <!-- Masonry -->
      <div
          class="columns-1 sm:columns-2 lg:columns-3 gap-6
               [column-fill:_balance]"
      >
        <article
            v-for="item in newsList"
            :key="item.id"
            class="mb-6 break-inside-avoid
                 rounded-xl bg-white shadow
                 hover:shadow-xl transition-shadow"
        >
          <!-- Image -->
          <div class="overflow-hidden rounded-t-xl">
            <img
                :src="item.image"
                :alt="item.title"
                class="w-full object-cover
                     transition-transform duration-500
                     hover:scale-105"
            />
          </div>

          <!-- Content -->
          <div class="p-5">
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span
                  class="rounded-full bg-blue-100 px-2 py-0.5
                       text-blue-600"
              >
                {{ item.category }}
              </span>
              <span>{{ item.date }}</span>
            </div>

            <h3 class="mt-3 font-semibold leading-snug">
              {{ item.title }}
            </h3>

            <p class="mt-2 text-sm text-gray-600">
              {{ item.excerpt }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
