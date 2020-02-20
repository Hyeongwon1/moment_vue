import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import axios from 'axios';
// import router from './router';
Vue.use(Vuex);
Vue.use(VueAxios, axios)

export default{
  state: {
    host: 'http://localhost:3000/moment',
    token:"",
    id_mail: "",
    home_data:[],
    newandlike:"LIKE ▼",
    kind: "0" ,
    ord:"nw",
    loc:""
  },
  getters: {
    
  },
  mutations: {
    setHomeData (state, payload) {
      state.home_data = payload.home_data
    },
    setHomeKind (state, payload) {
      state.kind = payload.kind
    },
    setLike (state, payload) {
      state.newandlike = payload.newandlike
    },
    setOrdby (state, payload) {
      state.ord = payload.ord
    },
    setloc (state, payload) {
      state.loc = payload.loc
    },
    // loginToken: function (state, payload) {
    //   state.token = payload;
    //   // 토큰을 로컬 스토리지에 저장
    //   localStorage.accessToken = state.token;
      
    // },
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
    homeSelect (context, payload) {
      payload = payload || {}
      console.log(payload)
      console.log(context.state.ord)
      console.log(context.state.kind)
      console.log(context.state.loc)

      return axios.post(`/moment/homeSelect`,{
                          kind : context.state.kind,
                          ord  : context.state.ord,
                          loc : context.state.loc
                        }).then(response => {
                          context.commit('setHomeData', {
                            home_data: response.data.data
                          })
                        });
    }
  }
};