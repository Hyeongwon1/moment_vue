import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Modules
import socialauth from "./modules/social.js";
import local from "./modules/local.js";
import snackbar from "./modules/snackbar.js";
const store = new Vuex.Store({
  modules: {
    socialauth,
    local,
    snackbar,
  },
});
export default store;
