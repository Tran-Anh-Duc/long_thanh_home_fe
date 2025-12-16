<template>
  <Header />
  <main>
    <slot />
  </main>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
</script>
