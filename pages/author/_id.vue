<template>
  <div>
    <AuthorManager :author="author" :article="article" />
    <Seo :block="author?.attributes?.metaData" />
  </div>
</template>

<script>
import AuthorManager from "@/components/Author/AuthorManager.vue";
import Seo from "@/components/Seo/Seo.vue";
const qs = require("qs");
export default {
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    AuthorManager,
  },

  mounted() {
    this.$store.commit("setLoading", false);
  },

  async asyncData({ store, route, error, $strapi, $sdk }) {
    const query = qs.stringify(
      {
        populate: [
          "id",
          "name",
          "imageUrl",
          "short_description",
          "avatar",
          "metaData",
          "metaData.image",
        ],
      },
      { encodeValuesOnly: true }
    );

    const queryDeep = qs.stringify(
      { populate: "deep" },
      { encodeValuesOnly: true }
    );

    try {
      const response = await $strapi.find(
        `authors`,
        `?filters[slug][$eq]=${route.params.id}&${query}`
      );
      //console.log("🚀 ~ asyncData ~ response:", response);

      //console.log("🚀 ~ asyncData ~ response:", response?.data[0]);
      const article = await $strapi.find(
        "articles",
        `?filters[author][slug][$eq]=${route.params.id}&${queryDeep}`
      );

      return {
        author: response?.data[0] || null,
        article,
      };
    } catch (err) {
      console.log("err", err);
      error({ statusCode: 404, message: "Post not found" });
      return {
        author: null,
        article: null,
      };
    }
  },
};
</script>
