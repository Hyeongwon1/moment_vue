import vueAuthInstance from '../../services/auth.js'
import axios from 'axios';
const jwt = require("jsonwebtoken");

export default {
  state: {
    host: 'http://localhost:3000/moment',
    profile: null,
    isAuthenticated: vueAuthInstance.isAuthenticated()
  },

  mutations: {
    isAuthenticated (state, payload) {
      state.isAuthenticated = payload.isAuthenticated
    },

    setProfile (state, payload) {
      state.profile = payload.profile
    }
  },

  actions: {
    login (context, payload) {
      payload = payload || {}
      return vueAuthInstance.login(payload.user, payload.requestOptions).then(function () {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
      })
    },

    register (context, payload) {
      payload = payload || {}
      return vueAuthInstance.register(payload.user, payload.requestOptions).then(function () {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
      })
    },

    logout (context, payload) {
      payload = payload || {}
      return vueAuthInstance.logout(payload.requestOptions).then(function () {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
        alert('로그아웃')
      })
    },

    authenticate (context, payload) {
      payload = payload || {}
      return vueAuthInstance.authenticate(payload.provider, payload.userData, payload.requestOptions).then(function (res) {
        context.commit('isAuthenticated', {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
        const decode = jwt.decode(res.data.id_token)

        axios.post(`http://localhost:3000/moment/users/mem_idcheckdb`,{
          m_email : decode.email
        }).then(res => {
              console.log(res);
          if (res.data == '') {
            return axios.post(`http://localhost:3000/moment/users/mem_insertdb`,{
              i_email : decode.email,
              social  : 'Y'
            })
          }else{
            console.log("이미가입")
          } 
        }).catch(function(error) {
            console.log("에러");
            console.log(error.response);
            // alert("비밀번호 다름");
          });
        context.commit('setProfile', {
          profile: decode.email
        })
      })
    }
  }
}