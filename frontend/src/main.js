import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';

// imports
import Home from './components/HelloWorld.vue';
import About from './components/TheWelcome.vue';
// routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
];

// Vue Router 인스턴스 생성
const router = createRouter({
    history: createWebHistory(),
    routes,
  });

createApp(App)
  .use(router)
  .mount('#app');