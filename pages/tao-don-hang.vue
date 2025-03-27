<template>
  <div>
    <OrdersProduct
      :products="product"
      :productOptionSSR="productOption"
      :productRentalDiscountSSR="productRentalDiscount"
      :productGroups="productGroups"
    />
  </div>
</template>

<script>
import OrdersProduct from "@/components/Orders/OrdersProduct";
export default {
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    OrdersProduct,
  },

  async asyncData({ route, error, $strapi, store, $sdk }) {
    try {
      store.commit("setLoading", true);

      // Gọi các API đồng thời
      const [product, productOption, productRentalDiscount] = await Promise.all(
        [
          $sdk.product.getProductById(route.query.id),
          $sdk.product.getProductOption(route.query.id),
          $sdk.crm_camping.searchProductQuantityPromotionAction(route.query.id),
        ]
      );

      // Định dạng dữ liệu từ getProductOption
      const formattedOptions = productOption.map((data) => ({
        id: data.id,
        name: data.name,
        productFeatureDTOS: data.productFeatureDTOS.flatMap(
          (feature) =>
            feature?.productOptionGroupItemDTOS?.map((item) => ({
              id: item.id,
              productId: item.productId,
              productName: item.productName,
              price: item.price,
              qualify: item.qualify
            })) || []
        ),
        requireData: data.requireData,
        subType: data.subType,
      }));

      // Thêm trường `number` vào product nếu có dữ liệu
      const enhancedProduct = product
        ? {
            ...product,
            number: 1,
          }
        : null;

      // Thêm trường `number` vào từng phần tử của productGroups nếu có dữ liệu
      let productGroups = [];

      if (product?.categories[0].id) {
        const param = {
          group: product.categories[0].id,
          display: "PUBLIC",
          subType: "CONFIG,SIMPLE,VARIABLE",
          status: "ON_SELL",
        };
        const data = await $sdk.product.getProducts(param);
        productGroups = data;
      }

      const enhancedProductGroups = productGroups?.data?.length
        ? productGroups?.data?.map((item) => ({
            ...item,
            number: 1,
          }))
        : [];

      const rentProducts = enhancedProductGroups.filter(
        (item) => item.priceType == "RENT"
      );

      const sortEnhancedProductGroups = rentProducts.sort(
        (a, b) => (b.id == route.query.id) - (a.id == route.query.id)
      );

      store.commit("setLoading", false);

      // Trả về dữ liệu bao gồm dữ liệu bổ sung (nếu có)
      return {
        product: enhancedProduct,
        productOption: formattedOptions,
        productRentalDiscount: productRentalDiscount[route.query.id],
        productGroups: sortEnhancedProductGroups,
      };
    } catch (err) {
      console.log("🚀 ~ asyncData ~ err:", err);
      error({ statusCode: 404, message: "Page not found" });
      store.commit("setLoading", false);
      return {
        product: null,
        productOption: [],
        productRentalDiscount: null,
        productGroups: [],
      };
    }
  },
};
</script>
