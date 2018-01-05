// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Main from './components/main'
import user from './components/user'
import dynamic from './components/dynamic'

Vue.config.productionTip = false
Vue.use(Router);

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App
    },
    {
      path: '/dynamic',
      component: dynamic
    },
    {
      path: '/main',
      component: Main
    },
    {
      path: '/user',
      component: user
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
