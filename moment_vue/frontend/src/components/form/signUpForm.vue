<template>
  <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color v-on="on">:Sign Up</v-btn>
      </template>

      <v-card ref="form">
        <v-card-title>
          <span class="headline">회원가입</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  ref="i_nick"
                  v-model="i_nick"
                  label="Nick name*"
                  :rules="[() => !!i_nick || 'This field is required']"
                  :error-messages="errorMessages"
                  prepend-icon="account_box"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  ref="i_email"
                  v-model="i_email"
                  :rules="[rules.email]"
                  label="Email*"
                  prepend-icon="email"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  ref="i_pw"
                  v-model="i_pw"
                  label="Password*"
                  :rules="[rules.required]"
                  prepend-icon="visibility_off"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="i_date"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="i_date"
                      ref="i_date"
                      label="BirthDay*"
                      :rules="[() => !!i_date || 'This field is required']"
                      prepend-icon="event"
                      readonly
                      required
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="i_date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color @click="menu = false">Cancel</v-btn>
                    <v-btn text color @click="$refs.menu.save(i_date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field
                  v-model="i_phone"
                  ref="i_phone"
                  label="Phone*"
                  :rules="[() => !!i_phone || 'This field is required']"
                  prepend-icon="phone"
                  required
                  return-masked-value
                  mask="###-####-####"
                  hint="010-0000-0000"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small></small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="signUp">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
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
  computed: {
    form() {
      return {
        i_nick: this.i_nick,
        i_email: this.i_email,
        i_pw: this.i_pw,
        i_date: this.i_date,
        i_phone: this.i_phone
      };
    }
  },
  methods: {
    ...mapActions({
      localSignUp: "local/localSignUp"
    }),
    async signUp() {
      this.formHasErrors = false;
      console.log(this.form);
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (this.formHasErrors === false) {
        const signData = {
          nickName: this.i_nick,
          userName: this.i_nick,
          email: this.i_email,
          password: this.i_pw,
          birthDay: this.i_date,
          phoneNumber: this.i_phone
        };
        const res = await this.localSignUp(signData);
        console.log("res");
        console.log(res);
        if (res.data === "success") {
          this.errorMessages = [];
          this.formHasErrors = false;
          Object.keys(this.form).forEach(f => {
            this.$refs[f].reset();
          });
          this.dialog = false;
          alert("가입완료.");
          this.$router.push({ path: "login" });
        } else {
          const aa = _.includes(res.data.sqlMessage, "m_email");
          const bb = _.includes(res.data.sqlMessage, "m_nick");
          if (aa === true || bb === true) {
            console.log("걸렸네!");
            if (aa === true) {
              alert("email 중복되었습니다.");
            } else {
              alert("nick 중복되었습니다.");
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>