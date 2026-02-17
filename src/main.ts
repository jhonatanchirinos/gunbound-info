import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// import { createMemoryHistory, createRouter } from 'vue-router'

// import HomeView from './HomeView.vue'
// import AboutView from './AboutView.vue'

// const routes = [
//   { path: '/', component: HomeView },
//   { path: '/about', component: AboutView },
// ]

// const router = createRouter({
//   history: createMemoryHistory(),
//   routes,
// })

const pinia = createPinia()
const app = createApp(App)

// createApp(App).use(router).mount('#app')

app.use(router)
app.use(pinia)

app.mount('#app')
