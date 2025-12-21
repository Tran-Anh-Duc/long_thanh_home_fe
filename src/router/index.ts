import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import LoginPage from '@/pages/LoginPage.vue'

const routes: RouteRecordRaw[] = [
  // 🌍 PUBLIC WEBSITE
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('@/pages/ProjectsPage.vue'),
      },
      {
        path: 'projects/:id',
        name: 'project-detail',
        component: () => import('@/pages/ProjectDetailPage.vue'),
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/pages/NewsPage.vue'),
      },
    ],
  },

  // 🔐 LOGIN
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },

  // 🔐 ADMIN (BẮT BUỘC LOGIN)
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/pages/admin/DashboardPage.vue'),
      },
      {
        path: 'projects',
        name: 'admin-projects',
        component: () => import('@/pages/admin/ProjectsPage.vue'),
      },
      {
        path: 'projects/create',
        name: 'admin-project-create',
        component: () => import('@/pages/admin/ProjectFormPage.vue'),
      },
      {
        path: 'projects/:id/edit',
        name: 'admin-project-edit',
        component: () => import('@/pages/admin/ProjectFormPage.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/**
 * 👉 GUARD
 */
router.beforeEach((to) => {
  const token = localStorage.getItem('access_token')

  // Chưa login mà vào admin
  if (to.meta.requiresAuth && !token) {
    return { name: 'login' }
  }

  // Đã login mà vào login
  if (to.name === 'login' && token) {
    return { name: 'admin-dashboard' }
  }
})

export default router
