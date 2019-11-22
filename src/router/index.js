import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/components/main/index';
import Member from '@/components/member/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
      path: '/member',
      name: 'Member',
      component: Member
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
