import Vue from 'vue'
import Router from 'vue-router'
import MomentHome from '@/components/Home'
import MomentUpload from '@/components/Upload'
import MomentPupp1 from '@/components/Pupp1'
import MomentDetail from '@/components/Detail'
import MomentLogin from '@/components/login/Login'
import MomentMyPage from '@/components/myPage/MyPage'

Vue.use(Router)
const requireAuth = () => (to, from, next) => {
  var semail = sessionStorage.getItem('m_email')
  if (semail == null) {
    alert('로그인이 필요합니다.')
    return next('/login')
  }
  next()
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: MomentHome
    },
    {
      path: '/upload',
      name: 'Upload',
      component: MomentUpload,
      beforeEnter: requireAuth()
    },
    {
      path: '/detail',
      name: 'Detail',
      component: MomentDetail,
      beforeEnter: requireAuth()
    },
    {
      path: '/login',
      name: 'Login',
      component: MomentLogin
    },
    {
      path: '/mypage',
      name: 'MyPage',
      component: MomentMyPage,
      beforeEnter: requireAuth()
    },
    {
      path: '/pupp1',
      name: 'PuppTest',
      component: MomentPupp1
    }
  ]
})
