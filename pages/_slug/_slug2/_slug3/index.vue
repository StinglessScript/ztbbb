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
      <BlogDetails
        v-if="articles?.length > 0"
        :article="articles[0]"
        :listblog="listblog"
        :listTags="listTags"
        :categories="categories"
        
        :checkLayout="checkLayout?.data[0]?.attributes"
      />
      <!-- :quickLap="slidesData.find((c) => c.type == 'QuickLap')?.data"
        :slidesData="slidesData" -->
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
      <!-- <div
        class="container"
        id="target-section-relate"
        v-if="!slidesData.find((c) => c.type == 'QuickLap')"
      >
        <RelateToInfor
          v-if="slidesData.filter((c) => c.type == 'Product').length > 0"
          :header="'Sản phẩm liên quan'"
          :slidesData="slidesData.filter((c) => c.type == 'Product')"
        />
      </div> -->
    </div>
  </div>
</template>

<script>
import BlogDetails from "@/components/Blog/BlogDetails.vue";
import RelateToInfor from "../../../../components/Relate/RelateToInfor.vue";
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
    // Chèn BODY_END vào cuối body
    const endScript = document.createElement("script");
    endScript.innerHTML = this.bodyEnd;
    document.body.appendChild(endScript); // Chèn vào cuối body

    if (this.articles?.length == 0) {
      this.error({ statusCode: 404, message: "Post not found" });
    }
  },

  methods: {
    dynamicComponentName(component) {
      const componentName = component.split(".")[1];
      return componentName.charAt(0).toUpperCase() + componentName.slice(1);
    },
  },

  async asyncData({ route, $strapi, store, $sdk, req, error }) {
    try {
      store.commit("setLoading", true);

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
                "pricings.apps.image",
                "pricingex",
                "contents.image",
                "image",
                "page_default.image",
                // "child_categories.page_defaults.image",
                "child_categories.ListPages.page_default.image",
                "child_categories.image",
                "domains",
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
      const queryLayout = qs.stringify(
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
            mainCategory: {
              populate: "*",
            },
            metaTag: {
              populate: "*",
            },
          },
        },
        { encodeValuesOnly: true }
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
            mainCategory: {
              populate: "*",
            },
            metaTag: {
              populate: "*",
            },
          },
        },
        { encodeValuesOnly: true }
      );
      const url = `https://${
        process.server ? req.headers.host : window.location.host
      }`;
      console.log("🚀 ~ asyncData ~ url:", url);
      const checkLayout = await $strapi.find(
        "layouts",
        `?filters[sites][domain][$eq]=${url}&filters[pageUrl][$eq]=${route.params.slug}&${queryLayout}`
      );
      if (checkLayout.data[0]) {
        const checkAriticleDetail = await $strapi.find(
          "articles",
          `?filters[slug][$eq]=${route.params.slug3}&filters[layout][pageUrl][$eq]=${route.params.slug}&${query2}`
        );
        // console.log(
        //   "🚀 ~ asyncData ~ checkAriticleDetail:",
        //   checkAriticleDetail.data[0].attributes
        // );
        if (checkAriticleDetail.data.length > 0) {
          let listRelatedInfor = [];
          let dataStempQuickLap = {};

          // if (checkAriticleDetail?.data[0]?.attributes?.portalId) {
          //   const responseDataRelate = await store.dispatch(
          //     "getRelateToArtical",
          //     checkAriticleDetail?.data[0]?.attributes?.portalId
          //   );

          //   listRelatedInfor = [
          //     {
          //       collect: "Product",
          //       ids:
          //         responseDataRelate
          //           ?.filter((item) => item.type === "ARTICLE_PRODUCT")
          //           .map((item) => item.id) || [],
          //     },
          //     {
          //       collect: "Article",
          //       ids:
          //         responseDataRelate
          //           ?.filter((item) => item.type === "ARTICLE_ARTICLE")
          //           .map((item) => item.id) || [],
          //     },
          //     {
          //       collect: "QuickLap",
          //       ids:
          //         responseDataRelate
          //           ?.filter((item) => item.type === "ARTICLE_PRODUCT_LAB")
          //           .map((item) => item.id) || [],
          //     },
          //   ];
          // }

          // if (
          //   listRelatedInfor.find((c) => c.collect === "QuickLap")?.ids.length >
          //   0
          // ) {
          //   const responseDataLab = await $sdk.computing.getLabInstance(
          //     checkAriticleDetail?.data[0]?.attributes?.portalId,
          //     store.getters.getUser.partyId
          //   );

          // dataStempQuickLap = {
          //   type: "QuickLap",
          //   data:
          //     listRelatedInfor.find((c) => c.collect === "QuickLap")?.ids || [],
          // };
          // // }

          // const productIDs =
          //   listRelatedInfor.find((c) => c.collect === "Product")?.ids || [];
          // const articleIDs =
          //   listRelatedInfor.find((c) => c.collect === "Article")?.ids || [];
          // //const labIDs = listRelatedInfor.map((c) => c.collect === "QuickLap");

          // const productIdsString = productIDs.join(",");

          // const slidesDataPromises = [];

          // // Fetch products only if productIDs.length > 0
          // if (productIDs.length > 0) {
          //   slidesDataPromises.push(
          //     $sdk.product
          //       .getProducts({
          //         display: "PUBLIC",
          //         partnerId: "LONGVAN",
          //         status: "ON_SELL",
          //         storeChannel: "LONGVANNET",
          //         subType: "CONFIG,SIMPLE,VARIABLE",
          //         product: productIdsString,
          //       })
          //       .then((response) => {
          //         return response.data.map((data) => ({
          //           id: data.id,
          //           title: data.title,
          //           handle: data.handle,
          //           shortDescription: data.shortDescription,
          //           images: data.images || [],
          //           featuredImage: data.featuredImage || null,
          //           price: data.price,
          //           priceType: data.priceType,
          //           type: "Product",
          //           unitDTO: { name: data.unitDTO?.name || "" },
          //           priceTypeName: data.priceTypeName || "",
          //           qualify: data.qualify || "",
          //         }));
          //       })
          //   );
          // }

          // // Fetch articles only if articleIDs.length > 0

          // if (articleIDs.length > 0) {
          //   const articlesPortal = await store.dispatch(
          //     "getBlogsInPortal",
          //     articleIDs.join(",")
          //   );

          //   if (articlesPortal.length > 0) {
          //     for (const item of articlesPortal) {
          //       // Sử dụng for...of để lặp qua articles
          //       slidesDataPromises.push(
          //         $strapi
          //           .find(
          //             "articles",
          //             `?filters[slug][$eq]=${item.slug}&${query2}`
          //           )
          //           .then((response) => {
          //             return {
          //               id: response?.data[0]?.id,
          //               title: response?.data[0]?.attributes?.title,
          //               slug: response?.data[0]?.attributes?.slug,
          //               imageUrl:
          //                 response?.data[0]?.attributes?.imageUrl ||
          //                 response?.data[0]?.attributes?.cover?.data,
          //               publishedAt: response?.data[0]?.attributes?.publishedAt,
          //               author:
          //                 response.data[0]?.attributes?.author?.data?.attributes
          //                   ?.name,
          //               type: "Article",
          //               description: response?.data[0]?.attributes?.description,
          //               mainCategory:
          //                 response?.data[0]?.attributes?.mainCategory,
          //             };
          //           })
          //       );
          //     }
          //   }
          // }

          // Gọi API đồng thời
          // const [
          //   pageDefaultsResponse,
          //   articlesResponse,
          //   listArticleResponseCategory,
          //   categoriesResponse,
          //   tagsResponse,
          //   slidesData,
          // ] = await Promise.all([
          //   $strapi.find(
          //     "page-defaults",
          //     `?filters[slug][$eq]=${route.params.slug3}&${query}`
          //   ),
          //   $strapi.find(
          //     "articles",
          //     `?filters[slug][$eq]=${route.params.slug3}&filters[layout][pageUrl][$eq]=${route.params.slug}&${query2}`
          //   ),
          //   $strapi.find(
          //     "articles",
          //     `?filters[categories][slug][$eq]=${route.params.slug3}&filters[layout][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          //   ),
          //   $strapi.find(
          //     "categories",
          //     `?filters[layout][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          //   ),
          //   $strapi.find(
          //     "tags",
          //     `?filters[layouts][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          //   ),
          //   Promise.all(slidesDataPromises).then((data) => data.flat()),
          // ]);

          const pageDefaultsResponse = await $strapi.find(
            "page-defaults",
            `?filters[slug][$eq]=${route.params.slug3}&${query}`
          );
          const articlesResponse = await $strapi.find(
            "articles",
            `?filters[slug][$eq]=${route.params.slug3}&filters[layout][pageUrl][$eq]=${route.params.slug}&${query2}`
          );
          const listArticleResponseCategory = await $strapi.find(
            "articles",
            `?filters[categories][slug][$eq]=${route.params.slug3}&filters[layout][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          );
          const categoriesResponse = await $strapi.find(
            "categories",
            `?filters[layout][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          );
          const tagsResponse = await $strapi.find(
            "tags",
            `?filters[layouts][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          );
          // const slidesData = await Promise.all(slidesDataPromises).then(
          //   (data) => data.flat()
          // );

          // Xử lý dữ liệu
          const details = pageDefaultsResponse?.data || {};
          const articles = articlesResponse?.data || [];
          const categories = categoriesResponse?.data || [];
          const listTags = tagsResponse?.data || [];

          const listblog = [];
          const article = articles[0]?.attributes?.categories?.data[0];
          // Nếu có article, lấy danh sách bài viết liên quan
          if (article) {
            const id = article.attributes.slug;
            const allArticlesResponse = await $strapi.find(
              "articles",
              `?filters[categories][slug][$eq]=${id}&${queryDeep}&pagination[pageSize]=5`
            );

            const allArticlesResponseByMainCategroy = await $strapi.find(
              "articles",
              `?filters[mainCategory][slug][$eq]=${checkAriticleDetail?.data[0]?.attributes?.mainCategory?.data?.attributes?.slug}&${queryDeep}&pagination[pageSize]=5`
            );

            if (
              allArticlesResponseByMainCategroy.data.length > 0 ||
              allArticlesResponse.data.length > 0
            ) {
              // Kết hợp cả hai mảng và loại bỏ bài viết trùng slug ngay từ đầu
              const combinedArticles = [
                ...allArticlesResponseByMainCategroy.data,
                ...allArticlesResponse.data,
              ];

              // Tạo một Set để kiểm tra slug đã xuất hiện hay chưa
              const seenSlugs = new Set();

              // Lọc bỏ bài viết trùng slug và bài viết hiện tại
              const listblogs = combinedArticles
                .filter((item) => {
                  const slug = item?.attributes?.slug;
                  if (seenSlugs.has(slug) || slug === route.params.slug3) {
                    return false; // Nếu slug đã xuất hiện hoặc là bài viết hiện tại, bỏ qua
                  }
                  seenSlugs.add(slug); // Thêm slug vào Set để tránh trùng lặp
                  return true;
                })
                .map((item) => ({
                  id: item?.id,
                  title: item?.attributes?.title,
                  slug: item?.attributes?.slug,
                  imageUrl:
                    item?.attributes?.imageUrl || item?.attributes?.cover?.data,
                  publishedAt: item?.attributes?.publishedAt,
                  author: item?.attributes?.author?.data?.attributes?.name,
                  type: "Article",
                  description: item?.attributes?.description,
                  mainCategory: item?.attributes?.mainCategory,
                }));

              // Thêm vào danh sách blog hiện tại
              listblog.push(...listblogs);
            }
          }

          // if (slidesData.filter((c) => c.type == "Article")) {
          //   const data = slidesData.filter((c) => c.type == "Article");
          //   const checkSlidesDataArticle = data.filter(
          //     (c) =>
          //       c?.attributes?.slug !== route.params.slug3 &&
          //       !listblog.includes(c?.attributes?.slug)
          //   );

          //   listblog.push(...checkSlidesDataArticle);
          // }
          // slidesData.push(dataStempQuickLap);
          store.commit("setLoading", false);
          return {
            details,
            articles,
            categories,
            listTags,
            listblog,
            maxPages: listArticleResponseCategory.meta.pagination.pageCount,
            checkLayout,

            headContent: checkLayout?.data[0].attributes?.code?.HEAD
              ? checkLayout?.data[0].attributes?.code?.HEAD
              : "",
            bodyEnd: checkLayout?.data[0].attributes?.code?.BODY_END
              ? checkLayout?.data[0].attributes?.code?.BODY_END
              : "",
            bodyTop: checkLayout?.data[0].attributes?.code?.BODY_TOP
              ? checkLayout?.data[0].attributes?.code?.BODY_TOP
              : "",

            //slidesData,
          };
        }
      }
      store.commit("setLoading", false);
    } catch (err) {
      store.commit("setLoading", false);
      error({ statusCode: 404, message: "Post not found" });
      console.log(err);
      return {
        details: [],
        articles: null,
      };
      //this.$toast.error(error);
    }
  },

  head() {
    return {
      title: `${
        this.checkLayout?.data[0]?.attributes?.metaTag?.title
          ? this.checkLayout?.data[0]?.attributes?.metaTag?.title
          : this.checkLayout?.data[0]?.attributes?.name
          ? this.checkLayout?.data[0]?.attributes?.name
          : "Danh sách bài viết"
      }`,
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
          content: this.checkLayout?.data[0]?.attributes?.metaTag?.description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.checkLayout?.data[0]?.attributes?.metaTag?.keywords,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.checkLayout?.data[0]?.attributes?.metaTag?.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: `${
            this.checkLayout?.data[0]?.attributes?.metaTag?.title
              ? this.checkLayout?.data[0]?.attributes?.metaTag?.title
              : this.checkLayout?.data[0]?.attributes?.name
              ? this.checkLayout?.data[0]?.attributes?.name
              : "Danh sách bài viết"
          }`,
        },
      ],

      script: [
        {
          innerHTML: this.headContent,
          type: "text/javascript",
          body: false, // Chèn vào head
        },
      ],
      __dangerouslyDisableSanitizers: ["script"], // Bỏ qua bảo mật cho script
    };
  },
};
</script>
