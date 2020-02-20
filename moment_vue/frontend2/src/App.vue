<template>
  <div>
    <v-app>
      <navtop></navtop>
      <router-view></router-view>
      <navbottom></navbottom>
    </v-app>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      datas: []
    };
  },
  components: {},
  methods: {}
};
</script>

<style></style>
