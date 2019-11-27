/* eslint-disable no-undef */ 2<template>
  <div class="loginbody">
    <navtop :id="id" @aaarr="initt"></navtop>
    <v-layout column align-center persistent>
      <v-form ref="form" @submit.prevent="loginfn" style="margin-top: 160px;">
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
    </v-layout>
    <br />
    <br />
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
    <navbottom></navbottom>
  </div>
</template>
<script>
import router from "@/router";
export default {
  created() {},
  data() {
    return {
      datas: [],
      m_email: null,
      m_pw: null,
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
  components: {},
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
    loginfn: function() {
      // var self = this
      if (this.m_email != null && this.m_pw != null) {
        this.$axios
          .post(`/moment/mem_logindb`, {
            m_email: this.m_email,
            m_pw: this.m_pw
          })
          .then(res => {
            console.log(res);
          });
        // if (result.data !== "" && result.data != null) {
        //   sessionStorage.setItem("m_email", this.m_email);
        //   localStorage.setItem("m_email", this.m_email);
        //   sessionStorage.setItem("m_no", result.data[0].m_no);
        //   router.push({ path: "home" });
        // }
      }
    },
    signUp: async function() {
      this.formHasErrors = false;
      console.log(this.form);
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
      if (this.formHasErrors === false) {
        this.$axios
          .post("/moment/mem_insertdb", {
            i_nick: this.i_nick,
            i_email: this.i_email,
            i_pw: this.i_pw,
            i_date: this.i_date,
            i_phone: this.i_phone
          })
          .then(
            response => {
              console.log(response.data);
              if (response.data === "success") {
                router.push({ path: "login" });
              } else {
                console.log(response.data);
                console.log(response.data.sqlMessage);
                const aa = _.includes(response.data.sqlMessage, "m_email");
                const bb = _.includes(response.data.sqlMessage, "m_nick");
                if (aa === true || bb === true) {
                  console.log("걸렸네!");
                  if (aa === true) {
                    alert("email 중복되었습니다.");
                  } else {
                    alert("nick 중복되었습니다.");
                  }
                } else {
                  console.log("안걸렸네!");
                  this.errorMessages = [];
                  this.formHasErrors = false;
                  Object.keys(this.form).forEach(f => {
                    this.$refs[f].reset();
                  });
                  this.dialog = false;
                  alert("가입완료.");
                }
              }
            },
            function() {
              console.log("failed");
            }
          );
      }
    }
  }
};
</script>

<style lang="css">
@font-face {
  font-family: "나눔고딕";
  src: url("/font/NANUMBARUNGOTHIC.TTF");
}

@font-face {
  font-family: "설렘";
  src: url("/font/210 설렘주의B.ttf");
}

@font-face {
  font-family: "PP";
  src: url("/font/Typo_PapyrusM.ttf");
}

@font-face {
  font-family: "Am";
  src: url("/font/AmaticSC-Regular.ttf");
}

.loginf {
  /* background-color: antiquewhite; */
  font-family: "나눔고딕";
  color: #007bff;
  font-size: 20pt;
}
.form-group {
  font-family: "나눔고딕";
  color: #007bff;
  font-size: 20pt;
}
.form-control {
  border: 1px solid #999;
  /* border-radius: 0; */
}
.btn-group {
  font-family: "AM";
  width: 100%;
}
</style>
