<template>
  <div>
    <PageTitle pageTitle="Sản phẩm yêu thích" />
    <Shop :favorites="favorites"/>
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle.vue";
import Shop from "../../components/Shop/Shop.vue";

export default {
    middleware: ["auth", "middlewareHeader"],
  components: {
    PageTitle,
    Shop,
  },
    data() {
        return {
        favorites: true,
        };
    },
};
</script>

<style lang="scss" scoped></style>
