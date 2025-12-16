<template>
  <DefaultLayout>
    <HeroSection />
    <FeaturedProjects />
    <RegionsSection />
    <CTASection />
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/sections/home/HeroSection.vue'
import FeaturedProjects from '@/sections/home/FeaturedProjects.vue'
import RegionsSection from '@/sections/home/RegionsSection.vue'
import CTASection from '@/sections/home/CTASection.vue'
</script>
