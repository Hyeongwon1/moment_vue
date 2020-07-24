<template>
  <myPageForm></myPageForm>
</template>
<script>
import myPageForm from "@/components/form/myPageForm.vue";
import { mapActions } from "vuex";
export default {
  created() {
    this.loginCheck();
  },
  components: { myPageForm },
  computed: {
    // ...mapGetters({
    //   homedata: "local/loginCheck"
    // })
  },
  methods: {
    ...mapActions({
      loginCheck: "local/loginCheck"
    })
  }
};
</script>

<style>
</style>
