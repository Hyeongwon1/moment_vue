<template>
  <HomeListItems :homedata="homedata"></HomeListItems>
</template>
<script>
import HomeListItems from "@/components/list/HomeListItems.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.homeSelect();
  },
  watch: {},
  computed: {
    ...mapGetters({
      homedata: "local/homedata"
    })
  },
  components: {
    HomeListItems
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      homeSelect: "local/homeSelect"
    })
  }
};
</script>

<style>
</style>
