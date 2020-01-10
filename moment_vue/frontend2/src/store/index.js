import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules
import socialauth from './social.js'
import localauth from './local.js'
const store = new Vuex.Store({
  modules: {
    socialauth,
    localauth
  }
})

export default store