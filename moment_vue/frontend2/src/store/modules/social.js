import vueAuthInstance from "../../services/auth.js";
import axios from "axios";
const jwt = require("jsonwebtoken");

export default {
  state: {
    host: "http://localhost:3000/moment",
    profile: {},
    isAuthenticated: vueAuthInstance.isAuthenticated(),
  },
  getters: {
    islogin(state) {
      return state.profile !== {};
    },
    // isAuthenticated () {
    //   return vueAuthInstance.isAuthenticated()
    // }
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    setProfile(state, payload) {
      state.profile.email = payload.profile.email;
      state.profile.m_no = payload.profile.m_no;
    },
  },
  actions: {
    login(context, payload) {
      payload = payload || {};
      return vueAuthInstance.login(payload, payload.requestOptions)
        .then(function(res) {
          console.log(res)
          context.commit("setProfile", {
            profile: { email: res.data.data.email, m_no: res.data.data.id }
          });
          context.commit("isAuthenticated", {
            isAuthenticated: vueAuthInstance.isAuthenticated(),
          });
        });
    },
    register(context, payload) {
      payload = payload || {};
      return vueAuthInstance
        .register(payload.user, payload.requestOptions)
        .then(function() {
          context.commit("isAuthenticated", {
            isAuthenticated: vueAuthInstance.isAuthenticated(),
          });
        });
    },

    logout(context, payload) {
      payload = payload || {};
      return vueAuthInstance.logout(payload.requestOptions).then(function() {
        context.commit("isAuthenticated", {
          isAuthenticated: vueAuthInstance.isAuthenticated(),
        });
        context.commit("setLoginyn", {
          loginyn: "Login",
        });
        context.commit("setProfile", {
          profile: "",
        });
        alert("로그아웃");
      });
    },

    authenticate(context, payload) {
      payload = payload || {};
      console.log(payload.requestOptions)
      return vueAuthInstance.authenticate(payload.provider,payload.userData,payload.requestOptions).then(function(res) {
          console.log(res);
          context.commit("isAuthenticated", {
            isAuthenticated: vueAuthInstance.isAuthenticated(),
          });
          const decode = jwt.decode(res.data.id_token);

          axios.post(`http://localhost:3000/moment/users/mem_idcheckdb`, {
              m_email: decode.email,
            })
            .then((res) => {
              console.log(res);
              if (res.data == "") {
                return axios.post(
                  `http://localhost:3000/moment/users/mem_insertdb`,
                  {
                    i_email: decode.email,
                    social: "Y",
                  }
                );
              } else {
                context.commit("setProfile", {
                  profile: {
                    email: res.data[0].m_email,
                    m_no: res.data[0].m_no,
                  },
                });
                context.commit("setLoginyn", {
                  loginyn: "Logout",
                });
                console.log("이미가입");
              }
            })
            .catch(function(error) {
              console.log("에러");
              console.log(error.response);
              // alert("비밀번호 다름");
            });
        });
    },
  },
};
