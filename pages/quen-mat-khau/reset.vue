<template>
  <div>
    <!-- <PageTitle pageTitle="Tạo lại mật khẩu" /> -->
    <ResetPassword />
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle.vue";
import ResetPassword from "../../components/Auth/ResetPassword.vue";

export default {
  name: "dang-nhap",
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    PageTitle,
    ResetPassword,
  },

  mounted() {
    this.$store.commit("setLoading", false);
  },
};
</script>
