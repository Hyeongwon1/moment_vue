import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
// import router from './router';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    host: 'http://127.0.0.1:8000/moment',
    token: '',
    id_mail: '',
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
        alert('로그아웃')
      }
    },
    loginCheck: function (state) {
      axios.get(`${this.$store.state.host}/users/loginCheck`, {
        headers: {
          "x-access-token": state.token
        }
      })
        .then(
          res => {
            console.log(res);
            state.id_mail = res.data.token.id_mail
          },
          // error => {
          //   console.log('로그인정보 없음')
          //   router.push('/Login');
          // }
        );
    }
  }
});