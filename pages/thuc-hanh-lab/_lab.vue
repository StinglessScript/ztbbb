<template>
  <div>
    <div>
      <!-- <div v-if="details?.length > 0">
        <component
          v-for="(block, index) in details[0]?.attributes.Blocks"
          :key="index"
          :is="dynamicComponentName(block.__component)"
          :block="block"
        />
      </div> -->
      <BlogDetailsAndLabs
        v-if="articles?.length > 0"
        :article="articles[0]"
        :quickLap="dataStempQuickLap"
        :categories="categories"
        :listTags="listTags"
        :listblog="listblog"
        :pageUrl="pageUrl"
        :articalID="articalID"
      />
      <div v-if="articles?.length <= 0">
        <div class="page-title-area" style="margin-top: 70px">
          <div class="d-table">
            <div class="d-table-cell">
              <div class="container">
                <!-- <h1>{{ article.attributes.title }}</h1> -->
                <h1>Chưa có nội dung</h1>
              </div>
            </div>
          </div>
        </div>

        <div class="shape1">
          <img src="~/assets/img/shape1.png" alt="shape" />
        </div>
        <div class="shape2 rotateme">
          <img src="~/assets/img/shape2.svg" />
        </div>
        <div class="shape3">
          <img src="~/assets/img/shape3.svg" />
        </div>
        <div class="shape4">
          <img src="~/assets/img/shape4.svg" />
        </div>
        <div class="shape5">
          <img src="~/assets/img/shape5.png" alt="shape" />
        </div>
        <div class="shape6 rotateme">
          <img src="~/assets/img/shape4.svg" />
        </div>
        <div class="shape7">
          <img src="~/assets/img/shape4.svg" />
        </div>
        <div class="shape8 rotateme">
          <img src="~/assets/img/shape2.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogDetailsAndLabs from "../../components/Blog/BlogDetailsAndLabs.vue";
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
          "domains",
          "descriptions",
          "page_default.image",
          // "child_categories.page_defaults.image",
          "child_categories.ListPages.page_default.image",
          "child_categories.image",
          "preferentials.items",
          "Items",
          "listQuestion",
          "categories",
          "icon",
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
  layout: "default",
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      // details: null,
      pages: 1,
      pageSize: 25,
      maxPages: 10,
      detail: null,
      seo: null,
      category: {},
    };
  },
  mounted() {
    //this.fetchArticalFromCategories();
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },

  methods: {
    dynamicComponentName(component) {
      const componentName = component.split(".")[1];
      return componentName.charAt(0).toUpperCase() + componentName.slice(1);
    },
  },

  async asyncData({ route, $strapi, store, $sdk, req, error }) {
    try {
      //console.log("🚀 ~ asyncData ~ route.params.lab:", route.params.lab)
      const queryDeep = qs.stringify(
        { populate: "deep" },
        { encodeValuesOnly: true }
      );

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
                "domains",
                "descriptions",
                "page_default.image",
                // "child_categories.page_defaults.image",
                "child_categories.ListPages.page_default.image",
                "child_categories.image",
                "preferentials.items",
                "Items",
                "listQuestion",
                "categories",
                "icon",
                "*",
              ],
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const query2 = qs.stringify(
        {
          populate: {
            categories: {
              populate: "*", // Lấy tất cả thông tin trong categories
            },
            tags: true, // Hoặc sử dụng populate: '*' nếu cần
            author: true,
            metaData: {
              populate: "image", // Chỉ lấy image từ metaData
            },
            cover: true,
            sites: {
              populate: "*", // Lấy tất cả thông tin trong sites
            },
            articles: {
              populate: "*", // Lấy tất cả thông tin trong articles
            },
            layout: {
              populate: "*", // Lấy tất cả thông tin trong articles
            },
            mainCategory: {
              populate: "*",
            },
          },
        },
        { encodeValuesOnly: true }
      );
      let listRelatedInfor = [];
      let dataStempQuickLap = [];
      const articlePresent = await $strapi.find(
        "articles",
        `?filters[slug][$eq]=${route.params.lab}&${query2}`
      );

      // const dataStempQuickLap = {
      //   type: "QuickLap",
      //   data: {
      //     hostname: "10.80.111.97",
      //     port: 22,
      //     username: "root",
      //     password: "Z055YXNORnU4",
      //   },
      // };

      // const listRelatedInfor = [
      //   {
      //     collect: "Product",
      //     ids: ["120102", "120104", "120103", "132766", "128607"],
      //   },
      //   {
      //     collect: "Article",
      //     ids: ["20.13114.2172", "20.13057.9193", "20.13008"],
      //   },
      // ];

      if (articlePresent?.data[0]?.attributes?.portalId) {
        const responseDataRelate = await store.dispatch(
          "getRelateToArtical",
          articlePresent?.data[0]?.attributes?.portalId
        );
        listRelatedInfor = [
          {
            collect: "Product",
            ids:
              responseDataRelate
                ?.filter((item) => item.type === "ARTICLE_PRODUCT")
                .map((item) => item.id) || [],
          },
          {
            collect: "Article",
            ids:
              responseDataRelate
                ?.filter((item) => item.type === "ARTICLE_ARTICLE")
                .map((item) => item.id) || [],
          },
          {
            collect: "QuickLap",
            ids:
              responseDataRelate
                ?.filter((item) => item.type === "ARTICLE_PRODUCT_LAB")
                .map((item) => item.id) || [],
          },
        ];
      }

      // if (
      //   listRelatedInfor.find((c) => c.collect === "QuickLap")?.ids.length > 0
      // ) {
      //   const responseDataLab = await $sdk.computing.getLabInstance(
      //     articlePresent?.data[0]?.attributes?.portalId,
      //     listRelatedInfor.find((c) => c.collect == "QuickLap")?.ids[0],
      //     store.getters.getUser.partyId
      //   );

      //   dataStempQuickLap = {
      //     type: "QuickLap",
      //     data: responseDataLab || [],
      //   };
      // }

      //console.log("🚀 ~ asyncData ~ responseDataLab:", dataStempQuickLap);

      const articleIDs =
        listRelatedInfor.find((c) => c.collect === "Article")?.ids || [];
      dataStempQuickLap =
        listRelatedInfor.find((c) => c.collect === "QuickLap")?.ids || [];
      const pageUrl =
        articlePresent.data[0].attributes.layout.data.attributes.pageUrl;
      const slugCategory =
        articlePresent.data[0].attributes.categories.data[0].attributes.slug;
      const slidesDataPromises = [];
      if (articleIDs.length > 0) {
        const articles = await store.dispatch(
          "getBlogsInPortal",
          articleIDs.join(",")
        );

        if (articles.length > 0) {
          for (const item of articles) {
            // Sử dụng for...of để lặp qua articles
            slidesDataPromises.push(
              $strapi
                .find("articles", `?filters[slug][$eq]=${item.slug}&${query2}`)
                .then((response) => {
                  return {
                    id: response?.data[0]?.id,
                    title: response?.data[0]?.attributes?.title,
                    slug: response?.data[0]?.attributes?.slug,
                    imageUrl:
                      response?.data[0]?.attributes?.imageUrl ||
                      response?.data[0]?.attributes?.cover?.data,
                    publishedAt: response?.data[0]?.attributes?.publishedAt,
                    author:
                      response.data[0]?.attributes?.author?.data?.attributes
                        ?.name,
                    type: "Article",
                    description: response?.data[0]?.attributes?.description,
                  };
                })
            );
          }
        }
      }

      const [
        pageDefaultsResponse,
        articlesResponse,
        listArticleResponseCategory,
        categoriesResponse,
        tagsResponse,
        slidesData,
      ] = await Promise.all([
        $strapi.find(
          "page-defaults",
          `?filters[slug][$eq]=${route.params.lab}&${query}`
        ),
        $strapi.find(
          "articles",
          `?filters[slug][$eq]=${route.params.lab}&${query2}`
        ),
        $strapi.find(
          "articles",
          `?filters[categories][slug][$eq]=${slugCategory}&${queryDeep}`
        ),
        $strapi.find(
          "categories",
          `?filters[layout][pageUrl][$eq]=${pageUrl}&${queryDeep}`
        ),
        $strapi.find(
          "tags",
          `?filters[layouts][pageUrl][$eq]=${pageUrl}&${queryDeep}`
        ),
        Promise.all(slidesDataPromises).then((data) => data.flat()),
      ]);
      const details = pageDefaultsResponse?.data || {};
      const articles = articlesResponse?.data || [];
      const categories = categoriesResponse?.data || [];
      //console.log("🚀 ~ asyncData ~ categories:", categories);
      const listTags = tagsResponse?.data || [];
      //console.log("🚀 ~ asyncData ~ listTags:", listTags);

      const listblog = [];
      const datatBlog = listArticleResponseCategory?.data
        ?.filter((item) => item.attributes.slug != route.params.lab)
        ?.map((item) => ({
          title: item?.attributes?.title,
          slug: item?.attributes?.slug,
          imageUrl: item?.attributes?.imageUrl || item?.attributes?.cover?.data,
          publishedAt: item?.attributes?.publishedAt,
          author: item?.attributes?.author?.data?.attributes?.name,
          type: "Article",
          description: item?.attributes?.description,
        }));

      listblog.push(...datatBlog);
      //console.log("🚀 ~ asyncData ~ listblog:", listblog);

      if (slidesData.filter((c) => c.type == "Article")) {
        const data = slidesData.filter((c) => c.type == "Article");
        const checkSlidesDataArticle = data.filter(
          (c) =>
            c?.attributes?.slug !== route.params.lab &&
            !listblog.includes(c?.attributes?.slug)
        );

        listblog.push(...checkSlidesDataArticle);
      }
      //console.log("🚀 ~ asyncData ~ listblog:", slidesData);
      store.commit("setLoading", false);
      return {
        details,
        articles,
        dataStempQuickLap,
        categories,
        listTags,
        listblog,
        pageUrl,
        articalID: articlePresent?.data[0]?.attributes?.portalId,
      };
    } catch (err) {
      const isError = err || "lỗi rồi";
      console.log("🚀 ~ asyncData ~ isError:", isError);
      store.commit("setLoading", false);
      console.log(err);
      error({ statusCode: 404, message: err });
      return {
        details: {},
        articles: null,
        dataStempQuickLap: [],
        articalID: null,
      };
    }
  },
};
</script>
