import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from './plugins/axios'
import VueResource from 'vue-resource';
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueAxios)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
