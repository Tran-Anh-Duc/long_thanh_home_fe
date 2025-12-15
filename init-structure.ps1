# ===== FOLDERS =====
$folders = @(
  "src/api",
  "src/components",
  "src/layouts",
  "src/views",
  "src/router",
  "src/assets/images",
  "src/assets/styles"
)

foreach ($f in $folders) {
  New-Item -ItemType Directory -Force -Path $f | Out-Null
}

# ===== FILES =====
$files = @{
  "src/api/request.ts" = @"
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
})

export default request
"@

  "src/layouts/DefaultLayout.vue" = @"
<template>
  <Header />
  <slot />
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
"@

  "src/components/Header.vue" = @"
<template>
  <header class='header'>Header</header>
</template>
"@

  "src/components/Footer.vue" = @"
<template>
  <footer class='footer'>Footer</footer>
</template>
"@

  "src/views/HomeView.vue" = @"
<template>
  <DefaultLayout>
    <h1>Trang chủ</h1>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
</script>
"@

  "src/router/index.ts" = @"
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
  ],
})
"@
}

foreach ($file in $files.Keys) {
  New-Item -ItemType File -Force -Path $file | Out-Null
  Set-Content -Path $file -Value $files[$file]
}

Write-Host "Project structure created successfully"
