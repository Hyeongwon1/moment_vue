<template>
  <v-layout class="homelayout" align-stretch>
    <v-flex sm12 md12>
      <v-container grid-list-md sm12 md12>
        <v-layout row wrap>
          <v-flex v-for="data in homedata" :key="data.d_no" xs6 sm6 md4 lg3>
            <v-card>
              <v-img :src="data.d_path" height="250px" @click="picview(data.d_no)">
                <input id v-text="data.d_no" type="hidden" />
              </v-img>
              <v-card-title>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span id="mynick" class="mynick" v-text="data.m_nick"></span>
                  </v-flex>
                </v-layout>
                <v-spacer class="myage">
                  <v-img
                    class="myageimg"
                    v-if="$moment(data.m_birth).fromNow().toString().slice(0,1) == '1'"
                    src="@/assets/image/age/10s.png"
                  />
                  <v-img
                    class="myageimg"
                    v-else-if="$moment(data.m_birth).fromNow().toString().slice(0,1) == '2'"
                    src="@/assets/image/age/20s.png"
                  />
                  <v-img
                    class="myageimg"
                    v-else-if="$moment(data.m_birth).fromNow().toString().slice(0,1) == '3'"
                    src="@/assets/image/age/30s.png"
                  />
                  <v-img
                    class="myageimg"
                    v-else-if="$moment(data.m_birth).fromNow().toString().slice(0,1) == '4'"
                    src="@/assets/image/age/40s.png"
                  />
                </v-spacer>
                <v-spacer class="mykind">
                  <img
                    v-if="data.d_kind == '1'"
                    class="mykindimg"
                    src="@/assets/image/kind/eat.png"
                  />
                  <img
                    v-if="data.d_kind == '2'"
                    class="mykindimg"
                    src="@/assets/image/kind/buy.png"
                  />
                  <img
                    v-if="data.d_kind == '3'"
                    class="mykindimg"
                    src="@/assets/image/kind/enjoy.png"
                  />
                </v-spacer>
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
              <div class="regdate">{{ data.d_regdate | moment("LLLL") }}</div>
              <div class>
                <!-- {{ data.m_birth | moment("MM-DD-YYYY") }} -->
                <!-- {{ data.m_birth | moment("from", "now") }} -->
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    homedata: {
      required: true
    }
  },
  computed: {},
  filters: {},
  methods: {
    picview(no) {
      this.$router.push({ name: "detail", params: { id: no } });
    }
  }
};
</script>

<style scoped>
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
.regdate {
  font-size: 12px;
}
.myageimg {
  width: 50px;
  /* margin-top: 6px; */
}
.mykindimg {
  width: 50px;
  height: 23px;
  /* margin-top: 6px; */
}
.homelayout {
  margin-top: 50px;
  margin-bottom: 65px;
}
/* .myinputsearch {
  background-color: white;
  color: black;
} */
/* #msearch {
  background-color: white;
} */
</style>
