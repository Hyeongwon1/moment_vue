<template lang="html">
  <detailView :detaildata="detaildata"></detailView>
</template>
<script>
import detailView from "@/components/list/detailView.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      profile: "socialauth/profile",
    }),
    ...mapGetters({
      detaildata: "local/detaildata",
    }),
  },
  created() {
    const data = {
      dnum: this.$route.params.id,
      mnum: this.profile.m_no,
    };
    this.dataView(data);
  },
  components: {
    detailView,
  },
  getters: {},
  methods: {
    ...mapActions({
      dataView: "local/dataView",
    }),
  },
};
</script>

<style lang="scss" scoped></style>

<style scoped></style>
