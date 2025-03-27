<template>
  <div v-if="order">
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
            <h1 v-if="$route.query.type != 'giahan'">Cập nhật đơn hàng</h1>
            <h1 v-if="$route.query.type == 'giahan'">Cập nhật đơn gia hạn</h1>
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
    <ProductCheckoutTimeAndHDH
      :order="order"
      :setDataOrder_id="order_id"
      :setDataUser_id="userId"
      :setDataType="type"
    />
    <!-- <div>
      jdjdjdjjdjd {{ order }} cdd {{ order_id }} cdd {{ userId }} cdd {{ type }}
    </div> -->
  </div>
</template>

<script>
import ProductCheckoutTimeAndHDH from "@/components/Product/ProductCheckoutTimeAndHDHV2.vue";
export default {
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    ProductCheckoutTimeAndHDH,
  },

  computed: {
    type() {
      return this.$route.query.type || "";
    },
    order_id() {
      return this.$route.params.id || this.$route.query.orderId || "";
    },
    userId() {
      return this.$route.query.userId || "";
    },
  },

  data() {
    return {
      order: {},
    };
  },

  mounted() {
    this.$store.commit("setLoading", false);
  },
  async asyncData({ store, route, error, order, $sdk }) {
    try {
      const [getOrderDetails] = await Promise.all([
        // store.dispatch("getOrderDetail", route.params.id),
        $sdk.order_graphQL.getOrderDetail(route.params.id),
      ]);

      const { order, lineItems } = getOrderDetails;
      //console.log("🚀 ~ asyncData ~ getOrderDetails:", getOrderDetails);

      // Sắp xếp lineItems
      const sortedLineItems = [...lineItems].sort((a, b) => {
        const hasColocationA = a.orderLineItem.customAttributes.some(
          (c) => c.value == "COLOCATION"
        );
        const hasColocationB = b.orderLineItem.customAttributes.some(
          (c) => c.value == "COLOCATION"
        );

        return hasColocationA == hasColocationB ? 0 : hasColocationA ? 1 : -1;
      });
      //console.log("🚀 ~ sortedLineItems ~ sortedLineItems:", sortedLineItems);
      const updatedLineItems = await Promise.all(
        sortedLineItems.map(async (item) => {
          // console.log(
          //   "🚀 ~ sortedLineItems.map ~ item?.orderLineItem?.variant?.id:",
          //   item?.orderLineItem?.variant?.id
          // );
          // Gọi API lấy chi tiết sản phẩm cho mỗi item
          const getDetailProdcut = await $sdk.product.getProductById(
            item?.orderLineItem?.variant?.id
          );
          // console.log(
          //   "🚀 ~ sortedLineItems.map ~ getDetailProdcut:",
          //   getDetailProdcut
          // );
          // Nếu có dữ liệu chi tiết sản phẩm, gán vào item tương ứng
          if (getDetailProdcut) {
            return { ...item, productDetails: getDetailProdcut }; // Thêm thuộc tính productDetails
          }

          // Nếu không có dữ liệu chi tiết sản phẩm, giữ nguyên item
          return item;
        })
      );
      //console.log("🚀 ~ asyncData ~ updatedLineItems:", updatedLineItems)

      // Lưu order và lineItems đã sắp xếp vào một biến mới
      const orderData = { order, lineItems: [...updatedLineItems] };
      //console.log("🚀 ~ asyncData ~ orderData:", orderData);

      return { order: orderData };
    } catch (err) {
      console.log("🚀 ~ asyncData ~ err:", err);
      // console.log("err", err);
      // error({ statusCode: 404, message: "Post not found" });
    }
  },

  head() {
    return {
      title:
        this.$route.query.type != "giahan"
          ? "Cập nhật đơn hàng"
          : "Cập nhật đơn gia hạn",
    };
  },
};
</script>
