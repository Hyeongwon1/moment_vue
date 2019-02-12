import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/components/LoginPage'
import MomentHome from '@/components/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/loginPage',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'Home',
      component: MomentHome
    }
  ]
})
