import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
// vuetify
import vuetify from './plugins/vuetify';
// vue
import Home from './components/Home.vue';
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

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');