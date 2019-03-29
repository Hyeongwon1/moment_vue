import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MomentHome from '@/components/Home'
import MomentUpload from '@/components/Upload'

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
      path: '/home',
      name: 'Home',
      component: MomentHome
    },
    {
      path: '/upload',
      name: 'Upload',
      component: MomentUpload
    }
  ]
})
