<template>
  <div>
    <v-app>
      <navtop></navtop>
      <router-view></router-view>
      <navbottom></navbottom>
    </v-app>
  </div>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f2a76fe4d088dbd5f2a75aad459a5e3a"></script>
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
