import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";
import { homeSelect, dataView } from "@/api/moments";
import { localLoginUser, localSignUp } from "@/api/auth";
// import router from './router';
Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default {
  namespace: true,
  state: {
    host: "http://localhost:3000/moment",
    home_data: [],
    detail_data: [],
    newandlike: "LIKE ▼",
    kind: "0",
    ord: "nw",
    loc: "",
    token: "",
  },
  getters: {},
  mutations: {
    setHomeData(state, payload) {
      state.home_data = payload.home_data;
    },
    setDetailData(state, payload) {
      state.detail_data = payload.detail_data;
    },
    setHomeKind(state, payload) {
      state.kind = payload.kind;
    },
    setLike(state, payload) {
      state.newandlike = payload.newandlike;
    },
    setOrdby(state, payload) {
      state.ord = payload.ord;
    },
    setloc(state, payload) {
      state.loc = payload.loc;
    },
    setLoginToken: function(state, payload) {
      state.token = payload;
      // 토큰을 로컬 스토리지에 저장
      localStorage.access_Token = state.token;
    },
    // logout: function (state) {
    //   if (state.token) {
    //     state.token = '';
    //     // delete localStorage.accecssToken
    //     axios.defaults.headers.common['Authorization'] = undefined
    //     alert('로그아웃')
    //   }
    // },
    // loginCheck: function (state) {
    //   console.log("state")
    //   console.log(state.token)
    //   axios.get(`${state.host}/users/loginCheck`)
    //   .then(res => {
    //         console.log("sdaasdasd탄겨?");
    //         console.log(res);

    //         state.id_mail = res.data.token.id_mail
    //       }
    //     ).catch(function(error) {
    //       console.log(error.response);
    //       console.log("로그인정보가 없음");
    //       // alert("비밀번호 다름");
    //     });
    // }
  },
  actions: {
    async homeSelect(context) {
      const homeData = {
        kind: context.state.kind,
        ord: context.state.ord,
        loc: context.state.loc,
      };
      const { data } = await homeSelect(homeData);
      context.commit("setHomeData", { home_data: data.data });
      return data;
    },
    async LocalLogin(context, payload) {
      payload = payload || {};
      const { data } = await localLoginUser(payload);
      // const { data } 이렇게 활용할시는 꺼내오는 데이터의 이름과 같아야한다.
      console.log(data);
      context.commit("setLoginToken", data.access_token);
      context.commit("setProfile", {
        profile: { email: data.m_email, m_no: data.m_no },
      });
      return data;
    },
    async localSignUp(context, payload) {
      payload = payload || {};
      const { data } = await localSignUp(payload);
      return data;
    },
    async dataView(context, payload) {
      payload = payload || {};
      console.log("payload");
      console.log(payload);
      const { data } = await dataView(payload);
      console.log(data);
      context.commit("setDetailData", { detail_data: data });
      return data;
    },
  },
};
