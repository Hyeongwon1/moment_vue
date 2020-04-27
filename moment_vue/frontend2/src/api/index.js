import axios from "axios";
import { setInterceptors } from "@/api/common/interceptors";

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

function createInstanceAuth() {
  const instance = axios.create({
    // baseURL: `${process.env.VUE_APP_API_URL}${url}`, api 수정후 적용예정
    baseURL: `${process.env.VUE_APP_API_URL}moment`,
  });
  return setInterceptors(instance);
}

export const instance = createInstance();
export const posts = createInstanceAuth();
