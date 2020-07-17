import { instance } from "./index";
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
  return instance.post(`/auth/signUp`, data);
}

export { localLoginUser, localSignUp };
