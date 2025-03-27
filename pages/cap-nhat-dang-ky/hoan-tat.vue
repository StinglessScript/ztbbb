<template>
  <div>
    <CompleteRegister />
  </div>
</template>
<script>
import CompleteRegister from "../../components/Auth/CompleteRegister.vue";
export default {
  components: { CompleteRegister },
  middleware: ["checkAuth", "middlewareHeader", "checkExpiredToken"],
  
  mounted() {
    this.$store.commit("setLoading", false);
  },
};
</script>
<style lang=""></style>
