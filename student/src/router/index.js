import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/main'], resolve)
    },
    {
      path: '/main',
      component: resolve => require(['../components/main'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../components/login'], resolve) // 懒加载
    },
    {
      path: '/dynamic/:type/:value',
      component: resolve => require(['../components/dynamic'], resolve) // 懒加载
    },
    {
      path: '/user',
      component: resolve => require(['../components/user'], resolve) // 懒加载
    },
    {
      path: '/search',
      query: {key: ' '},
      component: resolve => require(['../components/searchResult'], resolve) // 懒加载
    },
    {
      path: '/get/:type/:stages/:area/:stage/:subject',
      component: resolve => require(['../components/main'], resolve)
    },
    {
      path: '/detail/:type/:id',
      component: resolve => require(['../components/course'], resolve) // 懒加载
    },
    {
      path: '/article/:id',
      component: resolve => require(['../components/essay'], resolve) // 懒加载
    },
    {
      path: '/message',
      component: resolve => require(['../components/message'], resolve) // 懒加载
    },
    {
      path: '/modify/pass',
      component: resolve => require(['../components/modifyPass'], resolve) // 懒加载
    },
    {
      path: '/order',
      component: resolve => require(['../components/order'], resolve) // 懒加载
    },
    {
      path: '/order/result/*',
      component: resolve => require(['../components/orderResult'], resolve) // 懒加载
    }
  ]
})
