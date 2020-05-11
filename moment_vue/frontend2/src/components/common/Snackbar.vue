<template>
  <v-snackbar-queue :timeout="3000" :items="items" :top="true" @remove="removeItem"></v-snackbar-queue>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import VSnackbarQueue from "@/components/common/VSnackbarQueue.vue";
export default {
  name: "Snackbar",
  computed: {
    ...mapGetters({
      items: "snackbar/snackItems"
    })
  },
  components: {
    // VSnackbarQueue,
  },
  methods: {
    removeItem(id) {
      this.removeSnackAction({ id: id });
    },
    ...mapActions({
      removeSnackAction: "snackbar/removeSnackAction"
    })
  }
};
</script>

<style scoped></style>
