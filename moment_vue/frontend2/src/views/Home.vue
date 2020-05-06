<template>
  <HomeListItems :homedata="homedata"></HomeListItems>
</template>
<script>
import HomeListItems from "@/components/list/HomeListItems.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.homeSelect();
  },
  watch: {},
  computed: {
    ...mapGetters({
      homedata: "local/homedata"
    })
  },
  components: {
    HomeListItems
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      homeSelect: "local/homeSelect"
    })
  }
};
</script>

<style>
@font-face {
  font-family: "Am";
  src: url("/font/AmaticSC-Regular.ttf");
}
@font-face {
  font-family: "설렘";
  src: url("/font/210 설렘주의B.ttf");
}
@font-face {
  font-family: "나눔고딕";
  src: url("/font/NANUMBARUNGOTHIC.TTF");
}

div p.loctxt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mynick {
  font-family: "설렘";
  float: left;
  margin-right: 15px;
  font-size: 20px;
}
.myage {
  font-size: 15px;
  margin-bottom: 10px;
}
.myageimg {
  width: 50px;
  /* margin-top: 6px; */
}
.homelayout {
  margin-top: 55px;
  margin-bottom: 65px;
}
.myinputsearch {
  background-color: white;
  color: black;
}
#msearch {
  background-color: white;
}
</style>
