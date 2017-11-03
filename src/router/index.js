import Vue from 'vue'
import Router from 'vue-router'
import pizzahub from '../views/pizzahub'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pizzahub'
    },
    {
      path: '/pizzahub',
      name: 'pizzahub',
      component: pizzahub 
    }
  ]
})
