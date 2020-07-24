<template>
  <v-bottom-navigation :value="activeBtn" color="pink" fixed grow>
    <v-btn text v-for="bitem in bitems" :key="bitem.id" @click="nav(bitem.id)" height="55">
      <span>{{ bitem.name }}</span>
      <v-icon>{{ bitem.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  name: "bottom",
  data() {
    return {
      activeBtn: 1,
      id: "",
      bitems: [
        { name: "Home", id: 0, icon: "home" },
        { name: "Favorites", id: 1, icon: "favorite" },
        { name: "Image Up", id: 2, icon: "image" },
        { name: "search", id: 3, icon: "search" },
        { name: "mypage", id: 4, icon: "perm_identity" }
      ]
    };
  },
  components: {},
  methods: {
    nav: function(id) {
      this.id = id;
      switch (this.id) {
        case 0:
          return this.$router.push({ path: "/front/home" });
        case 1:
          return "";
        case 2:
          return this.$router.push({ path: "/front/upload" });
        case 3:
          return "";
        case 4:
          return this.$router.push({
            path: "/front/mypage"
          });
      }
    },
    home: function() {
      this.$router.push({ path: "/front/home" });
      this.$store.dispatch("homeSelect");
    },
    favorites: function() {
      // this.$router.push({ path: 'home' })
    },
    myupload: function() {
      this.$router.push({ path: "/front/upload" });
    },
    myrecorcd: function() {
      var sMemail = sessionStorage.m_email;
      console.log(sMemail);
      this.$axios
        .post("/moment/myrecord_selectdb", {
          m_email: sMemail
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
      console.log("asdasd");
      this.$router.push({
        path: "/front/mypage"
      });
    }
  }
};
</script>
<style scoped></style>
