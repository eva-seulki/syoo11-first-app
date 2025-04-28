import { createRouter, createWebHistory } from 'vue-router';

// imports
import Home from '../components/HelloWorld.vue';
import About from '../components/TheWelcome.vue';

// routes
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home/about',
    name: 'About',
    component: About,
  },
];

// Vue Router 인스턴스 생성
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
