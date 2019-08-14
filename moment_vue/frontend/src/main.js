// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueLodash from 'vue-lodash'
import router from './router'
import axios from 'axios'

// eslint-disable-next-line import/no-webpack-loader-syntax
// import 'expose-loader?$!expose-loader?jQuery!jquery'

// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

const opts = { }
Vue.use(Vuetify)
const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options)
// Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(opts),
  router,
  components: { App },
  render: h => h(App)
})
