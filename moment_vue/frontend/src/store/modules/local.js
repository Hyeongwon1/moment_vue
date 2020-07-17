import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";
import { homeSelect, dataView } from "@/api/moments";
import { localLoginUser, localSignUp } from "@/api/auth";
// import router from './router';
Vue.use(Vuex);
Vue.use(VueAxios, axios);

const local = {
  namespaced: true,
  state: {
    host: "http://localhost:3000/moment",
    home_data: [],
    detail_data: [],
    kind: "ALL",
    ord: "NW",
    loc: "",
    token: "",
  },
  getters: {
    homedata(state) {
      return state.home_data;
    },
    detaildata(state) {
      return state.detail_data;
    },
    ordby(state) {
      return state.ord;
    },
  },
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
      state.token = payload.token;
      // 토큰을 로컬 스토리지에 저장
      localStorage.access_Token = payload.token;
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
    async homeSelect(context, payload) {
      payload = payload || {};
      if (payload.kind) {
        context.commit("setHomeKind", { kind: payload.kind });
      }
      if (payload.loc) {
        context.commit("setloc", { loc: payload.loc });
      }
      if (payload.ord) {
        context.commit("setOrdby", { ord: payload.ord });
      }


      const homeData = {
        kind: context.state.kind,
        ord: context.state.ord,
        loc: context.state.loc,
      };
      console.log("homeData")
      console.log(homeData)
      const { data } = await homeSelect(homeData);
      context.commit("setHomeData", { home_data: data.response });
      return data;
    },
    async dataView(context, payload) {
      payload = payload || {};
      const { data } = await dataView(payload);
      context.commit("setDetailData", { detail_data: data });
      return data;
    },
    async LocalLogin(context, payload) {
      payload = payload || {};
      const { data } = await localLoginUser(payload);
      // const { data } 이렇게 활용할시는 꺼내오는 데이터의 이름과 같아야한다.
      context.commit("setLoginToken", { token: data.data.token });
      // context.commit("setProfile", {
      //   profile: { email: data.m_email, m_no: data.m_no },
      // });
      return data;
    },
    async localSignUp(context, payload) {
      payload = payload || {};
      const { data } = await localSignUp(payload);
      return data;
    },
  },
};

export default local;
