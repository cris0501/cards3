import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/one',
      name: 'one',
      component: () => import('../views/OneView.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/simpletest',
      name: 'simpleTest',
      component: () => import('../views/TestView.vue')
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('../views/ConfigView.vue')
    },
    {
      path: '/repo',
      name: 'repo',
      component: () => import('../views/RepoView.vue')
    },
  ]
})

export default router
