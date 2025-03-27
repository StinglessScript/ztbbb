<template>
  <div v-if="product">
    <component
      :is="product.qualify + '_CUSTOM'"
      :id="id"
      :product="product"
      :productOption="productOption.data"
      :targetID="typeId"
    />
  </div>
</template>

<script>
import BARE_METAL_CUSTOM from "@/components/Product/ProductDetailBareMetalCustom";
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
          "pricings",
          "pricingex",
          "contents.image",
          "image",
          "page_default.image",
          "child_categories.page_defaults.image",
          "child_categories.image",
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
  data: {
    return: {
      product: null,
      seo: null,
      id: null,
      details: null,
      querys: null,
      productOption: null,
    },
  },
  components: {
    BARE_METAL_CUSTOM,
  },

  async asyncData({
    id,
    product,
    productOption,
    store,
    seo,
    querys,
    route,
    redirect,
    error,
  }) {
    id = /[^-]*$/.exec(`${route.params.slug}`)[0];
    const typeId = route.query?.targetID;

    try {
      const [getProdduct, getProductOption, getSEO] = await Promise.all([
        store.dispatch("getProductByHandle", {
          handle: route.params.slug,
          build_type: 'ORDER',
        }),
        store.dispatch("getProductOptions", id),
        // store.dispatch("getSEO", {
        //   seo_type: "PRODUCT",
        //   seo_obj_id: id,
        // }),
      ]);
      product = getProdduct.data;
      productOption = getProductOption;
      // seo = getSEO
    } catch (err) {
      console.log("🚀 ~ file: _slug.vue:83 ~ err:", err);
      error({ statusCode: 404, message: "Post not found" });
      setTimeout(redirect("/cua-hang"), 10000);
      console.log("🚀 ~ file: _slug.vue:83 ~ errorrrr:",error);
    }
    return { id, product, productOption, typeId, seo };
  },

  // head() {
  //   const check = this.seo;
  //   if (check) {
  //     return {
  //       title: this.seo.title
  //         ? this.seo.title
  //         : this.product.title,
  //       link: [
  //         {
  //           hid: "canonical",
  //           rel: "canonical",
  //           href: this.$store.state.host + this.$route.path,
  //         },
  //       ],
  //       meta: [
  //         {
  //           hid: "description",
  //           name: "description",
  //           content: this.seo.description
  //             ? this.seo.description
  //             : this.product.title,
  //         },
  //         {
  //           hid: "keywords",
  //           name: "keywords",
  //           content: this.seo.keywords,
  //         },
  //         {
  //           hid: "image",
  //           name: "image",
  //           content: `${this.product.featured_image}`,
  //         },
  //       ],
  //     };
  //   }
  // },
};
</script>
