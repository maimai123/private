import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeRoute from './route/home'
import UserRoute from './route/user'
import UsersRoute from './route/users'
import DemandRoute from './route/demand'
import OrderRoute from './route/order'
import TagsRoute from './route/tags'
import TouristsRoute from './route/tourists'
import MembersRoute from './route/members'
import SettingRoute from './route/setting'
import WithdrawRoute from './route/withdraw'

Vue.use(VueRouter)

const routes = [
  ...HomeRoute,
  ...UserRoute,
  ...UsersRoute,
  ...DemandRoute,
  ...OrderRoute,
  ...TagsRoute,
  ...TouristsRoute,
  ...MembersRoute,
  ...SettingRoute,
  ...WithdrawRoute,
  {
    path: '/',
    name: 'index',
    meta: { requiresAuth: true },
    redirect: { name: 'users' }
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
    path: '/about',
    name: 'about',
    component: () => import('@/views/about')
  },
  // 考勤校验test
  {
    path: '/attendance',
    name: 'attendance',
    component: () => import('@/views/attendance')
  },
  // trackingjs test
  {
    path: '/tracking',
    name: 'tracking',
    component: () => import('@/views/tracking')
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
