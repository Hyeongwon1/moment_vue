import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
const requireAuth = () => (to, from, next) => {
	var semail = sessionStorage.getItem('m_email');
	if (semail == null) {
		alert('로그인이 필요합니다.');
		return next('/login');
	}
	next();
};
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/upload/Upload.vue'),
    beforeEnter: requireAuth(),
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/detail/Detail.vue'),
    beforeEnter: requireAuth(),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('../views/myPage/MyPage.vue'),
    beforeEnter: requireAuth(),
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

export default router
