<template>
  <div class="mt-10">
    <!-- <PageTitle pageTitle="Đăng kí tài khoản" /> -->
    <Register />
  </div>
</template>

<script>
import PageTitle from "@/components/Common/PageTitle.vue";
import Register from "@/components/Auth/Registerv2.vue";

export default {
  name: "dang-ky",
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    PageTitle,
    Register,
  },

  mounted(){
    this.$store.commit("setLoading", false);
  }
};
</script>
