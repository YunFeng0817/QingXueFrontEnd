import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import main from '../components/main'
import user from '../components/user'
import dynamic from '../components/dynamic'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: App,
      child: [
        {path: 'dynamic', components: dynamic},
        {path: 'main', components: main},
        {path: 'user', components: user}
      ]
    }
  ]
})
