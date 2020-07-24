// import { instance } from "./index";
import { posts } from "./index";
//로그인
function localLoginUser(userData) {
  //const url = `http://localhost:3000/moment/users/mem_logindb`;
  // axios.post(url, userData);
  // return instance.post("moment/users/mem_logindb", userData);
  return posts.post(`/auth/login`,userData);
}

//로컬 회원가입
function localSignUp(data) {
  return posts.post(`/auth/signUp`, data);
}

//로컬 로그인체크
function loginCheck() {
  return posts.get(`/auth/loginCheck`);
}

export { localLoginUser, localSignUp, loginCheck };
