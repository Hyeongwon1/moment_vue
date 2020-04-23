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
export { localLoginUser };
