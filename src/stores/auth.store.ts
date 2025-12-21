import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import { loginApi, logoutApi } from '@/api/auth.api'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('access_token'))

    const role = ref<string | null>(
        localStorage.getItem('role')
    )

    const permissions = ref<string[]>(
        JSON.parse(localStorage.getItem('permissions') || '[]')
    )

    const user = ref<any>(null)

    async function login(email: string, password: string) {
        const res = await loginApi({ email, password })

        token.value = res.data.access_token
        role.value = res.data.role
        permissions.value = res.data.permissions
        user.value = res.data.user

        localStorage.setItem('access_token', token.value!)
        localStorage.setItem('permissions', JSON.stringify(permissions.value))
        localStorage.setItem('role', role.value!)

        router.push('/admin')
    }

    async function logout() {
        try {
            await logoutApi()
        } catch (e) {}

        localStorage.clear()
        token.value = null
        role.value = null
        permissions.value = []
        user.value = null

        router.push('/login')
    }

    function hasPermission(code: string): boolean {
        return permissions.value.includes(code)
    }

    return {
        token,
        role,
        permissions,
        user,
        login,
        logout,
        hasPermission,
    }
})
