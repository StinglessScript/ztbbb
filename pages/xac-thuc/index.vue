<template>
  <div>
    <!-- <PageTitle pageTitle="Xác thực email" /> -->
    <Verification />
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle.vue";
import Verification from "../../components/Auth/Verificationv2.vue";

export default {
  name: "dang-nhap",
  components: {
    PageTitle,
    Verification,
  },
  mounted(){
    this.$store.commit("setLoading", false);
  }
};
</script>
