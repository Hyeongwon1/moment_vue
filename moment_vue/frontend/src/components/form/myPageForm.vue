<template>
  <div id="mybodyhtml">
    <br />
    <v-layout>
      <v-flex xs12 sm6 offset-sm3 fluid>
        <v-card>
          <v-container grid-list-sm fluid>
            <v-layout row wrap>
              <!-- <v-flex v-for="data in datas" :key="data.d_no" xs4 d-flex>
                <v-card flat tile class="d-flex">
                  <v-img
                    :src="'/' + data.d_path"
                    :lazy-src="'/' + data.d_path"
                    :value="data.d_no"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    @click="picview"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </v-card>
              </v-flex>-->
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <a href="#" @click="logoutfn" class="btn btn-default lbtn" id="mem_logout" value="로그아웃">로그아웃</a>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      i_email: null,
      i_nick: null,
      i_date: null,
      i_pw: null,
      i_phone: null,
      errorMessages: "",
      formHasErrors: false,
      success: false,
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      },
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false
    };
  },
  computed: {},
  methods: {
    myrecorcd: function() {
      var s_m_email = sessionStorage.m_email;
      console.log(s_m_email);
      this.$axios
        .post("/moment/myrecord_selectdb", {
          m_email: s_m_email
        })
        .then(
          response => {
            this.datas = response.data;
          },
          function() {
            console.log("failed");
          }
        );
    },
    logoutfn: function() {
      sessionStorage.removeItem("m_email");
      console.log("aaaaaa");
      // 로컬스토리지 삭제
      this.$router.push({ path: "login" });
    },
    picview: function(evt) {
      console.log(evt);
      // const sNo = sessionStorage.m_no;
      // const m_no =evt.target.attributes[2].value
      // location.href = `/detail?m_no=${m_no}&s_no=${s_no}`;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>