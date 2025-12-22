<script setup lang="ts">
defineProps<{
  show: boolean
  message: string
  type: 'success' | 'error' | 'info' | 'loading'
}>()
</script>

<template>
  <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 scale-95"
  >
    <div
        v-if="show && message"
        class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- popup -->
      <div
          class="relative z-10 min-w-[320px] rounded-lg bg-white px-6 py-5 text-center shadow-xl"
      >
        <div class="mb-3 text-3xl">
          <span v-if="type === 'success'">✅</span>
          <span v-else-if="type === 'error'">❌</span>
          <span v-else-if="type === 'loading'">⏳</span>
          <span v-else>ℹ️</span>
        </div>

        <p class="text-base font-medium text-gray-800">
          {{ message }}
        </p>
      </div>
    </div>
  </transition>
</template>
