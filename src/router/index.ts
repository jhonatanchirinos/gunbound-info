import { createRouter, createWebHistory } from 'vue-router'
import EmotesView from '../views/EmotesView.vue'
import MovilesView from '../views/MovilesView.vue'
import MapasView from '../views/MapasView.vue'
import MainView from '@/views/MainView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView,
    label: 'MAIN VIEW',
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
  {
    path: '/mapas',
    name: 'mapas',
    component: MapasView,
    label: 'MAPAS',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
