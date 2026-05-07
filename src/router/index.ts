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
    path: '/mobiles',
    name: 'mobiles',
    component: () => import('../views/MobilesView.vue'),
    label: 'MOBILES',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
