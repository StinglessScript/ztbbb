<template>
  <div
    :style="{
      height: $store.getters.isLoading == true ? '100vh' : 'auto',
    }"
  >
    <div v-if="details && details?.length > 0">
      <!-- <component
        v-for="(block, index) in details[0]?.attributes?.Blocks"
        :key="index"
        :is="
          `${block.__component}`.split('.')[1].charAt(0).toUpperCase() +
          `${block.__component}`.split('.')[1].slice(1)
        "
        :block="block"
      /> -->
      <BannerShop :block="details[0]" />
    </div>
    <div v-else></div>
    <ShopV3 />
  </div>
</template>

<script>
import ShopV3 from "@/components/Shop/ShopV3";
import ShopCS from "@/components/Shop/ShopNormal";
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      populate: "*",
      Blocks: {
        populate: [
          "header",
          "services.image",
          "tabs.pricings",
          "faqs",
          "features.image",
          "feedbacks.image",
          "pricings.image",
          "pricings.apps.image",
          "pricings.items",
          "pricingex",
          "contents.image",
          "info",
          "departments.items",
          "image",
          "items.image",
          "domains",
          "descriptions",
          "page_default.image",
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
const queryBanner = qs.stringify(
  {
    populate: ["image", "site", "*"],
  },
  {
    encodeValuesOnly: true,
  }
);
export default {
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    ShopV3,
    ShopCS,
  },

  data() {
    return {
      favorites: false,
      category: null,
    };
  },
  mounted() {
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },

  async asyncData({ details, $strapi, route, error, store }) {
    try {
      const response = await $strapi.find(
        // "page-defaults",
        // `?filters[slug][$eq]=cua-hang&${query}`
        "banners",
        `?filters[slug][$eq]=cua-hang&${queryBanner}`
      );
      //console.log("🚀 ~ file: index.vue:78 ~ asyncData ~ response:", response);

      if (response) {
        store.commit("setLoading", false);
        details = response.data;
      }
    } catch (e) {
      console.log("index cua hang", e);
      store.commit("setLoading", false);
      // error({ statusCode: 404, message: "Post not found" });
    }
    return { details };
  },
};
</script>
