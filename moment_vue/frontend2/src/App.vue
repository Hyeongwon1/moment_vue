<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>
<script
  type="text/javascript"
  src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f2a76fe4d088dbd5f2a75aad459a5e3a"
></script>
<script>
export default {
  created() {},
  data() {
    return {
      datas: [],
    };
  },
  components: {},
  methods: {},
};
</script>

<style>
@font-face {
  font-family: "Am";
  src: url("assets/font/AmaticSC-Regular.ttf");
}
@font-face {
  font-family: "설렘";
  src: url("assets/font/210 설렘주의B.ttf");
}
@font-face {
  font-family: "나눔고딕";
  src: url("assets/font/NANUMBARUNGOTHIC.TTF");
}
</style>
