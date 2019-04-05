import Vue from 'vue'
import Router from 'vue-router'
import MomentHome from '@/components/Home'
import MomentUpload from '@/components/Upload'
import MomentDetail from '@/components/Detail'
import MomentLogin from '@/components/login/Login'
import MomentMyPage from '@/components/myPage/MyPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: MomentHome
    },
    {
      path: '/upload',
      name: 'Upload',
      component: MomentUpload
    },
    {
      path: '/detail',
      name: 'Detail',
      component: MomentDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: MomentLogin
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MomentMyPage
    }
  ]
})
