<template lang="html">
  <body id="mybodyhtml">
    <GmapMap
      :center="{ lat: 10, lng: 10 }"
      :zoom="7"
      map-type-id="terrain"
      style="width: 500px; height: 1300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </body>
</template>
<script>
export default {
  created() {
    this.$axios
      .get(
        "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/stores/json",
        {}
      )
      .then(
        response => {
          console.log(response.data);
          this.pupps = response.data;
        },
        function() {
          console.log("failed");
        }
      );
  },
  data() {
    return {
      pupps: []
    };
  },
  components: {},
  methods: {
    fnhome: function() {
      location.href = "/home";
    },
    myupload: function() {
      location.href = "/upload";
    },
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
    mypage: function() {
      location.href = "/mypage";
    },
    pupp: function() {
      location.href = "/pupp1";
    },
    sendpupp: function() {
      // this.$axios.post("/moment/pupp", {}).then(
      //   response => {
      //     console.log(response);
      //     console.log(response.data);
      //     this.pupps = response.data;
      //   },
      //   function() {
      //     console.log("failed");
      //   }
      // );
    }
  }
};
</script>

<style>
.h1_pupp {
  border-top: 1px solid lightgray;
}
</style>
