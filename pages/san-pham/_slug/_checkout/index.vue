<template>
  <div v-if="product">
    <div
      class="page-title-area"
      style="
        margin-top: 70px;
        padding-top: 30px !important;
        padding-bottom: 30px !important;
      "
    >
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <h1 v-if="$route.query.type != 'giahan'">Tạo đơn hàng</h1>
            <h1 v-if="$route.query.type == 'giahan'">Tạo đơn gia hạn</h1>
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
    <div class="checkout-product">
      <ProductCheckoutV2
        :id="id"
        :product="product"
        :targetID="typeId"
        :type="type"
        :moneyDiscount="moneyDiscount"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/Common/PageTitle";
import qs from "qs";
import ProductCheckoutV2 from "@/components/Product/ProductCheckoutV2.vue";

export default {
  // middleware: "auth",
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      product: null,
      productOptionPlace: null,
      seo: null,
      id: null,
      productOption: null,
      type: "",
      moneyDiscount: 0,
    };
  },

  components: {
    PageTitle,
    ProductCheckoutV2,
  },

  mounted() {
    if (this.$store.getters.getUser) {
      this.$store.commit("setLoading", true);
    } else {
      setTimeout(() => {
        this.$store.commit("setLoading", false);
      }, 1000);
    }

    //console.log("product", this.product)
    // if (!this.$route.query.type) {
    //   this.$router.push({
    //     path: this.$route.path,
    //     query: {
    //       ...this.$route.query, // Giữ lại các query khác
    //       type: this.product[0]?.product?.priceType == "RENT" ? "thue" : "mua", // Thêm hoặc cập nhật query 'type'
    //     },
    //   });
    // }
  },

  async asyncData({ $sdk, route, store, redirect, error, moneyDiscount }) {
    const id = /[^-]*$/.exec(route.params.slug)[0];
    const typeId = route.query?.targetID;
    const type = route.query?.type;

    try {
      const getProduct = await $sdk.product.getProductBySlug(
        route.params.slug,
        route.query.store
      );
      // store.dispatch("getProductByHandle", {
      //   handle: route.params.slug,
      //   build_type: route.query?.build_type || "ORDER",
      //   store: route.query.store,
      // });

      const productId = getProduct?.id;
      //console.log("🚀 ~ asyncData ~ getProduct:", getProduct);

      if (!productId) {
        throw new Error("Product ID is not available");
      }

      let productGroups = [];
      if (!route.query.domain && route.query.type != "giahan") {
        if (getProduct?.categories[0]?.id) {
          const param = {
            category: getProduct.categories[0].id,
            display: "PUBLIC",
            subType: "CONFIG,SIMPLE,VARIABLE",
            status: "ON_SELL",
            maxResult: 100,
          };
          const response = await $sdk.product.getProducts(
            param,
            route.query.store
          );
          //console.log("🚀 ~ asyncData ~ response:", response)

          productGroups = response.data;
          const featuredProduct = productGroups.find(
            (product) => product.id === getProduct?.id
          );
          if (featuredProduct) {
            // Lọc ra sản phẩm không phải là getProduct và đặt nó sau sản phẩm đặc biệt
            productGroups = [
              featuredProduct,
              ...productGroups.filter(
                (product) => product.id !== getProduct?.id
              ),
            ];
          }
          //console.log("🚀 ~ asyncData ~ productGroups:", productGroups);
        }
      } else {
        const response = await $sdk.product.getProductById(
          getProduct?.id,
          route.query.store
        );

        productGroups.push(response);

        const featuredProduct = productGroups.find(
          (product) => product.id === getProduct?.id
        );
        if (featuredProduct) {
          productGroups = [
            featuredProduct,
            ...productGroups.filter((product) => product.id !== getProduct?.id),
          ];
        }

        //console.log("🚀 ~ asyncData ~ productGroups:", productGroups);
      }
      //console.log("🚀 ~ asyncData ~ productGroups:", productGroups);
      //const dataRent = productGroups?.filter((c) => c.priceType === "RENT");

      const productGroupsFullData = await Promise.all(
        productGroups?.map(async (c) => {
          const colocationAttribute = c?.productAttributes?.find(
            (d) => d.attributeName === "COLOCATION"
          );
          const colocationResponse = colocationAttribute?.attributeValue
            ? await store.dispatch("getProductById", {
                id: colocationAttribute.attributeValue,
                store: route.query.store,
              })
            : null;

          return {
            product: { ...c },
            colocation: colocationResponse?.data || null,
          }; // Tạo bản sao của product
        })
      );

      await Promise.all(
        productGroupsFullData.map(async ({ product, colocation }) => {
          await Promise.all(
            [product, colocation].map(async (item) => {
              if (item) {
                const resDiscount = await $sdk.product.getListPrice(
                  [item.id.toString()],
                  route.query.store
                );

                // Khởi tạo dataDiscount là một mảng
                item.dataDiscount = [];

                let listPrice = resDiscount[item.id]?.flatMap((d) => {
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
                        unitDTO_id: item.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                        unitDTO_name: item.unitDTO?.name || "default", // Default name if not available
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
                      unitDTO_id: item.unitDTO?.id, // Unit DTO ID
                      unitDTO_name: item.unitDTO?.name, // Unit DTO Name
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
                      unitDTO_id: item.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                      unitDTO_name: item.unitDTO?.name || "Tháng", // Default name if not available
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
                });

                // Sắp xếp khi có giá KM
                let filterData = [...listPrice];

                // Mảng mới để lưu kết quả
                const updatedDataDiscount = [];

                // Lọc ra các đối tượng PROMOTION và gán trường oldPrice nếu có đối tượng RENT tương ứng
                filterData
                  .filter((item) => item.type === "PROMOTION")
                  .forEach((promotion) => {
                    // Lọc tất cả các đối tượng RENT có cùng time với PROMOTION
                    const matchingRentData = filterData.filter(
                      (rent) =>
                        (rent.type === "RENT" || rent.type === "SELL") &&
                        rent.time === promotion.time
                    );

                    if (matchingRentData.length > 0) {
                      // Nếu tìm thấy các đối tượng RENT tương ứng, gán vào trường oldPrice (dưới dạng mảng)
                      promotion.oldPrice = matchingRentData;

                      // Thêm đối tượng PROMOTION vào mảng mới
                      updatedDataDiscount.push(promotion);

                      // Sau khi gán oldPrice, xóa các đối tượng RENT khỏi danh sách filterData
                      matchingRentData.forEach((rent) => {
                        const rentIndex = filterData.indexOf(rent);
                        if (rentIndex !== -1) {
                          filterData.splice(rentIndex, 1);
                        }
                      });
                    } else {
                      // Nếu không tìm thấy đối tượng RENT, chỉ thêm PROMOTION vào mảng mới
                      updatedDataDiscount.push(promotion);
                    }
                  });

                // Tiếp tục thêm các đối tượng RENT còn lại (nếu có) vào mảng kết quả
                filterData.forEach((item) => {
                  if (item.type === "RENT" || item.type === "SELL") {
                    updatedDataDiscount.push(item);
                  }
                });

                // Cập nhật lại listPrice sau khi thêm trường 'number' và đẩy vào mảng dataDiscount
                updatedDataDiscount.forEach((price, index) => {
                  price.number = index + 1; // Cộng thêm 1 để bắt đầu từ 1 thay vì 0
                });

                // Đẩy các đối tượng vào mảng dataDiscount sau khi đã thêm trường 'number'
                if (updatedDataDiscount.length > 0) {
                  item.dataDiscount.push(...updatedDataDiscount);
                }

                // Bước kiểm tra và cập nhật defaultPrice
                item.dataDiscount.forEach((discount) => {
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
              }
            })
          );
        })
      );

      // console.log(
      //   "🚀 ~ asyncData ~ productGroupsFullData:",
      //   productGroupsFullData
      // );
      return {
        id,
        product:
          route.query?.type == "mua"
            ? productGroupsFullData?.filter(
                (c) => c?.product?.dataDiscount?.length > 0
              )
            : productGroupsFullData,
        typeId,
        seo: null, // No need to fetch SEO here for optimization
        type,
        moneyDiscount,
      };
    } catch (err) {
      store.commit("setLoading", false);
      console.error("Error fetching data:", err);
      // error({ statusCode: 404, message: "Post not found" });
      //return redirect("/cua-hang");
    }
  },

  head() {
    return {
      title:
        this.$route.query.type != "giahan" ? "Tạo đơn hàng" : "Tạo đơn gia hạn",
    };
  },
};
</script>

<style lang="scss" scoped>
.checkout-product {
  background-color: #fcfcfd;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
