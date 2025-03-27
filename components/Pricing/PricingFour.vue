<template>
  <div v-if="block.__component == 'pricing.pricing-four'">
    <template v-for="items in block?.productList">
      <div class="pricing-area ptb-80 bg-f9f6f6">
        <div class="container">
          <div class="section-title">
            <h2>{{ items.name }}</h2>
            <div class="bar"></div>
          </div>

          <div class="row justify-content-center">
            <div
              v-for="item in items.products"
              class="col-lg col-md-6 col-sm-6 mb-4"
              :class="{
                'col-lg-3':
                  items.products.length <= 3 || items.products.length >= 4,
              }"
              :key="item.id"
            >
              <ProductCsCardPricingFour :item="item" />
            </div>
          </div>
        </div>

        <div class="shape8 rotateme">
          <img src="~/assets/img/shape2.svg" />
        </div>
        <div class="shape2 rotateme">
          <img src="~/assets/img/shape2.svg" />
        </div>
        <div class="shape7"><img src="~/assets/img/shape4.svg" /></div>
        <div class="shape4"><img src="~/assets/img/shape4.svg" /></div>
      </div>
    </template>
  </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape4 from "~/assets/img/shape4.svg";
import ProductCsCardPricingFour from "@/components/Product/ProductCsCardPricingFour.vue";

export default {
  name: "Pricing",
  components: {
    Shape2,
    Shape4,
    ProductCsCardPricingFour,
  },
  props: {
    block: {
      type: Object,
      default: {},
    },
    productData: [],
  },

  data() {
    return {
      //product: {},
    };
  },

  mounted() {
    // this.handleGetPriceMenu(this.block?.categoryId);
  },

  methods: {
    // handleSale(price, originalPrice) {
    //   price = price.replaceAll(".", "");
    //   originalPrice = originalPrice.replaceAll(".", "");
    //   return (100 - (Number(price) / Number(originalPrice)) * 100).toFixed();
    // },
    // async handleGetPriceMenu(id) {
    //   const data = await this.$store.dispatch("getPriceMenus", id);
    //   if (data?.data?.getPriceMenus) {
    //     // Lấy danh sách id của tất cả các sản phẩm
    //     const ids = data.data.getPriceMenus.flatMap((menu) =>
    //       menu.products.map((product) => product.id)
    //     );
    //     // Lấy danh sách giá dựa trên các id sản phẩm
    //     const responseListPrice = await this.$sdk.product.getListPrice(
    //       ids,
    //       this.$route.query.store
    //     );
    //     // Cập nhật giá cho các sản phẩm trong getPriceMenus
    //     this.product = data.data.getPriceMenus.map((menu) => {
    //       return {
    //         ...menu, // Sao chép các thuộc tính của menu
    //         products: menu.products.map((item) => {
    //           const newItem = { ...item };
    //           // Khởi tạo discountPrice nếu chưa tồn tại
    //           if (!newItem.discountPrice) {
    //             newItem.discountPrice = [];
    //           }
    //           // Tìm giá tương ứng với sản phẩm dựa trên id
    //           const price = responseListPrice[item?.id] || [];
    //           // Duyệt qua các đối tượng trong subPrices và thay đổi type thành type của object cha
    //           const updatedPrice = price.flatMap((d) => {
    //             if (!d?.subPrices || d?.subPrices?.length === 0) {
    //               // Nếu không có subPrices, trả về 1 đối tượng mặc định
    //               return [
    //                 {
    //                   time: d?.quantity || 1,
    //                   type: d?.type,
    //                   percentDiscount: d?.discountPercent || 0,
    //                   price: d?.price || 0,
    //                   hint: d?.hint || null,
    //                   priceDiscount:
    //                     d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
    //                   unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
    //                   unitDTO_name: newItem.unitDTO?.name || "default", // Default name if not available
    //                   defaultPrice: d?.defaultPrice ? false : true, // Default to true when no subPrices
    //                   attributes: {
    //                     value: d?.attributes?.some(
    //                       (a) =>
    //                         a.attrName == "CAMPAIN" ||
    //                         a.attrName == "CAMPAIGN_ACTION"
    //                     ),
    //                     campain: d?.attributes || [],
    //                   },
    //                 },
    //               ];
    //             }
    //             // Trường hợp có subPrices, xử lý từng phần tử trong subPrices
    //             const subPriceData = d?.subPrices?.map((c) => {
    //               return {
    //                 time: c?.quantity, // Time (quantity)
    //                 type: c?.type == "QUANTITY" ? d?.type : c?.type,
    //                 percentDiscount: c?.discountPercent, // Discount percent
    //                 price: c?.price, // Price
    //                 hint: c?.hint || null, // Hint (or null if not provided)
    //                 priceDiscount:
    //                   c?.displayPrice || c?.price * (c?.quantity || 1) || 0, // Calculating priceDiscount
    //                 unitDTO_id: newItem.unitDTO?.id, // Unit DTO ID
    //                 unitDTO_name: newItem.unitDTO?.name, // Unit DTO Name
    //                 defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
    //                 attributes: {
    //                   value: c?.attributes?.some(
    //                     (a) =>
    //                       a.attrName == "CAMPAIN" ||
    //                       a.attrName == "CAMPAIGN_ACTION"
    //                   ),
    //                   campain: c?.attributes || [],
    //                 },
    //               };
    //             });
    //             // Thêm 1 đối tượng mặc định vào cuối mảng subPriceData nếu có subPrices
    //             return [
    //               {
    //                 time: d?.quantity || 1,
    //                 type: d?.type,
    //                 percentDiscount: d?.discountPercent || 0,
    //                 price: d?.price || 0,
    //                 hint: d?.hint || null,
    //                 priceDiscount:
    //                   d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
    //                 unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
    //                 unitDTO_name: newItem.unitDTO?.name || "Tháng", // Default name if not available
    //                 defaultPrice: d?.defaultPrice ? d?.defaultPrice == d?.id ? true : false : true, // Default to true when subPrices exist
    //                 attributes: {
    //                   value: d?.attributes?.some(
    //                     (a) =>
    //                       a.attrName == "CAMPAIN" ||
    //                       a.attrName == "CAMPAIGN_ACTION"
    //                   ),
    //                   campain: d?.attributes || [],
    //                 },
    //               },
    //               ...subPriceData,
    //             ];
    //           });
    //           let filterData = [...updatedPrice];
    //           //console.log("🚀 ~ listData ~ filterData:", filterData)
    //           const updatedDataDiscount = [];
    //           // Các bước xử lý filterData và cập nhật dataDiscount
    //           filterData
    //             .filter((item) => item.type === "PROMOTION")
    //             .forEach((promotion) => {
    //               const matchingRentData = filterData.filter(
    //                 (rent) =>
    //                   (rent.type === "RENT" || rent.type === "SELL") &&
    //                   rent.time === promotion.time
    //               );
    //               if (matchingRentData.length > 0) {
    //                 promotion.oldPrice = matchingRentData;
    //                 updatedDataDiscount.push(promotion);
    //                 matchingRentData.forEach((rent) => {
    //                   const rentIndex = filterData.indexOf(rent);
    //                   if (rentIndex !== -1) {
    //                     filterData.splice(rentIndex, 1);
    //                   }
    //                 });
    //               } else {
    //                 updatedDataDiscount.push(promotion);
    //               }
    //             });
    //           filterData.forEach((item) => {
    //             if (item.type === "RENT" || item.type === "SELL") {
    //               updatedDataDiscount.push(item);
    //             }
    //           });
    //           updatedDataDiscount.forEach((price, index) => {
    //             price.number = index + 1;
    //           });
    //           updatedDataDiscount.forEach((discount) => {
    //             if (discount.oldPrice) {
    //               // Kiểm tra oldPrice và cập nhật defaultPrice
    //               let defaultPriceFound = false;
    //               discount.oldPrice.forEach((oldItem) => {
    //                 if (oldItem.defaultPrice) {
    //                   defaultPriceFound = true;
    //                   oldItem.defaultPrice = false; // Set oldPrice's defaultPrice to false
    //                 }
    //               });
    //               // Nếu tìm thấy defaultPrice trong oldPrice, thì set parent defaultPrice to true
    //               if (defaultPriceFound) {
    //                 discount.defaultPrice = true;
    //               }
    //             }
    //           });
    //           // Đẩy dữ liệu vào discountPrice
    //           newItem.discountPrice.push(...updatedDataDiscount);
    //           let dataDefault = updatedDataDiscount?.find(
    //             (c) => c.defaultPrice == true
    //           );
    //           // Trả về đối tượng mới của item, với thông tin từ item và giá đã được cập nhật
    //           // return {
    //           //   ...item, // Giữ lại tất cả các thuộc tính của item
    //           //   discountPrice: updatedPrice.length > 0 ? updatedPrice : null, // Gắn giá vào item, nếu có giá
    //           // };
    //           return {
    //             ...newItem,
    //             type:
    //               dataDefault?.type != "PROMOTION"
    //                 ? dataDefault?.type
    //                 : dataDefault?.oldPrice[0]?.type,
    //             discountPrice: updatedDataDiscount.length > 0 ? updatedDataDiscount : [],
    //           };
    //         }),
    //       };
    //     });
    //     console.log(
    //       "🚀 ~ this.product=data.data.getPriceMenus.map ~ this.product:",
    //       this.product
    //     );
    //   }
    //   //this.product = data?.data?.getPriceMenus;
    // },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 20px;
}
.pricing-area:nth-of-type(2n-1) {
  background: #eef6fd;
}
</style>
