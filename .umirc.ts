import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/index', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login/login' },
    { path: '/add', component: '@/pages/add/add' },
    { path: '/my', component: '@/pages/my/my' },
  ],
  theme: {
    '@primary-color': '#36cfc9',
  },
});
