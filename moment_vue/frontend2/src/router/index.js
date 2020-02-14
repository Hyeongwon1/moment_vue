import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import Home from '../views/Home.vue'

import vueAuthInstance from '../services/auth.js'
Vue.use(VueRouter, Vuex)
const routes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'home' }
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/upload/Upload.vue'),
    // beforeEnter: requireAuth(),
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/detail/Detail.vue'),
    // beforeEnter: requireAuth(),
    meta: { auth: true, title: 'Detail' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
    meta: { auth: false, title: 'Login' }
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('../views/myPage/MyPage.vue'),
    // beforeEnter: requireAuth(),
    meta: { auth: true, title: 'My profile' }
  },
  {
    path: '/pupp1',
    name: 'PuppTest',
    component: () => import('../views/pupp/Pupp1.vue'),
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (vueAuthInstance.isAuthenticated()) {
        next()
      } else {
        router.push({ name: 'Login' })
      }
    } else {
      if (vueAuthInstance.isAuthenticated()) {
        router.push({ name: 'home' })
        alert('로그인이 필요합니다.')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
export default router
