import Vue from "vue";
import Vuetify from "vuetify/lib";
import VuetifySnackbarQueue from "vuetify-snackbar-queue";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
Vue.use(VuetifySnackbarQueue);

const opts = {theme: {
    dark: true,
  },
};

export default new Vuetify(opts);
