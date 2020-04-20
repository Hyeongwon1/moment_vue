import Vue from 'vue'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import axios from 'axios'
import config from '../authConfig.json'

Vue.use(VueAxios, axios)

const vueAuthInstance = new VueAuthenticate(Vue.prototype.$http, {
  baseUrl: process.env.VUE_APP_API_URL,
  tokenName: 'access_token',
  requestDataKey: 'data',
  responseDataKey: 'data',

  providers: {
    google: {
      clientId: config.auth.google.clientId,
      redirectUri : 'http://127.0.0.1:8000/auth/callback'
    }
    // kakao : {
    //   clientId : '112e16b2537b917677494eb1ca6ca7d6',
    //   'secret_id' : 'eHluLIsfBeCkRo0nvWx22qpMLRGk1J4m',
    //   redirectUri : '/moment/users/auth/kakao/callback'
    // }
  }
  // bindRequestInterceptor: function () {
  //   this.$http.interceptors.request.use((config) => {
  //     if (this.isAuthenticated()) {
  //       config.headers['Authorization'] = [
  //         this.options.tokenType, this.getToken()
  //       ].join(' ')
  //     } else {
  //       delete config.headers['Authorization']
  //     }
  //     return config
  //   })
  // },
  // bindResponseInterceptor: function () {
  //   console.log("adasdadasdasdasdsadsadasd")
  //   this.$http.interceptors.response.use((response) => {
  //     this.setToken(response)
  //     return response
  //   })
  // }
})

export default vueAuthInstance