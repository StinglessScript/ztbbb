<template>
  <div class="index cart">
    <div
      v-if="isVisibleMultiplTime?.status == true"
      style="
        position: fixed;
        z-index: 90;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        margin-top: 0px !important;
        cursor: pointer;
      "
      @click="handleVisibleMultipleTime(null)"
    ></div>
    <div
      v-if="loadingForm == true || loadingFormOne == true"
      style="
        position: fixed;
        background-color: rgba(155, 151, 151, 0.26);
        z-index: 999;
        width: 100%;
        height: 100%;
        top: 0;
      "
    >
      <div class="logo-bg"></div>
      <div class="loader-bg"></div>
    </div>
    <div class="cart-area">
      <div class="container" v-if="order?.order?.financialStatus != 'PAID'">
        <div style="position: relative">
          <div
            class="row"
            style="padding-top: 30px !important; padding-bottom: 30px"
          >
            <div class="col-12 col-md-12">
              <div>
                <div class="row justify-content-center gap-1 gap-lg-0">
                  <div class="col-lg-8 col-md-8 p-1">
                    <div
                      v-for="(items, index) in order?.lineItems"
                      class="cart-items border-bottom"
                      style="
                        padding-bottom: 24px;
                        margin-bottom: 10px;
                        min-height: 400px;
                        padding: 12px !important;
                      "
                      v-if="index == 0"
                    >
                      <!-- <div
                        class="row is-pc"
                        style="padding-bottom: 24px"
                      > -->
                      <ProductGroups
                        :order="order"
                        :getRentTime="getRentTime"
                        :handleGetProductGroup="handleGetProductGroup"
                        :items="items"
                        :handleGetDetailProduct="handleGetDetailProduct"
                        :handleUpdateItemInOrder="handleUpdateItemInOrder"
                        :handleChangesPackageAndTimeRent="
                          handleChangesPackageAndTimeRent
                        "
                        :handleGetProductOption="handleGetProductOption"
                        :handleChangeOptionSystem="handleChangeOptionSystem"
                        :loadingForm="loadingForm"
                        :loadingFormOne="loadingFormOne"
                        :parmasDomain="parmasDomain"
                        :productGroups_old="productGroups"
                        :validateOption="validateOption"
                      />
                      <!-- </div> -->
                    </div>
                  </div>

                  <div
                    class="col-lg-4 col-md-4 d-flex gap-2 flex-column p-1 checkout-v2"
                  >
                    <div
                      v-if="
                        !order?.order?.ownerPartyId && !order?.order?.ownerPhone
                      "
                      class="product-checkout h-auto"
                      style="position: sticky; top: 134px; margin-top: 0px"
                    >
                      <div
                        class="content-card-checkout fontSize12"
                        style="padding: 20px 15px !important"
                      >
                        <ValidationObserver v-slot="{ handleSubmit }">
                          <div
                            class="title-card"
                            style="margin-bottom: 20px; text-align: center"
                          >
                            Thông tin khách hàng
                          </div>
                          <form @submit.prevent="handleSubmit(createCustomer)">
                            <div style="padding-bottom: 15px">
                              <div class="row flex-column">
                                <div class="col-12">
                                  <div class="form-outline mb-2 text-left">
                                    <ValidationProvider
                                      mode="lazy"
                                      rules=""
                                      v-slot="{ errors }"
                                      v-if="!$store.getters.getUser"
                                    >
                                      <label class="form-label" for="name"
                                        ><span>
                                          <span>Họ tên</span>
                                        </span>
                                        <span style="color: red">{{
                                          errors[0]
                                        }}</span>
                                      </label>
                                      <input
                                        id="name"
                                        v-model="user.fullName"
                                        type="text"
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
                                        </span>
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-12">
                                  <div class="form-outline mb-2">
                                    <ValidationProvider
                                      name="phone"
                                      width="50%"
                                      rules="phone|required"
                                      mode="lazy"
                                      v-slot="{ errors }"
                                      v-if="!$store.getters.getUser"
                                    >
                                      <label class="form-label" for="phone"
                                        >Số điện thoại
                                        <span style="color: red">*</span>

                                        <span style="color: red">{{
                                          errors[0]
                                        }}</span>
                                      </label>
                                      <input
                                        id="phone"
                                        pattern="\d*"
                                        v-model="user.phone"
                                        type="text"
                                        class="form-control form-control-lg"
                                      />
                                    </ValidationProvider>
                                    <div v-else>
                                      <label class="form-label" for="phone"
                                        ><span>Số điện thoại:</span
                                        ><span style="padding-left: 5px">{{
                                          user.phone
                                        }}</span>
                                        <!-- <span style="color: red">*</span> -->
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <LoginSocialNoTitle
                              v-if="!$store.getters.getUser"
                            />
                            <div
                              class="checkout-action"
                              style="padding: 15px 0 0 0 !important"
                            >
                              <div
                                class="btn btn-primary checkout-btn"
                                style="
                                  width: 524px;
                                  padding: 12px 24px;
                                  cursor: default;
                                "
                                v-if="isDisable == true && loading == true"
                              >
                                <div class="d-flex align-items-center gap-2">
                                  {{
                                    type == "thue"
                                      ? "Đang tiến hành"
                                      : "Đang mua hàng"
                                  }}
                                  <div class="dot-loader"></div>
                                  <div class="dot-loader"></div>
                                  <div class="dot-loader"></div>
                                </div>
                              </div>
                              <button
                                class="checkout-btn"
                                v-else-if="
                                  isDisable == false && loading == false
                                "
                                type="submit"
                                href="javascript:void(0)"
                                style="border: transparent"
                              >
                                {{
                                  type == "thue"
                                    ? "Tiếp tục"
                                    : type == "giahan"
                                    ? "Thanh toán"
                                    : "Mua hàng"
                                }}
                              </button>
                            </div>
                          </form>
                        </ValidationObserver>
                      </div>
                    </div>

                    <div
                      v-else
                      class="cart-items"
                      style="min-height: 200px; padding: 12px !important"
                    >
                      <div style="font-weight: 600; padding-bottom: 12px">
                        Thông tin chi tiết
                      </div>
                      <div
                        class="d-flex flex-column gap-3"
                        style="
                          border-bottom: 1px solid rgb(229, 233, 238);
                          padding-bottom: 10px;
                        "
                        v-if="order?.lineItems"
                      >
                        <div
                          v-for="(item, index) in order?.lineItems"
                          :key="index"
                          :style="{
                            'border-bottom':
                              order?.lineItems.length > 1 &&
                              index < order?.lineItems.length - 1
                                ? '1px solid rgb(229, 233, 238)'
                                : 'none',
                            'padding-bottom':
                              order?.lineItems.length > 1 &&
                              index < order?.lineItems.length - 1
                                ? '10px'
                                : '0px',
                          }"
                        >
                          <div class="d-flex flex-column gap-2">
                            <div class="d-flex flex-column">
                              <div style="font-weight: 500">Dịch vụ:</div>
                              <div style="margin-left: 10px">
                                <div
                                  class="d-flex justify-content-between py-1"
                                >
                                  <div class="d-flex flex-column gap-2">
                                    <template
                                      v-if="item?.orderLineItem?.variant?.title"
                                    >
                                      <div
                                        class="d-flex gap-1"
                                        
                                        style="cursor: pointer"
                                      >
                                      <!-- :class="
                                          index == 0 &&
                                          item?.productDetails
                                            ?.shortDescription &&
                                          'title-name'
                                        " -->
                                        <div
                                          style="
                                            font-size: 14px;
                                            white-space: nowrap;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            width: 200px;
                                          "
                                        >
                                          {{
                                            // formattedText(
                                            //   item?.orderLineItem?.variant?.title
                                            // )
                                            item?.orderLineItem?.variant?.title
                                          }}
                                        </div>
                                      </div>
                                    </template>
                                    <div
                                      style="color: #2bb456; font-weight: 600"
                                    >
                                      <span style="font-size: 12px">x</span
                                      >{{ item?.orderLineItem?.quantity }}
                                      {{
                                        allProductUnit?.find(
                                          (c) =>
                                            c?.id == item.orderLineItem.unitType
                                        )?.name
                                      }}
                                    </div>
                                  </div>
                                  <div
                                    class="d-flex flex-column align-items-end justify-content-end"
                                  >
                                    <div
                                      style="color: #2bb456; font-weight: 600"
                                    >
                                      {{
                                        convertPrice(
                                          (item?.orderLineItem?.variant?.price
                                            ?.amount || 0) *
                                            (item?.orderLineItem?.quantity || 1)
                                        )
                                      }}
                                    </div>
                                    <del
                                      v-if="
                                        (item?.orderLineItem?.variant?.price
                                          ?.amount || 0) !=
                                          (item?.orderLineItem?.variant
                                            ?.unitPrice?.amount || 0) &&
                                        item?.orderLineItem?.variant?.unitPrice
                                          ?.amount > 0
                                      "
                                      style="
                                        text-decoration: line-through;
                                        font-size: 14px;
                                        font-weight: normal;
                                        color: #333;
                                      "
                                      >{{
                                        convertPrice(
                                          // (product?.price + (productPlace?.price || 0)) *
                                          //   rent?.time
                                          item?.orderLineItem?.variant
                                            ?.unitPrice?.amount *
                                            item?.orderLineItem?.quantity
                                        )
                                      }}</del
                                    >
                                  </div>
                                </div>
                                <!-- <span
                                  v-if="item?.productDetails?.shortDescription"
                                  @click="
                                    handleShowModal(
                                      item?.orderLineItem?.variant?.id
                                    )
                                  "
                                  style="
                                    color: #44ce6f;
                                    font-size: 14px;
                                    text-decoration: underline;
                                    cursor: pointer;
                                  "
                                  >Xem chi tiết</span
                                > -->
                              </div>
                            </div>
                            <div
                              class="d-flex flex-column gap-1"
                              v-if="
                                item?.orderLineItem?.resourceItems?.length > 0
                              "
                            >
                              <div style="font-weight: 500">Tài nguyên:</div>
                              <div
                                class="d-flex flex-column gap-2"
                                style="margin-left: 10px"
                              >
                                <div class="d-flex flex-column gap-2">
                                  <div
                                    class="d-flex gap-1"
                                    v-for="resource in item?.orderLineItem
                                      ?.resourceItems"
                                  >
                                    <span
                                      >{{ resource?.name }}:
                                      <span
                                        >{{ resource?.quantity }}
                                        {{ resource?.unit }}</span
                                      ></span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            style="
                              border-top: 1px solid rgb(229, 233, 238);
                              padding-top: 10px;
                            "
                            class="d-flex flex-column"
                            v-if="
                              item?.orderLineItem?.productOptions?.length > 0
                            "
                          >
                            <div style="font-weight: 500">
                              Thông tin tùy chọn:
                            </div>
                            <div
                              style="margin-left: 10px"
                              v-for="itemOption in item?.orderLineItem
                                ?.productOptions"
                              :key="itemOption.name"
                            >
                              <div class="d-flex flex-column gap-2 py-1">
                                <template
                                  v-if="
                                    handleFilterData(
                                      operatingSystems,
                                      itemOption?.idOption,
                                      'name'
                                    ) && itemOption?.title
                                  "
                                >
                                  <div>
                                    {{
                                      handleFilterData(
                                        operatingSystems,
                                        itemOption?.idOption,
                                        "name"
                                      )
                                    }}: {{ " " }}
                                    {{
                                      // formattedText(
                                      //   itemOption?.productData?.title
                                      // )
                                      itemOption?.title
                                    }}
                                  </div>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <div
                          class="d-flex justify-content-between w-full"
                          v-if="
                            rent?.priceDiscount > 0 &&
                            order?.lineItems?.length > 1
                          "
                        >
                          <div
                            class="d-flex gap-1 title-name"
                            style="cursor: pointer"
                          >
                            <div style="font-size: 14px"></div>
                          </div>
                          <del
                            style="
                              text-decoration: line-through;
                              font-size: 14px;
                              font-weight: normal;
                              color: #333;
                            "
                            >{{
                              convertPrice(
                                // (product?.price + (productPlace?.price || 0)) *
                                //   rent?.time
                                order.lineItems.reduce(
                                  (total, item) =>
                                    total +
                                    item.orderLineItem.variant.unitPrice.amount,
                                  0
                                ) * rent?.time
                              )
                            }}</del
                          >
                        </div> -->
                      </div>
                      <div class="row" style="padding-top: 24px">
                        <div class="col-8">
                          <div class="d-flex flex-column gap-2">
                            <div>Tổng tiền (chưa VAT):</div>
                            <div>VAT:</div>
                            <div style="font-weight: 600; color: #2bb456">
                              Thành tiền:
                            </div>
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="d-flex align-items-end flex-column gap-2">
                            <div>
                              {{
                                convertPrice(
                                  order?.lineItems?.reduce(
                                    (total, item) =>
                                      total +
                                      item.orderLineItem?.variant?.price
                                        ?.amount *
                                        item.orderLineItem?.quantity,
                                    0
                                  )
                                )
                              }}
                            </div>
                            <div>
                              {{
                                convertPrice(
                                  order?.lineItems?.reduce(
                                    (total, item) =>
                                      total +
                                      (item.orderLineItem?.totalVAT?.amount ||
                                        0),
                                    0
                                  )
                                )
                              }}
                            </div>
                            <div style="color: #2bb456; font-weight: 600">
                              {{
                                convertPrice(
                                  order?.order?.currentTotalPrice?.amount
                                )
                              }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="checkout-action-button"
                          style="padding: 15px !important"
                        >
                          <div
                            class="btn btn-primary checkout-btn"
                            style="
                              width: 524px;
                              padding: 12px 24px;
                              cursor: default;
                            "
                            v-if="loadingFormSubmit && loadingForm"
                          >
                            <div class="d-flex align-items-center gap-2">
                              Đang tiến hành
                              <div class="dot-loader"></div>
                              <div class="dot-loader"></div>
                              <div class="dot-loader"></div>
                            </div>
                          </div>
                          <div
                            v-else
                            class="checkout-btn"
                            style="position: relative"
                            @click="validatePayment()"
                          >
                            Thanh toán
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="openModalShortDes == true">
      <ModalShortDescription
        :handleShowModal="handleShowModal"
        :dataProduct="dataProduct"
      />
    </template>
    <ModalChooseTimeRent
      :showModale="isVisibleMultiplTimeMobile?.status"
      :dataModalTimesMobile="dataModalTimesMobile"
      @handleVisibleMultipleTimeMobile="handleVisibleMultipleTimeMobile"
      @handleChooseTimeRent="handleChangesPackageAndTimeRent"
      :rent="dataModalTimesMobile?.type == 'product' ? time : time_colo"
      class="is-mobile"
    />
  </div>
</template>

<script>
import { AddItemInCart } from "@/utils/Order/AddItemInCart";
import PageTitle from "../../components/Common/PageTitle";
import Cookies from "js-cookie";
import SVGDelete from "~/assets/img/remove.svg";
import SVGCart2 from "~/assets/img/cart-2.svg";
import SVGCart1 from "~/assets/img/1.svg";
import ViewPayment from "@/components/Checkout/ViewPayment";
import { data } from "~/utils/imagesPayment.js";
import AlreadyPaymentSuccess from "@/components/AlreadyPaymentSuccess";
import ProductOS from "./ProductOS.vue";
import ProductInput from "./ProductInput.vue";
import ModalShortDescription from "@/components/Modal/ModalShortDescription";
import ModalChooseTimeRent from "../../components/Modal/ModalChooseTimeRent.vue";
import ProductGroups from "./ProductOrderItems/ProductGroups.vue";
import LoginSocialNoTitle from "@/components/Auth/LoginSocialNoTitle.vue";

export default {
  //name: "Cart",
  props: ["order", "setDataOrder_id", "setDataUser_id", "setDataType"],
  data() {
    return {
      loading: false,
      isDisable: false,
      productGroups: [],
      product: null,
      productPlace: null,
      customTime: [],
      customTimeMonth: [
        {
          id: 1,
          time: 1,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 3,
          time: 3,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 6,
          time: 6,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 12,
          time: 12,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 24,
          time: 24,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
      ],

      customTimeYear: [
        {
          id: 1,
          time: 1,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "NAM",
          unitDTO_name: "NAM",
        },
        {
          id: 2,
          time: 2,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "NAM",
          unitDTO_name: "NAM",
        },
        {
          id: 3,
          time: 3,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "NAM",
          unitDTO_name: "NAM",
        },
      ],
      loadingForm: false,
      loadingFormSubmit: false,
      loadingFormOne: false,
      serviceDetail: null,
      visibleCount: 3,
      productId: null,
      operatingSystems: [],

      priceProductRentTime: [],
      sortProductPrices: [],
      rent: null,

      time: { data: 1, unitDTO: "THANG" },
      time_colo: { data: 1, unitDTO: "THANG" },
      user: {},
      allProductUnit: [],
      // dataOptionProduct: [],
      openModalShortDes: false,
      dataProduct: null,

      packageProduct: null,

      isVisibleMultiplTime: {
        id: null,
        status: false,
      },

      dataModalTimesMobile: null,
      isVisibleMultiplTimeMobile: {
        id: null,
        status: false,
      },

      show: false,

      validateOption: [],
      rent_default: process.env.TIME_RENT_DEFAULT,

      orderType: this.$route.query.orderType,
      isOpen: false,
      dataProductTemps: [],

      token_anonymous: Cookies.get(process.env.ACCESSTOKEN_NAME)
        ? Cookies.get(process.env.ACCESSTOKEN_NAME)
        : Cookies.get("token_anonymous"),
    };
  },

  components: {
    SVGDelete,
    SVGCart2,
    SVGCart1,
    PageTitle,
    ViewPayment,
    AlreadyPaymentSuccess,
    ModalShortDescription,
    LoginSocialNoTitle,
  },
  computed: {
    parmasDomain() {
      const value = this.$route.query.domain || "";
      return value;
    },
    type() {
      return this.setDataType || "";
    },
    userId() {
      return this.setDataUser_id || "";
    },
    // displayedProducts() {
    //   // Trả về các sản phẩm hiện đang được hiển thị
    //   return this.productGroups?.slice(0, this.visibleCount);
    // },
  },
  async mounted() {
    this.time = {
      data: this.order?.lineItems[0]?.orderLineItem?.quantity || 1,
      unitDTO: this.order?.lineItems[0]?.orderLineItem?.unitType || "THANG",
    };

    this.time_colo = {
      data: this.order?.lineItems[1]?.orderLineItem?.quantity || 1,
      unitDTO: this.order?.lineItems[1]?.orderLineItem?.unitType || "THANG",
    };

    this.getAllProductUnit();

    if (this.order?.lineItems[0]?.orderLineItem.resourceConfigs[0]?.productId) {
      this.handleMainData(this.order?.lineItems, this.setDataOrder_id);
    }
    if (this.$store.getters.getUser) {
      this.user = this.$store.getters.getUser;

      this.handleLinkingUserInOrder();
    }

    // if (this.order.lineItems[0].orderLineItem.productOptions) {
    //   this.getProductOptionById(
    //     this.order.lineItems[0].orderLineItem.productOptions
    //   );
    // }

    // if (this.order?.order?.ownerPhone || this.order?.order?.ownerPartyId) {
    //   if (this.type == "mua") {
    //     this.createFormThanhToan();
    //   }
    // }
  },

  watch: {
    isOpen: {
      handler(newVal, oldVal) {
        console.log("newData", newVal);
        const productCopy = JSON.parse(JSON.stringify(this.productGroups));
        if (newVal == true) {
          //this.dataProductTemps = productCopy;
          const targetId = this.productId;

          productCopy.sort((a, b) =>
            a?.product?.id == targetId ? -1 : b?.product?.id == targetId ? 1 : 0
          );
          this.dataProductTemps = productCopy;
        } else {
          this.dataProductTemps = productCopy?.filter(
            (c) => c?.product?.id == this.productId
          );
        }
      },
      deep: true,
    },
  },

  methods: {
    //function chính -------------------------------------------------------------------------------------

    async createCustomer() {
      try {
        this.loading = true;
        this.isDisable = true;
        const response = await this.$sdk.order.updateCustomerInOrder(
          this.$route.query.orderId,
          {
            name: this.user.fullName || "khách hàng mới",
            phone: this.user.phone,
          }
        );

        if (response) {
          if (this.type == "mua") {
            this.createFormThanhToan();
          } else {
            const response_Order = await this.handleGetOrderDetail(
              this.setDataOrder_id
            );
            if (response_Order) {
              this.order = response_Order;
              // if (
              //   this.order?.order?.ownerPhone ||
              //   this.order?.order?.ownerPartyId
              // ) {
              //   if (this.type == "mua") {
              //     this.createFormThanhToan();
              //   } else {
              //     if (
              //       this.order?.lineItems[0]?.orderLineItem.resourceConfigs[0]
              //         ?.productId
              //     ) {
              this.handleMainData(this.order?.lineItems, this.setDataOrder_id);
              //     }
              //   }
              // }
            }
          }
        }
      } catch (error) {
        this.loading = true;
        this.isDisable = false;
        console.log("🚀 ~ createCustomer ~ error:", error);
        this.$toast.error("createCustomer", error);
      }
    },

    async handleUpdateOrderStatus(orderId, status) {
      try {
        const token = await AddItemInCart.handleSetToken(this);
        const response = await this.$sdk.order.updateStatusSellOrder(
          orderId,
          status
        );
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleUpdateOrderStatus ~ error:", error);
        this.$toast.error("handleUpdateOrderStatus", error);
      }
    },

    async handleLinkingUserInOrder() {
      try {
        const token = await this.$sdk.order.setToken(this.token_anonymous);
        const updateCustomer =
          await this.$sdk.order.updateCustomerAndShippingAddress(
            this.$route.query.orderId,
            this.$store.getters.getUser?.partyId,
            null
          );

        if (updateCustomer) {
          const responseOrderDetail = await this.handleGetOrderDetail(
            this.$route.query.orderId
          );
          if (responseOrderDetail) {
            if (this.type == "mua") {
              this.createFormThanhToan();
            } else {
              this.order = responseOrderDetail;
            }
          }
        }
      } catch (error) {
        console.log("🚀 ~ handleLinkingUserInOrder ~ error:", error);
        this.$toast.error("handleLinkingUserInOrder", error);
      }
    },

    getRentTime(dataDiscount, type) {
      const data = dataDiscount?.find(
        (c) =>
          c.time == (type == "product" ? this.time?.data : this.time_colo?.data)
      );
      const dataDefault = dataDiscount?.find((c) => c.defaultPrice == true);

      //console.log("🚀 ~ getRentTime ~ data:", data, dataDefault)
      return data ? data : dataDefault;
    },

    handleShow() {
      this.show = !this.show;
    },

    handleVisibleMultipleTime(id, type) {
      this.dataModalTimesMobile = null;
      if (!id) {
        this.isVisibleMultiplTime = {
          id: null,
          status: false,
          type: null,
        };
      } else {
        if (!this.isVisibleMultiplTime?.id) {
          this.isVisibleMultiplTime = {
            id,
            status: true,
            type,
          };
        } else {
          if (this.isVisibleMultiplTime?.id == id) {
            this.isVisibleMultiplTime = {
              id: null,
              status: false,
              type: null,
            };
          } else {
            this.isVisibleMultiplTime = {
              id,
              status: true,
              type,
            };
          }
        }
      }
    },

    handleVisibleMultipleTimeMobile(id, item, type) {
      if (!id) {
        this.isVisibleMultiplTimeMobile = {
          id: null,
          status: false,
          type: null,
        };
        this.dataModalTimesMobile = null;
      } else {
        if (!this.isVisibleMultiplTimeMobile?.id) {
          this.isVisibleMultiplTimeMobile = {
            id,
            status: true,
            type,
          };
          this.dataModalTimesMobile = {
            type,
            productOrColocation:
              type == "product" ? item?.product : item?.colocation,
            item,
          };
        } else {
          if (this.isVisibleMultiplTimeMobile?.id == id) {
            this.isVisibleMultiplTimeMobile = {
              id: null,
              status: false,
              type: null,
            };
            this.dataModalTimesMobile = null;
          } else {
            this.isVisibleMultiplTimeMobile = {
              id,
              status: true,
              type,
            };
            this.dataModalTimesMobile = {
              type,
              productOrColocation:
                type == "product" ? item?.product : item?.colocation,
              item,
            };
          }
        }
      }
    },

    async handleUpdateItemInOrder(orderId, product) {
      //console.log("🚀 ~ handleUpdateItemInOrder ~ product:", product);
      try {
        this.loadingForm = true;
        if (
          this.order?.lineItems[0]?.orderLineItem.resourceConfigs[0]
            ?.productId == product?.id
        ) {
          this.loadingForm = false;
          return;
        } else {
          this.priceProductRentTime = [];
          this.sortProductPrices = [];
          // this.rent = null;
          //this.packageProduct = product;
          this.productId = product?.id;
          const id = product?.id;
          const stempOrder = this.order;
          const dataProductOptions = (
            stempOrder?.lineItems[0]?.orderLineItem?.productOptions || []
          ).map(({ __typename, ...rest }) => rest);
          // console.log(
          //   "🚀 ~ handleUpdateItemInOrder ~ dataProductOptions:",
          //   dataProductOptions
          // );

          const productDetailResponse = await this.handleGetDetailProduct(id);
          const productOptionResponse = await this.handleGetProductOption(id);
          // console.log(
          //   "🚀 ~ handleUpdateItemInOrder ~ productOptionResponse:",
          //   productOptionResponse
          // );

          const checkProductOptionValid = dataProductOptions
            ?.filter((option) =>
              productOptionResponse.some((response) => {
                // So sánh idOption trong dataProductOptions với id trong productOptionResponse
                if (response.id == option.idOption) {
                  // Kiểm tra nếu subType là "SELECT"
                  if (response.subType == "SELECT") {
                    return response?.productFeatureDTOS?.some(
                      (feature) => feature?.productId == option?.value
                    );
                  } else {
                    // Nếu subType không phải "SELECT", luôn trả về true
                    return true;
                  }
                }
                return false;
              })
            )
            .map(({ idOption, name, value }) => ({ idOption, name, value }));

          const checkColo = this.order?.lineItems?.find((c) =>
            productOptionResponse?.some((a) =>
              a?.productFeatureDTOS?.some(
                (d) =>
                  d.productId ==
                  c?.orderLineItem?.resourceConfigs[0]?.productId
              )
            )
          );

          //console.log("🚀 ~ handleUpdateItemInOrder ~ checkColo:", checkColo);

          // console.log(
          //   "🚀 ~ handleUpdateItemInOrder ~ checkProductOptionValid:",
          //   checkProductOptionValid
          // );
          let sortPrice = [];

          if (checkColo?.productDetails?.id) {
            const listPrice = await this.getDataProductQuantityPromotionAction(
              checkColo?.productDetails?.id
            );
            //console.log("🚀 ~ handleUpdateItemInOrder ~ listPrice:", listPrice);
            sortPrice = await this.getSortProductPrices(listPrice);
            //console.log("🚀 ~ handleUpdateItemInOrder ~ sortPrice:", sortPrice);
          }

          if (productDetailResponse) {
            const timeProductDetailResponse = this.getTimeUnit(
              productDetailResponse
            );
            this.product = productDetailResponse;

            // Kiểm tra thuộc tính COLOCATION
            // const colocationAttribute =
            //   productDetailResponse?.productAttributes?.find(
            //     (c) => c.attributeName == "COLOCATION"
            //   );

            // // Xử lý sản phẩm COLOCATION hoặc không
            // if (colocationAttribute?.attributeValue) {
            //   await this.handleColocationProduct(
            //     colocationAttribute.attributeValue,
            //     productDetailResponse,
            //     timeProductDetailResponse,
            //     "colocation"
            //   );
            // } else {
            await this.handleRegularProduct(
              productDetailResponse,
              timeProductDetailResponse
            );
            // }
          }

          // Cập nhật hệ điều hành nếu có
          if (productOptionResponse) {
            this.operatingSystems = productOptionResponse;
          }
          // console.log(
          //   "🚀 ~ handleUpdateItemInOrder ~ this.priceProductRentTime:",
          //   this.priceProductRentTime
          // );
          // console.log("this.sortProductPrices", this.sortProductPrices);
          // console.log("this.rent", this.rent);
          if (this.priceProductRentTime && this.sortProductPrices) {
            // &&
            //  this.rent
            // Hàm để tạo độ trễ
            const delay = (ms) =>
              new Promise((resolve) => setTimeout(resolve, ms));

            if (this.order?.lineItems?.length) {
              const deletePromises = this.order.lineItems.map(
                async (item, index) => {
                  const orderItemId = item.orderLineItem?.id; // Giả sử bạn lấy id từ item

                  // Thêm độ trễ trước khi xóa
                  await delay(index * 500); // Tăng độ trễ theo chỉ số

                  return await this.handleDeleteProductInOrder(
                    orderId,
                    orderItemId
                  );
                }
              );

              // Đợi cho tất cả các yêu cầu xóa hoàn thành
              const deleteResponses = await Promise.all(deletePromises);

              // Kiểm tra xem tất cả các phản hồi xóa có thành công không
              const allDeleted = deleteResponses.every(
                (response) => response?.status === 1
              );

              if (allDeleted) {
                // console.log(
                //   "🚀 ~ handleUpdateItemInOrder ~ this.priceProductRentTime:",
                //   this.priceProductRentTime
                // );

                if (sortPrice.length > 0) {
                  this.priceProductRentTime.push({
                    data: sortPrice,
                    id: checkColo?.productDetails?.id,
                    type: "product",
                  });
                  const responseAdd = await this.handleAddProductInOrder(
                    orderId,
                    this.priceProductRentTime
                  );
                  if (responseAdd?.status === 1) {
                    const responseOrderDetail = await this.handleGetOrderDetail(
                      orderId
                    );
                    if (responseOrderDetail) {
                      this.order = responseOrderDetail;
                      const responseUpdateProductOption =
                        await this.handleUpdateOperatingSystem(
                          responseOrderDetail?.lineItems[0]?.orderLineItem?.id,
                          checkProductOptionValid
                        );

                      // if (responseUpdateProductOption) {
                      //   this.loadingForm = false;
                      // }
                    }
                  }
                } else {
                  const responseAdd = await this.handleAddProductInOrder(
                    orderId,
                    this.priceProductRentTime
                  );
                  if (responseAdd?.status === 1) {
                    const responseOrderDetail = await this.handleGetOrderDetail(
                      orderId
                    );
                    if (responseOrderDetail) {
                      this.order = responseOrderDetail;
                      const responseUpdateProductOption =
                        await this.handleUpdateOperatingSystem(
                          responseOrderDetail?.lineItems[0]?.orderLineItem?.id,
                          checkProductOptionValid
                        );

                      // if (responseUpdateProductOption) {
                      //   this.loadingForm = false;
                      // }
                    }
                  }
                }
              }
            }
          }

          this.isOpen = false;
        }
      } catch (error) {
        console.log("🚀 ~ handleUpdateItemInOrder ~ error:", error);
        this.loadingForm = false;
      }
    },

    async handleMainData(lineItem, setDataOrder_id) {
      try {
        this.loadingFormOne = true;
        this.productId =
          lineItem[0]?.orderLineItem.resourceConfigs[0]?.productId;
        const id = lineItem[0]?.orderLineItem.resourceConfigs[0]?.productId;
        // Kiểm tra dịch vụ
        // if (setDataOrder_id) {
        //   const serviceIdResponse = await this.handleGetServiceID(
        //     setDataOrder_id
        //   );
        //   if (serviceIdResponse) {
        //     const serviceDetailResponse = await this.handleGetDetailService(
        //       serviceIdResponse
        //     );
        //     if (serviceDetailResponse) {
        //       this.serviceDetail = serviceDetailResponse;
        //     }
        //   }
        // }

        // Lấy chi tiết sản phẩm chính
        const productDetailResponse = await this.handleGetDetailProduct(id);
        const productOptionResponse = await this.handleGetProductOption(id);

        if (productDetailResponse) {
          const timeProductDetailResponse = this.getTimeUnit(
            productDetailResponse
          );
          this.product = productDetailResponse;

          // Kiểm tra thuộc tính COLOCATION
          const colocationAttribute =
            productDetailResponse?.productAttributes?.find(
              (c) => c.attributeName === "COLOCATION"
            );

          // Xử lý sản phẩm COLOCATION hoặc không
          if (lineItem.length > 1) {
            await this.handleColocationProduct(
              lineItem[1]?.orderLineItem.resourceConfigs[0]?.productId,
              productDetailResponse,
              timeProductDetailResponse,
              "colocation"
            );
          } else {
            await this.handleRegularProduct(
              productDetailResponse,
              timeProductDetailResponse
            );
          }

          // Lấy thông tin nhóm sản phẩm
          const productGroupResponse = await this.handleGetProductGroup(
            productDetailResponse
          );
          if (productGroupResponse) {
            this.productGroups = productGroupResponse;
            const productCopy = JSON.parse(JSON.stringify(this.productGroups));
            console.log("🚀 ~ mounted ~ productCopy:", productCopy);
            this.dataProductTemps = productCopy?.filter(
              (c) => c?.product?.id == this.productId
            );
          }
        }

        // Cập nhật hệ điều hành nếu có
        if (productOptionResponse) {
          this.operatingSystems = productOptionResponse;
        }
      } catch (error) {
        console.log("🚀 ~ handleMainData ~ error:", error);
      } finally {
        this.$store.commit("setLoading", false);
        this.loadingFormOne = false;
      }
    },

    // Hàm xử lý sản phẩm COLOCATION
    async handleColocationProduct(
      colocationValue,
      productDetailResponse,
      timeProductDetailResponse,
      type
    ) {
      const productDetailColocationResponse = await this.handleGetDetailProduct(
        colocationValue
      );

      if (productDetailColocationResponse) {
        this.productPlace = productDetailColocationResponse;

        const timeProductColocationDetailResponse = this.getTimeUnit(
          productDetailColocationResponse
        );

        // Tạo mảng chứa các lời gọi để xử lý song song
        const responses = await Promise.all([
          this.getDataProductQuantityPromotionAction(productDetailResponse?.id),
          this.getDataProductQuantityPromotionAction(
            productDetailColocationResponse?.id
          ),
        ]);

        const [
          promotionActionResponse_One,
          promotionActionResponse_colocation,
        ] = responses;

        // Lấy giá sản phẩm
        await this.processPriceData(
          productDetailResponse,
          timeProductDetailResponse,
          promotionActionResponse_One
        );
        await this.processPriceData(
          productDetailColocationResponse,
          timeProductColocationDetailResponse,
          promotionActionResponse_colocation,
          type
        );
      }
    },

    // Hàm xử lý sản phẩm thông thường
    async handleRegularProduct(
      productDetailResponse,
      timeProductDetailResponse
    ) {
      const productQuantityPromotionActionResponse =
        await this.getDataProductQuantityPromotionAction(
          productDetailResponse?.id
        );
      await this.processPriceData(
        productDetailResponse,
        timeProductDetailResponse,
        productQuantityPromotionActionResponse
      );
    },

    // Hàm xử lý giá sản phẩm
    async processPriceData(
      productDetailResponse,
      timeProductDetailResponse,
      promotionActionResponse,
      type
    ) {
      const priceResponse = await this.getSortProductPrices(
        promotionActionResponse
      );

      this.priceProductRentTime.push({
        id: productDetailResponse?.id,
        data: [...priceResponse],
        type: type ? type : "product",
      });
      //console.log("🚀 ~ this.priceProductRentTime:", this.priceProductRentTime);

      const matchDataResponse = this.handleMatchData(this.priceProductRentTime);
      if (matchDataResponse) {
        this.sortProductPrices = matchDataResponse;
        // const sortTime = this.sortProductPrices.find(
        //   (c) => c.time == this.time?.data
        // );

        // this.rent = sortTime ? sortTime : this.sortProductPrices[0];
      }
    },

    // Hàm để xác định thời gian
    getTimeUnit(productDetailResponse) {
      return productDetailResponse?.unitDTO?.name?.toLowerCase() === "tháng"
        ? this.customTimeMonth
        : this.customTimeYear;
    },

    async handleShowModal(id) {
      if (id) {
        const response = await this.handleGetDetailProduct(id);
        this.dataProduct = response;
        this.openModalShortDes = !this.openModalShortDes;
      } else {
        this.openModalShortDes = !this.openModalShortDes;
      }
    },

    // function phụ ---------------------------------------------------------------------------------

    async handleGetDetailProduct(id) {
      try {
        // const response = await this.$store.dispatch("getProductById", {
        //   id,
        //   store: this.$route.query.store,
        // });
        const response = await this.$sdk.product.getProductById(
          id,
          this.$route.query.store
        );

        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetDetailProduct ~ error:", `${id}`, error);
        this.$toast.error("handleGetDetailProduct", error);
      }
    },

    async handleGetProductGroup(item) {
      //console.log("🚀 ~ handleGetProductGroup ~ item:", item);
      try {
        let data = [];
        if (!this.$route.query.domain && this.$route.query.type != "giahan") {
          const param = {
            category: item?.categories[0].id,
            display: "PUBLIC",
            subType: "CONFIG,SIMPLE,VARIABLE",
            status: "ON_SELL",
            maxResult: 100,
          };
          const response = await this.$sdk.product.getProducts(
            param,
            this.$route.query.store
          );

          data = response?.data;
          const featuredProduct = data.find(
            (product) => product.id === item?.id
          );
          if (featuredProduct) {
            // Lọc ra sản phẩm không phải là item và đặt nó sau sản phẩm đặc biệt
            data = [
              featuredProduct,
              ...data.filter((product) => product.id !== item?.id),
            ];
          }
        } else {
          const response = await this.$sdk.product.getProductById(
            item?.id,
            this.$route.query.store
          );

          data.push(response);

          const featuredProduct = data.find(
            (product) => product.id === item?.id
          );
          if (featuredProduct) {
            data = [
              featuredProduct,
              ...data.filter((product) => product.id !== item?.id),
            ];
          }
        }

        //console.log("🚀 ~ handleGetProductGroup ~ data:", data, this.order?.lineItems[0]?.orderLineItem?.resourceConfigs[0].productId);
        if (data) {
          let formatData = null;
          if (this.orderType == "extend_order") {
            formatData = data?.filter(
              (c) =>
                c.id ==
                this.order?.lineItems[0]?.orderLineItem?.resourceConfigs[0]
                  .productId
            );
          } else {
            formatData = data;
          }

          if (formatData) {
            const productGroupsFullData = await Promise.all(
              formatData.map(async (c) => {
                return {
                  product: { ...c },
                  colocation: null,
                }; // Tạo bản sao của product
              })
            );
            await Promise.all(
              productGroupsFullData.map(async ({ product, colocation }) => {
                await Promise.all(
                  [product, colocation].map(async (item) => {
                    if (item) {
                      const resDiscount = await this.$sdk.product.getListPrice(
                        [item.id.toString()],
                        this.$route.query.store
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
                                d?.displayPrice ||
                                d?.price * (d?.quantity || 1) ||
                                0,
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
                              c?.displayPrice ||
                              c?.price * (c?.quantity || 1) ||
                              0, // Calculating priceDiscount
                            unitDTO_id: item.unitDTO?.id, // Unit DTO ID
                            unitDTO_name: item.unitDTO?.name, // Unit DTO Name
                            defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
                            //attributes: c?.attributes || []
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
                              d?.displayPrice ||
                              d?.price * (d?.quantity || 1) ||
                              0,
                            unitDTO_id: item.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                            unitDTO_name: item.unitDTO?.name || "Tháng", // Default name if not available
                            defaultPrice: d?.defaultPrice
                              ? d?.defaultPrice == d?.id
                                ? true
                                : false
                              : true, // Default to true when subPrices exist
                            //attributes: d?.attributes || [],
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
            const filteredProductGroups = productGroupsFullData.filter(
              ({ product }) => product.dataDiscount?.length > 0
            );

            return filteredProductGroups;
          }
        } else {
          return null;
        }
      } catch (error) {
        this.loadingForm = false;
        console.log("🚀 ~ handleGetProductGroup ~ error:", error);
        this.$toast.error("handleGetProductGroup", error);
      } finally {
        // this.loadingFormOne = false;
        this.loadingForm = false;
      }
    },

    async handleGetServiceID(setDataOrder_id) {
      try {
        const res = await this.$store.dispatch(
          "getServiceIdFromOrderId",
          setDataOrder_id
        );
        if (res.data.getServiceIds.length > 0) {
          return res.data.getServiceIds[0];
        } else {
          return null;
        }
      } catch (err) {
        console.log("🚀 ~ handleGetServiceID ~ err:", err);
        this.$toast.error("getServiceIdFromOrderId", err);
      }
    },

    async handleGetDetailService(serviceId) {
      try {
        const res = await this.$sdk.cloud.serviceDetail(serviceId);

        if (res) {
          return res;
        } else {
          this.$toast.error("getServiceDetail", res.errors[0].message);
          return null;
        }
      } catch (err) {
        console.log("🚀 ~ handleGetDetailService ~ err:", err);
        this.$toast.error("getServiceDetail", err);
      }
    },

    async handleGetProductOption(id) {
      try {
        const response = await this.$store.dispatch("getProductOptionV2", {
          id,
          store: this.$route.query.store,
        });

        if (response?.data?.getProductOption) {
          const formattedOptions = response?.data?.getProductOption.map(
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
          // console.log(
          //   "🚀 ~ handleGetProductOption ~ formattedOptions:",
          //   formattedOptions
          // );

          // Kiểm tra nếu productFeatureDTOS tồn tại trong từng item của formattedOptions
          const promises = formattedOptions.flatMap((option) =>
            option.productFeatureDTOS.map(async (c) => {
              let data = await this.handleGetDetailProduct(c?.productId);
              //console.log("🚀 ~ option.productFeatureDTOS.map ~ data:", data);
              if (data) {
                c.productDetail = data;
              } else {
                c.productDetail = null;
              }
            })
          );

          // Chờ tất cả các Promise hoàn thành
          await Promise.all(promises);

          //console.log("Updated formattedOptions:", formattedOptions);
          return formattedOptions;
        } else {
          return null; // Nếu không có dữ liệu
        }
      } catch (error) {
        console.log("🚀 ~ handleGetProductOption ~ error:", error);
        this.$toast.error("handleGetProductOption", error);
        return null; // Trả về null nếu có lỗi
      }
    },

    checkQualify(qualify) {
      switch (qualify) {
        case "CLOUD_LAB":
          return true;
        case "SMART_CLOUD_SERVER":
          return true;
        default:
          return false;
      }
    },

    checkIdProductOption(item, productFeatureDTOS, type) {
      // console.log("🚀 ~ checkIdProductOption ~ item:", item);
      if (type == "os") {
        const data =
          this.order?.lineItems[0]?.orderLineItem?.productOptions?.find(
            (c) => c?.idOption == item?.id
          );

        const checkColo = productFeatureDTOS?.find((c) =>
          this.order?.lineItems?.some(
            (b) => c?.productId == b?.orderLineItem.resourceConfigs[0]
            ?.productId
          )
        );

        const dataReturn = checkColo
          ? {
              idOption: item?.id,
              name: item?.name,
              value: checkColo?.productId,
            }
          : data || {
              value: "",
            };
        //console.log("🚀 ~ checkIdProductOption ~ checkColo:", checkColo);

        return dataReturn;
      } else {
        const data =
          this.order?.lineItems[0]?.orderLineItem?.productOptions?.find(
            (c) => c?.idOption == item?.id
          );

        return (
          data || {
            value: "",
          }
        );
      }
    },

    async getDataProductQuantityPromotionAction(id) {
      try {
        const response = await this.$sdk.product.getListPrice(
          [id.toString()],
          this.$route.query.store
        );
        if (response) {
          return response[id];
        } else {
          return null;
        }
      } catch (error) {
        console.log(
          "🚀 ~ getDataProductQuantityPromotionAction ~ error:",
          error
        );
        this.$toast.error("getDataProductQuantityPromotionAction", error);
      }
    },

    async getSortProductPrices(moneyProductQuantityPromotionAction) {
      // console.log(
      //   "🚀 ~ moneyProductQuantityPromotionAction:",
      //   moneyProductQuantityPromotionAction
      // );
      try {
        // Kiểm tra moneyProductQuantityPromotionAction có phải là mảng hợp lệ không
        const validMoneyProductQuantityPromotionAction = Array.isArray(
          moneyProductQuantityPromotionAction
        )
          ? moneyProductQuantityPromotionAction
          : [];

        // const maxPercentDiscount =
        //   validMoneyProductQuantityPromotionAction[0].subPrices?.filter(
        //     (d) => d?.quantity
        //   );

        // let listPrice =
        //   maxPercentDiscount?.length > 0
        //     ? maxPercentDiscount?.map((c) => {
        //         let data = {
        //           time: c?.quantity, // Thêm thời gian vào đây
        //           percentDiscount: c?.discountPercent,
        //           price: c?.price,
        //           hint: c?.hint ? c?.hint : null,
        //           priceDiscount: 0,
        //           unitDTO_id: this.product?.unitDTO?.id,
        //           unitDTO_name: this.product?.unitDTO?.name,
        //           defaultPrice:
        //             validMoneyProductQuantityPromotionAction[0]?.defaultPrice ==
        //             c.id
        //               ? true
        //               : false,
        //         };

        //         return data;
        //       })
        //     : [
        //         {
        //           time: 1, // Thêm thời gian vào đây
        //           percentDiscount: 0,
        //           price: validMoneyProductQuantityPromotionAction[0]?.price,
        //           hint: null,
        //           priceDiscount: 0,
        //           unitDTO_id: this.product?.unitDTO?.id,
        //           unitDTO_name: this.product?.unitDTO?.name,
        //           defaultPrice: true,
        //         },
        //       ];
        // console.log("listPrice", listPrice);

        let listPrice = validMoneyProductQuantityPromotionAction?.flatMap(
          (d) => {
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
                  unitDTO_id: this.product.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                  unitDTO_name: this.product.unitDTO?.name || "default", // Default name if not available
                  defaultPrice: d?.defaultPrice ? false : true, // Default to true when no subPrices
                  //attributes: d?.attributes || [],
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
                unitDTO_id: this.product.unitDTO?.id, // Unit DTO ID
                unitDTO_name: this.product.unitDTO?.name, // Unit DTO Name
                defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
                //attributes: c?.attributes || [],
                attributes: {
                  value: c?.attributes?.some(
                    (a) =>
                      a.attrName == "CAMPAIN" || a.attrName == "CAMPAIGN_ACTION"
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
                unitDTO_id: this.product.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                unitDTO_name: this.product.unitDTO?.name || "Tháng", // Default name if not available
                defaultPrice: d?.defaultPrice
                  ? d?.defaultPrice == d?.id
                    ? true
                    : false
                  : true, // Default to true when subPrices exist
                //attributes: d?.attributes || [],
                attributes: {
                  value: d?.attributes?.some(
                    (a) =>
                      a.attrName == "CAMPAIN" || a.attrName == "CAMPAIGN_ACTION"
                  ),
                  campain: d?.attributes || [],
                },
              },
              ...subPriceData,
            ];
          }
        );

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

        // // Thêm trường 'number' vào mỗi đối tượng trong listPrice
        // updatedDataDiscount.forEach((price, index) => ({
        //   ...price,
        //   number: index + 1, // Cộng thêm 1 để bắt đầu từ 1 thay vì 0
        // }));
        // return updatedDataDiscount;

        updatedDataDiscount.forEach((discount) => {
          if (discount.oldPrice) {
            let defaultPriceFound = false;

            // Kiểm tra trong oldPrice xem có đối tượng nào có defaultPrice là true không
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

        // Thêm trường 'number' vào mỗi đối tượng trong updatedDataDiscount
        updatedDataDiscount.forEach((price, index) => {
          price.number = index + 1; // Cộng thêm 1 để bắt đầu từ 1 thay vì 0
        });

        return updatedDataDiscount;
      } catch (error) {
        console.log("🚀 ~ getSortProductPrices ~ error:", error);
        this.$toast.error("getSortProductPrices", error);
      }
    },
    handleMatchData(priceProductRentTime) {
      //console.log("🚀 ~ handleMatchData ~ priceProductRentTime:", priceProductRentTime)
      const matchData = priceProductRentTime.reduce((acc, curr) => {
        curr.data.forEach((item) => {
          const existing = acc.find((x) => x.time === item.time);
          if (existing) {
            // Cập nhật chỉ price và priceDiscount
            existing.price += item.price;
            existing.priceDiscount += item.priceDiscount;
          } else {
            // Nếu không tồn tại, thêm item mới
            acc.push({ ...item });
          }
        });
        return acc;
      }, []);

      return matchData;
    },

    convertPrice(price) {
      if (price !== null && price !== undefined) {
        if (price === 0) {
          return "0đ";
        } else {
          return (
            price
              .toFixed(0)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
          );
        }
      } else {
        return price;
      }
    },

    async getAllProductUnit() {
      const get = await this.$store.dispatch("getAllProductUnit");
      this.allProductUnit = get?.data;
    },

    // async getProductOptionById(data) {
    //   console.log("đa ta", data)
    //   this.dataOptionProduct = [];
    //   if (this.dataOptionProduct.length === 0) {
    //     await Promise.all(
    //       data.map(async (option) => {
    //         const response = await this.$store.dispatch("getProductById", {
    //           id: option?.value,
    //           store: this.$route.query.store,
    //         });
    //         const productData =
    //           response.status !== 0 ? response.data : { title: option?.value };

    //         // Kiểm tra xem optionValue đã tồn tại chưa
    //         if (
    //           !this.dataOptionProduct.some(
    //             (item) => item.optionValue == option?.idOption
    //           )
    //         ) {
    //           this.dataOptionProduct.push({
    //             optionValue: option?.idOption,
    //             productData,
    //           });
    //           console.log("this.dataOptionProduct", this.dataOptionProduct)
    //         }
    //       })
    //     );
    //   }
    // },

    formattedText(text) {
      let trimmedTextLocation = "";
      if (text) {
        const locationDescription = text;

        if (
          typeof locationDescription == "string" &&
          locationDescription.trim() != ""
        ) {
          const wordsLocation = locationDescription.split(" ");
          trimmedTextLocation = wordsLocation.slice(0, 4).join(" ");

          if (wordsLocation.length > 4) {
            return (trimmedTextLocation += "...");
          } else if (wordsLocation.length <= 4) {
            return locationDescription;
          }
        }
      }
    },

    handleFilterData(array1, data, value) {
      if (array1.length > 0) {
        const res = array1?.find((c) => c?.id == data);
        if (res) {
          //console.log("array1, data, value", array1, data, value, res[value])
          return res[value];
        }
      }
    },

    async handleChangeOptionSystem(
      item,
      id,
      name,
      index,
      type,
      dataOptionSystem
    ) {
      // console.log(
      //   "🚀 ~ handleChangeOptionSystem ~ dataOptionSystem:",
      //   dataOptionSystem
      // );
      // console.log(
      //   "🚀 ~ handleChangeOptionSystem ~ item: getSortProductPrices getDataProductQuantityPromotionAction",
      //   item
      // );
      if (item && id && name) {
        this.loadingForm = true;
        if (type == "os") {
          // const listPrice = await this.getDataProductQuantityPromotionAction(
          //   item
          // );
          // //console.log("🚀 ~ handleChangeOptionSystem ~ listPrice:", listPrice);

          // if (listPrice?.length > 0) {
          //   this.loadingForm = true;
          //   const sortPrice = await this.getSortProductPrices(listPrice);
          //   if (sortPrice) {
          //     // console.log(
          //     //   "🚀 ~ handleChangeOptionSystem ~ sortPrice:",
          //     //   sortPrice
          //     // );
          //     let data = [
          //       {
          //         id: item,
          //         data: [...sortPrice],
          //         type: "product",
          //       },
          //     ];
          //     //console.log("🚀 ~ handleChangeOptionSystem ~ data:", data);
          //     const isProductFound = this.order?.lineItems?.find((c) =>
          //       dataOptionSystem?.some(
          //         (option) => option.productId == c?.orderLineItem?.variant?.id
          //       )
          //     );
          //     //console.log("🚀 ~ isProductFound:", isProductFound)
          //     if (!isProductFound) {
          //       const addProduct = await this.handleAddProductInOrder(
          //         this.order?.order?.id,
          //         data
          //       );
          //       if (addProduct) {
          //         const responseOrderDetail = await this.handleGetOrderDetail(
          //           this.setDataOrder_id
          //         );
          //         if (responseOrderDetail) {
          //           this.order = responseOrderDetail;
          //           this.priceProductRentTime.push(data[0]);
          //           this.loadingForm = false;
          //         }
          //       }
          //     } else {
          //       if (item != isProductFound?.orderLineItem?.variant?.id) {
          //         const deleteData = await this.handleDeleteProductInOrder(
          //           this.order?.order?.id,
          //           isProductFound?.orderLineItem?.id
          //         );

          //         if (deleteData) {
          //           const addProduct = await this.handleAddProductInOrder(
          //             this.order?.order?.id,
          //             data
          //           );
          //           if (addProduct) {
          //             const responseOrderDetail =
          //               await this.handleGetOrderDetail(this.setDataOrder_id);
          //             if (responseOrderDetail) {
          //               this.order = responseOrderDetail;
          //               this.priceProductRentTime = this.priceProductRentTime
          //                 .filter((item) => item.type != "colocation")
          //                 .concat(data);

          //               this.loadingForm = false;
          //             }
          //           }
          //         }
          //       } else {
          //         this.loadingForm = false;
          //       }
          //     }
          //   }
          // } else {
          //   this.handleUpdateProductOption(item, id, name, index, type);
          // }
          this.handleUpdateProductOption(item, id, name, index, type);
        } else {
          this.handleUpdateProductOption(item, id, name, index, type);
        }
      }
    },

    handleUpdateProductOption(item, id, name, index, type) {
      const jsonAll = [];

      if (
        this.order?.lineItems[0]?.orderLineItem?.productOptions?.some(
          (option) => option.idOption == id
        )
      ) {
        const json = {
          idOption: id,
          name: name,
          value: item,
        };
        jsonAll.push(json);

        this.order?.lineItems[0]?.orderLineItem?.productOptions?.forEach(
          (option) => {
            if (option?.idOption != id) {
              const data = {
                idOption: option?.idOption,
                name: option?.name,
                value: option?.value,
              };
              jsonAll.push(data);
            }
          }
        );
        this.handleUpdateOperatingSystem(null, jsonAll);
      } else {
        // Lưu đối tượng mới vào jsonAll
        const json = {
          idOption: id,
          name: name,
          value: item,
        };
        jsonAll.push(json);

        // Lưu tất cả các đối tượng từ this.order?.lineItems[0]?.orderLineItem?.productOptions vào jsonAll
        if (this.order?.lineItems[0]?.orderLineItem?.productOptions) {
          this.order?.lineItems[0]?.orderLineItem?.productOptions?.forEach(
            (option) => {
              const data = {
                idOption: option?.idOption,
                name: option?.name,
                value: option?.value,
              };
              jsonAll.push(data);
            }
          );
        }

        this.handleUpdateOperatingSystem(null, jsonAll);
      }
    },

    async handleUpdateOperatingSystem(orderLineItemId, jsonAll) {
      try {
        const dataOptionSystem = {
          id: orderLineItemId
            ? orderLineItemId
            : this.order?.lineItems[0]?.orderLineItem?.id,
          productOptionId: jsonAll,
          useID: this.userId,
        };
        this.loadingForm = true;

        const res = await this.$store.dispatch(
          "updateProductOptionOrderLineItem",
          dataOptionSystem
        );
        if (res.data.updateProductOptionOrderLineItem) {
          const responseProductOption = await this.handleGetProductOption(
            this.productId
          );
          if (responseProductOption) {
            this.operatingSystems = responseProductOption;
            const responseOrderDetail = await this.handleGetOrderDetail(
              this.setDataOrder_id
            );
            if (responseOrderDetail) {
              this.order = responseOrderDetail;
              // this.getProductOptionById(
              //   responseOrderDetail.lineItems[0].orderLineItem.productOptions
              // );
              this.loadingForm = false;
              return res.data.updateProductOptionOrderLineItem;
            }
          }
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleUpdateOperatingSystem ~ error:", error);
        this.loadingForm = false;
        this.$toast.error("handleUpdateOperatingSystems", error);
      }
    },

    async handleDeleteProductInOrder(orderId, orderItemId) {
      try {
        const response = await this.$sdk.order.deleteProductInOrderWithoutLogin(
          orderId,
          orderItemId,
          "đổi gói sản phẩm khác",
          this.userId,
          this.$route.query.store
        );
        if (response.status == 1) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleDeleteProductInOrder ~ error:", error);
        this.$toast.error("handleDeleteProductInOrder", error);
      }
    },

    async handleAddProductInOrder(orderId, priceProductRentTime) {
      console.log(
        "🚀 ~ handleAddProductInOrder ~ priceProductRentTime:",
        priceProductRentTime
      );
      try {
        // Xử lý dữ liệu trả về mảng object
        const data = priceProductRentTime?.reduce((acc, c) => {
          let schemaData = [];

          const timeData =
            c?.type === "product" ? this.time?.data : this.time_colo?.data;
          const foundData = c?.data?.find((d) => d.time === timeData);
          //console.log("🚀 ~ data ~ foundData:", foundData);
          const foundDataDefault = c?.data?.find(
            (d) => d.defaultPrice === true
          );
          //console.log("🚀 ~ data ~ foundDataDefault:", foundDataDefault);
          schemaData.push({
            quantity: foundData
              ? foundData?.time
              : foundDataDefault
              ? foundDataDefault?.time
              : c?.data[0]?.time,
            gift: false,
            parent_id: null,
            product_id: c?.id,
            input_price: foundData
              ? foundData.price
              : foundDataDefault
              ? foundDataDefault?.price
              : c?.data[0]?.price,
            discount_amount: 0,
            campaign_id:
              foundData?.attributes?.value == true
                ? foundData?.attributes?.campain?.find(
                    (c) => c.attrName == "CAMPAIN"
                  )?.attrValue
                : foundDataDefault?.attributes?.value == true
                ? foundDataDefault?.attributes?.campain?.find(
                    (c) => c.attrName == "CAMPAIN"
                  )?.attrValue
                : c?.data[0]?.attributes?.value == true
                ? c?.data[0]?.attributes?.campain?.find(
                    (c) => c.attrName == "CAMPAIN"
                  )?.attrValue
                : null,
            campaign_action_id:
              foundData?.attributes?.value == true
                ? foundData?.attributes?.campain?.find(
                    (c) => c.attrName == "CAMPAIGN_ACTION"
                  )?.attrValue
                : foundDataDefault?.attributes?.value == true
                ? foundDataDefault?.attributes?.campain?.find(
                    (c) => c.attrName == "CAMPAIGN_ACTION"
                  )?.attrValue
                : c?.data[0]?.attributes?.value == true
                ? c?.data[0]?.attributes?.campain?.find(
                    (c) => c.attrName == "CAMPAIGN_ACTION"
                  )?.attrValue
                : null,
            unit_price:
              foundData?.oldPrice?.length > 0
                ? foundData?.oldPrice[0]?.price
                : foundDataDefault?.oldPrice?.length > 0
                ? foundDataDefault?.oldPrice[0]?.price
                : c?.data[0]?.oldPrice?.length > 0
                ? c?.data[0]?.oldPrice[0]?.price
                : null,
          });

          return [...acc, ...schemaData]; // Gộp kết quả vào acc
        }, []);

        //console.log("🚀 ~ handleAddProductInOrder ~ data:", data);

        // Xử lý tiếp với data đã hoàn chỉnh
        const update = await this.$sdk.order.addProductInOrderWithoutLogin(
          orderId,
          this.userId,
          data,
          this.$route.query.store
        );

        if (update.status === 1) {
          return update;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleAddProductInOrder ~ error:", error);
        this.$toast.error("handleAddProductInOrder", error);
      }
    },

    async handleGetOrderDetail(setDataOrder_id) {
      try {
        const response = await this.$sdk.order_graphQL.getOrderDetail(
          setDataOrder_id
        );
        // await this.$store.dispatch(
        //   "getOrderDetail",
        //   setDataOrder_id
        // );

        if (response) {
          const { order, lineItems } = response;

          // Sắp xếp lineItems
          const sortedLineItems = [...lineItems].sort((a, b) => {
            const hasColocationA = a.orderLineItem.customAttributes.some(
              (c) => c.value == "COLOCATION"
            );
            const hasColocationB = b.orderLineItem.customAttributes.some(
              (c) => c.value == "COLOCATION"
            );

            return hasColocationA === hasColocationB
              ? 0
              : hasColocationA
              ? 1
              : -1;
          });

          const updatedLineItems = await Promise.all(
            sortedLineItems.map(async (item) => {
              // Gọi API lấy chi tiết sản phẩm cho mỗi item
              const getDetailProdcut = await this.$sdk.product.getProductById(
                item?.orderLineItem.resourceConfigs[0]
                ?.productId
              );

              // Nếu có dữ liệu chi tiết sản phẩm, gán vào item tương ứng
              if (getDetailProdcut) {
                return { ...item, productDetails: getDetailProdcut }; // Thêm thuộc tính productDetails
              }

              // Nếu không có dữ liệu chi tiết sản phẩm, giữ nguyên item
              return item;
            })
          );

          // Lưu order và lineItems đã sắp xếp vào this.order
          const dataOrder = { order, lineItems: [...updatedLineItems] };
          this.time = {
            data: dataOrder?.lineItems[0]?.orderLineItem?.quantity || "1",
            unitDTO:
              dataOrder?.lineItems[0]?.orderLineItem?.unitType || "THANG",
          };
          this.time_colo = {
            data: dataOrder?.lineItems[1]?.orderLineItem?.quantity || "1",
            unitDTO:
              dataOrder?.lineItems[1]?.orderLineItem?.unitType || "THANG",
          };
          return dataOrder;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetOrderDetail ~ error:", error);
        this.$toast.error("handleGetOrderDetail", error);
      }
    },

    async handleChangesPackageAndTimeRent(
      item,
      data,
      type,
      packageData,
      productId
    ) {
      // console.log(
      //   "🚀 ~ handleChangesPackageAndTimeRent ~ item, data, type, packageData:",
      //   item,
      //   data,
      //   type,
      //   packageData
      // );
      const checkProductInPackage = packageData?.product?.id === productId;
      // console.log(
      //   "🚀 ~ handleChangeOptionRent ~ checkProductInPackage:",
      //   checkProductInPackage
      // );

      if (checkProductInPackage) {
        await this.handleChangeOptionRent(item, data, type, packageData);
      } else {
        // if (type == "product" || type == "colocation") {
        this.time = {
          data: item.time,
          unitDTO: item.unitDTO_id,
        };
        // } else {
        this.time_colo = {
          data: item.time,
          unitDTO: item.unitDTO_id,
        };
        //}
        await this.handleUpdateItemInOrder(
          this.order?.order?.id,
          packageData?.product
        );
        //handleChangeOptionRent(item, data, type, packageData);
      }
    },

    async handleChangeOptionRent(item, data, type, packageData) {
      console.log("🚀 ~ handleChangeOptionRent ~ item:", item);
      try {
        // console.log("this.priceProductRentTime", this.priceProductRentTime);
        // const checkProductByProductId = this.productGroups?.find(
        //   (c) => c?.product?.id == this.productId
        // );
        // console.log(
        //   "🚀 ~ handleChangeOptionRent ~ checkProductByProductId:",
        //   checkProductByProductId
        // );

        const checkTimeInProduct = data?.dataDiscount?.find(
          (c) => c.time == item.time
        );
        // console.log(
        //   "🚀 ~ handleChangeOptionRent ~ checkTimeInProduct:",
        //   checkTimeInProduct
        // );
        if (!checkTimeInProduct) {
          this.handleVisibleMultipleTimeMobile(null, null);
          this.$toast.error(
            `Gói dịch vụ ${data?.title} này chưa được cấu hình ${item.time} ${item.unitDTO_name}`
          );
        } else {
          this.handleVisibleMultipleTimeMobile(null, null);
          this.loadingForm = true;
          //this.rent = item;

          // if (type == "product" || type == "colocation") {
          this.time = {
            data: item.time,
            unitDTO: item.unitDTO_id,
          };
          // } else {
          this.time_colo = {
            data: item.time,
            unitDTO: item.unitDTO_id,
          };
          // }
          console.log(
            "🚀 ~ handleChangeOptionRent ~ this.time:",
            this.time,
            this.time_colo
          );
          const data = [];

          for (let i = 0; i < this.order?.lineItems?.length; i++) {
            // console.log(
            //   "🚀 ~ handleChangeOptionRent ~ this.priceProductRentTime:",
            //   this.priceProductRentTime
            // );
            // console.log(
            //   "🚀 ~ handleChangeOptionRent ~ this.order?.lineItems:",
            //   this.order?.lineItems[i]
            // );
            let camping = this.priceProductRentTime
              .find(
                (c) =>
                  c.id ==
                  this.order?.lineItems[i]?.orderLineItem?.resourceConfigs[0]
                    ?.productId
              )
              ?.data?.find(
                (d) =>
                  d.time == (i == 0 ? this.time?.data : this.time_colo?.data)
              )?.attributes;
            // console.log("🚀 ~ handleChangeOptionRent ~ camping:", camping);

            const pushData = {
              orderItemId: this.order?.lineItems[i]?.orderLineItem?.orderItemId,
              quantity: i == 0 ? this.time?.data : this.time_colo?.data,
              unitType: i == 0 ? this.time?.unitDTO : this.time_colo?.unitDTO,
              price: {
                amount: this.priceProductRentTime
                  .find(
                    (c) =>
                      c.id ==
                      this.order?.lineItems[i]?.orderLineItem
                        ?.resourceConfigs[0]?.productId
                  )
                  ?.data?.find(
                    (d) =>
                      (d.time ==
                        (i == 0 ? this.time?.data : this.time_colo?.data))
                  )?.price,
                currencyCode: "VND",
              },
              campaignId:
                camping?.value == true
                  ? camping?.campain?.find((c) => c.attrName == "CAMPAIN")
                      ?.attrValue
                  : null,
              campaignActionId:
                camping?.value == true
                  ? camping?.campain?.find(
                      (c) => c.attrName == "CAMPAIGN_ACTION"
                    )?.attrValue
                  : null,
            };
            // console.log(
            //   "🚀 ~ handleChangeOptionRent ~ pushData.price.this.priceProductRentTime:",
            //   this.priceProductRentTime
            // );

            data.push(pushData);
          }

          const dataRent = {
            orderID: this.setDataOrder_id,
            useID: this.userId,
            updateItemInputs: data,
          };
          //console.log("🚀 ~ handleChangeOptionRent ~ dataRent:", dataRent)

          const response = await this.$store.dispatch(
            "updateQuantityRentingDisocunt",
            dataRent
          );

          if (response.data.updateQuantityV2 !== null) {
            const responseOrderDetail = await this.handleGetOrderDetail(
              this.setDataOrder_id
            );

            if (responseOrderDetail) {
              this.order = responseOrderDetail;
              this.loadingForm = false;
            }
          }
        }
      } catch (error) {
        this.loadingForm = false;
        console.log("🚀 ~ handleChangeOptionRent ~ error:", error);
        this.$toast.error("handleChangeOptionRent", error);
      }
    },

    validatePayment() {
      if (this.$route.query.type != "giahan") {
        const order = this.order?.lineItems[0];

        const requiredOptions = this.operatingSystems.filter(
          (c) => c.requireData == true
        );
        console.log(
          "🚀 ~ validatePayment ~ this.operatingSystems:",
          requiredOptions
        );

        const orderOptions = order?.orderLineItem?.productOptions ?? [];

        const missingOptionsColo = requiredOptions.filter((c) =>
          c.productFeatureDTOS?.some((d) =>
            this.order?.lineItems?.some(
              (a) =>
                d.productId == a?.orderLineItem?.resourceConfigs?.[0]?.productId
            )
          )
        );

        const missingOptions = requiredOptions.filter(
          (reqOption) =>
            !orderOptions.some(
              (orderOption) => orderOption.idOption === reqOption.id
            )
            //  &&
            // !missingOptionsColo.some(
            //   (coloOption) => coloOption.id === reqOption.id
            // )
        );

        console.log("🚀 ~ validatePayment ~ missingOptions:", missingOptions);

        console.log(
          "🚀 ~ validatePayment ~ missingOptionsColo:",
          missingOptionsColo
        );

        if (missingOptions.length > 0) {
          this.validateOption = missingOptions;
          //console.log("🚀 ~ validatePayment ~ missingOptions:", missingOptions);
          this.$toast.error(
            `Vui lòng chọn ${this.formatMissingNames(missingOptions)}`
          );
        } else {
          this.createFormThanhToan();
        }
      } else {
        this.createFormThanhToan();
      }
    },

    formatMissingNames(options) {
      const names = options.map((option) => option.name);
      if (names.length === 0) return "";
      if (names.length === 1) return names[0];
      if (names.length === 2) return names.join(" và ");
      return names.slice(0, -1).join(", ") + " và " + names[names.length - 1];
    },

    async createFormThanhToan() {
      this.loadingFormSubmit = true;
      this.loadingForm = true;
      this.validateOption = [];

      if (this.order.order.orderStatus == 1) {
        const updateStatus = await this.handleUpdateOrderStatus(
          this.setDataOrder_id,
          "OPEN"
        );
        if (updateStatus) {
          this.$router.push(
            `/thanh-toan/${this.setDataOrder_id}?userId=${
              this.setDataUser_id || this.order.order.ownerPartyId
            }&type=${this.type}${
              this.$route.query.store ? `&store=${this.$route.query.store}` : ""
            }`
          );
        }
      } else {
        this.$router.push(
          `/thanh-toan/${this.setDataOrder_id}?userId=${
            this.setDataUser_id || this.order.order.ownerPartyId
          }&type=${this.type}${
            this.$route.query.store ? `&store=${this.$route.query.store}` : ""
          }`
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.button_submit {
  border-radius: 6px;
  padding: 6px;
  background: #f6f6f6;
  border: 1px solid #44ce6f;
  width: 100px;
  color: #44ce6f;
}
.back-page {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
}

.payment-list-title {
  display: block;
  //text-align: center;
  //padding: 20px 0px 12px;
  font-weight: 600;
  width: 100%;
}

.textPrimary {
  color: #44ce6f;
}

.py-8 {
  padding: 8px 0;
}

.back {
  padding: 32px 0;
  font-size: 20px;
  font-weight: 500;
}

.index {
  z-index: 1;
}

.spinner-3 {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: s3 1s infinite linear;
}

@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}

.send-bottom {
  .btn-send {
    &.active {
      background: #44ce6f;
      border-radius: 6px;
      color: #ffffff;
    }

    background: #ffffff;
    border: 1px solid #44ce6f;
    color: #44ce6f;

    border-radius: 6px;
    padding: 13px 0;
    width: 100%;
    margin: 12px 0;

    &:first-child {
      margin-top: 24px;
    }
  }
}

.send-item {
  // padding-left: 10px;

  .item-info {
    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.5px;
      color: #0e314c;
      margin-bottom: 0;
      margin-top: 24px;
    }

    .send-input {
      background: #ffffff;
      border: 1px solid #e3e8ef;
      border-radius: 6px;
      padding: 5px 10px;
      width: 100%;
    }
  }
}

.is-pc {
  //padding-top: 36px;
}

.price-total {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #44ce6f;
}

.cart-pay {
  display: flex;
  align-items: center;

  .radio-btn {
    width: 18px;
    height: 18px;
    border: #44ce6f 1px solid;
    border-radius: 50%;
    margin-right: 16px;
  }

  background: #ffffff;
  /* 44CE6F 100% */
  padding: 20px;
  border-radius: 6px;
  margin-top: 48px;

  border: 1px solid #44ce6f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.cart-area {
  background-color: #fcfcfd;
}

.is-mobile {
  display: none;
}

// .info-right {
//   width: 50%;
//   svg {
//     width: 20%;
//   }
// }
.remove {
  color: red;
  margin-left: 25px;
  position: relative;
  top: -1px;
  float: right;
}

// .order-item {
//   box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
//   border: 1px solid #e6e6e6;
//   border-radius: 5px;
//   padding: 0 10px;
//   width: 95%;
//   margin: auto;
// }
.order-item__product {
  img {
    min-width: 80px;
    height: 80px;
    object-fit: cover;
    flex-basis: 10%;
  }
}

.order-item__bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.order-product-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

.order-product-item__info {
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.order-product-item__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 10px;
}

.dongia {
  p {
    font-size: 16px;
  }
}

.order-item__btn {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
  padding: 10px;
  justify-content: flex-end;
}

.btn-danger {
  background-color: #f44336;
  /* Red */
}

//responsive mobile  and tablet
@media (max-width: 768px) {
  .w-full-custom {
    width: 100% !important;
  }

  .cart-header {
    padding-bottom: 0px !important;
    height: auto !important;
  }

  .input-counter {
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
  }

  .is-mobile {
    display: block;

    .cart-header {
      label {
        padding-left: 0;
      }
    }
  }

  .is-pc {
    display: none;
  }
}

.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #44ce6f;
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

.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid rgb(22, 179, 100);
  width: 18px;
  height: 18px;
  position: absolute;
  left: 12px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
}

.loader-bg {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -90px;
  background: transparent;
  border-top: 4px solid #03a9f4;
  border-right: 2px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

.logo-bg {
  height: 55px;
  width: 55px;
  background-image: url("~/assets/img/logo-lvs.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -75px;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.loader-payment {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid rgb(22, 179, 100);
  width: 18px;
  height: 18px;
  position: absolute;
  right: 8px;
  top: 7px;
  -webkit-animation: spin 2s linear infinite;
  /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.checkout-action-button {
  padding: 20px 0;
  display: flex;
  justify-content: center;

  .checkout-btn {
    display: flex;
    width: 524px;
    padding: 12px 24px;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #44ce6f;
    color: #fff;
  }
}

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

.title-name {
  &:hover {
    color: #44ce6f;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  height: 100%;
  //92%;
  padding: 12px;
  overflow: hidden;
  gap: 12px;
  background: #ffffff;
  //border: 1px solid #16b364;
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
  .product-body-title {
    padding-top: 5px;
    h3 {
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      // color: #44ce6f;
      cursor: pointer;
      //min-height: 50px;
      //max-height: 50px;
      margin-bottom: 0px;

      padding: 5px 10px;
    }
  }
  .product-body {
    background: white;
    padding-bottom: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .top-card {
      height: 100%;

      .product-body-title {
        h3 {
          font-weight: 500;
          font-size: 18px;
          line-height: 26px;
          text-align: center;
          color: #44ce6f;
          cursor: pointer;
          //min-height: 50px;
          //max-height: 50px;
          margin-bottom: 0px;

          padding: 5px 10px;
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
  .name-option {
    font-weight: 500;
  }
}

.btn-primary-custom {
  text-transform: capitalize;
  border-radius: 0;
  background-color: #44ce6f;
  padding: 8px 30px;
  box-shadow: 5px 5px 5px #a6f5be;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}

.custom_min_height {
  min-height: 120px;
}

.custome_pb_10 {
  padding-bottom: 10px !important;
}

.custome_pt_5 {
  padding-top: 10px !important;
}

.discount-color {
  min-width: 140px;
  padding: 3px 7px;
  //background: #44ce706f;
  border-radius: 8px;
  color: #4caf50;
  border: 1px solid #4caf50;
}

.custom-form-box {
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.custom-span {
  color: red;
  font-size: 12px;
  position: relative;
  bottom: 5px;
}

.custom-radio input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  border: 1px solid #bbb;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  z-index: 2;
}

.custom-radio-active input {
  border: 1px solid #4caf50 !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  z-index: 2;
}

// .custom-radio::before {
//   content: "";
//   width: 15px;
//   height: 15px;
//   border-radius: 50%;
//   background-color: transparent;
//   border: 1px solid #4caf50; /* Màu xanh lá khi được chọn */
//   position: absolute;
//   top: -2px;
//   left: -2px;
//   z-index: 1;
// }

.custom-radio input:checked::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  //border: 1px solid #4caf50 !important;
  background-color: #4caf50;
  /* Màu xanh lá khi được chọn */
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.active-time-rent {
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  border-top-width: 4px !important;
  color: #2bb456;
}

.active-time-rent-bg {
  background-color: rgba(68, 206, 112) !important;
  transition: background-color 0.5s ease;

  .product-body-title {
    h3 {
      color: #fff;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      // color: #44ce6f;
      cursor: pointer;
      //min-height: 50px;
      //max-height: 50px;
      margin-bottom: 0px;

      padding: 5px 10px;
    }
  }
}

.cartTimeRent {
  border: 1px solid #ddd;
  border-top-width: 4px;
  padding: 24px 0;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
  }
}

.active-time-rent-green {
  //background: #5fd2835c;
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  border-top-width: 4px !important;
  // color: #2bb456;
}

.active-payment {
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  //border-top-width: 4px !important;
}

.cartTimeRent {
  border: 1px solid #ddd;
  border-top-width: 4px;
  padding: 24px 0 24px 0;
  cursor: pointer;
  border-radius: 5px;
}

// .cartTimeRent {
//   transition: background 0.3s ease;
//   &:hover {
//     background: #b5ebc65c;
//   }
// }
.disBlock {
  display: none !important;
}

.last-item {
  border-bottom: none !important;
}

.border-dotted-bottom-cumstom {
  border-bottom: 1px dotted #dee2e6 !important;
}

@media (max-width: 768px) {
  .flex-container-custom-reverse {
    display: flex !important;
    flex-flow: column-reverse !important;
    // gap: 0.5rem;
  }

  .w-500 {
    width: 500px !important;
  }

  .flex-container-custom {
    display: flex !important;
    flex-flow: column !important;
    gap: 0.5rem;

    .flex-item-custom {
      padding: 0 !important;
    }
  }

  .item-payment {
    width: 300px !important;
  }

  .disNone {
    display: none !important;
  }

  .disBlock {
    display: block !important;
  }
}
</style>
