<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'
import { PERMISSIONS } from '@/constants/permissions'

const auth = useAuthStore()
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-slate-800 text-white flex flex-col">
      <div class="px-4 py-4 text-lg font-bold border-b border-slate-700">
        ADMIN
      </div>

      <nav class="flex-1 px-2 py-4 space-y-1">
        <router-link
            v-if="auth.hasPermission(PERMISSIONS.PROJECT_CATEGORY_VIEW)"
            to="/admin/project-categories"
            class="block rounded px-3 py-2 text-white hover:bg-slate-700"
        >
          Project Categories
        </router-link>

        <router-link
            v-if="auth.hasPermission(PERMISSIONS.PROJECT_VIEW)"
            to="/admin/projects"
            class="block rounded px-3 py-2 text-white hover:bg-slate-700"
        >
          Projects
        </router-link>
        <router-link
            to="/admin/users"
            class="block rounded px-3 py-2 text-white hover:bg-slate-700"
        >
          Users
        </router-link>
        <router-link
            to="/admin/news"
            class="block rounded px-3 py-2 text-white hover:bg-slate-700"
        >
          News
        </router-link>
      </nav>

      <!-- LOGOUT -->
      <button
          @click="auth.logout"
          class="m-4 rounded bg-red-600 px-3 py-2 text-sm hover:bg-red-700"
      >
        Đăng xuất
      </button>
    </aside>

    <!-- MAIN -->
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>

