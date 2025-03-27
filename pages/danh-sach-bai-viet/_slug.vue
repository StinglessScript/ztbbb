<template>
  <div>
    <BlogGridOne />
  </div>
</template>

<script>
import BlogGridOne from "../../components/Blog/BlogGridOne.vue";
export default {
  components: [BlogGridOne],
  middleware: ["checkAuth", "middlewareHeader"],
  mounted() {
    setTimeout(() => {
      this.$store.commit("setLoading", false);
    }, 1000);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },
};
</script>

<style lang="scss" scoped></style>
