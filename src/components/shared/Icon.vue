<template>
  <component :is="icon" :size="size" />
</template>

<script setup lang="ts">
import {
  Handshake,
  Users,
  Heart,
  TrendingUp,
} from 'lucide-vue-next'

const props = defineProps<{
  name: string
  size?: number
}>()

const icons: Record<string, any> = {
  handshake: Handshake,
  users: Users,
  heart: Heart,
  'trending-up': TrendingUp,
}

const icon = icons[props.name]
</script>
