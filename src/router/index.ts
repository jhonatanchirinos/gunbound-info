import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/emotes',
  },
  {
    path: '/emotes',
    name: 'emotes',
    component: () => import('../views/EmotesView.vue'),
    label: 'EMOTES',
  },
  {
    path: '/moviles',
    name: 'moviles',
    component: () => import('../views/MovilesView.vue'),
    label: 'MÓVILES',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
