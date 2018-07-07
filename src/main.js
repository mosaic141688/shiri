// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld'
import nowhere from  './components/nowhere'
import client from './components/client'

Vue.use(VueRouter)
const router =
  new VueRouter({
    routes: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: HelloWorld
      },
      {
        path: '/',
        name: 'nowhere',
        component: nowhere
      },
      {
        path: '/client/:client_id',
        name: 'client',
        component: client
      },
      {
        path: '/client',
        name: 'client',
        component: client
      }]
  })


Vue.use(Vuetify, { theme: {
  primary: '#ee44aa',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
