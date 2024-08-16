import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createWebHistory, createRouter } from 'vue-router'
import HomeView from './views/HomeView.vue'
import VideoView from './views/VideoView.vue'
import DownloadView from './views/DownloadView.vue'



const routes = [
  { path: '/', component: HomeView },
  { path: '/video', component: VideoView },
  { path: '/download', component: DownloadView },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')