import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

function localLoginUser(userData) {
  //const url = `http://localhost:3000/moment/users/mem_logindb`;
  //axios.post(url, userData);
  return instance.post("moment/users/mem_logindb", userData);
}
export { localLoginUser };
