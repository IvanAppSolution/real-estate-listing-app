import AdminLayout from '@/layout/AdminLayout.vue'
import PublicLayout from '@/layout/PublicLayout.vue'
import AddJobView from '@/views/AddJobView.vue'
import HomeView from '@/views/HomeView.vue'
import JobView from '@/views/ListView.vue'
import ListListingsView from '@/views/ListListingsView.vue'
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import EditListView from '@/views/EditListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        {
          path: '/admin',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
      ],
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
          name: 'job-details',
          component: JobView,
        },
        {
          path: 'add',
          name: 'add-job',
          component: AddJobView
        },
        {
          path: 'edit/:id',
          name: 'edit-job',
          component: EditListView
        }
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
  ],
})

export default router
