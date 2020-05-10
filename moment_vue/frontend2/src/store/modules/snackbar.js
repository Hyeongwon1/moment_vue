import Vue from "vue";
import Vuex from "vuex";
import VueAxios from "vue-axios";
import axios from "axios";

// import router from './router';
Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default {
  namespaced: true,
  state: {
    snackid: 0,
    snackItems: [],
  },
  getters: {
    snackItems(state) {
      return state.snackItems;
    },
  },
  mutations: {
    addSnackItem(state, payload) {
      state.snackItems.push({
        id: state.snackid++,
        color: payload.color,
        message: payload.message,
      });
    },
    removeSnackItem(state, payload) {
      console.log("mutatin");
      console.log(payload.id);
      const index = state.snackItems.findIndex(
        (item) => item.id === payload.id
      );
      console.log("index");
      console.log(index);
      if (index !== -1) {
        state.snackItems.splice(index, 1);
      }
    },
  },
  actions: {
    addSnackAction(context, payload) {
      const datas = {
        color: payload.color,
        message: payload.message,
      };
      context.commit("addSnackItem", datas);
    },
    removeSnackAction(context, payload) {
      console.log("payload");
      console.log(payload);
      context.commit("removeSnackItem", payload);
    },
  },
};
