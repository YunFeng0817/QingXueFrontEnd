import Vue from 'vue';
import Router from 'vue-router';
import notFound from '../components/404';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '*',
      component: notFound
    },
    {
      path: '/educator/login/:nextUrl?',
      component: resolve => require(['../components/signup'], resolve)
    },
    {
      path: '/educator/signup',
      component: resolve => require(['../components/signup'], resolve)
    },
    {
      path: '/educator/message',
      component: resolve => require(['../components/inputMessage'], resolve)
    },
    {
      path: '/educator/pay',
      component: resolve => require(['../components/pay'], resolve)
    }
  ]
})
