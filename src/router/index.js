import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRoute from './route/home'
import AboutRoute from './route/about'
import UserRoute from './route/users'

Vue.use(VueRouter)

const routes = [
  ...HomeRoute,
  ...AboutRoute,
  ...UserRoute,
  {
    path: '/',
    name: 'index',
    meta: { requiresAuth: true },
    redirect: { name: 'home' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/forget')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/components/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
