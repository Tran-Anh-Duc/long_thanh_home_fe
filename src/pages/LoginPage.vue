<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'

const auth = useAuthStore()

const email = ref('admin@example.com')
const password = ref('123456')
const loading = ref(false)
const error = ref('')

async function submit() {
  console.log('CLICK LOGIN') // 👈 phải thấy log này

  try {
    loading.value = true
    error.value = ''
    await auth.login(email.value, password.value)
  } catch (e: any) {
    console.error('LOGIN ERROR', e)
    error.value = e.response?.data?.message || 'Đăng nhập thất bại'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-[360px] rounded-lg bg-white p-6 shadow">
      <h1 class="mb-4 text-center text-xl font-bold">Đăng nhập</h1>

      <p v-if="error" class="mb-3 text-sm text-red-500">{{ error }}</p>

      <input v-model="email" type="email" class="mb-3 w-full border px-3 py-2" placeholder="Email" />
      <input v-model="password" type="password" class="mb-4 w-full border px-3 py-2" placeholder="Mật khẩu" />

      <button
          @click="submit"
          :disabled="loading"
          class="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
      </button>
    </div>
  </div>
</template>
