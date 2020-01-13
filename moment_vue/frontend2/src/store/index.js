import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules
import socialauth from './modules/social.js'
import localauth from './modules/local.js'
const store = new Vuex.Store({
  modules: {
    socialauth,
    localauth
  }
})
export default store