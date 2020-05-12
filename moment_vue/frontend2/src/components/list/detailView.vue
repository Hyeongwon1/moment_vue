<template>
  <div>
    <v-card
      v-for="data in detaildata"
      :key="data.d_no"
      :loading="loading"
      class="mx-auto my-12"
      max-width="874"
    >
      <!-- <v-img :src="'/' + data.d_path"></v-img> -->
      <v-carousel hide-delimiters>
        <v-carousel-item :src="data.d_path"></v-carousel-item>
      </v-carousel>
      <v-card-title>{{ data.d_title }}</v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-rating
            :value="data.d_star"
            color="amber"
            half-increments
            dense
            size="14"
            readonly
          ></v-rating>

          <div class="grey--text ml-4">{{ data.d_star }} (413)</div>
        </v-row>

        <div class="my-4 subtitle-1 black--text">
          {{ data.d_content }}
        </div>

        <div>
          {{ data.d_location }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <div class="title text--primary">Tonight's availability</div>
        <v-chip-group
          v-model="selection"
          active-class="deep-purple accent-4 white--text"
          column
        >
          <v-chip>5:30PM</v-chip>
          <v-chip>7:30PM</v-chip>
          <v-chip>8:00PM</v-chip>
          <v-chip>9:00PM</v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-actions>
        <v-btn color="deep-purple accent-4" text>
          Reserve
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selection: "",
      loading: "loading",
    };
  },
  props: {
    detaildata: {},
  },
  methods: {
    name() {},
  },
};
</script>

<style lang="scss" scoped></style>
