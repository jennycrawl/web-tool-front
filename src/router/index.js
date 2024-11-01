import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/WeiboStatistics.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/weibo/account',
      name: 'weiboAccount',
      component: () => import('../views/WeiboAccount.vue')
    },
    {
      path: '/weibo/statistics',
      name: 'weiboStatistics',
      component: () => import('../views/WeiboStatistics.vue')
    },
    {
      path: '/weibo/msg',
      name: 'weiboMsg',
      component: () => import('../views/WeiboMsg.vue')
    }
  ]
})

export default router
