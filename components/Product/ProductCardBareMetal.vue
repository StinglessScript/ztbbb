<template>
  <a 
    :href="navigatorRouter()"
    style="height: 100%; width: 100%; position: relative"
  >
    <div style="position: absolute; top: 1px; right: -1px" v-if="is_discount">
      <img
        src="~/assets/img/discount.png"
        alt="image"
        style="width: 35px; height: 35px"
      />
    </div>
    <div class="product-card">
      <div class="product-image" v-if="product.featuredImage">
        <img
          class="img-hover"
          :src="product.featuredImage"
          alt="image"
          width="80%"
        />
      </div>
      <div class="product-image" v-else>
        <img src="~/assets/img/Nodata.svg" />
      </div>
      <div class="product-body">
        <div class="top-card">
          <div class="product-body-title">
            <h3>
              {{ product.title }}
            </h3>
          </div>
          <div class="product-body-description">
            <p
              class="description-content"
              v-html="product.shortDescription"
            ></p>
          </div>
        </div>
        <!-- {{ formatRenderPrice(product) }} -->

        <!-- <div
          style="color: rgb(24, 127, 56); margin-bottom: 10px"
          v-if="formatRenderPrice(product)?.hint"
        >
          {{ formatRenderPrice(product)?.hint }}
        </div>
        <div
          style="color: rgb(24, 127, 56); margin-bottom: 10px"
          v-if="formatRenderPrice(product)?.hint_old"
        >
          {{ formatRenderPrice(product)?.hint_old }}
        </div> -->
        <div class="product-body-button">
          <div
            v-if="
              !product?.categories?.some((c) => c.id == category_marketplace)
            "
          >
            <div
              v-if="!!product?.discountPrice == true"
              style="display: flex; flex-direction: column; gap: 0.25rem"
            >
              <!-- <template v-for="item in product?.discountPrice"> -->
              <div
                v-if="formatRenderPrice(product)?.price > 0"
                style="min-height: 52px !important; height: 100% !important"
                :class="formatRenderPrice(product)?.type != 'SELL' && ''"
              >
                <div
                  class="product-button d-flex flex-column justify-content-center"
                >
                  <div
                    class="product-button-data d-flex justify-content-between"
                  >
                    <div class="product-button-left" style="width: 30%">
                      Đăng ký
                    </div>
                    <div
                      class="product-button-right"
                      style="width: 70%; align-items: end"
                    >
                      <div class="product-button-right_top" style="display: inline-flex;">
                        <span style="font-size: 13px;">
                          {{
                            convertPrice(
                              formatRenderPrice(product)?.price
                                ? formatRenderPrice(product)?.price
                                : ''
                            )
                          }}
                        </span>
                        <span
                          class="price active"
                          style="
                            color: #702800;
                            font-size: 13px;
                            font-weight: 500;
                          "
                        >
                          <!-- {{
                            formatRenderPrice(product)?.type != "SELL" &&
                            formatRenderPrice(product)?.quantity > 1
                              ? `${formatRenderPrice(product)?.quantity} `
                              : ""
                          }} -->
                          /{{ product?.unitDTO?.name }}
                        </span>
                      </div>
                      <div
                        class="product-button-right_bottom"
                        v-if="
                          !formatRenderPrice(product)?.hint &&
                          !formatRenderPrice(product)?.hint_old
                        "
                      >
                        <span
                          class="price active"
                          style="
                            color: #702800;
                            text-decoration: line-through;
                            font-size: 13px;
                            font-weight: 500;
                          "
                        >
                          {{
                            convertPrice(
                              formatRenderPrice(product)?.oldPrice
                                ? formatRenderPrice(product)?.oldPrice
                                : 0
                            )
                          }}
                        </span>
                        <span> </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style="display: flex; width: 100%; justify-content: end"
                    v-if="
                      formatRenderPrice(product)?.hint ||
                      formatRenderPrice(product)?.hint_old
                    "
                  >
                    <small
                      style="
                        color: #e74c3c;
                        margin-bottom: 5px;
                        text-align: end;
                        font-weight: 500;
                      "
                      v-if="formatRenderPrice(product)?.hint"
                    >
                      {{ formatRenderPrice(product)?.hint }}
                    </small>
                    <small
                      style="
                        color: #e74c3c;
                        margin-bottom: 5px;
                        text-align: end;
                        font-weight: 500;
                      "
                      v-if="formatRenderPrice(product)?.hint_old"
                    >
                      {{ formatRenderPrice(product)?.hint_old }}
                    </small>
                  </div>
                </div>
              </div>
              <div
                v-else-if="formatRenderPrice(product)?.price == 0"
                class="product-button"
              >
                <div class="product-button-left">Miễn phí</div>
              </div>

              <div
                v-else-if="
                  formatRenderPrice(product)?.price < 0 ||
                  !formatRenderPrice(product)?.price
                "
                class="product-button"
              >
                <div class="product-button-left">Liên hệ</div>
              </div>
              <!-- </template> -->
            </div>
            <div v-else-if="!!product?.discountPrice == false">
              <div class="product-button">
                <div class="product-button-left">Liên hệ</div>
              </div>
            </div>
          </div>
          <div v-else class="product-button justify-content-center">
            <div class="">Xem chi tiết</div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "ProductCardBareMetal",
  props: ["product", "options", "price"],
  data() {
    return {
      totalPriceOption: 0,
      priceInstallment: 0,
      loanTenure: 0,
      rent_default: process.env.TIME_RENT_DEFAULT,
      is_discount: false,
      category_marketplace: process.env.MARKETPLACE,
    };
  },
  mounted() {
    // console.log("options", this.options);
  },

  methods: {
    formatRenderPrice(item) {
      //console.log("🚀 ~ formatRenderPrice ~ item:", item)
      if (item?.type == "RENT") {
        // lấy giá mặc định
        let dataDefault = item?.discountPrice?.find(
          (c) => c?.defaultPrice == true
        );
        //console.log("🚀 ~ formatRenderPrice ~ dataDefault:", dataDefault?.type, dataDefault?.type)

        // nếu giá mặc định có type là PROMOTION thì sẽ tìm giá gốc type RENT theo số lượng
        // nếu giá mặc định có type là RENT thì sẽ tìm giá KM type PROMOTION theo số lượng

        //check type PROMOTION
        const checkPromotion =
          dataDefault?.type == "RENT"
            ? item?.discountPrice?.find(
                (c) => c.time == dataDefault?.time && c.type == "PROMOTION"
              )
            : null;

        const checkRent =
          dataDefault?.type == "PROMOTION"
            ? item?.discountPrice?.find(
                (c) => c.time == dataDefault?.time && c.type == "RENT"
              )
            : null;

        if (dataDefault?.type == "PROMOTION" || checkPromotion) {
          const data = {
            type: "PROMOTION",
            oldPrice: dataDefault?.oldPrice[0]?.price,
            price: dataDefault?.price,
            displayPrice: dataDefault?.priceDiscount,
            quantity: dataDefault?.time,
            hint: dataDefault?.hint || null,
            hint_old: dataDefault?.oldPrice[0]?.hint || null,
          };
          // if (data?.type == "PROMOTION") {
          //   console.log("🚀 ~ formatRenderPrice ~ data:", data);
          // }

          this.is_discount = true;
          return data;
        } else {
          const dataQuantity = item?.discountPrice?.filter((c) => c.time);

          //const data = dataDefault;

          return dataDefault
            ? {
                displayPrice: dataDefault?.priceDiscount,
                price: dataDefault?.price,
                quantity: dataDefault?.time,
                type: dataDefault?.type,
                hint: dataDefault?.hint,
              }
            : dataQuantity?.length > 0
            ? {
                displayPrice: dataQuantity[0]?.priceDiscount,
                price: dataDefault?.price,
                quantity: dataQuantity[0]?.time || 1,
                type: dataQuantity[0]?.type,
                hint: dataQuantity[0]?.hint,
              }
            : {
                displayPrice: 0,
                quantity: item?.time || 1,
                price: 0,
                type: item?.type,
                hint: null,
              };
        }
      } else {
        const dataDefault =
          item?.defaultPrice == item?.id
            ? item
            : item?.discountPrice?.find((c) => c?.defaultPrice == true);
        return {
          price: dataDefault?.price,
          displayPrice: dataDefault?.priceDiscount,
          type: "SELL",
          hint: dataDefault?.hint,
        };
      }
    },

    navigatorRouter() {
      // e.preventDefault();
      if (
        this.product?.categories?.some((c) => c.id == this.category_marketplace)
      ) {
        this.$store.commit("setIsOS", this.product?.id);
      }

      if (!this.product.categories?.some((c)=>c.id == process.env.DOMAIN_CATEGORY)) {
        // this.$router.push(
        //   `/san-pham/${this.product.handle}${
        //     this.$route.query.store ? `?store=${this.$route.query.store}` : ""
        //   }`
        // );
        return `/san-pham/${this.product.handle}${
          this.$route.query.store ? `?store=${this.$route.query.store}` : ""
        }`;
      } else {
        // this.$router.push(
        //   `/tim-kiem-domain?domain=${this.product?.groups[0]?.id}`
        // );
        return `/domain?suffix=${this.product?.sku}`;
      }
    },
    formatFunction(value) {
      const lowerCaseValue = value.toLowerCase();
      switch (lowerCaseValue) {
        case "tháng":
          return "thue";
        case "năm":
          return "thue";

        default:
          return "mua";
      }
    },

    // formatDetailPrice(item) {
    //   //console.log("🚀 ~ formatDetailPrice ~ item:", item)

    //   if (item.price > 0) {
    //     return `${this.convertPrice(item.price)}`;
    //   } else if (item.price == 0) {
    //     return ` Miễn phí `;
    //   } else {
    //     return ` Liên hệ `;
    //   }
    // },

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
      const hasElementWithId2379 = this?.product?.collections?.some(
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
  height: 98%;
  //92%;
  padding: 12px;
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
    justify-content: flex-end;
    .top-card {
      height: 100%;

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
        width: 100%;
        margin-bottom: 8px;
        .options {
          display: flex;
          //flex-flow: column;
          // display: inline-grid;
          // grid-template-columns: auto auto;
          margin-bottom: 4px;
          gap: 6px;
          .name-option {
            color: #000;
            font-size: 10px;
            line-height: 14px;
            //width: 80px;
            min-width: 85px;
          }
          .list-option {
            .value-option {
              color: #000;
              font-size: 10px;
              line-height: 14px;
            }
          }
        }

        // padding: 12px 0;
        // p {
        //   font-weight: 400;
        //   font-size: 12px;
        //   line-height: 22px;
        //   color: #000000;
        // }
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
        height: 56px;
        padding: 4px;
        gap: 2px;
        background: #44ce6f;
        color: #fff;
        border-radius: 6px;
        .product-button-data {
          width: 100%;
          align-items: center;
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
              font-size: 14px;
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
  .name-option {
    font-weight: 500;
  }
}
</style>
