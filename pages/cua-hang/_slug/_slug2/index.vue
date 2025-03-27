<template>
  <div
    :style="{
      height: $store.getters.isLoading == true ? '100vh' : 'auto',
    }"
  >
    <div v-if="details && details?.length > 0">
      <component
        v-for="(block, index) in details[0]?.attributes?.Blocks"
        :key="index"
        :is="
          `${block.__component}`.split('.')[1].charAt(0).toUpperCase() +
          `${block.__component}`.split('.')[1].slice(1)
        "
        :block="block"
      />
    </div>
    <div v-else></div>
    <ShopV3 :category="category"/>
  </div>
</template>

<script>
import PageTitle from "@/components/Common/PageTitle";
import ShopV3 from "@/components/Shop/ShopV3";
// import ShopCS from "@/components/Shop/ShopCS";
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
    PageTitle,
    ShopV3,
    ShopCS,
  },

  mounted() {
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },

  async asyncData({ details, category, seo, $strapi, store, route, error }) {
    const id = /[^-]*$/.exec(`${route.params.slug}`)[0];
    try {
      const response = await $strapi.find(
        // "page-defaults",
        // `?filters[slug][$eq]=${route.params.slug}&${query}`
        "banners",
        `?filters[slug][$eq]=${route.params.slug}&${queryBanner}`
      );
      const data = { store: route.query.store, slug: route.params.slug2 };

      const categoryBySlug = await store.dispatch(
        "getDeltailCategoryByHandle",
        data
      );
      const reSeo = await store.dispatch("getSEO", {
        seo_type: "CATEGORY",
        seo_obj_id: categoryBySlug.data.id,
      });
      const result = {};
      reSeo?.forEach((item) => {
        const { type, content } = item;
        result[type] = content;
      });
      // seo = reSeo?.forEach((item) => {
      //   const { type, content } = item;
      //   result[type] = content;
      // });
      seo = result;
      details = response.data;
      category = categoryBySlug.data;
      store.commit("setLoading", false);
      return { details, seo, category };
    } catch (e) {
      store.commit("setLoading", false);
    }
  },
  head() {
    return {
      title: this.seo?.TITLE || this.category?.title,
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: this.$route.path,
        },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.seo?.DESCRIPTION || "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.seo?.KEYWORDS || "",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.seo?.DESCRIPTION || "",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.seo?.TITLE || "",
        },
      ],
    };
  },

  data() {
    return {
      favorites: false,
      category: null,
      detail: null,
      seo: null,
    };
  },
};
</script>
