import axios from "axios";
import { setInterceptors } from "@/api/common/interceptors";

function createInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  return setInterceptors(instance);
}
const instance = createInstance();

//로그인
function localLoginUser(userData) {
  //const url = `http://localhost:3000/moment/users/mem_logindb`;
  //axios.post(url, userData);
  return instance.post("moment/users/mem_logindb", userData);
}

//로컬 회원가입
function localSignUp(data){
  return instance.post(`moment/users/mem_insertdb`,data);
}

//메인 셀렉트
function homeSelect(data){
  return instance.post(`moment/homeSelect`,data);
}

function dataView(data){
  return instance.post(`moment/data_view`,data);
}


export { localLoginUser,localSignUp,homeSelect,dataView };
