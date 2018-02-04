import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/main'
import user from '../components/user'
import dynamic from '../components/dynamic'
import searchResult from '../components/searchResult'
import course from '../components/course'
import essay from '../components/essay'
import login from '../components/login'
import message from '../components/message'
import modifyPass from '../components/modifyPass'
import order from '../components/order'

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      component: Main
    },
    {
      path: '/main',
      component: Main
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/dynamic',
      component: dynamic
    },
    {
      path: '/user',
      component: user
    },
    {
      path: '/search',
      query: {key: ' '},
      component: searchResult
    },
    {
      path: '/get',
      component: Main
    },
    {
      path: '/course',
      component: course
    },
    {
      path: '/institution',
      component: course
    },
    {
      path: '/article',
      component: essay
    },
    {
      path: '/message',
      component: message
    },
    {
      path: '/modify/pass',
      component: modifyPass
    },
    {
      path: '/order',
      component: order
    }
  ]
})
