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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
  ],
})

export default router
