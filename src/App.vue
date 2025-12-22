<script setup lang="ts">
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'

const toast = useToast()
</script>

<template>
  <router-view />

  <Toast
      :show="toast.show.value"
      :message="toast.message.value"
      :type="toast.type.value"
  />
</template>
