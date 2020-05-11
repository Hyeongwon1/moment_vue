import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import store from '../store/index';

import vueAuthInstance from "@/plugins/auth.js";
Vue.use(VueRouter, Vuex);
const routes = [
  {
    path: "/front",
    component: () => import("@/layout/default.vue"),
    children: [
      { path: "", redirect: "home" },
      {
        path: "home",
        component: () => import("@/views/Home.vue"),
        meta: { title: "home" },
      },
      {
        path: "upload",
        component: () => import("@/views/upload/Upload.vue"),
        // beforeEnter: requireAuth(),
        meta: { auth: true, title: "Upload" },
      },
      {
        path: "detail/:id",
        component: () => import("@/views/detail/Detail.vue"),
        name: "detail",
        // beforeEnter: requireAuth(),
        meta: { auth: true, title: "Detail" },
      },
      {
        path: "login",
        component: () => import("@/views/login/Login.vue"),
        meta: { auth: false, title: "Login" },
      },
      {
        path: "mypage",
        component: () => import("@/views/myPage/MyPage.vue"),
        // beforeEnter: requireAuth(),
        meta: { auth: true, title: "My profile" },
      },
      {
        path: "pupp1",
        component: () => import("@/views/pupp/Pupp1.vue"),
      },
      {
        path: "mask",
        component: () => import("@/views/pupp/masktest.vue"),
      },
      {
        path: "*",
        component: () => import("@/views/notFound.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: "front/home",
  },
  {
    path: "*",
    component: () => import("@/views/notFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.VUE_APP_API_URL,
  routes,
});

router.beforeEach(function(to, from, next) {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (vueAuthInstance.isAuthenticated()) {
        next();
      } else {
        router.push({ path: "/front/login" });
      }
    } else {
      if (vueAuthInstance.isAuthenticated()) {
        router.push({ path: "/front/home"});
        const alertdata = {
          color: "red",
          message: "로그인이 필요합니다.",
        };
        store.commit("snackbar/addSnackItem", alertdata);
        // alert("로그인이 필요합니다.");
        
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
