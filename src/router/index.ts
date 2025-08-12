import PublicLayout from '@/layout/PublicLayout.vue'
import HomeView from '@/views/HomeView.vue'
import ListView from '@/views/ListView.vue'
import ListListingsView from '@/views/ListListingsView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EditListView from '@/views/EditListView.vue'
import AddListView from '@/views/AddListView.vue'
import DashboardView from '@/views/DashboardView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'dashboard-home',
          component: DashboardView,
        },
      ],
    },
    {
      path: '/listings',
      name: 'listings',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'list-listings',
          component: ListListingsView,
        },
        {
          path: ':id',
          name: 'list-details',
          component: ListView,
        },
        {
          path: 'add',
          name: 'add-list',
          component: AddListView
        },
        {
          path: 'edit/:id',
          name: 'edit-list',
          component: EditListView
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  const protectedRoutes = ['dashboard-home', 'edit-list', 'add-list']
  
  const guestOnlyRoutes = ['login', 'register']
  
  if (protectedRoutes.includes(to.name as string)) {
    if (!isAuthenticated.value) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else if (guestOnlyRoutes.includes(to.name as string) && isAuthenticated.value) {
    next({ name: 'dashboard-home' })
  } else {
    next()
  }
})

export default router
