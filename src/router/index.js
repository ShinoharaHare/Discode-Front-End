import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/main/index';
import Member from '@/components/member/index';

Vue.use(Router);

export default new Router({
  routes: [
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
});
