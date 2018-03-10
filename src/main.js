// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './axios';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Checkbox,
  Input,
  Select,
  Button,
  Form,
  FormItem,
  Col,
  Upload,
  Steps,
  Step,
  Message
} from 'element-ui'

Vue.config.productionTip = false;
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Steps);
Vue.use(Step);
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
});
