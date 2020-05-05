<template>
  <v-flex xs6 sm6 md4 lg3>
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
          pre {{ "@/assets/image/age/" + data.m_age + "0s.png" }}
          <v-img
            class="myageimg"
            :src="'@/assets/image/age/' + data.m_age + '0s.png'"
          />
          <!-- <v-img src="@/assets/image/age/30s.png" alt="" /> -->
        </div>
      </v-card-title>
      <v-card-actions>
        <v-spacer>
          <v-icon v-for="data in data.d_star" :key="data.d_no" color="teal"
            >star</v-icon
          >
        </v-spacer>
        <v-btn icon>
          <v-icon color="red">favorite</v-icon>
        </v-btn>
        <p class v-text="data.d_like"></p>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async picview(no) {
      const viewData = {
        dnum: no,
        mnum: this.$store.state.socialauth.profile.m_no,
      };
      await this.$store.dispatch("dataView", viewData);
      this.$router.push({ name: "detail", params: { id: no } });
    },
  },
};
</script>

<style></style>
