<template>
  <div>
    <VerificationResetPassword />
  </div>
</template>
<script>
import VerificationResetPassword from "../../components/Auth/VerificationResetPassword.vue";
export default {
  components: { VerificationResetPassword },
  middleware: ["checkAuth", "middlewareHeader"],

  mounted() {
    this.$store.commit("setLoading", false);
  },
};
</script>
<style lang="scss"></style>
