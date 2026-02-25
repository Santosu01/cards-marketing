import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/features/auth/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/features/trades/pages/MarketplacePage.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/features/auth/pages/LoginPage.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/features/auth/pages/RegisterPage.vue'),
    },
    {
      path: '/my-cards',
      name: 'my-cards',
      component: () => import('@/features/cards/pages/MyCardsPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/my-trades',
      name: 'my-trades',
      component: () => import('@/features/trades/pages/MyTradesPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-trade',
      name: 'create-trade',
      component: () => import('@/features/trades/pages/CreateTradePage.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
