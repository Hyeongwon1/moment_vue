<template>
  <v-layout class="homelayout" align-stretch>
    <v-flex sm12 md12>
      <v-container grid-list-md sm12 md12>
        <v-layout row wrap>
          <HomeListItems
            v-for="data in this.$store.state.local.home_data"
            :key="data.d_no"
            :data="data"
          ></HomeListItems>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>
<script>
import HomeListItems from "@/components/list/HomeListItems.vue";
export default {
  created() {
    this.$store.dispatch("homeSelect");
  },
  watch: {},
  components: {
    HomeListItems,
  },
  data() {
    return {
      datano: "",
      datas: [],
      pupps: "",
      id: "",
      d_no: "",
      data_num: "",
      tab: null,
    };
  },
  methods: {},
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
