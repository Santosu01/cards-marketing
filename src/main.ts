import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const app = createApp(App)

// Pinia configuration
const pinia = createPinia()
app.use(pinia)

// Basic Router configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      // Placeholder for home route
      component: { template: '<div>Home</div>' }
    }
  ]
})
app.use(router)

app.mount('#app')
