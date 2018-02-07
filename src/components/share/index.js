import Vue from 'vue'
import share from './share'

let ShareConstructor = Vue.extend(share);
let instance;

const Share = function (options) {
  instance = new ShareConstructor({});
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
};

export default Share;
