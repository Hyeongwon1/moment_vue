<template>
  <div>
    <loginForm />
    <signUpForm />
  </div>
</template>
<script>
import loginForm from "@/components/form/loginForm.vue";
import signUpForm from "@/components/form/signUpForm.vue";
export default {
  components: {
    loginForm,
    signUpForm
  }
};
</script>

<style lang="css">
</style>
