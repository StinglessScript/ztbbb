<template>
  <div class="product-card">
    <div class="product-image" v-if="product.featured_image">
      <img
        class="img-hover"
        @click="$router.push(`/san-pham/${product.handle}`)"
        :src="product.featured_image"
        alt="image"
        width="80%"
      />
    </div>
    <div class="product-image" v-else>
      <img src="~/assets/img/Nodata.svg" />
    </div>
    <div class="product-body">
      <div>
        <div class="product-body-title">
          <h3 @click="$router.push(`/san-pham/${product.handle}`)">
            {{ product.title }}
          </h3>
        </div>
        <div class="product-body-description">
          <p class="description-content" v-html="product.short_description"></p>
        </div>
      </div>
      <div class="product-body-button">
        <!-- <div
          class="product-button"
          @click="$router.push(`/san-pham/${product.handle}`)"
          :class="{ active: index == 1 }"
        >
          <div class="product-button-left">Mua ngay</div>
          <div class="product-button-right">
            <div class="product-button-right_top">
              {{ convertPrice(product.price) }}
            </div>
            <div class="product-button-right_bottom">
              <span class="price">
                {{ convertPrice(product.compare_at_price) }}
              </span>
              <span> </span>
            </div>
          </div>
        </div> -->
        <!-- <div
          class="product-button active"
          v-if="checkId"
          @click="$router.push(`/san-pham/${product.handle}`)"
          :class="{ active: index == 1 }"
        >
          <div class="product-button-left">Trả góp</div>
          <div class="product-button-right">
            <div class="product-button-right_top">
              {{ convertPrice(product.price / 12) }}
            </div>
            <div class="product-button-right_bottom">
              <span class="price active"> x12 kỳ </span>
              <span> </span>
            </div>
          </div>
        </div> -->
        <div
          class="product-button active"
          v-if="
            product?.product_prices &&
            product?.product_prices?.length != 0 &&
            product?.product_prices?.some((price) => price.type != 'SELL')
          "
          @click="$router.push(`/san-pham/${product.handle}`)"
        >
          <div class="product-button-left">Thuê</div>
          <div class="product-button-right">
            <div class="product-button-right_top">
              {{ convertPrice(findMaxNumberItem(product)?.price) }}
            </div>
            <div class="product-button-right_bottom">
              <span class="price active"> /{{ findMaxNumberItem(product)?.typeName.split(' ')[2] }} </span>
              <span> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCardBareMetal",
  props: ["product"],
  methods: {
    extractNumberFromTypeName(typeName) {
     // console.log("typeName", typeName);
      const match = typeName?.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    },
    findMaxNumberItem(items) {
      let maxNumber = -Infinity; // Khởi tạo giá trị maxNumber là âm vô cùng
      let maxNumberItem = null;

      items?.product_prices?.forEach((item) => {
        if (item.type != "SELL") {
          const number = this.extractNumberFromTypeName(item.typeName);

          if (number == 1) {
            maxNumber = number;
            maxNumberItem = item;
          }
        }
      });

      return maxNumberItem;
    },

    getMaxQualityItem(item) {
      // Lấy item có chất lượng lớn nhất
      const maxQualityItem = item?.product_prices?.reduce(
        (maxItem, currentItem) => {
          return currentItem.quantity > maxItem.quantity
            ? currentItem
            : maxItem;
        },
        item?.product_prices[0]
      );
      return maxQualityItem;
      // In thông tin của item có chất lượng lớn nhất
      console.log("maxQualityItem", maxQualityItem);
    },
    getPrice(productIdToFind) {
      let minPrice = Number.MAX_VALUE;
      let cheapestProduct = null;

      this.product.variants.forEach((product) => {
        if (
          product.options_ids.includes(productIdToFind) &&
          product.price < minPrice
        ) {
          minPrice = product.price;
          cheapestProduct = product;
        }
      });

      console.log(cheapestProduct);
      return cheapestProduct;
    },

    convertPrice(price) {
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
        );
      } else {
        return " ";
      }
    },
  },

  computed: {
    checkId() {
      const hasElementWithId2379 = this.product.collections.some(
        // (obj) => obj.id === "2379"
        (obj) => obj.id === "1083"
      );

      return hasElementWithId2379;
    },
  },
};
</script>

<style lang="scss" scoped>
.product-card {
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  &.active {
    padding: 0;
    .product-body {
      padding: 12px 16px;

      .product-body-title {
        h3 {
          font-weight: 500;
          font-size: 22px;
          line-height: 26px;
          text-align: center;
          color: #44ce6f;
          // min-height: 50px;
          // max-height: 50px;
        }
      }
      .product-body-description {
        padding: 12px 0;
        p {
          font-weight: 400;
          font-size: 12px;
          line-height: 22px;
          color: #000000;
        }
      }
      .product-body-button {
        display: flex;
        flex-direction: column;
        gap: 8px;
        .product-button {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 52px;
          padding: 6px 12px;
          gap: 8px;
          background: #44ce6f;
          color: #fff;
          border-radius: 6px;
          .product-button-left {
            font-weight: 500;
            font-size: 12px;
            line-height: 16px;
            color: #ffffff;
            text-transform: uppercase;
          }
          .product-button-right {
            display: flex;
            flex-direction: column;
            .product-button-right_top {
              font-weight: 500;
              font-size: 16px;
              line-height: 22px;
              color: #702800;
            }
            .product-button-right_bottom {
              font-weight: 400;
              font-size: 12px;
              line-height: 16px;
              text-align: right;
              .price {
                text-decoration-line: line-through;
                color: #ffffff;
                &.active {
                  text-decoration-line: none;
                }
              }

              .per {
                margin-left: 4px;
              }
            }
          }
          &.active {
            background: #00a5e3;
          }
        }
      }
    }
  }
  height: 98%;
  //92%;
  padding: 12px 16px;
  overflow: hidden;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #16b364;
  border-radius: 6px;
  .product-image {
    &.active {
      img {
        cursor: pointer;
        width: 100%;
        height: -moz-max-content;
        height: -webkit-max-content;
        height: max-content;
        -o-object-fit: contain;
        object-fit: cover;
        aspect-ratio: 1/1;
      }
    }
    img {
      cursor: pointer;
      width: 100%;
      height: -moz-max-content;
      height: -webkit-max-content;
      height: max-content;
      -o-object-fit: contain;
      object-fit: cover;
      aspect-ratio: 1/0.4;
    }
  }
  .product-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //flex-end;
    .product-body-title {
      h3 {
        font-weight: 500;
        font-size: 22px;
        line-height: 26px;
        text-align: center;
        color: #44ce6f;
        cursor: pointer;
        //min-height: 50px;
        //max-height: 50px;
      }
    }
    .product-body-description {
      padding: 12px 0;
      p {
        font-weight: 400;
        font-size: 12px;
        line-height: 22px;
        color: #000000;
      }
    }
    .product-body-button {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      gap: 8px;
      .product-button {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52px;
        padding: 6px 12px;
        gap: 8px;
        background: #44ce6f;
        color: #fff;
        border-radius: 6px;
        .product-button-left {
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #ffffff;
          text-transform: uppercase;
        }
        .product-button-right {
          display: flex;
          flex-direction: column;
          .product-button-right_top {
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            color: #702800;
          }
          .product-button-right_bottom {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            text-align: right;
            .price {
              text-decoration-line: line-through;
              color: #ffffff;
              &.active {
                text-decoration-line: none;
              }
            }

            .per {
              margin-left: 4px;
            }
          }
        }
        &.active {
          background: #00a5e3;
        }
      }
    }
  }
}
</style>
