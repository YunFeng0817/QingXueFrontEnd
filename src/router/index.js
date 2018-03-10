import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/signup/signup',
      component: resolve => require(['../components/signup'], resolve)
    },
    {
      path: '/signup/message',
      component: resolve => require(['../components/inputMessage'], resolve)
    }
  ]
})
