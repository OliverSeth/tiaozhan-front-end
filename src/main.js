import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import api from '@/api'
import axiosInstance from "./utils/axios"
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import utils from '@/utils'

Vue.config.productionTip = false;
Vue.prototype.$api=api;
Vue.use(VueCookies);
Vue.use(VueAxios, axiosInstance);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
