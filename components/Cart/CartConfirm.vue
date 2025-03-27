<template>
  <div>
    <div class="index cart">
      <div
        v-if="
          loadingOperatingSystem == true ||
          loadingQuantityRenting == true ||
          loadingCreatePayment == true ||
          loadingBack == true
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
          <div v-if="show == true">
            <ViewPayment
              @handleShow="handleShow"
              :paymentItem="paymentItem"
              :order="order"
              :user="user"
              :transferInfo="transferInfo"
              :show="show"
              :userId="userId"
            />
          </div>
          <!-- :order="order" -->
          <div v-else style="position: relative; color: black !important">
            <div>
              <div class="col-12 d-flex justify-content-center p-0">
                <div
                  class="col-12 col-lg-8 d-flex flex-column justify-content-center p-0"
                >
                  <div
                    class="products-option products-option-relative"
                    style="margin-top: 24px"
                  >
                    <!-- <div class="products-option-back">
                    <div class="products-option-back-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="white"
                          d="m9 18l-6-6l6-6l1.4 1.4L6.8 11H21v2H6.8l3.6 3.6z"
                        />
                      </svg>
                    </div>
                  </div> -->
                    <div
                      class="products-option-title"
                      style="font-weight: 600; text-align: center"
                    >
                      Thông tin khách hàng
                    </div>
                    <div class="flex-container-custom flex-column">
                      <div
                        class="grid-item flex-item-custom"
                        style="color: black !important"
                      >
                        Họ và tên: {{ order?.order?.ownerName }}
                      </div>
                      <div
                        class="grid-item flex-item-custom"
                        style="color: black !important"
                      >
                        Số điện thoại: {{ order?.order?.ownerPhone }}
                      </div>

                      <!-- <a 
                        v-if="!order?.order?.ownerPartyId"
                        :href="`/xac-thuc-thong-tin/${order_id}?redirectUrl=${$route.fullPath}`"
                        class="grid-item flex-item-custom"
                        style="
                          color: #44ce6f !important;
                          text-decoration: underline;
                          cursor: pointer;
                        "
                      >
                        Xác thực thông tin
                      </a> -->
                    </div>
                  </div>
                  <div class="products-option" style="margin-top: 12px">
                    <div
                      class="products-option-title"
                      style="font-weight: 600; text-align: center"
                    >
                      Thông tin đơn hàng
                    </div>
                    <div class="d-flex flex-column gap-2 w-100">
                      <div
                        class="border-bottom d-flex gap-2 flex-column"
                        style="padding-top: 12px; padding-bottom: 12px"
                      >
                        <div
                          class="d-flex flex-column w-100 gap-2"
                          v-for="(cart, index) in order?.lineItems"
                          :key="cart.id"
                          :class="{
                            'last-item': index == order?.lineItems?.length - 1,
                            'border-bottom':
                              index != order?.lineItems?.length - 1,
                            'padding-bottom':
                              index != order?.lineItems?.length - 1
                                ? '10px'
                                : '5px',
                          }"
                        >
                          <div class="d-flex flex-column gap-1">
                            <div style="font-weight: 500">Dịch vụ:</div>
                            <div
                              class="d-flex flex-column w-100"
                              style="
                                gap: 0.5rem;
                                margin-left: 10px;
                                padding-right: 10px;
                              "
                            >
                              <div class="d-flex flex-column gap-2">
                                <div>
                                  {{ cart.orderLineItem.variant.title }}
                                </div>
                              </div>
                              <div class="d-flex justify-content-between">
                                <div>
                                  {{ cart.orderLineItem.quantity }}
                                  {{
                                    allProductUnit?.find(
                                      (c) => c.id == cart.orderLineItem.unitType
                                    )?.name
                                  }}
                                </div>
                                <div>
                                  {{
                                    convertPrice(
                                      cart?.orderLineItem?.variant?.price
                                        ?.amount * cart?.orderLineItem?.quantity
                                    )
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="d-flex flex-column gap-1"
                            v-if="
                              cart?.orderLineItem?.resourceItems?.length > 0
                            "
                          >
                            <div style="font-weight: 500">Tài nguyên:</div>
                            <div
                              class="d-flex flex-column gap-2"
                              style="margin-left: 10px; padding-right: 10px"
                            >
                              <div class="d-flex flex-column gap-2">
                                <div
                                  class="d-flex gap-1"
                                  v-for="resource in cart?.orderLineItem
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
                          <div
                            class="d-flex flex-column gap-1"
                            v-if="cart.orderLineItem?.productOptions"
                          >
                            <div style="font-weight: 500">
                              Thông tin tùy chọn:
                            </div>
                            <div
                              style="margin-left: 10px; padding-right: 10px"
                              v-for="(itemOption, indexOption) in cart
                                .orderLineItem?.productOptions"
                              :key="indexOption"
                            >
                              <div class="d-flex flex-column gap-2 py-1">
                                <template>
                                  <div>
                                    {{ itemOption?.name }}: {{ " " }}
                                    {{
                                      handleFilterData(
                                        cart?.dataProductOption,
                                        itemOption
                                      )
                                    }}
                                  </div>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="border-bottom">
                        <div
                          class="d-flex justify-content-between"
                          style="padding-bottom: 12px"
                        >
                          <div>Tổng cộng:</div>
                          <div>
                            {{ convertPrice(totalCart) }}
                          </div>
                        </div>
                        <div
                          v-if="Vat > 0"
                          class="d-flex justify-content-between"
                          style="padding-bottom: 12px"
                        >
                          <div>VAT:</div>
                          <div>
                            {{ convertPrice(Vat) }}
                          </div>
                        </div>
                      </div>
                      <div
                        class=""
                        style="padding-top: 12px; padding-bottom: 12px"
                      >
                        <div class="d-flex justify-content-between">
                          <div style="font-weight: 600">Tổng thanh toán:</div>
                          <div class="textPrimary" style="font-weight: 600">
                            {{
                              convertPrice(
                                order?.order?.currentTotalPrice?.amount
                              )
                            }}
                            <!-- {{ convertPrice(totalCart + Vat) }} -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="products-option products-option-thongbao"
                    v-if="dataPaymentsByOrders.length > 0"
                  >
                    <div class="products-contents">
                      <h5 class="products-titles">
                        Đơn hàng đang chờ thanh toán
                      </h5>
                      <span class="products-descriptions">
                        Phương thức thanh toán hiện tại của bạn là
                        <span class="method-highlights">
                          {{ dataPaymentsByOrders[0].methodDescription }}
                        </span>
                      </span>
                      <span class="products-descriptions">
                        bạn có thể
                        <span class="method-uppercases">
                          {{ dataPaymentsByOrders[0].methodDescription }} lại
                        </span>
                        hoặc
                        <span class="method-uppercases">
                          chọn phương thức thanh toán khác
                        </span>
                      </span>
                    </div>
                  </div>

                  <div
                    class="products-option"
                    style="margin-top: 12px; margin-bottom: 24px"
                  >
                    <div class="payment-list-title">
                      <span
                        style="
                          font-weight: 600;
                          font-style: normal;
                          font-size: 18px;
                          line-height: 20px;
                        "
                        >Thanh toán</span
                      >
                      <span
                        style="
                          color: red;
                          font-size: 12px;
                          position: relative;
                          bottom: 5px;
                        "
                        >*</span
                      >
                    </div>

                    <div
                      class="payment-list"
                      style="
                        display: flex;
                        flex-flow: column;
                        gap: 4px;
                        width: 100%;
                      "
                    >
                      <div v-for="(item, index) in paymentMethods" :key="index">
                        <div
                          v-if="loadingCreatePayment == false"
                          style="
                            border-radius: 5px;
                            padding: 8px 10px;
                            border: 1px solid #e3e8ef;
                            cursor: pointer;
                            height: 50px;
                            display: flex;
                            align-items: center;
                          "
                          class="item-payment"
                          @click="
                            loadingCreatePayment == false &&
                              checkPaymentOrderIdCasso(item.code)
                          "
                          :class="item?.code == paymentCode && 'active-payment'"
                        >
                          <!-- <input
                              type="radio"
                              :value="item.code"
                              :id="item?.code"
                              v-model="paymentCode"
                              :checked="
                                item?.code == paymentCode ? true : false
                              "
                            /> -->
                          <div
                            class="d-flex"
                            style="gap: 0.5rem; position: relative"
                          >
                            <span style="width: 35px" v-if="item?.image">
                              <img :src="item?.image" />
                              <!-- loadImage(item?.image) -->
                            </span>
                            <span style="display: flex; align-items: center">{{
                              item.description || item.name
                            }}</span>
                            <div
                              class="loader-payment"
                              v-if="
                                loadingCreatePayment && paymentCode == item.code
                              "
                            ></div>
                          </div>
                        </div>
                        <div
                          v-else-if="loadingCreatePayment == true"
                          style="
                            border-radius: 5px;
                            padding: 8px 10px;
                            border: 1px solid #e3e8ef;
                            cursor: pointer;
                            height: 50px;
                            width: 100%;
                            display: flex;
                            align-items: center;
                          "
                          class="item-payment"
                          :class="item?.code == paymentCode && 'active-payment'"
                        >
                          <!-- <input
                              type="radio"
                              :value="item.code"
                              :id="item?.code"
                              v-model="paymentCode"
                              :checked="
                                item?.code == paymentCode ? true : false
                              "
                            /> -->
                          <div
                            class="d-flex w-100 justify-content-between"
                            style="gap: 0.5rem; position: relative"
                          >
                            <div
                              class="d-flex"
                              style="gap: 0.5rem; position: relative"
                            >
                              <span style="width: 35px" v-if="item?.image">
                                <img :src="item?.image" />
                              </span>
                              <span
                                style="display: flex; align-items: center"
                                >{{ item.description || item.name }}</span
                              >
                            </div>
                            <div
                              class="loader-payment"
                              v-if="
                                loadingCreatePayment && paymentCode == item.code
                              "
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        type == 'thue' &&
                        order?.lineItems?.some((item) =>
                          [
                            'THANG',
                            'NAM',
                            'tháng',
                            'năm',
                            'Tháng',
                            'Năm',
                          ].includes(item.orderLineItem.unitType)
                        )
                      "
                      @click="handleBack"
                      style="
                        border-radius: 5px;
                        padding: 8px 10px;
                        border: 1px solid rgb(227, 232, 239);
                        cursor: pointer;
                        height: 50px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        color: white;
                        background: #44ce6f;
                      "
                      class="item-payment"
                    >
                      <div
                        class="d-flex"
                        style="gap: 0.5rem; position: relative"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m9 18l-6-6l6-6l1.4 1.4L6.8 11H21v2H6.8l3.6 3.6z"
                            />
                          </svg>
                        </span>
                        <span style="display: flex; align-items: center">
                          Quay về trang trước
                        </span>
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

<script>
import PageTitle from "../../components/Common/PageTitle";
import Cookies from "js-cookie";
import SVGDelete from "~/assets/img/remove.svg";
import SVGCart2 from "~/assets/img/cart-2.svg";
import SVGCart1 from "~/assets/img/1.svg";
import ViewPayment from "@/components/Checkout/ViewPayment";
import { data } from "~/utils/imagesPayment.js";
import AlreadyPaymentSuccess from "@/components/AlreadyPaymentSuccess";
import ModalVatInfo from "../Modal/ModalVatInfo.vue";
import ModalFullVatInfo from "../Modal/ModalFullVatInfo.vue";
import ModalShortDescription from "@/components/Modal/ModalShortDescription";

export default {
  //name: "Cart",
  props: [
    "order",
    "dataPaymentsByOrders",
  ],
  data() {
    return {
      transferInfo: null,
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
      paymentMethods: [],
      loadingCreatePayment: false,
      loadingOperatingSystem: false,
      loadingQuantityRenting: false,
      idActive: "",
      paymentItem: "",
      selectedSystem: "Chọn hệ điều hành",
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
      loadingBack: false,
      allProductUnit: [],

      dataOptionProduct: [],

      checkChooseVatInfor: "no",
      isBoolean: false,
      dataCookiesRequestBill: {
        companyName: "",
        taxCode: "",
        email: "",
        address: "",
      },

      dataVatInfoUser: [],
      // parsedData: Cookies.get("dataRequestBill")
      //   ? JSON.parse(Cookies.get("dataRequestBill"))
      //   : null,
      isBooleanFull: false,

      dataVatInfoSent: null,

      isOn: false,

      companyName: "",
      taxCode: "",
      representative: "",
      email: "",
      description: "",
      orderId_with_cart: Cookies.get("orderId_with_cart"),
      //order: null,

      openModalShortDes: false,
      dataProduct: null,

      id_anonymous: process.env.ANONYMOUS_ID,
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
  },
  computed: {
    type() {
      return this.$route.query.type || "";
    },
    // transferInfoNew() {
    //   return this.transferInfo;
    // },
    userId() {
      return this.$route.query.userId || "";
    },
    order_id() {
      return this.$route.params.id || "";
    },
    title() {
      return this.demo ? "Đặt hàng thành công" : "Giỏ hàng";
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
    // totalCart() {
    //   if (this.order) {
    //     // return this.order?.lineItems?.reduce((total, lineItem) => {
    //     //   return (
    //     //     total +
    //     //     lineItem.orderLineItem.variant.price?.amount *
    //     //       lineItem.orderLineItem.quantity
    //     //   );
    //     // }, 0);
    //     const value =
    //       //this.quantity
    //       1 *
    //       ((this.rent?.price * this.quantityYearRent > 0
    //         ? this.rent?.price * this.quantityYearRent
    //         : 0) +
    //         (this.productPlace
    //           ? this.findMaxNumberItemByDefaultMaxNumber(this.productPlace)
    //               ?.price *
    //             (this.quantityYearRent > 1 ? this.quantityYearRent : 1)
    //           : 0));
    //     return value || 0;
    //   }
    // },
    Vat() {
      return this.order?.lineItems?.reduce(
        (total, item) => total + (item.orderLineItem?.totalVAT?.amount || 0),
        0
      );
    },
    // VAT() {
    //   if (this.order) {
    //     // return this.order?.lineItems?.reduce((total, lineItem) => {
    //     //   return total + lineItem.orderLineItem.totalVAT?.amount;
    //     // }, 0);
    //     const value =
    //       //this.quantity
    //       (1 *
    //         (this.rent?.price * this.quantityYearRent > 0
    //           ? this.rent?.price * this.quantityYearRent
    //           : 0) *
    //         this.product?.vat) /
    //       100;

    //     return value || 0;
    //   }
    // },
    // VAT_Option() {
    //   const value =
    //     //this.quantity
    //     this.productPlace
    //       ? (1 *
    //           (this.findMaxNumberItemByDefaultMaxNumber(this.productPlace)
    //             ?.price *
    //             (this.quantityYearRent > 1 ? this.quantityYearRent : 1)) *
    //           this.productPlace?.vat || 0) / 100
    //       : 0;
    //   return value || 0;
    // },
    totalOrder() {
      const value =
        //this.quantity
        1 *
          (this.productPlace
            ? this.findMaxNumberItemByDefaultMaxNumber(this.productPlace)
                ?.price *
              (this.quantityYearRent > 1 ? this.quantityYearRent : 1)
            : 0) +
        0 +
        (this.rent?.price * this.quantityYearRent > 0
          ? this.rent?.price * this.quantityYearRent
          : 0) +
        this.VAT +
        this.VAT_Option;
      return value || 0;
    },
    // VAT() {
    //   const value =
    //     (this.quantity * this.product.price * this.product.vat) / 100;

    //   return value || 0;
    // },
    // VAT_Option() {
    //   const value =
    //     (this.quantity *
    //       (this.productPlace.price * this.productPlace.default_quantity) *
    //       this.productPlace.vat || 0) / 100;
    //   return value || 0;
    // },
  },
  mounted() {
    //this.order = { ...this.orderSSR };
    //this.handleUpdateProductOption(this.orderSSR);
    if (this.order?.order?.financialStatus == "PAID") {
      if (this.order?.order?.ownerPartyId) {
        this.$router.push(
          "/ket-qua-thanh-toan/" +
            this.order?.order?.id +
            "?statusCode=0" +
            `&createBy=${this.$route.query.userId}`
        );
      } else {
        this.$router.push(
          "/xac-thuc-thong-tin/" +
            this.order?.order?.id +
            "?statusCode=0" +
            `&createBy=${this.$route.query.userId}`
        );
      }
    }

    this.handleGetServiceID();
    this.getAllProductUnit();

    this.getUser();

    this.getPayments();
  },
  watch: {
    carts: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showLoader = false;
        }
      },
      deep: true,
    },

    show: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.$emit("handleGetPaymentByOrder");
        }
      },
      deep: true,
    },

    // dataVatInfoUser: {
    //   handler(newVal, oldVal) {
    //     if (newVal.length <= 0) {
    //       this.checkChooseVatInfor = "no";
    //       this.isBooleanFull = false;
    //     }
    //   },
    //   deep: true,
    // },

    // dataVatInfo: {
    //   handler(newVal, oldVal) {
    //     if (newVal.length <= 0) {
    //       if (this.dataCookiesRequestBill) {
    //         this.isBoolean = true;
    //       }
    //     }
    //   },
    //   deep: true,
    // },
  },
  methods: {
    async handleShowModal(id) {
      this.loadingCreatePayment = true;
      if (id) {
        const response = await this.handleGetDetailProduct(id);
        this.dataProduct = response;
        this.openModalShortDes = !this.openModalShortDes;
        this.loadingCreatePayment = false;
      } else {
        this.openModalShortDes = !this.openModalShortDes;
        this.loadingCreatePayment = false;
      }
    },

    async handleGetDetailProduct(id) {
      try {
        const response = await this.$store.dispatch("getProductById", {
          id,
          store: this.$route.query.store,
        });

        if (response.data) {
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetDetailProduct ~ error:", error);
        this.$toast.error("handleGetDetailProduct", error);
      }
    },

    // async handleUpdateProductOption(order) {
    //   this.order = { ...order };
    //   console.log("🚀 ~ handleUpdateProductOption ~ this.order:", order);
    //   // Check if lineItems exists before looping through them

    //   for (const item of this.order.lineItems) {
    //     console.log("🚀 ~ handleUpdateProductOption ~ item:", item);

    //     // Ensure productDetails exists and 'qualify' is available before checking its value
    //     if (item?.productDetails?.qualify !== "COLOCATION") {
    //       const productOptions = await this.handleGetProductOption(
    //         item?.orderLineItem?.variant?.id
    //       );

    //       if (productOptions) {
    //         console.log(
    //           "🚀 ~ handleUpdateProductOption ~ productOptions:",
    //           productOptions
    //         );
    //         item.dataProductOption = productOptions; // Update item with fetched product options
    //       }
    //     }
    //   }
    // },
    async handleGetProductOption(id) {
      try {
        const response = await this.$store.dispatch("getProductOptionV2", {
          id,
          store: this.$route.query.store,
        });

        if (response.data.getProductOption) {
          console.log(
            "🚀 ~ handleGetProductOption ~ response.data.getProductOption:",
            response.data.getProductOption
          );
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

          console.log("Updated formattedOptions:", formattedOptions);
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

    handleToggle() {
      this.isOn = !this.isOn;

      if (this.isOn == false) {
        this.removeRequestBill();
      } else {
        if (this.dataVatInfoUser.length > 0) {
          this.handleShowFullVat();
        } else {
          this.selectOption();
        }
      }
    },
    async handleGetVatInvoiceRequestByOrder() {
      try {
        const response = await this.$sdk.payment.getVatInvoiceRequestByOrder(
          this.$route.params.id,
          0,
          50
        );
        if (response) {
          this.dataVatInfoSent = response;
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },

    async handleSentRequsetBill() {
      try {
        const data = {
          partyId: "LONGVAN",
          orderIds: [this.$route.params.id],
          taxCode: this.dataCookiesRequestBill.taxCode,
          company: this.dataCookiesRequestBill.companyName,
          address: this.dataCookiesRequestBill.address,
          receiverEmail: this.dataCookiesRequestBill.email,
        };

        const response = await this.$sdk.payment.createVatInvoiceRequest(
          data,
          this.$route.query.userId
        );

        if (response) {
          this.removeRequestBill();
          await this.handleGetVatInvoiceRequestByOrder();
        }
        //console.log("🚀 ~ handleSentRequsetBill ~ response:", response);
      } catch (error) {
        this.$toast.error(error);
      }
    },

    handleShowFullVat() {
      this.isBooleanFull = !this.isBooleanFull;
    },

    async handleGetVatInfoByOwner() {
      try {
        const response = await this.$sdk.user.getVatInfoByOwnerPartyId(
          this.$route.query.userId
        );
        if (response) {
          this.dataVatInfoUser = response;
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },

    // updateCookiesRequestBill(data) {
    //   this.parsedData = Cookies.get("dataRequestBill")
    //     ? JSON.parse(Cookies.get("dataRequestBill"))
    //     : null;
    //   this.dataCookiesRequestBill = data;
    //   if (!this.parsedData?.id) {
    //     this.checkChooseVatInfor = "yes";
    //   } else {
    //     this.checkChooseVatInfor = "no";
    //   }
    //   this.isBoolean = false;
    // },

    // updateCookiesRequestBillNew(data) {
    //   this.parsedData = Cookies.get("dataRequestBill")
    //     ? JSON.parse(Cookies.get("dataRequestBill"))
    //     : null;
    //   this.dataCookiesRequestBill = data;
    //   if (!this.parsedData?.id) {
    //     this.checkChooseVatInfor = "yes";
    //   } else {
    //     this.checkChooseVatInfor = "no";
    //   }
    //   this.isBoolean = true;
    // },

    // removeRequestBill() {
    //   Cookies.remove("dataRequestBill");
    //   this.parsedData = Cookies.get("dataRequestBill")
    //     ? JSON.parse(Cookies.get("dataRequestBill"))
    //     : null;
    //   this.handleGetVatInfoByOwner();
    //   this.dataCookiesRequestBill = {
    //     companyName: "",
    //     taxCode: "",
    //     email: "",
    //     address: "",
    //   };
    //   this.checkChooseVatInfor = "no";
    //   this.isBoolean = false;
    // },

    selectOption() {
      this.dataCookiesRequestBill = {
        companyName: "",
        taxCode: "",
        email: "",
        address: "",
      };
      this.isBoolean = true;
      Cookies.remove("dataRequestBill");
      // if (this.dataCookiesRequestBill) {
      //   this.isBoolean = !this.isBoolean;
      // } else {
      //   if (this.checkChooseVatInfor == "yes") {
      //     this.checkChooseVatInfor = "no";
      //     this.isBoolean = false;
      //   } else {
      //     this.checkChooseVatInfor = "yes";
      //     this.isBoolean = true;
      //   }
      // }
    },

    //Hàm lọc lấy giá trị từ 1 mảng
    handleFilterData(dataProductOption, productOptions) {
      // console.log("🚀 ~ handleFilterData ~ productOptions:", productOptions)
      console.log("🚀 ~ handleFilterData ~ dataProductOption:", dataProductOption)
      const data = dataProductOption?.find(
        (c) => c.id == productOptions?.idOption
      );
      //console.log("🚀 ~ handleFilterData ~ data:", data)
      if (data?.subType == "INPUT") {
        return productOptions?.value;
      } else {
        const nameProductOption = data?.productFeatureDTOS?.find(
          (d) => d.productId == productOptions?.value
        )?.productName;

        return nameProductOption;
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

    async getProductOptionById(data) {
      this.dataOptionProduct = [];
      const getData = await Promise.all(
        data.map(async (option) => {
          const data = await this.$store.dispatch("getProductById", {
            id: option?.value,
            store: this.$route.query.store,
          });
          if (data.status != 0) {
            this.dataOptionProduct.push({
              optionValue: option?.idOption,
              productData: data.data,
            });
          } else {
            this.dataOptionProduct.push({
              optionValue: option?.idOption,
              productData: {
                title: option?.value,
              },
            });
          }
        })
      );
    },

    async getAllProductUnit() {
      const get = await this.$store.dispatch("getAllProductUnit");
      this.allProductUnit = get?.data;
    },
    handleBack() {
      const originalUrl = window.location.href;
      const queryString = originalUrl.split("?")[1];
      const callbackUserInside = queryString
        ? queryString.split("callbackUserInside=")[1]
        : null;

      this.loadingBack = true;
      if (this.loadingBack) {
        if (callbackUserInside) {
          // Giải mã URL callbackUserInside
          const decodedCallbackUrl = decodeURIComponent(
            callbackUserInside
          ).replace("&", "?");
          const url = new URL(decodedCallbackUrl);

          // Thêm các tham số bổ sung nếu cần (ví dụ: orderID)
          url.searchParams.set("orderID", this.order_id);
          //console.log("🚀 ~ handleBack ~ url:", url);
          // Chuyển hướng đến URL đã giải mã
          window.location.href = url.href;
        } else {
          // Xử lý trường hợp không có callbackUserInside
          this.$router.push(
            `/gio-hang/?orderId=${this.order_id}&type=${this.type}`
          );
        }
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
          this.$route.params.id
        );

        this.serviceId = res.data.getServiceIds[0];
        // if (this.serviceId) {
        //   this.handleGetDetailService();
        // }
        //console.log("this.serviceId", this.serviceId);
      } catch (err) {
        this.$toast.error(err);
      }
    },

    async handleGetDetailService() {
      try {
        // const res = await this.$store.dispatch(
        //   "getServiceDetail",
        //   this.serviceId
        // );
        const res = await this.$sdk.cloud.serviceDetail(this.serviceId);

        if (res) {
          this.serviceDetail = res;
        } else {
          this.$toast.error(res.errors[0].message);
        }
      } catch (err) {
        this.$toast.error(err);
      }
    },

    findMaxNumberItemByDefaultMaxNumber(items) {
      let maxNumberItem = null;

      items?.product_prices?.forEach((item) => {
        if (item.type != "SELL") {
          const number = this.extractNumberByDefaultMaxNumber(item.typeName);
          console.log("number 1111", number);
          if (number == this.maxNumberByDefault) {
            maxNumberItem = item;
          }
        }
      });
      return maxNumberItem;
    },
    extractNumberByDefaultMaxNumber(typeName) {
      //console.log("typeName", typeName);
      const match = typeName?.match(/\d+/);
      //this.quantityYearRent = match ? parseInt(match[0], 10) : 0;
      return match ? parseInt(match[0], 10) : 0;
    },
    hanldeClickPayment(item) {
      this.paymentCode = item;
      // console.log("paymentCode", this.paymentCode);
      // console.log("item", item);
    },

    async handleGetProductOSCategory() {
      this.$store.commit("setLoading", true);
      const get = await this.$sdk.product.getProductOption(
        this.product?.id,
        this.$route.query.store
      );
      // Thay vì sử dụng .find(), chúng ta sẽ lặp qua mảng get và xử lý từng object trong mảng
      const formattedOptions = get.map((data) => {
        return {
          id: data.id,
          name: data.name,
          productFeatureDTOS: data.productFeatureDTOS.reduce(
            (result, feature) => {
              feature.productOptionGroupItemDTOS.forEach((item) => {
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
          subType: data.subType,
        };
      });

      //console.log("formattedOptions", formattedOptions);
      this.operatingSystems = formattedOptions;
      this.$store.commit("setLoading", false);
    },
    async handleGetProductCollection() {
      this.$store.commit("setLoading", true);
      const get = await this.$store.dispatch("getProductById", {
        id: this.product?.productAttributes?.find(
          (c) => c.attributeName == "COLOCATION"
        )?.attributeValue,
        store: this.$route.query.store,
      });
      this.productPlace = get.data;

      console.log("productPlace", this.productPlace);
      this.$store.commit("setLoading", false);
    },

    goBack() {
      this.$router.go(-1); // Quay lại một trang trong lịch sử duyệt
    },

    async checkPaymentOrderIdCasso(paymentCode) {
      try {
        this.loadingCreatePayment = true;
        this.disable = true;

        // if (
        //   this.isOn == true &&
        //   (!this.dataCookiesRequestBill.address ||
        //     !this.dataCookiesRequestBill.companyName ||
        //     !this.dataCookiesRequestBill.email ||
        //     !this.dataCookiesRequestBill.taxCode)
        // ) {
        //   return this.$toast.error(
        //     "Vui lòng tạo mẫu hoặc chọn mẫu xuất hóa đơn."
        //   );
        // } else if (this.isOn == true) {
        //   const isValid = await this.$refs.observer.validate();
        //   if (!isValid) {
        //     return this.$toast.error(
        //       "Vui lòng kiểm tra lại yêu cầu xuất hóa đơn."
        //     );
        //   }
        // }
        // console.log(
        //   "🚀 ~ checkPaymentOrderIdCasso ~ this.dataCookiesRequestBill:",
        //   this.dataCookiesRequestBill
        // );
        // if (
        //   this.isOn == true &&
        //   this.dataVatInfoSentBefore.content.length <= 0 &&
        //   this.dataCookiesRequestBill
        // ) {
        //   await this.handleSentRequsetBill();
        // }

        const id = this.$route.params.id;
        const response = await this.$sdk.paymentLV.paymentsByOrders([id]);
        //console.log("🚀 ~ checkPaymentOrderIdCasso ~ response:", response);

        // Lọc các paymentIdCasso
        const responseIdCasso = response?.filter((c) => c.statusCode == 1);

        if (responseIdCasso.length > 0) {
          // Nếu có các paymentIdCasso, thực hiện hủy bỏ trước
          await this.cancelAllPayments(responseIdCasso);
        }

        // Sau khi hủy tất cả paymentIdCasso hoặc không có paymentIdCasso, gọi createPayment
        await this.createPayment(paymentCode);
      } catch (error) {
        console.log("🚀 ~ checkPaymentOrderIdCasso ~ error:", error);
      } finally {
        this.loadingCreatePayment = false;
        this.disable = false;
      }
    },

    async cancelAllPayments(paymentList) {
      // Thực hiện các thao tác hủy bỏ cho tất cả các paymentId
      for (const payment of paymentList) {
        try {
          await this.handleCancelPayment(payment.paymentId);
        } catch (error) {
          console.log("🚀 ~ cancelAllPayments ~ error:", error);
          // Xử lý lỗi nếu cần
        }
      }
    },

    async handleCancelPayment(paymentId) {
      try {
        const response = await this.$sdk.paymentLV.cancelPayment(
          paymentId,
          "Tạo thanh toán lại",
          this.$store.getters.getUser?.partyId
            ? this.$store.getters.getUser?.partyId
            : this.userId
        );
        // Có thể kiểm tra phản hồi nếu cần
      } catch (error) {
        console.log("🚀 ~ handleCancelPayment ~ error:", error);
      }
    },

    async createPayment(paymentCode) {
      const hostname = window.location.origin;
      const id = this.$route.params.id;

      this.paymentCode = paymentCode;
      //this.idActive = paymentId;
      const data = {
        orderId: id,
        paymentMethod: paymentCode,
        returnUrl: this.order?.order?.ownerPartyId
          ? hostname + "/ket-qua-thanh-toan/" + id
          : hostname + "/xac-thuc-thong-tin/" + id,
        //`${process.env.USER_INSIDE_URL}/order/detail?id=${id}`,
        //hostname + "/ket-qua-thanh-toan/" + id,
        createBy: this.user.id ? this.user.id : this.userId,
        store: this.$route.query.store,
      };

      const dataPreFillment = {
        orderID: id,
        useID: this.user.id ? this.user.id : this.userId,
      };

      try {
        if (
          this.order?.lineItems?.some((item) =>
            ["THANG", "NAM", "tháng", "năm", "Tháng", "Năm"].includes(
              item.orderLineItem.unitType
            )
          )
        ) {
          const resPreFillment = await this.$store.dispatch(
            "preFillment",
            dataPreFillment
          );

          if (resPreFillment.data.preFillment == true) {
            const resPM = await this.$store.dispatch(
              "createPaymentOrder",
              data
            );
            //console.log("resPM", resPM);
            if (
              resPM.data.createPaymentOrder != null &&
              resPM.data.createPaymentOrder.code == 0
            ) {
              //console.log("resOrder", resOrder.data.orderDetail);

              const containsHttp =
                resPM.data.createPaymentOrder.data.includes("http");
              if (containsHttp) {
                window.location.href = resPM.data.createPaymentOrder.data;
              } else {
                const resOrder = await this.$store.dispatch(
                  "getOrderDetail",
                  id
                );

                if (resOrder.data.orderDetail != null) {
                  const res = await this.$sdk.paymentLV.paymentsByOrders([id]);
                  const responseIdtransfer = res?.filter(
                    (c) => c.methodTypeCode == "transfer" && c.statusCode == 1
                  );
                  if (responseIdtransfer) {
                    // console.log(
                    //   "🚀 ~ createPayment ~ responseIdtransfer:",
                    //   responseIdtransfer
                    // );
                    const response = await this.$sdk.paymentLV.getTransferInfo(
                      responseIdtransfer[0]?.paymentId,
                      this.$route.query.store
                    );

                    if (response) {
                      this.transferInfo = response;
                      this.order = resOrder.data.orderDetail;
                      this.loadingCreatePayment = false;
                      this.paymentItem = resPM.data.createPaymentOrder;
                      this.show = true;
                    }
                  }
                }
              }
            } else {
              this.loadingCreatePayment = false;
              this.disable = false;
              this.$toast.error(resPM.errors[0].message);
            }
          } else {
            this.loadingCreatePayment = false;
            this.$toast.error(resPreFillment.errors[0].message);
          }
        } else {
          const resPM = await this.$store.dispatch("createPaymentOrder", data);
          //console.log("resPM", resPM);
          if (
            resPM.data.createPaymentOrder != null &&
            resPM.data.createPaymentOrder.code == 0
          ) {
            //console.log("resOrder", resOrder.data.orderDetail);

            const containsHttp =
              resPM.data.createPaymentOrder.data.includes("http");
            if (containsHttp) {
              window.location.href = resPM.data.createPaymentOrder.data;
            } else {
              const resOrder = await this.$store.dispatch("getOrderDetail", id);

              // if (resOrder.data.orderDetail != null) {
              //   this.order = resOrder.data.orderDetail;
              //   this.loadingCreatePayment = false;
              //   this.paymentItem = resPM.data.createPaymentOrder;
              //   this.show = true;
              // }

              if (resOrder.data.orderDetail != null) {
                const res = await this.$sdk.paymentLV.paymentsByOrders([id]);
                const responseIdtransfer = res?.filter(
                  (c) => c.methodTypeCode == "transfer" && c.statusCode == 1
                );
                if (responseIdtransfer) {
                  const response = await this.$sdk.paymentLV.getTransferInfo(
                    responseIdtransfer[0]?.paymentId,
                    this.$route.query.store
                  );

                  if (response) {
                    this.transferInfo = response;
                    this.order = resOrder.data.orderDetail;
                    this.loadingCreatePayment = false;
                    this.paymentItem = resPM.data.createPaymentOrder;
                    this.show = true;
                  }
                }
              }
            }
          } else {
            this.loadingCreatePayment = false;
            this.disable = false;
            this.$toast.error(resPM.errors[0].message);
          }
        }
      } catch (error) {
        this.loadingCreatePayment = false;
        this.disable = false;
        this.$toast.error(error);
      }
    },

    loadImage(img) {
      return require(`~/assets/imgPayment/${img}`);
    },
    async getPayments() {
      //const res = await this.$store.dispatch("getPaymentDetail");
      const res = await this.$sdk.paymentLV.getPaymentMethodTypes(
        this.$route.query.store
      );
      //console.log("🚀 ~ getPayments ~ res:", res);
      //this.paymentMethods = res.data.getPaymentMethod;

      if (res.length > 0) {
        this.paymentMethods = res;
      }
    },

    async getUser() {
      // // const token = Cookies.get("token")
      if (this.userId) {
        const res = await this.$store.dispatch(
          "getPersonByPartyId",
          this.userId
        );
        this.user = res.data.getPersonByPartyId;
        // const data = JSON.parse(Cookies.get("authInfo"));
        // this.user.fullName = data.fullName;
        // this.user.phone = data.phone;
        // this.user.email = data.email;
      } else {
        const data = {
          fullName: this.order?.order?.ownerName,
          phone: this.order?.order?.ownerPhone,
          email: this.order?.order?.ownerEmail,
        };
        this.user = data;
      }
    },

    async getDetailProduct(id) {
      this.$store.commit("setLoading", true);
      const res = await this.$store.dispatch("getProductById", {
        id,
        store: this.$route.query.store,
      });
      console.log("res", res);
      this.product = res.data;

      if (this.product) {
        // if (
        //   this.product?.productAttributes?.find(
        //     (c) => c.attributeName == "OS_CATEGORY"
        //   )
        // ) {
        //   console.log(
        //     "vào rồi",
        //     this.product?.productAttributes?.find(
        //       (c) => c.attributeName == "OS_CATEGORY"
        //     )?.attributeValue
        //   );
        //   this.handleGetProductOSCategory();
        // }
        this.handleGetProductOSCategory();

        if (
          this.product?.productAttributes?.find(
            (c) => c.attributeName == "COLOCATION"
          )
        ) {
          this.handleGetProductCollection();
        }
        this.getSortProductPrices();
        this.findMaxNumberItem(this.product);
        this.$store.commit("setLoading", false);
      }
    },
    extractNumber(typeName) {
      //console.log("typeName", typeName);
      const match = typeName?.match(/\d+/);
      //this.quantityYearRent = match ? parseInt(match[0], 10) : 0;
      return match ? parseInt(match[0], 10) : 0;
    },
    findMaxNumberItem(items) {
      let maxNumber = -Infinity; // Khởi tạo giá trị maxNumber là âm vô cùng
      let maxNumberItem = null;

      items?.product_prices?.forEach((item) => {
        if (item.type != "SELL" && item.store_id == this.$config.STORE_ID) {
          const number = this.extractNumber(item.typeName);

          if (this.order?.lineItems[0]?.orderLineItem?.quantity != 1) {
            if (number == this.order?.lineItems[0]?.orderLineItem?.quantity) {
              this.quantityYearRent = number;
              // maxNumber = number;
              maxNumberItem = item;
            }
          } else {
            if (number == 1) {
              this.quantityYearRent = number;
              // maxNumber = number;
              maxNumberItem = item;
            }
          }
        }
      });
      this.rent = maxNumberItem;
      console.log("maxNumberItem", maxNumberItem);
      //return maxNumberItem;
    },

    getSortProductPrices() {
      // Hàm trích xuất số từ chuỗi
      const extractNumber = (str) => {
        const match = str?.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };

      this.product.product_prices.sort((a, b) => {
        const numA = extractNumber(a.typeName);
        const numB = extractNumber(b.typeName);

        // Sắp xếp tăng dần
        return numA - numB;
      });
      this.sortProductPrices = this.product.product_prices;
      // return this.product.product_prices;
      // Log mảng đã sắp xếp nếu bạn cần
      //console.log("product_prices", this.product.product_prices);
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
      const id = this.$route.params.id;
      const res = await this.$store.dispatch("getOrderDetail", id);
      this.order = res.data.orderDetail;
      //console.log("this.order", this.order);
      if (this.order?.lineItems?.length > 0) {
        this.getDetailProduct(
          this.order?.lineItems[0]?.orderLineItem.variant.id
        );
        //this.handleGetProductOSCategory();
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
  background-color: #f44336; /* Red */
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

.send-item {
  margin-bottom: 8px;
  .send-err {
    color: red;
  }
  .item-info {
    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.5px;
      color: #0e314c;
      margin-bottom: 0;
      // margin-top: 24px;
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

.btn-send {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
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
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid rgb(22, 179, 100);
  width: 18px;
  height: 18px;
  position: absolute;
  left: 12px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
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
  -webkit-animation: spin 2s linear infinite; /* Safari */
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

/* .products-option-relative {
  position: relative;
}

.products-option-back {
  position: absolute;
  top: 0;
  left: 0;
}

.products-option-back-item {
  border-radius: 50%;
  padding: 10px;
  width: 30px;
  height: 30px;
  background: #44ce6f;

  display: flex;
  align-items: center;
} */

.products-option-thongbao {
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  background-color: rgba(239, 190, 190, 0.45); /* #efbebe73 */
  display: flex; /* Đảm bảo hiển thị flex */
}

.products-contents {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
}

.products-titles {
  font-weight: bold;
}

.products-descriptions {
  color: black; /* Thay đổi màu sắc nếu cần */
}

.method-highlights {
  color: red;
  font-weight: bold;
}

.method-uppercases {
  font-weight: bold;
  text-transform: uppercase;
}

.text-hover {
  cursor: pointer;
  color: rgb(22, 179, 100);
  &:hover {
    text-decoration: underline;
  }
}

.payment-list {
  display: flex;
  flex-flow: column;
  gap: 4px;
  width: 100%;
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
  width: 7px;
  height: 7px;
  border-radius: 50%;
  //border: 1px solid #4caf50 !important;
  background-color: #4caf50; /* Màu xanh lá khi được chọn */
  position: absolute;
  top: 52%;
  left: 52%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.active-time-rent {
  //background: #5fd2835c;
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  border-top-width: 4px !important;
  color: #2bb456;
}

.active-payment {
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  //border-top-width: 4px !important;
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
.item-payment {
  border-radius: 5px;
  padding: 8px 10px;
  border: 1px solid #e3e8ef;
  cursor: pointer;
  height: 50px;
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
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
    width: 100% !important;
  }

  .disNone {
    display: none !important;
  }

  .disBlock {
    display: block !important;
  }
}
</style>
