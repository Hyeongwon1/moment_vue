<template>
  <homeListItems :homedata="homedata"></homeListItems>
</template>
<script>
import homeListItems from "@/components/list/homeListItems.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.homeSelect();
  },
  watch: {},
  props: {},
  computed: {
    ...mapGetters({
      homedata: "local/homedata"
    })
  },
  components: {
    homeListItems
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

<style></style>
