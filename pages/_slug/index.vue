<template>
  <div>
    <div>
      <div v-if="details?.length > 0">
        <component
          v-for="(block, index) in details[0]?.attributes?.Blocks"
          :key="index"
          :is="dynamicComponentName(block.__component)"
          :block="block"
          
        />
      </div>
      <div v-else>
        <BlogDetails
          v-if="articles?.length > 0"
          :article="articles[0]"
          :listblog="listblog"
          :listTags="listTags"
          :categories="categories"
          
        />
        <!-- :quickLap="
            slidesData.find((c) => c.type == 'QuickLap')?.data?.length > 0
          "
          :slidesData="slidesData" -->
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
        <!-- slug blog -->
        <div v-if="listArticle?.length != 0">
          <div class="page-title-area" style="margin-top: 70px">
            <div class="d-table">
              <div class="d-table-cell">
                <div class="container">
                  <h1>
                    {{
                      checkLayout?.data[0]?.attributes?.name ||
                      "Danh sách bài viết"
                    }}
                  </h1>
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
          <div class="blog-area ptb-80">
            <div class="container">
              <div class="row">
                <BlogGridThree
                  :block="listArticle"
                  :typeArticle="checkLayout?.data[0]?.attributes"
                  :categories="categories"
                  :listTags="listTags"
                />
              </div>
            </div>
            <div
              style="padding: 10px"
              class="d-flex justify-content-center"
              v-if="pages < maxPages"
            >
              <a
                @click="handleLoadMore"
                class="box-hover-text"
                style="
                  width: 150px;
                  color: #fff;
                  text-align: center;
                  cursor: pointer;
                  justify-content: center;
                  border: 1px solid #44ce6f;
                "
                >Xem thêm</a
              >
            </div>
          </div>
        </div>
        <div v-else>
          <div class="page-title-area" style="margin-top: 70px">
            <div class="d-table">
              <div class="d-table-cell">
                <div class="container">
                  <h1></h1>
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
          <div class="blog-area ptb-80">
            <div class="container">
              <div class="row"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogDetails from "../../components/Blog/BlogDetails.vue";
import ListArticleByCategory from "../../components/Blog/ListArticleByCategory.vue";
import BannerShop from "@/components/Banner/BannerShop";
import ShopV3 from "@/components/Shop/ShopV3";
import RelateToInfor from "../../components/Relate/RelateToInfor.vue";
const qs = require("qs");

export default {
  layout: "default",
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      // details: null,
      listArticle: null,
      pages: 1,
      pageSize: 25,
      maxPages: 10,
      detail: null,
      seo: null,
      category: {},

      // headContent: '',
      // bodyTop: '',
      // bodyEnd: ''
    };
  },
  mounted() {
    //this.fetchArticalFromCategories();
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
    if (this.$route.query.tags) {
      this.fetchArticalFromTags(this.$route.query.tags);
    }

    // Chèn BODY_END vào cuối body
    const endScript = document.createElement("script");
    endScript.innerHTML = this.bodyEnd;
    document.body.appendChild(endScript); // Chèn vào cuối body

    if (
      this.details?.length == 0 &&
      this.articles?.length == 0 &&
      this.listArticle?.length == 0
    ) {
      console.log("🚀 ~ mounted ~ this.listArticle?.length == 0:", this.listArticle?.length)
      console.log("🚀 ~ mounted ~ this.articles?.length:", this.articles?.length)
      console.log("🚀 ~ mounted ~ this.details?.length:", this.details?.length)
      this.error({ statusCode: 404, message: "Post not found" });
    }
  },

  // watchQuery(newQuery, oldQuery) {
  //   if (newQuery.tags != oldQuery.tags) {
  //     this.$store.commit("setLoading", true);
  //     this.listArticle = [];
  //     this.pages = 1;
  //     this.fetchArticalFromTags(newQuery.tags);
  //   }
  // },

  watch: {
    // Giám sát query parameters mỗi khi route thay đổi
    "$route.query.tags"(newTags, oldTags) {
      if (newTags != oldTags) {
        //this.$store.commit("setLoading", true);
        this.listArticle = [];
        this.pages = 1;
        this.fetchArticalFromTags(newTags);
      }
    },
    "$route.query"(newTags, oldTags) {
      if (newTags != oldTags) {
        //this.$store.commit("setLoading", true);
        this.listArticle = [];
        this.pages = 1;
        this.fetchArtical();
      }
    },
  },

  async asyncData({ route, $strapi, store, $sdk, req, error }) {
    const queryDeep = qs.stringify(
      { populate: "deep" },
      { encodeValuesOnly: true }
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

    const query3 = qs.stringify(
      {
        populate: "deep",
        pagination: {
          page: 1,
          pageSize: 10,
        },
      },
      { encodeValuesOnly: true }
    );

    console.log("🚀 ~ asyncData ~ route:", route);
    const url = `https://${
      process.server ? req.headers.host : window.location.host
    }`;
    console.log("🚀 ~ asyncData ~ url:", url);
    try {
      store.commit("setLoading", true);

      const pageDefaultsResponse = await $strapi.find(
        "page-defaults",
        `?filters[slug][$eq]=${route.params.slug}&${query}`
      );
      const details = pageDefaultsResponse?.data || [];

      //console.log("🚀 ~ asyncData ~ details:", pageDefaultsResponse.data);

      if (details.length > 0) {
        const checkPricingFourList = details[0]?.attributes?.Blocks?.filter(
          (c) => c.__component == "pricing.pricing-four"
        );

        if (checkPricingFourList?.length > 0) {
          const productList = [];

          for (const checkPricingFour of checkPricingFourList) {
            const data = await store.dispatch(
              "getPriceMenus",
              checkPricingFour?.categoryId
            );

            if (data?.data?.getPriceMenus) {
              const ids = data.data.getPriceMenus.flatMap((menu) =>
                menu.products.map((product) => product.id)
              );

              if (ids.length > 0) {
                const responseListPrice = await $sdk.product.getListPrice(
                  ids,
                  route.query.store
                );

                const products = data.data.getPriceMenus.map((menu) => {
                  return {
                    ...menu,
                    products: menu.products.map((item) => {
                      const newItem = { ...item };

                      if (!newItem.discountPrice) {
                        newItem.discountPrice = [];
                      }

                      const price = responseListPrice[item?.id] || [];
                      const updatedPrice = price.flatMap((d) => {
                        if (!d?.subPrices || d?.subPrices?.length === 0) {
                          return [
                            {
                              time: d?.quantity || 1,
                              type: d?.type,
                              percentDiscount: d?.discountPercent || 0,
                              price: d?.price || 0,
                              hint: d?.hint || null,
                              priceDiscount:
                                d?.displayPrice ||
                                d?.price * (d?.quantity || 1) ||
                                0,
                              unitDTO_id: newItem.unitDTO?.id || 1,
                              unitDTO_name: newItem.unitDTO?.name || "default",
                              defaultPrice: d?.defaultPrice ? false : true,
                              attributes: {
                                value: d?.attributes?.some(
                                  (a) =>
                                    a.attrName == "CAMPAIN" ||
                                    a.attrName == "CAMPAIGN_ACTION"
                                ),
                                campain: d?.attributes || [],
                              },
                            },
                          ];
                        }

                        const subPriceData = d?.subPrices?.map((c) => ({
                          time: c?.quantity,
                          type: c?.type == "QUANTITY" ? d?.type : c?.type,
                          percentDiscount: c?.discountPercent,
                          price: c?.price,
                          hint: c?.hint || null,
                          priceDiscount:
                            c?.displayPrice ||
                            c?.price * (c?.quantity || 1) ||
                            0,
                          unitDTO_id: newItem.unitDTO?.id,
                          unitDTO_name: newItem.unitDTO?.name,
                          defaultPrice: d?.defaultPrice === c.id,
                          attributes: {
                            value: c?.attributes?.some(
                              (a) =>
                                a.attrName == "CAMPAIN" ||
                                a.attrName == "CAMPAIGN_ACTION"
                            ),
                            campain: c?.attributes || [],
                          },
                        }));

                        return [
                          {
                            time: d?.quantity || 1,
                            type: d?.type,
                            percentDiscount: d?.discountPercent || 0,
                            price: d?.price || 0,
                            hint: d?.hint || null,
                            priceDiscount:
                              d?.displayPrice ||
                              d?.price * (d?.quantity || 1) ||
                              0,
                            unitDTO_id: newItem.unitDTO?.id || 1,
                            unitDTO_name: newItem.unitDTO?.name || "Tháng",
                            defaultPrice: d?.defaultPrice
                              ? d?.defaultPrice == d?.id
                                ? true
                                : false
                              : true,
                            attributes: {
                              value: d?.attributes?.some(
                                (a) =>
                                  a.attrName == "CAMPAIN" ||
                                  a.attrName == "CAMPAIGN_ACTION"
                              ),
                              campain: d?.attributes || [],
                            },
                          },
                          ...subPriceData,
                        ];
                      });

                      let filterData = [...updatedPrice];
                      const updatedDataDiscount = [];

                      filterData
                        .filter((item) => item.type === "PROMOTION")
                        .forEach((promotion) => {
                          const matchingRentData = filterData.filter(
                            (rent) =>
                              (rent.type === "RENT" || rent.type === "SELL") &&
                              rent.time === promotion.time
                          );

                          if (matchingRentData.length > 0) {
                            promotion.oldPrice = matchingRentData;

                            updatedDataDiscount.push(promotion);

                            matchingRentData.forEach((rent) => {
                              const rentIndex = filterData.indexOf(rent);
                              if (rentIndex !== -1) {
                                filterData.splice(rentIndex, 1);
                              }
                            });
                          } else {
                            updatedDataDiscount.push(promotion);
                          }
                        });

                      filterData.forEach((item) => {
                        if (item.type === "RENT" || item.type === "SELL") {
                          updatedDataDiscount.push(item);
                        }
                      });

                      updatedDataDiscount.forEach((price, index) => {
                        price.number = index + 1;
                      });

                      updatedDataDiscount.forEach((discount) => {
                        if (discount.oldPrice) {
                          let defaultPriceFound = false;
                          discount.oldPrice.forEach((oldItem) => {
                            if (oldItem.defaultPrice) {
                              defaultPriceFound = true;
                              oldItem.defaultPrice = false;
                            }
                          });

                          if (defaultPriceFound) {
                            discount.defaultPrice = true;
                          }
                        }
                      });

                      newItem.discountPrice.push(...updatedDataDiscount);
                      let dataDefault = updatedDataDiscount?.find(
                        (c) => c.defaultPrice == true
                      );

                      return {
                        ...newItem,
                        type:
                          dataDefault?.type != "PROMOTION"
                            ? dataDefault?.type
                            : dataDefault?.oldPrice[0]?.type,
                        discountPrice:
                          updatedDataDiscount.length > 0
                            ? updatedDataDiscount
                            : [],
                      };
                    }),
                  };
                });

                productList.push(...products);

                // Gán danh sách sản phẩm vào đối tượng của c.__component == "pricing.pricing-four"
                checkPricingFour.productList = products;
              }
            }
          }

          // Gán dữ liệu cập nhật vào details
          details[0].attributes.Blocks = details[0].attributes.Blocks.map(
            (block) => {
              if (block.__component == "pricing.pricing-four") {
                return {
                  ...block,
                  productList:
                    checkPricingFourList.find(
                      (c) => c.categoryId === block.categoryId
                    )?.productList || [],
                };
              }
              return block;
            }
          );

          console.log("🚀 ~ asyncData ~ details:", details);

          return {
            details,
          };
        } else {
          return {
            details,
          };
        }
      } else {
        const checkLayout = await $strapi.find(
          "layouts",
          `?filters[sites][domain][$eq]=${url}&filters[pageUrl][$eq]=${route.params.slug}&${queryLayout}`
        );
        if (checkLayout?.data?.length > 0) {
          let articlesResponseByTags = null;
          let articlesResponse = null;
          let tagsResponse = null;

          // const [articlesResponse, tagsResponse] = await Promise.all([
          //   $strapi.find(
          //     "articles",
          //     `?filters[layout][pageUrl][$eq]=${route.params.slug}&${query2}`
          //   ),
          //   $strapi.find(
          //     "tags",
          //     `?filters[layouts][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
          //   ),
          // ]);

          // Kiểm tra nếu route.query.tags tồn tại thì mới gọi API articlesResponseByTags
          if (route.query.tags) {
            articlesResponseByTags = await $strapi.find(
              "articles",
              `?filters[tags][slug]=${route.query.tags}&filters[layout][pageUrl][$eq]=${route.params.slug}&${query3}`
            );

            tagsResponse = await $strapi.find(
              "tags",
              `?filters[layouts][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
            );
          } else {
            articlesResponse = await $strapi.find(
              "articles",
              `?filters[layout][pageUrl][$eq]=${route.params.slug}&${query2}`
            );
            tagsResponse = await $strapi.find(
              "tags",
              `?filters[layouts][pageUrl][$eq]=${route.params.slug}&${queryDeep}`
            );
          }

          // const details = pageDefaultsResponse?.data || {};
          console.log("🚀 ~ asyncData ~ route.query.tags:", route.query.tags);
          const listArticle =
            (route.query.tags
              ? articlesResponseByTags?.data
              : articlesResponse?.data) || [];
          const maxPages = route.query.tags
            ? articlesResponseByTags.meta.pagination.pageCount
            : articlesResponse.meta.pagination.pageCount;
          //console.log("🚀 ~ asyncData ~ listArticle:", articlesResponse);
          const categories =
            checkLayout?.data[0].attributes?.categories?.data || [];
          const listTags = tagsResponse?.data || [];
          store.commit("setLoading", false);

          return {
            checkLayout,
            maxPages,
            details: [],
            listArticle,
            categories,
            articles: [],
            //slidesData: [],
            typeArticle: "toLayout",
            listTags,
            headContent: checkLayout?.data[0].attributes?.code?.HEAD
              ? checkLayout?.data[0].attributes?.code?.HEAD
              : "",
            bodyEnd: checkLayout?.data[0].attributes?.code?.BODY_END
              ? checkLayout?.data[0].attributes?.code?.BODY_END
              : "",
            bodyTop: checkLayout?.data[0].attributes?.code?.BODY_TOP
              ? checkLayout?.data[0].attributes?.code?.BODY_TOP
              : "",
          };
        } else {
          const checkAriticleDetail = await $strapi.find(
            "articles",
            `?filters[slug][$eq]=${route.params.slug}&${query2}`
          );
          //console.log("🚀 ~ asyncData ~ checkAriticleDetail:", checkAriticleDetail)
          let listRelatedInfor = [];
          let dataStempQuickLap = {};

          // if (checkAriticleDetail.data[0].attributes.portalId) {
          //   const responseDataRelate = await store.dispatch(
          //     "getRelateToArtical",
          //     checkAriticleDetail.data[0].attributes.portalId
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
          //   listRelatedInfor.find((c) => c.collect === "QuickLap")?.ids.length > 0
          // ) {
          //   const responseDataLab = await $sdk.computing.getLabInstance(
          //     checkAriticleDetail.data[0].attributes.portalId,
          //     store.getters.getUser.partyId
          //   );

          // dataStempQuickLap = {
          //   type: "QuickLap",
          //   data:
          //     listRelatedInfor.find((c) => c.collect === "QuickLap")?.ids || [],
          // };
          // }

          // const productIDs =
          //   listRelatedInfor.find((c) => c.collect === "Product")?.ids || [];
          // const articleIDs =
          //   listRelatedInfor.find((c) => c.collect === "Article")?.ids || [];

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
          //   const articles = await store.dispatch(
          //     "getBlogsInPortal",
          //     articleIDs.join(",")
          //   );

          //   if (articles.length > 0) {
          //     for (const item of articles) {
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
          //   articlesResponse,
          //   listArticleResponseCategory,
          //   categoriesResponse,
          //   tagsResponse,
          //   slidesData,
          // ] = await Promise.all([
          //   // $strapi.find(
          //   //   "page-defaults",
          //   //   `?filters[slug][$eq]=${route.params.slug}&${query2}`
          //   // ),
          //   $strapi.find(
          //     "articles",
          //     `?filters[slug][$eq]=${route.params.slug}&${query2}`
          //   ),
          //   $strapi.find(
          //     "articles",
          //     `?filters[categories][slug][$eq]=${route.params.slug}&${queryDeep}`
          //   ),
          //   $strapi.find(
          //     "categories",
          //     `?filters[articleCategory][$eq]=true&${queryDeep}`
          //   ),
          //   $strapi.find("tags", `?${queryDeep}`),
          //   Promise.all(slidesDataPromises).then((data) => data.flat()),
          // ]);

          const articlesResponse = await $strapi.find(
            "articles",
            `?filters[slug][$eq]=${route.params.slug}&${query2}`
          );
          const listArticleResponseCategory = await $strapi.find(
            "articles",
            `?filters[categories][slug][$eq]=${route.params.slug}&${queryDeep}`
          );
          const categoriesResponse = await $strapi.find(
            "categories",
            `?filters[articleCategory][$eq]=true&${queryDeep}`
          );
          const tagsResponse = await $strapi.find("tags", `?${queryDeep}`);
          // const slidesData = await Promise.all(slidesDataPromises).then(
          //   (data) => data.flat()
          // );

          // Xử lý dữ liệu
          // const details = pageDefaultsResponse?.data || {};
          const articles = articlesResponse?.data || [];
          const listArticle = listArticleResponseCategory?.data || [];
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
          //     (c) => !listblog.includes(c?.attributes?.slug)
          //   );

          //   listblog.push(
          //     ...checkSlidesDataArticle.filter(
          //       (d) => d?.attributes?.slug != route.params.slug
          //     )
          //   );
          // }
          // slidesData.push(dataStempQuickLap);
          store.commit("setLoading", false);
          return {
            details: [],
            articles,
            listArticle,
            categories,
            listTags,
            listblog,
            maxPages: listArticleResponseCategory.meta.pagination.pageCount,
            //slidesData,
          };
        }
      }
    } catch (err) {
      store.commit("setLoading", false);
      console.error("Error fetching data:", err);
      error({ statusCode: 404, message: "Post not found" });
      //toast.error(error.message || "Có lỗi xảy ra!");
      return {
        details: [],
        articles: null,
        listblog: [],
        listTags: [],
        categories: [],
        //slidesData: [],
      };
    }
  },
  methods: {
    dynamicComponentName(component) {
      const componentName = component.split(".")[1];
      return componentName.charAt(0).toUpperCase() + componentName.slice(1);
    },
    handleLoadMore() {
      this.pages += 1;
      if (this.$route.query.tags) {
        this.fetchArticalFromTags(this.$route.query.tags);
      } else {
        this.fetchArtical();
      }
    },

    async fetchArtical() {
      try {
        this.$store.commit("setLoading", true);
        const query = qs.stringify(
          {
            populate: "deep",
            pagination: {
              page: this.pages,
              pageSize: 10,
            },
          },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find("articles", `?${query}`);
        //console.log("get_pages1", get);
        const newArtical = get.data;
        this.maxPages = get.meta.pagination.pageCount;
        if (this.pages == 1) {
          this.listArticle = newArtical;
        } else {
          this.listArticle = [...this.listArticle, ...newArtical];
        }
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
        console.log(error);
        this.$toast.error(error);
      }
    },

    async fetchArticalFromCategories() {
      try {
        this.$store.commit("setLoading", true);
        const query = qs.stringify(
          { populate: "deep" },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find(
          "articles",
          `?filters[categories][slug]=${this.$route.params.slug}&${query}&pagination[page]=${this.pages}&pagination[pageSize]=${this.pageSize}`
        );
        const newArtical = get.data;
        this.maxPages = get.meta.pagination.pageCount;
        if (this.pages == 1) {
          this.listArticle = newArtical;
        } else {
          this.listArticle = [...this.listArticle, ...newArtical];
        }
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
        //console.log("get_pages2", get);
      } catch (error) {
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
        console.log(error);
        //this.$toast.error(error);
      }
    },

    async fetchArticalFromTags(tags) {
      try {
        this.$store.commit("setLoading", true);
        const query = qs.stringify(
          { populate: "deep" },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find(
          "articles",
          `?filters[tags][slug]=${tags}&${query}&pagination[page]=${this.pages}&pagination[pageSize]=${this.pageSize}`
        );
        const newArtical = get.data;
        this.maxPages = get.meta.pagination.pageCount;
        //console.log("🚀 ~ fetchArticalFromTags ~ newArtical:", newArtical);
        if (this.pages == 1) {
          this.listArticle = newArtical;
        } else {
          this.listArticle = [...this.listArticle, ...newArtical];
        }
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
        //console.log("get_pages2", get);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
        //this.$toast.error(error);
      }
    },
  },
  components: {
    BlogDetails,
    ListArticleByCategory,
    BannerShop,
    ShopV3,
    // Add other dynamically imported components here if needed
  },

  head() {
    return {
      title: `${
        this.checkLayout?.data[0]?.attributes?.metaTag?.title
          ? this.checkLayout?.data[0]?.attributes?.metaTag?.title
          : this.checkLayout?.data[0]?.attributes?.name
          ? this.checkLayout?.data[0]?.attributes?.name
          : this.details[0]?.attributes?.name
          ? this.details[0]?.attributes?.name
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

<style>
.box-hover-text {
  border-radius: 50px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #23bdb8, #43e794) !important;
  color: white;
  margin: 0;
}
</style>
