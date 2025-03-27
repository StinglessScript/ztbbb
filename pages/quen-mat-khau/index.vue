<template>
  <div>
    <!-- <PageTitle pageTitle="Quên mật khẩu" /> -->
    <ForgotPassword />
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle.vue";
import ForgotPassword from "../../components/Auth/ForgotPassword.vue";

export default {
  name: "quen-mat-khau",
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    PageTitle,
    ForgotPassword,
  },

  mounted() {
    this.$store.commit("setLoading", false);
  },
};
</script>
