<template>
  <User />
</template>

<script>
import User from "@/components/User/";
export default {
  middleware: ["auth", "middlewareHeader"],
  components: {
    User,
  },
};
</script>

<style lang="scss" scoped></style>
