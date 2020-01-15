import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from './plugins/axios'
import VueResource from 'vue-resource';

Vue.use(VueResource)
Vue.use(VueAxios)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
