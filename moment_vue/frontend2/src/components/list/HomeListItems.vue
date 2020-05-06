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
                <div class="myage" id="myage">
                  pre {{ "@/assets/image/age/" + data.m_age + "0s.png" }}
                  <v-img class="myageimg" :src="'@/assets/image/age/' + data.m_age + '0s.png'" />
                  <!-- <v-img src="@/assets/image/age/30s.png" alt="" /> -->
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    homedata: {
      required: true
    }
  },
  computed: {
    ...mapGetters({
      profile: "socialauth/profile"
    })
  },
  methods: {
    ...mapActions({
      dataView: "local/dataView"
    }),
    async picview(no) {
      const viewData = {
        dnum: no,
        mnum: this.profile.m_no
      };
      // await this.$store.dispatch("dataView", viewData);
      await this.dataView(viewData);
      this.$router.push({ name: "detail", params: { id: no } });
    }
  }
};
</script>

<style></style>
