<template>
  <div style="background: #fcfcfd">
    <div class="container p-80">
      <!-- <SendTickedByBarebone v-if="$route.query.isBaremetal" /> -->
      <component :is="$route.query.productType" />
    </div>
  </div>
</template>

<script>
import SendTickedByNormal from "@/components/Ticked/SendTickedByNormal.vue";
import SendTickedByBarebone from "@/components/Ticked/SendTickedByBarebone.vue";
import SendTickedByPlace from "@/components/Ticked/SendTickedByPlace.vue";
export default {
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    SendTickedByBarebone,
    SendTickedByNormal,
    SendTickedByPlace,
  },
  mounted() {
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },
};
</script>

<style lang="scss" scoped>
.p-80 {
  padding: 80px;
}
@media (max-width: 768px) {
  .p-80 {
    padding: 0px;
  }
}
</style>
