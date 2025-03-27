<template>
  <div>
    <UpdateRegisterSocial v-if="$route.query.typeLogin == 'oauth'" />
    <UpdateRegister v-else />
  </div>
</template>
<script>
import UpdateRegister from "../../components/Auth/UpdateRegister.vue";
import UpdateRegisterSocial from "../../components/Auth/UpdateRegisterSocial.vue";

export default {
  name: "cap-nhat-dang-ky",
  middleware: ["checkExpiredToken", "checkAuth", "middlewareHeader"],
  components: { UpdateRegister, UpdateRegisterSocial },

  mounted(){
    this.$store.commit("setLoading", false);
  }
};
</script>
<style lang="scss"></style>
