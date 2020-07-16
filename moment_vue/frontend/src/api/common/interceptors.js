import store from "@/store";

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      console.log(config);
      console.log(store.state.local.token);
      const hauth =config.headers.Authorization
      console.log(hauth)
      if(!hauth){
        config.headers.Authorization = store.state.local.token;
      }
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

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
  //   this.$http.interceptors.response.use((response) => {
  //     this.setToken(response)
  //     return response
  //   })
  // }
  return instance;
}
