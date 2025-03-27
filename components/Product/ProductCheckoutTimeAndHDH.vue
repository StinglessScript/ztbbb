<template>
  <div class="index cart">
    <div
      v-if="
        loadingForm == true ||
        loadingOperatingSystem == true ||
        loadingQuantityRenting == true ||
        loadingCreatePayment == true
      "
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
            :class="
              (serviceDetail && serviceDetail?.service?.status == 'CREATED') ||
              serviceDetail == null
                ? ''
                : 'justify-content-center'
            "
            style="padding-top: 30px !important; padding-bottom: 30px"
          >
            <div
              class="col-12 col-md-12"
              v-if="
                (serviceDetail &&
                  serviceDetail?.service?.status == 'CREATED') ||
                serviceDetail == null
              "
            >
              <div>
                <div class="row justify-content-center gap-1 gap-lg-0">
                  <div class="col-lg-8 col-md-8">
                    <div
                      class="cart-items border-bottom"
                      style="min-height: 452px; padding-bottom: 24px"
                    >
                      <div class="row" style="padding-bottom: 24px">
                        <div style="font-weight: 600; padding-bottom: 12px">
                          <!-- Sản phẩm liên quan -->
                          {{
                            displayedProducts[0]?.qualify?.replace(/_/g, " ")
                          }}
                        </div>
                        <div
                          v-for="item in displayedProducts"
                          class="col-lg-4 col-md-6 col-sm-6 pt-2"
                        >
                          <div
                            style="height: 100%; width: 100%"
                            @click="
                              handleUpdateItemInOrder(
                                order?.order?.id,
                                order?.lineItems[0]?.orderLineItem?.id,
                                item
                              )
                            "
                          >
                            <!-- productId = item.id -->
                            <div
                              class="product-card cartTimeRent mb-0"
                              :class="
                                productId == item.id
                                  ? 'active-time-rent active-time-rent-bg'
                                  : ''
                              "
                              style="padding: 1px; gap: 5px"
                            >
                              <div class="product-body-title">
                                <h3>
                                  {{ item.title }}
                                </h3>
                              </div>
                              <div
                                class="product-body"
                                style="
                                  padding-left: 16px;
                                  padding-right: 16px;
                                  padding-top: 5px;
                                  border: 1px solid white;
                                  border-radius: 6px;
                                "
                              >
                                <div class="top-card">
                                  <div class="product-body-description">
                                    <p
                                      class="description-content"
                                      v-html="item.shortDescription"
                                    ></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- Nút "Xem thêm" -->
                        <div
                          v-if="
                            productGroups.length > 3 &&
                            visibleCount < productGroups.length
                          "
                          class="col-12 text-center my-3 checkout-btn"
                        >
                          <button
                            @click="showMore"
                            class="btn btn-primary-custom"
                            style="border-radius: 6px"
                          >
                            Xem thêm
                          </button>
                        </div>

                        <!-- Nút "Rút gọn" -->
                        <div
                          v-if="visibleCount > 3"
                          class="col-12 text-center my-3 checkout-btn"
                        >
                          <button
                            @click="showLess"
                            class="btn btn-primary-custom"
                            style="border-radius: 6px"
                          >
                            Rút gọn
                          </button>
                        </div>
                      </div>

                      <div class="row">
                        <template v-for="(item, index) in operatingSystems">
                          <div
                            class="col-lg-6 col-12"
                            v-if="
                              item?.subType == null || item?.subType == 'SELECT'
                            "
                          >
                            <ProductOS
                              :value="checkIdProductOption(item)"
                              :operatingSystems="item"
                              :checkQualify="checkQualify"
                              :product="product"
                              :selectedSystem="selectedSystem"
                              :loadingOperatingSystem="loadingOperatingSystem"
                              @handleChangeOptionSystem="
                                handleChangeOptionSystem
                              "
                              :index="index"
                              :widthSelect="100"
                            />
                          </div>
                          <div
                            class="col-lg-6 col-12"
                            v-if="item?.subType == 'INPUT'"
                          >
                            <ProductInput
                              :value="checkIdProductOption(item)"
                              :operatingSystems="item"
                              :checkQualify="checkQualify"
                              :product="product"
                              :selectedSystem="selectedSystem"
                              :loadingOperatingSystem="loadingOperatingSystem"
                              @handleChangeOptionSystem="
                                handleChangeOptionSystem
                              "
                              :index="index"
                              :widthSelect="100"
                            />
                          </div>
                        </template>
                      </div>

                      <div style="padding-bottom: 10px; padding-top: 10px">
                        <div class="footer-card">
                          <div class="sub-title-card">
                            <div style="font-weight: 600; padding-bottom: 12px">
                              Thời gian cho thuê
                              <span class="custom-span">*</span>
                            </div>
                          </div>
                          <div
                            class="d-flex justify-content-between"
                            style="width: 100%"
                          >
                            <div
                              class="d-md-grid d-flex flex-column justify-content-center custom-form-box"
                            >
                              <div
                                class=""
                                v-for="item in sortProductPrices"
                                :key="item.id"
                              >
                                <div
                                  class="cartTimeRent custom_min_height"
                                  :class="[
                                    item?.id == rent?.id && 'active-time-rent',
                                    item?.priceDiscount > 0 && 'custome_pb_10',
                                  ]"
                                  @click="
                                    loadingQuantityRenting == false &&
                                      handleChangeOptionRent(item)
                                  "
                                >
                                  <div
                                    class="d-flex gap-2 custom-radio justify-content-evenly"
                                    :class="
                                      item?.id == rent?.id &&
                                      'custom-radio-active'
                                    "
                                  >
                                    <input
                                      type="radio"
                                      :value="item"
                                      :id="item?.id"
                                      v-model="rent"
                                      :checked="
                                        item?.id == rent?.id ? true : false
                                      "
                                    />
                                    <div
                                      class="d-flex justify-content-center align-items-center flex-column"
                                      style="font-weight: 600"
                                    >
                                      <span :for="item?.id"
                                        >Thuê {{ item?.time }}
                                        {{ item?.unitDTO_name }}</span
                                      >
                                      <span class="price-color d-flex gap-2">
                                        {{
                                          convertPrice(parseInt(item?.price))
                                        }}
                                        / {{ item?.unitDTO_name }}
                                      </span>
                                    </div>
                                    <span style="width: 14px"></span>
                                  </div>
                                  <div
                                    v-if="item?.priceDiscount > 0"
                                    class="d-flex justify-content-center w-100 custome_pt_5 text-center"
                                  >
                                    <div class="discount-color">
                                      <span>Tiết kiệm</span>
                                      <span>{{
                                        convertPrice(
                                          parseInt(
                                            item?.priceDiscount * item?.time
                                          )
                                        )
                                      }}</span>
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
                  <div class="col-lg-4 col-md-4 d-flex gap-1 flex-column">
                    <template>
                      <div
                        class="cart-items text-center"
                        style="height: auto; padding: 18px 20px"
                      >
                        Xin chào khách hàng
                        <span style="font-weight: 600; color: #44ce6f">{{
                          user.fullName
                        }}</span>
                        đã đến với dịch vụ
                        <span style="font-weight: 600; color: #44ce6f"
                          >Long Vân Systems</span
                        >
                      </div>
                    </template>
                    <div class="cart-items" style="min-height: 200px">
                      <div style="font-weight: 600; padding-bottom: 12px">
                        Thông tin chi tiết
                      </div>
                      <div
                        class="d-flex flex-column gap-2"
                        style="border-bottom: 1px dotted #dee2e6"
                        v-if="order?.lineItems"
                      >
                        <div
                          v-for="(item, index) in order?.lineItems"
                          :key="index"
                        >
                          <div class="d-flex justify-content-between py-1">
                            <div class="d-flex flex-column gap-2">
                              <template
                                v-if="item?.orderLineItem?.variant?.title"
                              >
                                <div
                                  class="d-flex gap-1 title-name"
                                  style="cursor: pointer"
                                  @click="
                                    index == 0 &&
                                      handleShowModal(
                                        item?.orderLineItem?.variant?.id
                                      )
                                  "
                                >
                                  <div style="font-size: 14px">
                                    {{
                                      formattedText(
                                        item?.orderLineItem?.variant?.title
                                      )
                                    }}
                                  </div>
                                </div>
                              </template>
                              <div
                                style="color: #2bb456; font-weight: 600"
                                v-if="index == 0"
                              >
                                <span style="font-size: 12px">x</span
                                >{{ item?.orderLineItem?.quantity }}
                                {{
                                  allProductUnit?.find(
                                    (c) => c.id == item.orderLineItem.unitType
                                  )?.name
                                }}
                              </div>
                            </div>
                            <div
                              class="d-flex flex-column align-items-end"
                              :class="
                                rent?.priceDiscount > 0 &&
                                item?.orderLineItem?.variant?.id == product?.id
                                  ? 'justify-content-between'
                                  : 'justify-content-end'
                              "
                            >
                              <div style="color: #2bb456; font-weight: 600">
                                {{
                                  convertPrice(
                                    item?.orderLineItem?.variant?.price
                                      ?.amount * rent?.time
                                  )
                                }}
                              </div>
                            </div>
                          </div>
                          <span
                            v-if="
                              product.id == item?.orderLineItem?.variant?.id &&
                              (product.shortDescription ||
                                product.short_description)
                            "
                            @click="
                              handleShowModal(item?.orderLineItem?.variant?.id)
                            "
                            style="
                              color: #44ce6f;
                              font-size: 14px;
                              text-decoration: underline;
                              cursor: pointer;
                            "
                            >Xem chi tiết</span
                          >
                        </div>
                        <div
                          class="d-flex justify-content-between w-full"
                          v-if="rent?.priceDiscount > 0"
                        >
                          <div
                            class="d-flex gap-1 title-name"
                            style="cursor: pointer"
                          >
                            <div style="font-size: 14px">Trước khi giảm</div>
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
                        </div>

                        <div
                          v-for="(itemOption, indexOption) in dataOptionProduct"
                          :key="indexOption"
                        >
                          <div class="d-flex flex-column gap-2 py-1">
                            <template
                              v-if="
                                handleFilterData(
                                  operatingSystems,
                                  itemOption?.optionValue,
                                  'name'
                                ) && itemOption?.productData?.title
                              "
                            >
                              <div>
                                {{
                                  handleFilterData(
                                    operatingSystems,
                                    itemOption?.optionValue,
                                    "name"
                                  )
                                }}: {{ " " }}
                                {{
                                  formattedText(itemOption?.productData?.title)
                                }}
                              </div>
                            </template>
                          </div>
                        </div>
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
                          style="padding: 15px 0 0 0 !important"
                        >
                          <div
                            class="btn btn-primary checkout-btn"
                            style="
                              width: 524px;
                              padding: 12px 24px;
                              cursor: default;
                            "
                            v-if="
                              loadingOperatingSystem && loadingQuantityRenting
                            "
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
                            @click="validatePayment"
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
  </div>
</template>
<style lang="scss">
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
  width: 14px;
  height: 14px;
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
<script>
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

export default {
  //name: "Cart",
  props: ["order", "setDataOrder_id", "setDataUser_id", "setDataType"],
  data() {
    return {
      user: {},
      name: "",
      phone: "",
      email: "",
      note: "",
      carts: null,
      products: {},
      parsedobj: null,
      product: {},
      productParse: {},
      items: [],
      idOp: [],
      id: null,
      toggle: false,
      demo: false,
      showLoader: true,
      loading: false,
      orderId: "",
      isNextStep: false,
      //order: {},
      quantity: 1,
      paymentMethods: [],
      loadingForm: false,
      loadingCreatePayment: false,
      loadingOperatingSystem: false,
      loadingQuantityRenting: false,
      idActive: "",
      paymentItem: "",
      selectedSystem: "",
      operatingSystems: [],
      sortProductPrices: [],
      rent: null,
      quantityYearRent: 1,
      productPlace: null,
      paymentCode: null,
      selectOptionSystem: null,
      maxNumberByDefault: 1,
      disable: false,
      serviceId: null,
      serviceDetail: null,
      show: false,
      moneyProductQuantityPromotionAction: [],
      customTime: [],
      allProductUnit: [],
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

      idProductOption: null,

      dataOptionProduct: [],

      openModalShortDes: false,
      dataProduct: {},
      productGroups: [],

      productId: null,
      visibleCount: 3,

      priceProductRentTime: [],
    };
  },

  components: {
    SVGDelete,
    SVGCart2,
    SVGCart1,
    PageTitle,
    ViewPayment,
    AlreadyPaymentSuccess,
  },
  computed: {
    type() {
      return this.setDataType || "";
    },
    userId() {
      return this.setDataUser_id || "";
    },
    title() {
      return this.demo ? "Đặt hàng thành công" : "Giỏ hàng";
    },
    totalCartByMua() {
      return this.order?.lineItems?.reduce(
        (total, item) =>
          total + (item.orderLineItem?.variant?.price?.amount || 0),
        0
      );
    },
    totalCart() {
      return this.order?.lineItems?.reduce(
        (total, item) =>
          total +
          item.orderLineItem?.variant?.price?.amount *
            item.orderLineItem?.quantity,
        0
      );
    },
    VatByMua() {
      return this.order?.lineItems?.reduce(
        (total, item) => total + (item.orderLineItem?.totalVAT?.amount || 0),
        0
      );
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
    totalOrder() {
      const value =
        (this.type == "thue"
          ? this.productPlace?.price
            ? this.productPlace?.price
            : 0
          : 0) +
        (this.product?.price ? this.product?.price : 0) +
        (this.VAT ? this.VAT : 0) +
        (this.type == "thue" ? (this.VAT_Option ? this.VAT_Option : 0) : 0);
      return value || 0;
    },

    displayedProducts() {
      // Trả về các sản phẩm hiện đang được hiển thị
      return this.productGroups?.slice(0, this.visibleCount);
    },
  },
  mounted() {
    this.loadingForm = true;

    // if (this.orderProps) {
    //   this.order = this.orderProps;
    // }

    this.getAllProductUnit();

    this.handleGetServiceID();

    this.getUser();
    if (this.order?.lineItems?.length > 0) {
      this.getDetailProduct(this.order?.lineItems[0]?.orderLineItem.variant.id);

      if (this.order?.lineItems[0]?.orderLineItem?.productOptions?.length > 0) {
        this.getProductOptionById(
          this.order?.lineItems[0]?.orderLineItem?.productOptions
        );
      }
    }

    const dataColllection = this.order?.lineItems?.find((item) =>
      item.orderLineItem.customAttributes?.find(
        (attr) => attr.value == "COLOCATION"
      )
    );

    if (dataColllection) {
      // Thực hiện hành động nếu có ít nhất một item có 'COLOCATION'
      this.handleGetProductCollection(dataColllection);
    }

    if (this.$store.getters.getUser) {
      this.user = this.$store.getters.getUser;
    }
  },
  // watch: {
  //   carts: {
  //     handler(newVal, oldVal) {
  //       if (newVal !== oldVal) {
  //         this.showLoader = false;
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    async handleUpdateItemInOrder(orderId, orderItemId, product) {
      this.customTime = [];
      this.sortProductPrices = [];
      this.priceProductRentTime = [];
      this.rent = null;
      const stempOrder = this.order;
      const dataProductOptions = (
        stempOrder?.lineItems[0]?.orderLineItem?.productOptions || []
      ).map(({ __typename, ...rest }) => rest);

      try {
        if (this.order?.lineItems[0]?.orderLineItem.variant.id == product?.id) {
          return;
        }

        this.loadingOperatingSystem = true;
        this.productId = product?.id;
        this.product = product;
        this.customTime =
          product?.unitDTO?.name?.toLowerCase() == "tháng"
            ? this.customTimeMonth
            : this.customTimeYear;

        // Chờ cho getDataProductQuantityPromotionAction hoàn tất
        await this.getDataProductQuantityPromotionAction(
          product,
          this.customTime
        );

        // Tiếp tục với các thao tác khác sau khi đã hoàn thành getDataProductQuantityPromotionAction
        console.log("🚀 ~ handleUpdateItemInOrder ~ this.rent:", this.rent);

        const response = await this.$sdk.order.deleteProductInOrderWithoutLogin(
          orderId,
          orderItemId,
          "đổi gói sản phẩm khác",
          this.userId
        );

        if (response.status == 1) {
          const data = [
            {
              quantity: this.quantityYearRent,
              gift: false,
              parent_id: null,
              product_id: product?.id,
              input_price: this.priceProductRentTime
                ?.find((c) => c.id == product?.id)
                ?.data?.find((d) => d?.time == this.quantityYearRent)?.price,
              discount_amount: 0,
            },
          ];
          const update = await this.$sdk.order.addProductInOrderWithoutLogin(
            orderId,
            this.userId,
            data
          );

          if (update.status == 1) {
            const resOrder = await this.$store.dispatch(
              "getOrderDetail",
              this.setDataOrder_id
            );

            const { order, lineItems } = resOrder.data.orderDetail;

            // Sắp xếp lineItems
            const sortedLineItems = lineItems.sort((a, b) => {
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

            // Lưu order và lineItems đã sắp xếp vào this.order
            const dataOrder = { order, lineItems: sortedLineItems };

            const dataColllection = dataOrder?.lineItems?.find((item) =>
              item.orderLineItem.customAttributes?.find(
                (attr) => attr.value == "COLOCATION"
              )
            );

            if (dataColllection) {
              // Thực hiện hành động nếu có ít nhất một item có 'COLOCATION'
              this.handleGetProductCollection(dataColllection);
            }

            if (dataOrder != null) {
              this.handleUpdateOperatingSystem(
                dataOrder?.lineItems[0]?.orderLineItem?.id,
                dataProductOptions
              );
              this.moneyProductQuantityPromotionAction = [];
              this.getOrderDetail();
              this.loadingOperatingSystem = false;
            }
          }
        }
      } catch (error) {
        this.loadingOperatingSystem = false;
        console.log("🚀 ~ handleUpdateItemInOrder ~ error:", error);
        this.$toast.error("handleUpdateItemInOrder", error);
      }
    },
    showMore() {
      this.visibleCount += 3; // Tăng số lượng sản phẩm hiển thị lên 2
    },
    showLess() {
      this.visibleCount = 3; // Rút gọn về 2 sản phẩm
      const selectedProduct = this.productGroups.find(
        (item) => item.id == this.productId
      );
      if (selectedProduct) {
        this.productGroups = this.productGroups.filter(
          (item) => item.id != this.productId
        );
        this.productGroups.unshift(selectedProduct);
      }
    },
    async handleGetProductGroup(item) {
      try {
        const param = {
          group: item.groups[0].id,
          display: "PUBLIC",
          subType: "CONFIG,SIMPLE,VARIABLE",
          status: "ON_SELL",
        };
        const data = await this.$sdk.product.getProducts(param);
        // console.log("🚀 ~ handleGetProductGroup ~ data:", data);
        const formatData = data?.data;
        const sortData = formatData.filter((item) => item.priceType == "RENT");

        this.productGroups = [...sortData].sort((a) =>
          a.id == this.productId ? -1 : 1
        );
      } catch (error) {
        console.log("🚀 ~ handleGetProductGroup ~ error:", error);
        this.$toast.error("getServiceIdFromOrderId", error);
      }
    },

    checkIdProductOption(item) {
      const data =
        this.order?.lineItems[0]?.orderLineItem?.productOptions?.find(
          (c) => c.idOption == item?.id
        );

      return data;
    },
    //lấy data sản phẩm theo id
    async handleDataByProductID(id) {
      const data = await this.$sdk.product.getProductById(id);
      this.dataProduct = data;
      if (this.dataProduct) {
        this.openModalShortDes = !this.openModalShortDes;
      }
    },

    async handleShowModal(id) {
      if (id) {
        this.handleDataByProductID(id);
      } else {
        this.openModalShortDes = !this.openModalShortDes;
      }
    },

    //Hàm lọc lấy giá trị từ 1 mảng
    handleFilterData(array1, data, value) {
      if (array1.length > 0) {
        const res = array1?.find((c) => c?.id == data);
        if (res) {
          //console.log("array1, data, value", array1, data, value, res[value])
          return res[value];
        }
      }
    },

    //lấy sản phẩm theo id tử productOption
    async getProductOptionById(data) {
      console.log("🚀 ~ getProductOptionById ~ data:", data);
      this.dataOptionProduct = [];

      if (this.dataOptionProduct.length === 0) {
        await Promise.all(
          data.map(async (option) => {
            const response = await this.$store.dispatch(
              "getProductById",
              {
                id: option?.value,
                store: this.$route.query.store
              }
            );
            const productData =
              response.status !== 0 ? response.data : { title: option?.value };

            // Kiểm tra xem optionValue đã tồn tại chưa
            if (
              !this.dataOptionProduct.some(
                (item) => item.optionValue === option?.idOption
              )
            ) {
              this.dataOptionProduct.push({
                optionValue: option?.idOption,
                productData,
              });
            }
          })
        );
      }
    },
    // lấy data getOrderLineItem khâu lấy sản phẩm option (os,...)
    async getDataOrderLineItem() {
      try {
        const { order } = this;
        if (
          order &&
          order.lineItems[0]?.orderLineItem?.productOptions?.length > 0
        ) {
          const dataOption = await Promise.all(
            order.lineItems[0].orderLineItem.productOptions.map(
              async (option) => {
                const data = {
                  orderId: this.setDataOrder_id,
                  productId: option.value,
                };
                const {
                  data: { getOrderLineItem },
                } = await this.$store.dispatch("getOrderLineItem", data);
                return getOrderLineItem;
              }
            )
          );
          //console.log("dataOption", dataOption);
        }
      } catch (error) {
        console.error("Error in getDataOrderLineItem:", error);
        // Xử lý lỗi tại đây, ví dụ: hiển thị thông báo cho người dùng
      }
    },

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

    async getAllProductUnit() {
      const get = await this.$store.dispatch("getAllProductUnit");
      this.allProductUnit = get?.data;
    },
    findMaxNumberItem(items) {
      let maxNumber = -Infinity; // Khởi tạo giá trị maxNumber là âm vô cùng
      let maxNumberItem = null;

      items?.forEach((item) => {
        if (this.order?.lineItems[0]?.orderLineItem?.quantity != 1) {
          if (item.time == this.order?.lineItems[0]?.orderLineItem?.quantity) {
            this.quantityYearRent = item?.time;
            // maxNumber = number;
            maxNumberItem = item;
          }
        } else {
          if (item.time == 1) {
            this.quantityYearRent = item?.time;
            // maxNumber = number;
            maxNumberItem = item;
          }
        }
      });
      this.rent = maxNumberItem;
      //console.log("maxNumberItem", maxNumberItem);
      //return maxNumberItem;
    },
    async getDataProductQuantityPromotionAction(product, customTime) {
      try {
        this.moneyProductQuantityPromotionAction = [];
        const res = await this.$store.dispatch(
          "searchProductQuantityPromotionAction",
          product?.id
        );

        if (res.data.searchProductQuantityPromotionAction) {
          // this.sortProductPrices = newItem;
          this.moneyProductQuantityPromotionAction =
            res.data.searchProductQuantityPromotionAction[product?.id];
          this.getSortProductPrices(
            product,
            customTime,
            this.moneyProductQuantityPromotionAction
          );
        }
      } catch (error) {
        //this.$toast.error("searchProductQuantityPromotionAction", error);
        console.log("searchProductQuantityPromotionAction", error);
      }
    },
    async handleShow() {
      this.show = false;
      this.paymentCode = null;
    },
    async handleGetServiceID() {
      try {
        const res = await this.$store.dispatch(
          "getServiceIdFromOrderId",
          this.setDataOrder_id
        );

        this.serviceId = res.data.getServiceIds[0];
        if (this.serviceId) {
          this.handleGetDetailService();
        }
        //console.log("this.serviceId", this.serviceId);
      } catch (err) {
        this.$toast.error("getServiceIdFromOrderId", err);
      }
    },

    async handleGetDetailService() {
      try {
        //const res = await this.$sdk.cloud.serviceDetail(this.serviceId);
        const res = await this.$store.dispatch(
          "getServiceDetail",
          this.serviceId
        );
        if (res) {
          this.serviceDetail = res.data.serviceDetail;
        } else {
          this.$toast.error("getServiceDetail", res.errors[0].message);
        }
      } catch (err) {
        this.$toast.error("getServiceDetail", err);
      }
    },

    hanldeClickPayment(item) {
      this.paymentCode = item;
      // console.log("paymentCode", this.paymentCode);
      // console.log("item", item);
    },
    handleChangeOptionRent(item) {
      this.rent = item;
      this.extractNumberFromTypeName(item);
      console.log("this.rent", this.rent);
    },

    extractNumberFromTypeName(time) {
      this.quantityYearRent = time.id;
      //this.handleUpdateQuantityRenting(time);
      this.handleUpdateQuantityRentingDiscount(this.order);
    },
    async handleGetProductOSCategory() {
      //const get = await this.$sdk.product.getProductOption(this.product?.id);
      const get = await this.$store.dispatch(
        "getProductOptionV2",
        this.product?.id
      );

      // Thay vì sử dụng .find(), chúng ta sẽ lặp qua mảng get và xử lý từng object trong mảng
      const formattedOptions = get.data.getProductOption.map((data) => {
        return {
          id: data.id,
          name: data.name,
          productFeatureDTOS: data.productFeatureDTOS.reduce(
            (result, feature) => {
              feature?.productOptionGroupItemDTOS?.forEach((item) => {
                result.push({
                  id: item.id,
                  productId: item.productId,
                  productName: item.productName,
                  price: item.price,
                });
              });
              return result;
            },
            []
          ),
          requireData: data.requireData,
          subType: data.subType,
        };
      });

      //console.log("get", formattedOptions);
      this.operatingSystems = formattedOptions;
    },

    async handleGetProductCollection(dataColllection) {
      console.log(
        "🚀 ~ handleGetProductCollection ~ dataColllection:",
        dataColllection?.orderLineItem?.variant?.id
      );
      this.customTime = [];
      const get = await this.$store.dispatch(
        "getProductById",
        {
          id: dataColllection?.orderLineItem?.variant?.id,
          store: this.$route.query.store
        }
      );

      this.productPlace = get.data;
      console.log(
        "🚀 ~ handleGetProductCollection ~ this.productPlace:",
        this.productPlace
      );
      this.customTime =
        this.productPlace?.unitDTO?.name?.toLowerCase() == "tháng"
          ? this.customTimeMonth
          : this.customTimeYear;
      //this.getSortProductPrices();
      //this.getDataProductQuantityPromotionAction(this.product?.id);
      this.getDataProductQuantityPromotionAction(
        this.productPlace,
        this.customTime
      );
    },
    handleChangeOptionSystem(item, id, name, index, type) {
      if (item && id && name) {
        //console.log("item, id, name",item, id, name)
        this.selectOptionSystem = item;
        const jsonAll = [];

        if (
          this.order?.lineItems[0]?.orderLineItem?.productOptions?.some(
            (option) => option.idOption == id
          )
        ) {
          const json = {
            idOption: id,
            name: name,
            value: this.selectOptionSystem,
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
            value: this.selectOptionSystem,
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
      }
      //console.log("this.selectOptionSystem", this.selectOptionSystem);
    },
    goBack() {
      this.$router.go(-1); // Quay lại một trang trong lịch sử duyệt
    },

    // Cập nhật ProductOption
    async handleUpdateOperatingSystem(orderLineItemId, jsonAll) {
      try {
        // const json = [
        //   { idOption: id, name: name, value: this.selectOptionSystem }
        // ]

        const dataOptionSystem = {
          id: orderLineItemId
            ? orderLineItemId
            : this.order?.lineItems[0]?.orderLineItem?.id,
          productOptionId: jsonAll,
          useID: this.userId,
        };
        this.loadingOperatingSystem = true;
        // const res = await this.$store.dispatch(
        //   "updateOperatingSystem",
        //   dataOptionSystem
        // );

        const res = await this.$store.dispatch(
          "updateProductOptionOrderLineItem",
          dataOptionSystem
        );

        if (res.data.updateProductOptionOrderLineItem == true) {
          this.order = null;
          const resOrder = await this.$store.dispatch(
            "getOrderDetail",
            this.setDataOrder_id
          );
          //console.log("resOrder", resOrder.data.orderDetail);
          if (resOrder.data.orderDetail != null) {
            this.loadingOperatingSystem = false;
            const { order, lineItems } = resOrder.data.orderDetail;

            // Sắp xếp lineItems
            const sortedLineItems = lineItems.sort((a, b) => {
              const hasColocationA = a.orderLineItem.customAttributes.some(
                (c) => c.value == "COLOCATION"
              );
              const hasColocationB = b.orderLineItem.customAttributes.some(
                (c) => c.value == "COLOCATION"
              );

              return hasColocationA == hasColocationB
                ? 0
                : hasColocationA
                ? 1
                : -1;
            });

            // Lưu order và lineItems đã sắp xếp vào this.order
            this.order = { order, lineItems: sortedLineItems };
            //this.order = resOrder.data.orderDetail;
            if (
              this.order.lineItems[0].orderLineItem.productOptions?.length > 0
            ) {
              this.getProductOptionById(
                this.order.lineItems[0].orderLineItem.productOptions
              );
            }
          } else {
            this.loadingOperatingSystem = false;
            this.$toast.error("getOrderDetail", resOrder.errors[0].message);
          }
          //this.handlePreFillment();
        }
        // else {
        //   this.loadingOperatingSystem = false;
        //   this.$toast.error(
        //     "updateProductOptionOrderLineItem",
        //     res.errors[0].message
        //   );
        // }
      } catch (error) {
        console.log("🚀 ~ handleUpdateOperatingSystem ~ error:", error);
        this.loadingOperatingSystem = false;
        this.$toast.error("handleUpdateOperatingSystems", error);
      }
    },

    //Phát sinh dịch vụ
    async handlePreFillment() {
      try {
        const dataPreFillment = {
          orderID: this.setDataOrder_id,
          useID: this.userId,
        };

        const resPreFillment = await this.$store.dispatch(
          "preFillment",
          dataPreFillment
        );

        if (resPreFillment.data.preFillment == true) {
          this.loadingOperatingSystem = false;
        } else {
          this.loadingOperatingSystem = false;
          this.$toast.error("preFillment", resPreFillment.errors[0].message);
        }
      } catch (error) {
        this.loadingOperatingSystem = false;
        this.$toast.error("preFillment", error);
      }
    },

    //Cập nhật thời gian thuê
    async handleUpdateQuantityRentingDiscount(resOrder) {
      try {
        const data = [];
        // console.log(
        //   "🚀 ~ handleUpdateQuantityRentingDiscount ~ this.order?.lineItems:",
        //   resOrder?.lineItems,
        //   this.product?.id,
        //   this.productPlace?.id
        // );

        for (let i = 0; i < resOrder?.lineItems?.length; i++) {
          const pushData = {
            orderItemId: resOrder?.lineItems[i]?.orderLineItem?.orderItemId,
            quantity: this.rent?.time,
            unitType: this.rent?.unitDTO_id,
            price: {
              amount: this.priceProductRentTime
                .find(
                  (c) =>
                    c.id == resOrder?.lineItems[i]?.orderLineItem?.variant?.id
                )
                ?.data?.find((d) => d.time == this.rent?.time)?.price,
              // resOrder?.lineItems[i]?.orderLineItem?.variant?.id ==
              // this.product?.id
              //   ? this.product?.price - this.rent?.priceDiscount
              //   : resOrder?.lineItems[i]?.orderLineItem?.variant?.id ==
              //     this.productPlace?.id
              //   ? this.productPlace?.price - this.rent?.priceDiscount
              //   : resOrder?.lineItems[i]?.orderLineItem?.variant?.price
              //       ?.amount,
              currencyCode: "VND",
            },
          };

          data.push(pushData);
        }

        const dataRent = {
          orderID: this.setDataOrder_id,
          // productID: this.quantityYearRent,
          useID: this.userId,
          //unitType: item ? item?.unitDTO_id : "THANG",
          updateItemInputs: data,
        };
        // console.log(
        //   "🚀 ~ handleUpdateQuantityRentingDiscount ~ dataRent:",
        //   dataRent
        // );
        //console.log("data", pushData);
        this.loadingQuantityRenting = true;
        const res2 = await this.$store.dispatch(
          "updateQuantityRentingDisocunt",
          dataRent
        );
        if (res2.data.updateQuantityV2 !== null) {
          this.getOrderDetail();
        } else {
          this.loadingQuantityRenting = false;
          this.$toast.error(
            "handleUpdateQuantityRentingDiscount",
            res2.errors[0].message
          );
        }
      } catch (error) {
        console.log("🚀 ~ handleUpdateQuantityRentingDiscount ~ error:", error);
        this.$toast.error("handleUpdateQuantityRentingDiscount", error);
      }
    },

    createFormThanhToan() {
      this.loadingOperatingSystem = true;
      this.loadingQuantityRenting = true;

      if (this.loadingOperatingSystem && this.loadingQuantityRenting) {
        this.$router.push(
          `/thanh-toan/${this.setDataOrder_id}?userId=${this.setDataUser_id}&type=${this.type}`
        );
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

    validatePayment() {
      const hasValues =
        !!this.order?.lineItems[0]?.orderLineItem?.productOptions?.every(
          (option) => option.value != null && option.value !== ""
        );
      const checkRequireData = this.operatingSystems.filter(
        (c) => c.requireData == true
      );
      //console.log("🚀 ~ validatePayment ~ checkRequireData:", checkRequireData);

      const productOptions =
        this.order?.lineItems[0]?.orderLineItem?.productOptions ?? [];

      const hasRequiredValues = checkRequireData.every((requireItem) =>
        productOptions.some(
          (productOption) =>
            productOption.idOption == requireItem.id && productOption.value
        )
      );
      // console.log(
      //   "🚀 ~ validatePayment ~ hasRequiredValues:",
      //   hasRequiredValues
      // );
      if (this.operatingSystems.length > 0) {
        if (hasRequiredValues) {
          if (hasValues != true) {
            this.$toast.error("Vui lòng chọn đầy đủ các options");
          } else {
            this.createFormThanhToan();
          }
        } else {
          this.$toast.error("Vui lòng chọn đầy đủ các option");
        }
      } else {
        this.createFormThanhToan();
      }
    },

    loadImage(img) {
      return require(`~/assets/imgPayment/${img}`);
    },
    async getPayments() {
      const res = await this.$store.dispatch("getPaymentDetail");
      //this.paymentMethods = res.data.getPaymentMethod;

      if (res.data.getPaymentMethod.length > 0) {
        // this.paymentCode = res.data.getPaymentMethod.find(
        //   (c) => c.code == "casso"
        // )?.code;

        const combinedArray = res.data.getPaymentMethod.map((item1) => ({
          ...item1,
          ...data.find((item2) => item2.code == item1.code),
        }));

        this.paymentMethods = combinedArray;
      }
    },

    async getUser() {
      // const token = Cookies.get("token")
      const res = await this.$store.dispatch("getPersonByPartyId", this.userId);
      this.user = res.data.getPersonByPartyId;
    },

    async getDetailProduct(id) {
      this.customTime = [];
      this.productId = id;
      const res = await this.$store.dispatch("getProductById", {
        id,
        store: this.$route.query.store
      });
      //console.log("res", res);
      this.product = res.data;
      // console.log("🚀 ~ getDetailProduct ~ this.product:", this.product);

      if (this.product) {
        this.customTime =
          this.product?.unitDTO?.name?.toLowerCase() == "tháng"
            ? this.customTimeMonth
            : this.customTimeYear;
        this.findMaxNumberItem(this.customTime);
        this.getDataProductQuantityPromotionAction(
          this.product,
          this.customTime
        );
        this.handleGetProductGroup(this.product);
        this.handleGetProductOSCategory();
        // if (
        //   this.product?.productAttributes?.find(
        //     (c) => c.attributeName == "COLOCATION"
        //   )
        // ) {
        //   this.handleGetProductCollection();
        // }
        //this.getSortProductPrices();
        // this.findMaxNumberItem(this.customTime);
      }
    },
    extractNumber(typeName) {
      //console.log("typeName", typeName);
      const match = typeName?.match(/\d+/);
      //this.quantityYearRent = match ? parseInt(match[0], 10) : 0;
      return match ? parseInt(match[0], 10) : 0;
    },

    getSortProductPrices(
      product,
      customTime,
      moneyProductQuantityPromotionAction
    ) {
      // console.log("🚀 ~ getSortProductPrices ~ customTime:", customTime);
      // console.log("🚀 ~ getSortProductPrices ~ product:", product?.price);
      this.loadingForm = true;
      this.rent = null;

      // Tạo bản sao của customTime
      const timeRent = JSON.parse(JSON.stringify(customTime));

      // Tính toán data từ timeRent
      const data = timeRent?.map((c) => {
        const maxPercentDiscount = Math.max(
          ...moneyProductQuantityPromotionAction
            ?.filter((d) => d?.minimumQuantity === c?.time)
            .map((item) => item?.percentDiscount || 0),
          0
        );

        const totalDiscount = (product?.price * maxPercentDiscount) / 100;
        const totalAfterDiscount = (product?.price || 0) - totalDiscount;

        return {
          ...c,
          price: totalAfterDiscount || 0,
          priceDiscount: totalDiscount || 0,
          unitDTO_id: this.product?.unitDTO?.id,
          unitDTO_name: this.product?.unitDTO?.name,
        };
      });

      if (this.priceProductRentTime.length == 0) {
        this.priceProductRentTime.push({ id: product.id, data: [...data] });
        this.sortProductPrices = this.priceProductRentTime.find(
          (c) => c.id == product.id
        )?.data;
        this.rent = this.sortProductPrices.find(
          (c) => c.time == this.quantityYearRent
        );
      } else {
        if (!this.priceProductRentTime?.some((item) => item.id == product.id)) {
          this.priceProductRentTime.push({ id: product.id, data: [...data] });

          const matchData = this.priceProductRentTime.reduce((acc, curr) => {
            curr.data.forEach((item) => {
              const existing = acc.find((x) => x.time === item.time);
              if (existing) {
                existing.price += item.price;
                existing.priceDiscount += item.priceDiscount;
              } else {
                acc.push({ ...item });
              }
            });
            return acc;
          }, []);

          console.log("🚀 ~ matchData ~ matchData:", matchData);

          this.sortProductPrices = matchData;
          this.rent = this.sortProductPrices.find(
            (c) => c.time == this.quantityYearRent
          );
        }
      }

      // console.trace("🚀 ~ this.sortProductPrices:", this.sortProductPrices);
      this.loadingForm = false;
    },
    goto(refName) {
      let element = this.$refs[refName];
      let top = element.offsetTop;
      window.scrollTo(0, top + 300);
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

    async getOrderDetail() {
      try {
        const id = this.setDataOrder_id;
        const res = await this.$store.dispatch("getOrderDetail", id);
        const { order, lineItems } = res.data.orderDetail;

        // Sắp xếp lineItems
        const sortedLineItems = lineItems.sort((a, b) => {
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

        // Lưu order và lineItems đã sắp xếp vào this.order
        this.order = { order, lineItems: sortedLineItems };

        if (this.order?.lineItems?.length > 0) {
          this.getDetailProduct(
            this.order?.lineItems[0]?.orderLineItem.variant.id
          );

          if (
            this.order?.lineItems[0]?.orderLineItem?.productOptions?.length > 0
          ) {
            this.getProductOptionById(
              this.order?.lineItems[0]?.orderLineItem?.productOptions
            );
          }
        }

        this.loadingQuantityRenting = false;
      } catch (error) {
        console.log("🚀 ~ getOrderDetail ~ error:", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
  padding-top: 36px;
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
</style>

<style lang="scss" scoped>
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
</style>
