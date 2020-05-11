
export default {
  install(Vue, { store }) {
    Vue.prototype.$alert = (color, message) => {
      store.commit("snackbar/addSnackItem", { color, message });
    };
  },
};