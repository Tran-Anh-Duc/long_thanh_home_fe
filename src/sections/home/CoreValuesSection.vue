<template>
  <section class="bg-white py-16">
    <div class="container mx-auto px-4">
      <div
          class="grid grid-cols-1 gap-10 text-center sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
            v-for="item in values"
            :key="item.id"
            class="flex flex-col items-center"
        >
          <!-- Icon -->
          <div
              class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
          >
            <Icon :name="item.icon" class="text-primary" size="28" />
          </div>

          <!-- Title -->
          <h3 class="mb-2 text-lg font-semibold text-gray-900">
            {{ item.title }}
          </h3>

          <!-- Description -->
          <p class="text-sm leading-relaxed text-gray-600">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { coreValues } from './mock/coreValues'
import Icon from '@/components/shared/Icon.vue'

const values = coreValues
</script>
