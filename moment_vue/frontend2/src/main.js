// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
// import store  from './store'
import store from "@/store/index.js";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import VueAxios from "vue-axios";
import axios from "axios";
import vuetify from "@/plugins/vuetify";
// import VuetifySnackbarQueue from "vuetify-snackbar-queue";
import bottom from "@/components/bar/bottom.vue";
import top from "@/components/bar/top.vue";
import addimg from "@/components/bar/addimg.vue";
import snackbar from "@/components/common/Snackbar.vue";
import vueMoment from "vue-moment";

import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.component("navtop", top);
Vue.component("navbottom", bottom);
Vue.component("snackbar", snackbar);
Vue.component("addimg", addimg);

Vue.config.productionTip = false;
const options = { name: "custom", lodash: lodash }; // customize the way you want to call it
Vue.use(VueLodash, options);
Vue.use(vuetify);
Vue.use(vueMoment);

Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);
// Vue.use(VuetifySnackbarQueue);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  vuetify,
  components: { App },
  render: (h) => h(App),
}).$mount("#app");
