<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getUsers, type User } from '@/api/user.api'

const loading = ref(false)
const users = ref<User[]>([])
const search = ref('')

const fetchData = async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } finally {
    loading.value = false
  }
}

const filteredUsers = computed(() => {
  if (!search.value) return users.value

  const keyword = search.value.toLowerCase()
  return users.value.filter(
      (u) =>
          u.name.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword),
  )
})

onMounted(fetchData)
</script>



<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold">Users</h1>

      <input
          v-model="search"
          placeholder="Search name / email..."
          class="rounded border px-3 py-2 text-sm"
      />
    </div>

    <div v-if="loading" class="text-gray-400">
      Loading...
    </div>

    <div v-else class="rounded bg-white shadow">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50">
        <tr>
          <th class="border-b px-4 py-3 text-left">ID</th>
          <th class="border-b px-4 py-3 text-left">Name</th>
          <th class="border-b px-4 py-3 text-left">Email</th>
          <th class="border-b px-4 py-3 text-left">Role</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="hover:bg-gray-50"
        >
          <td class="border-b px-4 py-2">{{ user.id }}</td>
          <td class="border-b px-4 py-2">{{ user.name }}</td>
          <td class="border-b px-4 py-2">{{ user.email }}</td>
          <td class="border-b px-4 py-2">
              <span
                  v-if="user.role"
                  class="rounded bg-gray-200 px-2 py-1 text-xs"
              >
                {{ user.role.name }}
              </span>
            <span v-else class="text-gray-400">-</span>
          </td>
        </tr>

        <tr v-if="!filteredUsers.length">
          <td colspan="4" class="px-4 py-6 text-center text-gray-400">
            Không có user
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

