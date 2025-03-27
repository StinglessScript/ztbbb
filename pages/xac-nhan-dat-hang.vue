<template>
  <div>
    <CartConfirm />
  </div>
</template>

<script>
import CartConfirm from "../components/Cart/CartConfirm.vue";

export default {
  components: { CartConfirm },
  middleware: ["checkAuth", "middlewareHeader"],
};
</script>

<style lang="scss" scoped></style>
