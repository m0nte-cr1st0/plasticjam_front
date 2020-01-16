import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/404.vue';

import UsersList from '@/components/UsersList'
import UserDetail from '@/components/UserDetail'
import axios from 'axios'

Vue.use(Router)
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default new Router({
  mode: 'history',
  basename: 'users',
  routes: [
    {
      path: '/users/',
      name: 'UsersList',
      component: UsersList
    },
    {
      path: '/user/:id',
      name: 'user_detail',
      component: UserDetail
    },
    { path: '*', component: NotFound }
  ]
})
