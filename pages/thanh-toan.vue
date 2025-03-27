<template>
  <div v-if="order">
    <CartConfirm
      :order="order"
      :dataPaymentsByOrders="dataPaymentsByOrders"
      @handleGetPaymentByOrder="handleGetPaymentByOrder"
    />
  </div>
</template>

<script>
import CartConfirm from "../components/Cart/CartConfirm.vue";
import Cookies from "js-cookie";

export default {
  components: { CartConfirm },
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      order: {},
      transferInfo: null,
      dataPaymentsByOrders: [],
      dataVatInfo: [],
      dataVatInfoSentBefore: null,
    };
  },
  mounted() {
    this.$store.commit("setLoading", false);
  },

  methods: {
    async handleGetPaymentByOrder() {
      try {
        const response = await this.$sdk.paymentLV.paymentsByOrders([
          this.$route.params.id,
        ]);
        const responseIdCasso = response?.filter((c) => c.statusCode == 1);

        this.dataPaymentsByOrders = responseIdCasso;
      } catch (error) {
        console.log("🚀 ~ handleGetPaymentByOrder ~ error:", error);
      }
    },
  },

  async asyncData({
    order,
    store,
    route,
    error,
    $sdk,
    transferInfo,
    dataPaymentsByOrders,
    dataVatInfo,
    dataVatInfoSentBefore,
    app,
  }) {
    try {
      store.commit("setLoading", true);
      let tokenData = app.$cookies.get(process.env.ACCESSTOKEN_NAME);
      // console.log("🚀 ~ token:", token)
      // Fetch all the necessary data in parallel
      const [getOrderDetails, paymentsByOrders] = await Promise.all([
        // store.dispatch("getOrderDetail", route.params.id),
        $sdk.order_graphQL.getOrderDetail(route.params.id),
        $sdk.paymentLV.paymentsByOrders([route.params.id]),
      ]);

      // Filter for the payments with statusCode == 1
      const responseIdCasso = paymentsByOrders?.filter(
        (c) => c.statusCode == 1
      );
      let getDataOrderDetails = null;
      if (store.getters.getUser) {
        if (getOrderDetails?.order?.orderStatus == 1) {
          const token = await $sdk.order.setToken(tokenData);
          const response = await $sdk.order.updateStatusSellOrder(
            route.params.id,
            "OPEN"
          );
        }

        if (!getOrderDetails?.order.ownerPartyId) {
          const token = await $sdk.order.setToken(tokenData);

          const updateCustomer =
            await $sdk.order.updateCustomerAndShippingAddress(
              route.params.id,
              store.getters.getUser?.partyId,
              null
            );

          if (updateCustomer) {
            const response = await $sdk.order_graphQL.getOrderDetail(
              route.params.id
            );
            if (response) {
              getDataOrderDetails = response;
            }
          }
        } else {
          const response = await $sdk.order_graphQL.getOrderDetail(
            route.params.id
          );
          if (response) {
            getDataOrderDetails = response;
          }
        }
      } else {
        if (getOrderDetails?.order?.orderStatus == 1) {
          const token = await $sdk.order.setToken(tokenData);
          const responseUpdate = await $sdk.order.updateStatusSellOrder(
            route.params.id,
            "OPEN"
          );

          if (responseUpdate) {
            const response = await $sdk.order_graphQL.getOrderDetail(
              route.params.id
            );
            if (response) {
              getDataOrderDetails = response;
            }
          }
        } else {
          getDataOrderDetails = getOrderDetails;
        }
      }

      if (getDataOrderDetails) {
        // Extract order and lineItems
        const { order: orderDetails, lineItems } = getDataOrderDetails;

        // Fetch product details for each line item
        const updatedLineItems = await Promise.all(
          lineItems.map(async (item) => {
            // Fetch product details and product options in parallel
            // const getDetailProdcutPromise = $sdk.product.getProductById(
            //   item?.orderLineItem?.variant?.id
            // );
            const responsePromise = store.dispatch("getProductOptionV2", {
              id: item?.orderLineItem?.variant?.id,
              store: route.query.store,
            });
            //console.log("🚀 ~ lineItems.map ~ item?.orderLineItem?.variant?.id:", item?.orderLineItem?.variant?.id)

            // Wait for both API calls to complete
            const [response] = await Promise.all([
              // getDetailProdcutPromise,
              responsePromise,
            ]);

            // console.log(
            //   "🚀 ~ lineItems.map ~ response.data.getProductOption:",
            //   response
            // );

            if (response.data.getProductOption) {
              // If product options exist, format them
              const formattedOptions = response.data.getProductOption.map(
                (data) => {
                  return {
                    id: data?.id,
                    name: data.name,
                    productFeatureDTOS: data.productFeatureDTOS.reduce(
                      (result, feature) => {
                        feature?.productOptionGroupItemDTOS?.forEach((item) => {
                          result.push({
                            id: item?.id,
                            productId: item.productId,
                            productName: item.productName,
                            price: item.price,
                            qualify: item.qualify,
                          });
                        });
                        return result;
                      },
                      []
                    ),
                    requireData: data.requireData,
                    subType: data.subType,
                  };
                }
              );

              // Return the updated item with product options and product details
              return {
                ...item,
                dataProductOption: formattedOptions,
                // productDetails: getDetailProdcut,
              };
            } else {
              // If no product options, just return the item with product details
              return {
                ...item,
                // productDetails: getDetailProdcut,
              };
            }
          })
        );

        // Return the updated data by creating new objects to avoid modifying function parameters directly
        return {
          order: { order: orderDetails, lineItems: [...updatedLineItems] },
          dataPaymentsByOrders: responseIdCasso,
        };
      }
    } catch (err) {
      store.commit("setLoading", false);
      console.log("🚀 ~ asyncData ~ err:", err);
      // Optionally trigger error handling
      // error({ statusCode: 404, message: "Post not found" });
    } finally {
      // Ensure loading is set to false in case of error
      store.commit("setLoading", false);
    }
  },

  head() {
    return {
      title: "Thanh toán đơn hàng",
    };
  },
};
</script>

<style lang="scss" scoped></style>
