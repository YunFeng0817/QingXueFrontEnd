// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'amaze-vue/dist/amaze-vue.css';
import 'element-ui/lib/theme-chalk/index.css'
import axios from './axios/index'
import './assets/common.css'
import share from './components/share/index'

import {
  Autocomplete,
  Checkbox,
  Input,
  Select,
  Option,
  Button,
  DatePicker,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Row,
  Col,
  Upload,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  Message
} from 'element-ui'

Vue.use(Autocomplete);
Vue.use(Checkbox);
Vue.use(Option);
Vue.use(Input);
Vue.use(Select);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Rate);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Cascader);
Vue.prototype.$message = Message;
Vue.prototype.$share = share;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  template: '<App/>',
  components: {App}
});
