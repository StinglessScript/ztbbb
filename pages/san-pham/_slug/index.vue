<template>
  <div v-if="product">
    <component
      :is="productComponent"
      :id="id"
      :product="product"
      :targetID="typeId"
      :slidesData="slidesData"
    />
  </div>
</template>

<script>
import BARE_METAL from "@/components/Product/ProductDetailBareMetal";
import BARE_METAL_CUSTOM from "@/components/Product/ProductDetailBareMetalCustom";
import OFFICE_365 from "@/components/Product/ProductDetailBackupMicro365";
const qs = require("qs");

export default {
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      product: null,
      seo: null,
      id: null,
      typeId: null,
      policy: null,
      // slidesData: [],
      // listRelatedInfor: [
      //   {
      //     collect: "Product",
      //     ids: ["120102", "120104", "120103", "132766", "128607"],
      //   },
      //   {
      //     collect: "Article",
      //     ids: ["30", "53", "54", "170", "117"],
      //   },
      // ],
    };
  },
  components: {
    BARE_METAL,
    OFFICE_365,
    BARE_METAL_CUSTOM,
  },

  async asyncData({ route, error, $strapi, store, $sdk }) {
    const id = route.params.slug.match(/[^-]*$/)[0];
    const typeId = route.query?.targetID;

    const query = qs.stringify(
      { populate: "deep" },
      { encodeValuesOnly: true }
    );
    const query2 = qs.stringify(
      {
        populate: [
          "categories",
          "tags",
          "author",
          "metaData",
          "metaData.image",
          "cover",
          "*",
        ],
      },
      { encodeValuesOnly: true }
    );

    try {
      store.commit("setLoading", true);

      // Fetch product data first
      const product = await $sdk.product.getProductBySlug(
        route.params.slug,
        route.query.store
      );
      const productId = product.id;
      const responseListPrice = await $sdk.product.getListPrice(
        [productId],
        route.query.store
      );

      const adjustedDiscountPrice =
        responseListPrice[productId] && responseListPrice[productId].length > 0
          ? responseListPrice[productId].flatMap((d) => {
              if (!d?.subPrices || d?.subPrices?.length === 0) {
                // Nếu không có subPrices, trả về 1 đối tượng mặc định
                return [
                  {
                    time: d?.quantity || 1,
                    type: d?.type,
                    percentDiscount: d?.discountPercent || 0,
                    price: d?.price || 0,
                    hint: d?.hint || null,
                    priceDiscount:
                      d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                    unitDTO_id: product.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                    unitDTO_name: product.unitDTO?.name || "default", // Default name if not available
                    defaultPrice: true, // Default to true when no subPrices
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

              // Trường hợp có subPrices, xử lý từng phần tử trong subPrices
              const subPriceData = d?.subPrices?.map((c) => {
                return {
                  time: c?.quantity, // Time (quantity)
                  type: c?.type == "QUANTITY" ? d?.type : c?.type,
                  percentDiscount: c?.discountPercent, // Discount percent
                  price: c?.price, // Price
                  hint: c?.hint || null, // Hint (or null if not provided)
                  priceDiscount:
                    c?.displayPrice || c?.price * (c?.quantity || 1) || 0, // Calculating priceDiscount
                  unitDTO_id: product.unitDTO?.id, // Unit DTO ID
                  unitDTO_name: product.unitDTO?.name, // Unit DTO Name
                  defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
                  attributes: {
                    value: c?.attributes?.some(
                      (a) =>
                        a.attrName == "CAMPAIN" ||
                        a.attrName == "CAMPAIGN_ACTION"
                    ),
                    campain: c?.attributes || [],
                  },
                };
              });

              // Thêm 1 đối tượng mặc định vào cuối mảng subPriceData nếu có subPrices
              return [
                {
                  time: d?.quantity || 1,
                  type: d?.type,
                  percentDiscount: d?.discountPercent || 0,
                  price: d?.price || 0,
                  hint: d?.hint || null,
                  priceDiscount:
                    d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                  unitDTO_id: product.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                  unitDTO_name: product.unitDTO?.name || "Tháng", // Default name if not available
                  defaultPrice: d?.defaultPrice
                    ? d?.defaultPrice == d?.id
                      ? true
                      : false
                    : true, // Default to true when subPrices exist
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
            })
          : []; // Nếu responseListPrice[productId] rỗng, trả về mảng rỗng

      let filterData = [...adjustedDiscountPrice];

      const updatedDataDiscount = [];

      // Các bước xử lý filterData và cập nhật dataDiscount
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
          // Kiểm tra oldPrice và cập nhật defaultPrice
          let defaultPriceFound = false;
          discount.oldPrice.forEach((oldItem) => {
            if (oldItem.defaultPrice) {
              defaultPriceFound = true;
              oldItem.defaultPrice = false; // Set oldPrice's defaultPrice to false
            }
          });

          // Nếu tìm thấy defaultPrice trong oldPrice, thì set parent defaultPrice to true
          if (defaultPriceFound) {
            discount.defaultPrice = true;
          }
        }
      });

      // Đẩy dữ liệu vào discountPrice
      //product.discountPrice.push(...updatedDataDiscount);
      let dataDefault = updatedDataDiscount?.find(
        (c) => c.defaultPrice == true
      );
      //console.log("🚀 ~ asyncData ~ updatedDataDiscount:", updatedDataDiscount);

      const dataProduct = {
        ...product,
        discountPrice:
          updatedDataDiscount.length > 0 ? updatedDataDiscount : [],
        type:
          dataDefault?.type != "PROMOTION"
            ? dataDefault?.type
            : dataDefault?.oldPrice[0]?.type,
      };

     // console.log("🚀 ~ asyncData ~ dataProduct:", dataProduct);
      // Fetch related information using the product ID
      const getRelatedInfor = await $sdk.product.getRelatedInfor(productId);

      // Format related information
      const listRelatedInfor = [
        {
          collect: "Product",
          ids:
            getRelatedInfor
              ?.filter((item) => item.type === "PRODUCT_TO_PRODUCT")
              .map((item) => item.id) || [],
        },
        {
          collect: "Article",
          ids:
            getRelatedInfor
              ?.filter((item) => item.type === "PRODUCT_TO_ARTICLE")
              .map((item) => item.id) || [],
          // (() => {
          //   const articleIds = getRelatedInfor
          //     ?.filter((item) => item.type === "PRODUCT_TO_ARTICLE")
          //     .map((item) => item.id);

          //   return articleIds && articleIds.length > 0
          //     ? articleIds
          //     : ["20.13114.2172", "20.13057.9193", "20.13008"];
          // })(),
        },
      ];

      const productIDs =
        listRelatedInfor.find((c) => c.collect === "Product")?.ids || [];
      const articleIDs =
        listRelatedInfor.find((c) => c.collect === "Article")?.ids || [];

      // Chuyển đổi productIDs thành chuỗi ID
      const productIdsString = productIDs.join(",");

      // Fetch additional data
      const policyPromise = $strapi.find(
        "policies",
        `?filters[qualify][$eq]=${id}&${query}`
      );
      const seoPromise = store.dispatch("getSeoByIDProduct", {
        id: productId,
        type: "PRODUCT",
      });

      // Prepare slidesDataPromises
      const slidesDataPromises = [];

      // Fetch products only if productIDs.length > 0
      if (productIDs.length > 0) {
        slidesDataPromises.push(
          $sdk.product
            .getProducts(
              {
                display: "PUBLIC",
                partnerId: "LONGVAN",
                status: "ON_SELL",
                storeChannel: route.query.store
                  ? route.query.store
                  : "LONGVANNET",
                subType: "CONFIG,SIMPLE,VARIABLE",
                product: productIdsString,
              },
              route.query.store
            )
            .then(async (response) => {
              const responseListPriceRelate = await $sdk.product.getListPrice(
                productIDs,
                route.query.store
              );

              const data = response.data.map((data) => {
                const newItem = { ...data };

                // id: data.id,
                // title: data.title,
                // handle: data.handle,
                // shortDescription: data.shortDescription,
                // images: data.images || [],
                // featuredImage: data.featuredImage || null,
                // price: data.price,
                // priceType: data.priceType,
                // type: "Product",
                // unitDTO: { name: data.unitDTO?.name || "" },
                // priceTypeName: data.priceTypeName || "",
                // qualify: data.qualify || "",
                // discountPrice: responseListPriceRelate[data?.id],
                // groups: data.groups,

                if (!newItem.discountPrice) {
                  newItem.discountPrice = [];
                }

                // Tìm giá tương ứng trong responseListPrice dựa trên id của item
                let price = responseListPriceRelate[newItem?.id] || [];

                // Duyệt qua các đối tượng trong subPrices và thay đổi type thành type của object cha
                let listPrice = price?.flatMap((d) => {
                  if (!d?.subPrices || d?.subPrices?.length === 0) {
                    // Nếu không có subPrices, trả về 1 đối tượng mặc định
                    return [
                      {
                        time: d?.quantity || 1,
                        type: d?.type,
                        percentDiscount: d?.discountPercent || 0,
                        price: d?.price || 0,
                        hint: d?.hint || null,
                        priceDiscount:
                          d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                        unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                        unitDTO_name: newItem.unitDTO?.name || "default", // Default name if not available
                        defaultPrice: d?.defaultPrice ? false : true, // Default to true when no subPrices
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

                  // Trường hợp có subPrices, xử lý từng phần tử trong subPrices
                  const subPriceData = d?.subPrices?.map((c) => {
                    return {
                      time: c?.quantity, // Time (quantity)
                      type: c?.type == "QUANTITY" ? d?.type : c?.type,
                      percentDiscount: c?.discountPercent, // Discount percent
                      price: c?.price, // Price
                      hint: c?.hint || null, // Hint (or null if not provided)
                      priceDiscount:
                        c?.displayPrice || c?.price * (c?.quantity || 1) || 0, // Calculating priceDiscount
                      unitDTO_id: newItem.unitDTO?.id, // Unit DTO ID
                      unitDTO_name: newItem.unitDTO?.name, // Unit DTO Name
                      defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
                      attributes: {
                        value: c?.attributes?.some(
                          (a) =>
                            a.attrName == "CAMPAIN" ||
                            a.attrName == "CAMPAIGN_ACTION"
                        ),
                        campain: c?.attributes || [],
                      },
                    };
                  });

                  // Thêm 1 đối tượng mặc định vào cuối mảng subPriceData nếu có subPrices
                  return [
                    {
                      time: d?.quantity || 1,
                      type: d?.type,
                      percentDiscount: d?.discountPercent || 0,
                      price: d?.price || 0,
                      hint: d?.hint || null,
                      priceDiscount:
                        d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                      unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                      unitDTO_name: newItem.unitDTO?.name || "Tháng", // Default name if not available
                      defaultPrice: d?.defaultPrice ? d?.defaultPrice == d?.id ? true : false : true, // Default to true when subPrices exist
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

                let type = listPrice[0]?.type;
                // Tiếp tục xử lý filterData và updatedDataDiscount như ban đầu
                let filterData = [...listPrice];
                //console.log("🚀 ~ listData ~ filterData:", filterData)
                const updatedDataDiscount = [];

                // Các bước xử lý filterData và cập nhật dataDiscount
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
                    // Kiểm tra oldPrice và cập nhật defaultPrice
                    let defaultPriceFound = false;
                    discount.oldPrice.forEach((oldItem) => {
                      if (oldItem.defaultPrice) {
                        defaultPriceFound = true;
                        oldItem.defaultPrice = false; // Set oldPrice's defaultPrice to false
                      }
                    });

                    // Nếu tìm thấy defaultPrice trong oldPrice, thì set parent defaultPrice to true
                    if (defaultPriceFound) {
                      discount.defaultPrice = true;
                    }
                  }
                });

                // Đẩy dữ liệu vào discountPrice
                newItem.discountPrice.push(...updatedDataDiscount);
                let dataDefault = updatedDataDiscount?.find(
                  (c) => c.defaultPrice == true
                );
                return {
                  ...newItem,
                  typeRelate: "Product",
                  type:
                    dataDefault?.type != "PROMOTION"
                      ? dataDefault?.type
                      : dataDefault?.oldPrice[0]?.type,
                  discountPrice:
                    updatedDataDiscount.length > 0 ? updatedDataDiscount : [],
                };
              });
              return data;
            })
        );
      }

      // Fetch articles only if articleIDs.length > 0
      let authorsData = {};
      if (articleIDs.length > 0) {
        const articles = await store.dispatch(
          "getBlogsInPortal",
          articleIDs.join(",")
        );

        // Lấy danh sách unique createdBy để fetch thông tin tác giả
        const uniqueAuthors = [
          ...new Set(articles.map((article) => article.createdBy)),
        ];
        const authorPromises = uniqueAuthors.map((authorId) =>
          $sdk.user.getCustomerById(authorId)
        );

        // Fetch tất cả thông tin tác giả
        const authors = await Promise.all(authorPromises);
        authors.forEach((author) => {
          if (author) {
            authorsData[author.id] = author; // Giả sử author có trường id
          }
        });

        slidesDataPromises.push(
          Promise.resolve(
            articles.map((data) => ({
              id: data?.id,
              title: data?.title,
              slug: data?.slug,
              imageUrl: data?.image
                ? data?.image
                : data?.urlImage
                ? data?.urlImage
                : null,
              typeRelate: "Article",
              publishedAt: data?.publishedAt || null,
              author: authorsData[data.createdBy]
                ? authorsData[data.createdBy].name
                : "",
            }))
          )
        );
      }

      // Wait for all promises
      const [policyResponse, seoData, slidesData] = await Promise.all([
        policyPromise,
        seoPromise,
        Promise.all(slidesDataPromises).then((data) => data.flat()),
      ]);
      //console.log("🚀 ~ asyncData ~ slidesData:", slidesData)

      const policy = policyResponse.data;
      const seo = seoData.data;

      store.commit("setLoading", false);
      return {
        id: productId,
        product: dataProduct,
        typeId,
        seo,
        policy,
        slidesData,
      };
    } catch (err) {
      console.log("🚀 ~ asyncData ~ err:", err);
      error({ statusCode: 404, message: "Page not found" });
      store.commit("setLoading", false);
      return {
        id: null,
        product: null,
        typeId: null,
        seo: null,
        policy: null,
        slidesData: [],
      };
    }
  },

  mounted() {
    setTimeout(() => {
      this.$store.commit("setLoading", false);
    }, 1000);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },

  computed: {
    productComponent() {
      if (this.product) {
        if (this.product.type == "BARE_METAL_CUSTOM") {
          return "BARE_METAL_CUSTOM";
        } else if (this.product.type == "OFFICE_365") {
          return "OFFICE_365";
        } else {
          return "BARE_METAL";
        }
      }
      return null;
    },
  },

  head() {
    const titleContent =
      this.seo?.find((c) => c.type === "TITLE")?.content || this.product?.title;
    const descriptionContent =
      this.seo?.find((c) => c.type === "DESCRIPTION")?.content ||
      this.product?.short_description ||
      "";
    const keywordsContent =
      this.seo?.find((c) => c.type === "KEYWORDS")?.content ||
      this.product?.title ||
      "";
    const imageContent = this.product?.featured_image || "";

    return {
      title: titleContent,
      meta: [
        {
          hid: "robots",
          name: "robots",
          content: this.product ? "index, follow" : "noindex",
        },
        {
          hid: "description",
          name: "description",
          content: descriptionContent,
        },
        { hid: "keywords", name: "keywords", content: keywordsContent },
        { hid: "image", name: "image", content: imageContent },
      ],
    };
  },
};
</script>
