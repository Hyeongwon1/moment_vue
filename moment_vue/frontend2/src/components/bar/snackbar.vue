<template>
  <v-snackbar v-model="data" :timeout="timeout" :top="y === 'top'">
    {{ text }}
    <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      y: "top",
      text: "My timeout is set to 2000.",
      timeout: 2000
    };
  },
  props: {
    data: {}
  }
};
</script>

<style lang="scss" scoped>
</style>