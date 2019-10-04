// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueLodash from 'vue-lodash';
import router from './router';
import axios from 'axios';
import bottom from '@/components/bar/bottom.vue';
import top from '@/components/bar/top.vue';
import addimg from '@/components/bar/addimg.vue';
const opts = {
	icons: {
		iconfont: 'md',
	},
};
Vue.use(Vuetify);
const options = { name: 'lodash' }; // customize the way you want to call it
Vue.use(VueLodash, options);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.component('navtop', top);
Vue.component('navbottom', bottom);
Vue.component('addimg', addimg);

/* eslint-disable no-new */
new Vue({
	el: '#app',
	vuetify: new Vuetify(opts),
	router,
	components: { App },
	render: h => h(App),
});
