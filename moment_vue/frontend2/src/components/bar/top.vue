<template>
  <div>
    <v-app-bar app dense>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="pa-1"></div>
      <router-link to="/front/home">
        <v-toolbar-title class="head_moment">{{ title }}</v-toolbar-title>
      </router-link>
      <div class="pa-12"></div>
      <v-tabs v-model="model" slider-color="pink">
        <v-tab
          v-for="item in items"
          :key="item.id"
          v-model="model"
          class="hidden-sm-and-down"
          @click="homeselect(item.id)"
          >{{ item.name }}</v-tab
        >
      </v-tabs>
      <v-btn
        v-if="ordBy == 'lk'"
        text
        style="margin-left: -320px;"
        @click="ordnwlk('nw')"
        >NEW ▼</v-btn
      >
      <v-btn v-else text style="margin-left: -320px;" @click="ordnwlk('lk')"
        >LIKE ▼</v-btn
      >
      <v-text-field
        text
        v-model="searchloc"
        placeholder="search location"
        v-on:keyup.enter="onEnter"
        hide-details
        style="max-width: 210px;"
      />
      <v-btn text @click="onEnter" style="margin-right: -15px;">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn class="hidden-sm-and-down" text @click="login()">
        <span v-if="isLogin">Logout</span>
        <span v-else>Login</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-avatar>
          <!-- <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img> -->
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ proFile.email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list dense>
        <v-list-item-content>
          <v-list-item
            v-for="title in titles"
            :key="title.id"
            @click="test(title.id)"
          >
            <v-list-item-icon>
              <v-icon>{{ title.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ title.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group v-model="model" active-class="border" color="pink">
          <v-list-item
            v-for="item in items"
            :key="item.id"
            @click="homeselect(item.id)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-content>
          <v-list-item @click="login(title.id)">
            <v-list-item-icon>
              <v-icon>map</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <span v-if="isLogin">Logout</span>
                <span v-else>Login</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list>
    </v-navigation-drawer>
    <!-- <snackbar></snackbar> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import snackbar from "@/components/common/Snackbar.vue";
export default {
  name: "top",
  created() {},
  data() {
    return {
      drawer: false,
      title: "IN THE MOMENT",
      searchloc: "",
      model: 1,
      items: [
        { name: "ALL", id: "0", icon: "dashboard" },
        { name: "EAT", id: "1", icon: "restaurant_menu" },
        { name: "BUY", id: "2", icon: "money" },
        { name: "ENJOY", id: "3", icon: "map" },
      ],
      titles: [
        { name: "PUPP", id: "88", icon: "dashboard" },
        { name: "MaskTest", id: "77", icon: "dashboard" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "socialauth/isLogin",
      proFile: "socialauth/profile",
      ordBy: "local/ordby",
    }),
  },
  props: {},
  watch: {},
  components: {
    // snackbar,
  },
  methods: {
    ...mapActions({
      logout: "socialauth/logout",
      homeSelect: "local/homeSelect",
      addSnackAction: "snackbar/addSnackAction",
    }),
    test(id) {
      if (id === "88") {
        this.$router.push({ path: "/front/pupp1" });
      } else {
        this.$router.push({ path: "/front/mask" });
      }
    },
    async login(id, authFlag) {
      const path = `/front/login`;
      if (this.isLogin) {
        await this.logout(authFlag);
        const alertdata = {
          color: "red",
          message: "로그아웃 되었습니다.",
        };
        await this.addSnackAction(alertdata);
        this.$router.push({ path: "/front/login" });
      } else {
        if (this.$route.path !== path) this.$router.push(path);
      }
    },
    async homeselect(id) {
      const path = `/front/home`;
      if (this.$route.path !== path) this.$router.push(path);
      await this.homeSelect({ kind: id });
    },
    onEnter() {
      this.homeSelect({ loc: this.searchloc });
    },
    ordnwlk(param) {
      this.homeSelect({ ord: param });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.head_moment {
  color: black;
  font-family: "Am";
  font-size: 29px;
}
</style>
