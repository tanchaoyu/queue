import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/login/login' },
    { path: '/index', component: '@/pages/index' },
    { path: '/login', component: '@/pages/login/login' },
    { path: '/add', component: '@/pages/add/add' },
    { path: '/my', component: '@/pages/my/my' },
    { path: '/unit', component: '@/pages/unit/unit' },
  ],
  theme: {
    '@primary-color': '#36cfc9',
  },
});
