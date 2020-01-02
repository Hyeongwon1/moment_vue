import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import router from './router';
Vue.use(Vuex);

// const enhanceAccessToeken = () => {
//   const {accessToken} = localStorage.accessToken
//   if (!accessToken) return
//   // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
// }
// enhanceAccessToeken()

export const store = new Vuex.Store({
  state: {
    host: 'http://127.0.0.1:3000/moment',
    token:"",
    id_mail: '',
  },
  getters: {
    
  },
  mutations: {
    loginToken: function (state, payload) {
      state.token = payload;
      // 토큰을 로컬 스토리지에 저장
      localStorage.accessToken = state.token;
      
    },
    logout: function (state) {
      if (state.token) {
        state.token = '';
        delete localStorage.accessToken
        // axios.defaults.headers.common['Authorization'] = undefined
        alert('로그아웃')
      }
    },
    loginCheck: function (state) {
      console.log("state")
      console.log(state.token)
      axios.get(`${state.host}/users/loginCheck`, {
        headers: {
          "x-access-token": state.token
        }
      })
      .then(res => {
            console.log("sdaasdasd탄겨?");
            console.log(res);
            state.id_mail = res.data.token.id_mail
          }
        ).catch(function(error) {
          console.log(error.response);
          console.log("로그인정보가 없음");
          // alert("비밀번호 다름");
        });
    }
  }
});