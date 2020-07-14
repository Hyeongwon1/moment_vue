<template>
  <v-layout column align-center persistent>
    <v-form ref="form" @submit.prevent="authLogin" style="margin-top: 160px;">
      <!-- <v-form ref="form" @submit.prevent="loginfn" style="margin-top: 160px;"> -->
      <v-text-field v-model="m_email" :counter="15" label="Email" :append-icon="'mail'" required></v-text-field>
      <v-text-field
        v-model="m_pw"
        :counter="15"
        label="Password"
        required
        :append-icon="'visibility'"
        :type="'password'"
      ></v-text-field>
      <v-checkbox v-model="Remember" label="Remember?" required></v-checkbox>
      <v-layout justify-center style="margin-left: 10px;">
        <v-btn type="submit" class="mr-4 lbtn">:Login</v-btn>
      </v-layout>
    </v-form>
    <div>
      <v-btn @click="authenticate('google')">구글로그인</v-btn>
    </div>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      m_email: null,
      m_pw: null,
      Remember: ""
    };
  },
  methods: {
    ...mapActions({
      localLogin: "local/LocalLogin",
      SocialLogin: "socialauth/login",
      Sauthenticate: "socialauth/authenticate"
    }),
    async loginfn() {
      // var self = this
      try {
        const loginData = {
          email: this.m_email,
          password: this.m_pw
        };
        if (!loginData.email || !loginData.password) {
          return false;
        }
        await this.localLogin(loginData);
        this.$router.push({ path: "home" });
      } catch (error) {
        console.log(error);
        this.$alert("red", "비밀번호가 다릅니다.");
      }
    },
    async authenticate(provider) {
      await this.Sauthenticate(provider);
      this.$router.push("MyPage");
    },
    async authLogin() {
      // var self = this
      try {
        const loginData = {
          email: this.m_email,
          password: this.m_pw
        };
        if (!loginData.email || !loginData.password) {
          return false;
        }
        await this.SocialLogin(loginData);
        this.$alert("info", "로그인 되었습니다.");
        this.$router.push({ path: "home" });
      } catch (error) {
        console.log(error);
        this.$alert("red", "비밀번호가 다릅니다.");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
