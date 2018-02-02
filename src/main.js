// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AmazeVue from 'amaze-vue';
import 'amaze-vue/dist/amaze-vue.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios/index'
import BaiduMap from 'vue-baidu-map'

Vue.use(AmazeVue);
Vue.use(ElementUI);
Vue.use(BaiduMap, {
  ak: 'Zj95TGD3KnECbSKTc1qLgW8nTzHqtM7m'
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: {App}
});
