import { createRouter, createWebHistory } from 'vue-router'
import EmotesView from '../views/EmotesView.vue'
import MovilesView from '../views/MovilesView.vue'
// import MapasView from '../views/MapasView.vue'
import MainView from '@/views/MainView.vue'

import LoginView from '@/views/LoginView.vue'
import PanelView from '@/views/PanelView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: EmotesView,
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
  {
    path: '/panel',
    name: 'panel',
    component: PanelView,
    label: 'PANEL',
    admin: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },

  // {
  //   path: '/mapas',
  //   name: 'mapas',
  //   component: MapasView,
  //   label: 'MAPAS',
  // },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard global que se ejecuta antes de cada navegación
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')

  console.log({ to })
  // Si intenta ir a login estando logueado
  if (token && to.path === '/login') {
    // Cancelar la navegación y mantener la página actual
    return { name: from.name ?? 'emotes' }
  }

  // Si no está logueado e intenta acceder a rutas que requieren admin
  const adminRoutes = routes.filter((route) => route.admin)

  const adminRoutesNames = adminRoutes.map((route) => route.name)

  const isAdminRoute = adminRoutesNames.includes(to.name as string)

  if (!token && isAdminRoute) {
    return { name: 'emotes' }
  }
})

export default router
