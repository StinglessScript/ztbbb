<template>
  <div class="container checkout-v2">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="product-checkout h-auto">
          <div class="content-card-checkout" style="width: 100%">
            <div>
              <div
                class="row justify-content-between"
                style="
                  padding-bottom: 0.5rem;
                  border-bottom: 1px dotted #dee2e6;
                "
              >
                <div class="fontSize12 col-3" style="font-weight: 600">Tên</div>
                <div
                  class="justify-content-center col-3 d-flex fontSize12"
                  style="font-weight: 600"
                >
                  Đơn giá
                </div>
                <div
                  v-if="type == 'thue'"
                  class="col-3 justify-content-center d-flex fontSize12"
                  style="font-weight: 600"
                >
                  Thời gian
                </div>
                <div
                  v-if="type == 'mua'"
                  class="col-3 justify-content-center d-flex fontSize12"
                  style="font-weight: 600"
                >
                  Số lượng
                </div>
                <div
                  class="justify-content-end col-3 d-flex fontSize12"
                  style="font-weight: 600"
                >
                  Tổng tiền
                </div>
              </div>
              <div
                class="list-product row"
                style="
                  padding-bottom: 0.5rem;
                  border-bottom: 1px dotted #dee2e6;
                "
              >
                <div :class="type == 'thue' ? 'col-3' : 'col-3'">
                  <div class="item-product-title">
                    {{ product?.title }}
                  </div>
                  <div
                    class="item-product-title"
                    v-if="type == 'thue' && productPlace"
                  >
                    {{ productPlace?.title }}{{ "  " }}
                  </div>
                  <div class="item-product-title" v-if="setDataOS">
                    {{ setDataOS?.title }}
                  </div>
                </div>
                <div
                  class="d-flex flex-column justify-content-between align-items-center"
                  :class="type == 'thue' ? 'col-3' : 'col-3'"
                >
                  <div class="item-product-price">
                    {{ convertPrice(product?.price) }}
                  </div>
                  <div
                    class="item-product-price"
                    v-if="type == 'thue' && productPlace"
                  >
                    {{ convertPrice(productPlace?.price) }}
                  </div>
                  <div class="item-product-price" v-if="setDataOS">
                    {{ convertPrice(setDataOS?.price || 0) }}
                  </div>
                </div>
                <div
                  class="col-3 flex-column justify-content-between d-flex align-items-center"
                >
                  <div class="item-product-price" v-if="type == 'thue'">
                    1
                    {{ product?.unitDTO?.name }}
                  </div>
                  <div class="item-product-price" v-else-if="type == 'mua'">
                    {{ quantity }}
                    {{ product?.unitDTO?.name }}
                  </div>
                  <div
                    class="item-product-price"
                    v-if="type == 'thue' && productPlace"
                  >
                    1
                    {{ productPlace?.unitDTO?.name }}
                  </div>
                  <div class="item-product-price" v-if="setDataOS">
                    1
                    {{ setDataOS?.unitDTO?.name }}
                  </div>
                </div>
                <div
                  class="d-flex flex-column justify-content-between align-items-end"
                  :class="type == 'thue' ? 'col-3' : 'col-3'"
                >
                  <div class="item-product-price">
                    {{ convertPrice(product?.price) }}
                  </div>
                  <div
                    class="item-product-price"
                    v-if="type == 'thue' && productPlace"
                  >
                    {{ convertPrice(productPlace?.price) }}
                  </div>
                  <div class="item-product-price" v-if="setDataOS">
                    {{ convertPrice(setDataOS?.price || 0) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row total-product" style="padding-bottom: 0px">
              <div class="col-md-7"></div>
              <div class="col-md-5">
                <div class="total-product-item fontSize12">
                  <div>Tổng cộng:</div>
                  <div class="price-total">
                    {{ convertPrice(totalPrice) }}
                  </div>
                </div>
                <div
                  class="total-product-item fontSize12"
                  style="padding-bottom: 0px"
                >
                  <div style="font-weight: 600; color: #44ce6f">
                    Tổng thanh toán:
                  </div>
                  <div class="price-total active" style="font-weight: 600">
                    {{ convertPrice(totalOrder) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="product-checkout h-auto">
          <div
            class="content-card-checkout fontSize12"
            style="padding: 20px 15px !important"
          >
            <div
              class="title-card"
              style="margin-bottom: 20px; text-align: center"
            >
              Thông tin khách hàng
            </div>
            <div style="padding-bottom: 15px">
              <div class="row flex-column">
                <div class="col-12">
                  <div class="form-outline mb-2 text-left">
                    <ValidationProvider
                      mode="lazy"
                      rules="required"
                      v-slot="{ errors }"
                      v-if="!this.$store.getters.getUser"
                    >
                      <label class="form-label" for="name"
                        ><span>
                          <span>Họ tên</span>
                          <span style="color: red">*</span>
                        </span>
                        <span style="color: red">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="name"
                        v-model="user.fullName"
                        type="name"
                        class="form-control form-control-lg"
                      />
                    </ValidationProvider>
                    <div v-else>
                      <label class="form-label" for="name"
                        ><span>
                          <span>Họ tên: </span>
                          <span style="padding-left: 5px">{{
                            user.fullName
                          }}</span>
                          <!-- <span style="color: red">*</span> -->
                        </span>
                      </label>
                      <!-- <span id="name" class="form-control form-control-lg">{{
                        user.fullName
                      }}</span> -->
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-outline mb-2">
                    <ValidationProvider
                      name="phone"
                      width="50%"
                      rules="required|phone"
                      mode="lazy"
                      v-slot="{ errors }"
                      v-if="!this.$store.getters.getUser"
                    >
                      <label class="form-label" for="phone"
                        >Số điện thoại
                        <span style="color: red">*</span>

                        <span style="color: red">{{ errors[0] }}</span>
                      </label>
                      <input
                        id="phone"
                        v-model="user.phone"
                        type="text"
                        class="form-control form-control-lg"
                      />
                    </ValidationProvider>
                    <div v-else>
                      <label class="form-label" for="phone"
                        ><span>Số điện thoại:</span
                        ><span style="padding-left: 5px">{{ user.phone }}</span>
                        <span style="color: red">*</span>
                      </label>

                      <span id="phone" class="form-control form-control-lg">{{
                        user.phone
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <LoginSocialNoTitle v-if="!this.$store.getters.getUser" />
            <div class="checkout-action" style="padding: 15px 0 0 0 !important">
              <div
                class="btn btn-primary checkout-btn"
                style="width: 524px; padding: 12px 24px; cursor: default"
                v-if="isDisable == true && loading == true"
              >
                <div class="d-flex align-items-center gap-2">
                  {{ type == "thue" ? "Đang tiến hành" : "Đang mua hàng" }}
                  <div class="dot-loader"></div>
                  <div class="dot-loader"></div>
                  <div class="dot-loader"></div>
                </div>
              </div>
              <div
                v-else-if="isDisable == false && loading == false"
                class="checkout-btn"
                style="position: relative"
                @click="createCustomer"
              >
                {{ type == "thue" ? "Tiếp tục" : "Mua hàng" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader:nth-child(2) {
  margin: 0 2px;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader:nth-child(3) {
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.3s;
  animation: 1.2s scaleDown ease-in-out infinite 0.3s;
}

@-webkit-keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>

<script>
import Cookies from "js-cookie";
import LoginSocialNoTitle from "@/components/Auth/LoginSocialNoTitle.vue";
import ProductCheckoutTimeAndHDH from "@/components/Product/ProductCheckoutTimeAndHDH.vue";
export default {
  props: ["product", "id", "targetID", "type", "moneyDiscount"],
  data() {
    return {
      typeBuy: "",
      quantity: 1,
      user: {},
      priceData: 0,
      pricePlans: [],
      checked: "",
      priceInstallment: {},
      rent: null,
      quantityYearRent: 1,
      quantityYearRentProductPlace: 1,
      loading: false,
      productPlace: null,
      arrayQuantityYearRent: [],
      yearChecked: null,
      operatingSystems: null,
      selectedUbuntu: "Chọn hệ điều hành",
      selectedWindows: null,
      order: {},
      window: [],
      ubuntu: [],

      selectOptionSystem: null,

      maxNumberByDefault: 1,

      unitProduct: "tháng",
      unitProductPlace: "tháng",
      isDisable: false,

      openFormOptionTimeAndHdh: false,
      setDataOrder_id: null,
      setDataUser_id: null,
      setDataType: "mua",
      setDataOS: null,
    };
  },
  components: {
    LoginSocialNoTitle,
    ProductCheckoutTimeAndHDH,
  },
  mounted() {
    //this.validateCreateOrder();
    this.typeBuy = this.type;
    //this.getPriceProductOptions();
    if (this.type == "thue") {
      this.handleGetProductCollection();
    }

    // if (this.$route.query.os) {
    //   this.handleDataOS(this.$route.query.os);
    // }

    if (this.$store.getters.getUser) {
      this.user = this.$store.getters.getUser;
      console.log("user", this.user);
    }
  },
  watch: {
    // checked: function () {
    //   console.log(this.checked);
    // },
    // productPlace: function () {
    //   this.handleGetProductCollection();
    // },
  },
  computed: {
    pramasOs() {
      return this.$route.query.os || "";
    },
    type() {
      return this.$route.query.type || "";
    },
    connectorId() {
      return this.$route.query.connectorId || "";
    },
    userId() {
      return this.$route.query.userId || "";
    },
    VAT() {
      const value =
        (this.quantity *
          (this.product?.price ? this.product?.price : 0) *
          this.product?.vat) /
        100;

      return value || 0;
    },
    VAT_Option() {
      const value =
        (this.quantity *
          (this.productPlace?.price ? this.productPlace?.price : 0) *
          this.productPlace?.vat) /
        100;
      return value || 0;
    },
    totalPrice() {
      const value =
        this.quantity *
        ((this.productPlace?.price ? this.productPlace?.price : 0) +
          (this.product?.price ? this.product?.price : 0));
      return value || 0;
    },
    totalOrder() {
      const value =
        (this.type == "thue"
          ? this.productPlace?.price
            ? this.productPlace?.price
            : 0
          : 0) + (this.product?.price ? this.product?.price : 0);
      // +
      // (this.VAT ? this.VAT : 0) +
      // (this.type == "thue" ? (this.VAT_Option ? this.VAT_Option : 0) : 0);

      const checkTimeOne = this.moneyDiscount?.find(
        (c) => c?.minimumQuantity == 1
      );

      const valueDiscount = checkTimeOne
        ? ((this.product?.price || 0) * checkTimeOne?.percentDiscount) / 100
        : 0;
      console.log("this.moneyDiscount", value, valueDiscount);
      const money = value - valueDiscount;
      return money || 0;
    },
  },

  methods: {
    async handleDataOS(id) {
      try {
        const response = await this.$sdk.product.getProductById(id);
        if (response) {
          this.setDataOS = response;
        }
      } catch (error) {
        console.log("🚀 ~ handleDataOS ~ error:", error);
        this.$toast.error(error, {});
      }
    },
    formatTmeProduct(value) {
      const lowerCaseValue = value.toLowerCase();
      switch (lowerCaseValue) {
        case "tháng":
          return "THANG";
        case "năm":
          return "NAM";
        default:
          return lowerCaseValue;
      }
    },

    validateCreateOrder() {
      if (this.$store.getters.getUser) {
        return true;
      } else {
        const phoneRegex = /^\d{10}$/;
        return this.user.phone ? phoneRegex.test(this.user.phone) : false;
      }
    },

    async handleGetProductCollection() {
      if (this.product?.qualify == "CLOUD_LAB") {
        const payload = {
          category: this.product?.productAttributes?.find(
            (c) => c.attributeName == "OS_CATEGORY"
          )?.attributeValue,
          // display: "PUBLIC",
          // sub_type: "CONFIG,SIMPLE,VARIABLE",
          // status: "ON_SELL",
        };
        const get = await this.$store.dispatch("getProducts", payload);
        this.operatingSystems = get?.data?.data;
        //console.log("get", get);
      } else if (this.product?.qualify == "BARE_METAL") {
        const get = await this.$store.dispatch(
          "getProductById",
          this.product?.productAttributes?.find(
            (c) => c.attributeName == "COLOCATION"
          )?.attributeValue
        );
        this.productPlace = get.data;

        // console.log("get", this.productPlace);
      }
    },

    async createCustomer() {
      const payloadCustomer = {
        name: this.user.fullName,
        phone: this.user.phone,
      };

      try {
        if (!this.user.phone) {
          this.$toast.error("Vui lòng nhập số điện thoại.", {});
        } else {
          if (this.type == "thue") {
            if (this.validateCreateOrder() == true) {
              this.loading = true;
              this.isDisable = true;
              if (this.$store.getters.getUser) {
                Cookies.set(
                  "authInfo",
                  JSON.stringify(this.$store.getters.getUser)
                );
                this.createOrder(this.user.partyId);
              } else {
                // const resCustomer = await this.$store.dispatch(
                //   "createCustomerV2",
                //   payloadCustomer
                // );
                // if (resCustomer?.data?.createCustomerV2 != null) {
                //   const data = {
                //     partyId: resCustomer?.data?.createCustomerV2?.id,
                //     fullName: resCustomer?.data?.createCustomerV2?.name,
                //     ...resCustomer?.data?.createCustomerV2,
                //   };
                //   Cookies.set("authInfo", JSON.stringify(data));
                //   this.createOrder(resCustomer?.data?.createCustomerV2?.id);
                //   //this.loading = false;
                // } else {
                //   if (
                //     resCustomer.errors[0].message == "Số điện thoại đã tồn tại"
                //   ) {
                //     const resCustomerByPhone = await this.$store.dispatch(
                //       "getCustomerByPhone",
                //       this.user.phone
                //     );
                //     if (resCustomerByPhone?.data?.getCustomerByPhone?.id) {
                //       const data = {
                //         partyId:
                //           resCustomerByPhone?.data?.getCustomerByPhone?.id,
                //         fullName:
                //           resCustomerByPhone?.data?.getCustomerByPhone?.name,
                //         ...resCustomerByPhone?.data?.getCustomerByPhone,
                //       };
                //       Cookies.set("authInfo", JSON.stringify(data));
                //       this.createOrder(
                //         resCustomerByPhone?.data?.getCustomerByPhone?.id
                //       );
                //     }
                //   } else {
                //     this.$toast.error(resCustomer.errors[0].message, {});
                //     this.isDisable = false;
                //     this.loading = false;
                //   }
                // }

                
              }
            }
          } else {
            if (this.validateCreateOrder() == true) {
              this.loading = true;
              this.isDisable = true;
              if (this.$store.getters.getUser) {
                Cookies.set(
                  "authInfo",
                  JSON.stringify(this.$store.getters.getUser)
                );
                this.createOrder(this.user.partyId);
              } else {
                const resCustomer = await this.$store.dispatch(
                  "createCustomerV2",
                  payloadCustomer
                );
                if (resCustomer?.data?.createCustomerV2) {
                  const data = {
                    partyId: resCustomer?.data?.createCustomerV2?.id,
                    fullName: resCustomer?.data?.createCustomerV2?.name,
                    ...resCustomer?.data?.createCustomerV2,
                  };
                  Cookies.set("authInfo", JSON.stringify(data));
                  this.createOrder(resCustomer?.data?.createCustomerV2?.id);
                  //this.loading = false;
                } else {
                  if (
                    resCustomer.errors[0].message == "Số điện thoại đã tồn tại"
                  ) {
                    const resCustomerByPhone = await this.$store.dispatch(
                      "getCustomerByPhone",
                      this.user.phone
                    );
                    if (resCustomerByPhone?.data?.getCustomerByPhone?.id) {
                      const data = {
                        partyId:
                          resCustomerByPhone?.data?.getCustomerByPhone?.id,
                        fullName:
                          resCustomerByPhone?.data?.getCustomerByPhone?.name,
                        ...resCustomerByPhone?.data?.getCustomerByPhone,
                      };
                      Cookies.set("authInfo", JSON.stringify(data));
                      this.createOrder(
                        resCustomerByPhone?.data?.getCustomerByPhone?.id
                      );
                    }
                  } else {
                    this.$toast.error(resCustomer.errors[0].message, {});
                    this.isDisable = false;
                    this.loading = false;
                  }
                }
              }
            }
          }
        }
        //}

        // this.$toast.success("Tạo đơn thành công", {});
      } catch (error) {
        console.log("error", error);
        this.loading = false;
        this.isDisable = false;
        this.$toast.error(error, {});
      }
    },

    async createOrder(id) {
      try {
        //Cookies.set("authInfo", JSON.stringify(this.user));
        const data = {
          order: {
            shopId: process.env.STORE_ID,
            ownerPartyId: id,
            orderType: "SERVICE",
          },
          orderLineItems: [
            {
              quantity: 1,
              variant: {
                id: this.product?.id,
                product: { id: this.product?.id },
                unitPrice: {
                  amount: this.product?.price,
                  currencyCode: "VND",
                },
                price: {
                  amount: this.product?.price,
                  currencyCode: "VND",
                },
              },
              customAttributes: [
                { key: "SERVICE_TYPE", value: this.product?.qualify },
              ],
              unitType: this.product?.unitDTO?.id,
              // this.type == "tra-gop"
              //   ? [{ key: "PRICE_PLAN_ID", value: this.checked?.id }]
              //   : [],
            },
            {
              quantity: 1,
              variant: {
                id: this.productPlace?.id,
                product: {
                  id: this.productPlace?.id,
                },
                unitPrice: {
                  amount: this.productPlace?.price,
                  currencyCode: "VND",
                },
                price: {
                  amount: this.productPlace?.price,
                  currencyCode: "VND",
                },
              },
              customAttributes: [
                {
                  key: "SERVICE_TYPE",
                  value: this.productPlace?.qualify,
                },
              ],
              unitType: this.productPlace?.unitDTO?.id,
            },
          ],
          byUser: id,
          connectorId: this.connectorId,
        };

        const dataNoSetPlace = {
          order: {
            shopId: process.env.STORE_ID,
            ownerPartyId: id,
            orderType: "SERVICE",
          },
          orderLineItems: [
            {
              quantity: 1,
              variant: {
                id: this.product?.id,
                product: { id: this.product?.id },
                unitPrice: {
                  amount: this.product?.price,
                  currencyCode: "VND",
                },
                price: {
                  amount: this.product?.price,
                  currencyCode: "VND",
                },
              },
              customAttributes: [
                { key: "SERVICE_TYPE", value: this.product?.qualify },
                // {
                //   key: "PRODUCT_OS",
                //   value: this.selectOptionSystem,
                // },
              ],
              unitType: this.product?.unitDTO?.id,
              // this.type == "tra-gop"
              //   ? [{ key: "PRICE_PLAN_ID", value: this.checked?.id }]
              //   : [],
            },
          ],
          byUser: id,
          connectorId: this.connectorId,
        };
        //console.log("dataNoSetPlace", dataNoSetPlace);
        const res = await this.$store.dispatch(
          "createNewOrder",
          this.type == "thue"
            ? this.productPlace
              ? data
              : dataNoSetPlace
            : dataNoSetPlace
        );
        if (res?.data?.createOrder) {
          if (this.type == "thue") {
            this.$router.push(
              `/cap-nhat-don-hang/${res?.data?.createOrder?.id}?userId=${id}&type=${this.type}`
            );
            // if (response) {
            //   if (this.pramasOs) {
            //     this.handleGetProductOption(response, id);
            //   } else {
            //     this.$router.push(
            //       `/cap-nhat-don-hang/${res?.data?.createOrder?.id}?userId=${id}&type=${this.type}`
            //     );
            //   }
            // }
          } else if (this.type == "mua") {
            this.$router.push(
              `/thanh-toan/${res?.data?.createOrder?.id}?userId=${id}&type=${this.type}`
            );
          }
        } else {
          this.isDisable = false;
          this.loading = false;
          this.$toast.error("Tạo đơn không thành công");
        }
      } catch (error) {
        this.isDisable = false;
        this.loading = false;
        this.$toast.error(error);
      }
    },

    async handleGetProductOption(order, userId) {
      try {
        const response = await this.$sdk.product.getProductOption(
          this.product?.id
        );
        if (response) {
          //console.log("🚀 ~ handleGetProductOption ~ response:", response);
          const filterProductOption = response?.find((c) =>
            c.productFeatureDTOS?.some((d) =>
              d.productOptionGroupItemDTOS?.some(
                (f) => f.productId == this.pramasOs
              )
            )
          );

          // console.log(
          //   "🚀 ~ handleGetProductOption ~ filterProductOption:",
          //   filterProductOption
          // );
          this.handleUpdateOperatingSystem(order, userId, filterProductOption);
        }
      } catch (error) {
        this.$toast.error("handleGetProductOption", error);
      }
    },
    async handleUpdateOperatingSystem(order, userId, productOption) {
      try {
        const json = [
          {
            idOption: productOption?.id,
            name: productOption?.name,
            value: this.pramasOs,
          },
        ];

        const dataOptionSystem = {
          id: order?.lineItems[0]?.orderLineItem?.id,
          productOptionId: json,
          useID: userId,
        };

        const res = await this.$store.dispatch(
          "updateProductOptionOrderLineItem",
          dataOptionSystem
        );

        if (res.data.updateProductOptionOrderLineItem == true) {
          this.$router.push(
            `/cap-nhat-don-hang/${order?.order?.id}?userId=${userId}&type=${this.type}&openSp=true`
          );
        } else {
          this.$toast.error(
            "updateProductOptionOrderLineItem",
            res.errors[0].message
          );
        }
      } catch (error) {
        this.$toast.error("handleUpdateOperatingSystem", error);
      }
    },

    increase() {
      this.quantity++;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    handleChangeOption() {
      this.$router
        .replace({ query: { ...this.$route.query, type: this.typeBuy } })
        .then(() => {
          this.$nuxt.refresh();
        });
    },

    handleChangeOptionSystem(item) {
      this.selectOptionSystem = item;
      console.log("this.selectOptionSystem", this.selectOptionSystem);
    },

    convertPrice(price) {
      this.product.currency_code;
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
          this.product.currency_code
        );
      } else {
        return "0" + this.product.currency_code;
      }
    },
  },
};
</script>

<style lang="scss" scope>
.label-radio-price {
  display: flex !important;
  justify-content: space-between;
  width: 100%;
}

@media (max-width: 768px) {
  .fontSize12 {
    font-size: 12px !important;
  }
}
</style>
