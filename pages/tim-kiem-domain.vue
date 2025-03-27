<template>
  <div style="width: 100%; padding-top: 30px; padding-bottom: 30px">
    <div class="container" style="margin-top: 24px">
      <div class="row">
        <DomainManager :groupId="$route.query.domainGroup" />
      </div>
    </div>
  </div>
</template>

<script>
import DomainManager from "../components/Domain/DomainManager.vue";
export default {
  components: {
    DomainManager,
  },
  middleware: ["checkAuth", "middlewareHeader"],

  mounted() {
    setTimeout(() => {
      this.$store.commit("setLoading", false);
    }, 1000);
  },
};
</script>
