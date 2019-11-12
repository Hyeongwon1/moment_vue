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

const options = { name: 'lodash' }; // customize the way you want to call it
Vue.use(VueLodash, options);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.component('navtop', top);
Vue.component('navbottom', bottom);
Vue.component('addimg', addimg);

/* eslint-disable no-new */
new Vue({
    router,
    components: { App },
    vuetify,
    render: h => h(App)
}).$mount('#app')
