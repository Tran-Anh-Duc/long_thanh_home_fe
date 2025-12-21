<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()
</script>

<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- SIDEBAR -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="px-4 py-4 text-lg font-bold border-b border-slate-700">
        ADMIN
      </div>

      <nav class="flex-1 px-2 py-4 space-y-1">
        <router-link
            to="/admin"
            class="block rounded px-3 py-2 hover:bg-slate-700"
        >
          Dashboard
        </router-link>

        <router-link
            to="/admin/projects"
            class="block rounded px-3 py-2 hover:bg-slate-700"
        >
          Projects
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
