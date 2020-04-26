<template>
<body id="mybodyhtml">
  <!-- <navtop></navtop> -->
  <br />
  <br />
  <v-layout align-stretch>
    <v-flex sm12 md12>
      <v-container grid-list-md sm12 md12>
        <v-layout row wrap>
          <v-flex
            v-for="data in this.$store.state.local.home_data"
            :key="data.d_no"
            xs6
            sm6
            md4
            lg3
          >
            <v-card>
              <!--  여기 컴포넌트로 -->
              <v-img :src="data.d_path" height="250px" @click="picview(data.d_no)">
                <input id v-text="data.d_no" type="hidden" />
              </v-img>
              <v-card-title>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span id="mynick" class="mynick" v-text="data.m_nick"></span>
                  </v-flex>
                </v-layout>
                <div class="myage" id="myage">
                  <v-img class="myageimg" v-bind:src="'/image/age/' + data.m_age + '0s.png'" />
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer>
                  <v-icon v-for="data in data.d_star" :key="data.d_no" color="teal">star</v-icon>
                </v-spacer>
                <v-btn icon>
                  <v-icon color="red">favorite</v-icon>
                </v-btn>
                <p class v-text="data.d_like"></p>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
  <!-- <navbottom></navbottom> -->
</body>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("homeSelect");
  },
  watch: {},
  components: {},
  data() {
    return {
      datano: "",
      datas: [],
      pupps: "",
      id: "",
      d_no: "",
      data_num: "",
      tab: null
    };
  },
  methods: {
    async picview(no) {
      const viewData = {
        dnum: no,
        mnum: this.$store.state.socialauth.profile.m_no
      };
      await this.$store.dispatch("dataView", viewData);
      this.$router.push({ name: "Detail", params: { id: no } });
    }
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
/* #odbtn {
  width: 100%;
  background-color: antiquewhite;
  font-size: 17pt;
  color: #007bff;
  font-family: "Am";
  margin-top: 50px;
  height: 55px;
  border: 0px;
} */
.myinputsearch {
  background-color: white;
  color: black;
}
#msearch {
  background-color: white;
}
</style>
