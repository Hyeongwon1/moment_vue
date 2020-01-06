// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueLodash from 'vue-lodash';
import axios from 'axios';
import bottom from '@/components/bar/bottom.vue';
import top from '@/components/bar/top.vue';
import addimg from '@/components/bar/addimg.vue';
import vuetify from '@/plugins/vuetify';
import {store}  from './store'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] ='http://localhost:3000'
// axios.defaults.headers.common = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//     };

// headers: {
//     "Access-Control-Allow-Origin": "http://localhost:3000",
//           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
//           "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
//       },   
const options = { name: 'lodash' }; // customize the way you want to call it
Vue.use(VueLodash, options);
Vue.use(vuetify);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.component('navtop', top);
Vue.component('navbottom', bottom);
Vue.component('addimg', addimg);

/* eslint-disable no-new */
new Vue({
    vuetify,
    store,
    router,
    components: { App },
    render: h => h(App)
}).$mount('#app')
