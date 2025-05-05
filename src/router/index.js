import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Veiculos from '../views/Veiculos.vue'
import Pneu from '@/views/Pneu.vue'
import Relatorios from '../views/Relatorios.vue';
import Dashboard from '../views/Dashboard.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/veiculos',
      name: 'Veiculos',
      component: Veiculos,

    },
    {
      path: '/pneu',
      name: 'Pneu',
      component: Pneu,

    },
    {
      path: '/relatorios',
      name: 'Relatorios',
      component: Relatorios,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
