import Vue from 'vue'
import Router from 'vue-router'
import MomentHome from '@/components/Home'
import MomentUpload from '@/components/Upload'
import MomentPupp1 from '@/components/Pupp1'
import MomentDetail from '@/components/Detail'
import MomentLogin from '@/components/login/Login'
import MomentMyPage from '@/components/myPage/MyPage'

Vue.use(Router)

// const requireAuth = () => (to, from, next) => {
//   if (store.state.accessToken !== '') {
//     return next()
//   }
//   next('/login')
// }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: MomentHome
    },
    // {
    //   path: '/home/:id',
    //   name: 'Home',
    //   component: MomentHome
    //   // children: [
    //   //   { path: ':id', component: MomentHome }
    //   // ]
    // },
    {
      path: '/upload',
      name: 'Upload',
      component: MomentUpload,
      beforeEnter: function (to, from, next) {
        console.log('aaaaaaaaaaaaaaaa')
        var semail = sessionStorage.getItem('m_email')
        console.log('semail')
        console.log(semail)
        if (semail == null) {
          alert('로그인이 필요합니다.')
        } else {
          next()
        }
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: MomentDetail,
      beforeEnter: function (to, from, next) {
        console.log('aaaaaaaaaaaaaaaa')
        var semail = sessionStorage.getItem('m_email')
        console.log('semail')
        console.log(semail)
        if (semail == null) {
          alert('로그인이 필요합니다.')
        } else {
          next()
        }
      }
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
      beforeEnter: function (to, from, next) {
        console.log('aaaaaaaaaaaaaaaa')
        var semail = sessionStorage.getItem('m_email')
        console.log('semail')
        console.log(semail)
        if (semail == null) {
          alert('로그인이 필요합니다.')
        } else {
          next()
        }
      }
    },
    {
      path: '/pupp1',
      name: 'PuppTest',
      component: MomentPupp1
    }
  ]
})
