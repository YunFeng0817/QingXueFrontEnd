import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/signup'], resolve)
    },
    {
      path: '/message',
      component: resolve => require(['../components/inputMessage'], resolve)
    }
  ]
})
