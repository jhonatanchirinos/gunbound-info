import { createRouter, createWebHistory } from 'vue-router'
import EmotesView from '../views/EmotesView.vue'
import MovilesView from '../views/MovilesView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/emotes',
  },
  {
    path: '/emotes',
    name: 'emotes',
    component: EmotesView,
    label: 'EMOTES',
  },
  {
    path: '/moviles',
    name: 'moviles',
    component: MovilesView,
    label: 'MÓVILES',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
