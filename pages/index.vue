<template>
  <div>
    <component
      v-for="(block, index) in content?.attributes?.Blocks"
      :key="index"
      :is="
        `${block.__component}`.split('.')[1].charAt(0).toUpperCase() +
        `${block.__component}`.split('.')[1].slice(1)
      "
      :block="block"
    />
  </div>
</template>

<script>
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      Blocks: {
        populate: [
          "header",
          "services.image",
          "tabs.pricings",
          "faqs",
          "features",
          "feedbacks.image",
          "pricings",
          "pricingex",
          "image",
          // "child_categories.page_defaults.image",
          "child_categories.ListPages.page_default.image",
          "child_categories.image",
          "preferentials.items",
          "*",
        ],
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export default {
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      content: null,
    };
  },
  mounted() {
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },
  async asyncData({ content, $strapi, error }) {
    try {
      const response = await $strapi.$index.find(query);
      console.log("response.data", response.data);
      content = response.data;
    } catch (e) {
      error({ statusCode: 404, message: "Post not found" });
      console.log("buggggg", e);
    }
    return { content };
  },
};
</script>

<style lang="scss" scoped></style>
