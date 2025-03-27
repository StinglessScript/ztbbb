<template>
  <div class="index cart">
    <div class="cart-area">
      <div class="container">
        <div class="row">
          <div>
            <div class="container-fluid mt-100">
              <div class="row">
                <div class="col-md-12">
                  <div class="card-body cart">
                    <div class="col-sm-12 text-center" v-if="order">
                      <div
                        class="page-title-area"
                        style="padding-top: 50px; padding-bottom: 50px"
                      >
                        <div class="d-table">
                          <div class="d-table-cell">
                            <div class="container">
                              <h1>Giỏ hàng</h1>
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
                      <div
                        class="blog-area"
                        style="padding-top: 20px; padding-bottom: 40px"
                      >
                        <div
                          style="
                            border-top-left-radius: 1.125rem;
                            border-top-right-radius: 1.125rem;
                            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
                            background: #fff;
                            margin-top: 12px;
                            border-top: 3px solid #44ce6f
                          "
                        >
                          <div
                            class="d-flex flex-column gap-2"
                            style="padding-left: 5px; padding-right: 5px"
                          >
                            <div
                              class="d-flex flex-column gap-2"
                              style="
                                padding-top: 24px;
                                padding-bottom: 12px;
                                padding-left: 24px;
                                padding-right: 24px;

                                border-bottom: 1px dotted rgb(179, 175, 175);
                              "
                            >
                              <div
                                class="d-flex gap-2"
                                style="
                                  width: 100%;
                                  justify-content: space-between;
                                "
                              >
                                <div style="font-weight: 600">
                                  #{{ order?.order?.id }}
                                </div>
                                <div class="d-flex gap-3">
                                  <div class="d-flex gap-1">
                                    <div style="font-weight: 600">
                                      Trạng thái:
                                    </div>
                                    <div>
                                      <template
                                        v-if="order?.order?.orderStatus == 20"
                                      >
                                        <div
                                          :class="
                                            convertFinancialStatus(
                                              order?.order?.financialStatus
                                            )?.class
                                          "
                                        >
                                          {{
                                            convertFinancialStatus(
                                              order?.order?.financialStatus
                                            )?.title
                                          }}
                                        </div>
                                      </template>
                                      <template v-else>
                                        <div
                                          :class="
                                            convertOrderStatus(
                                              order?.order?.orderStatus
                                            )?.class
                                          "
                                        >
                                          {{
                                            convertOrderStatus(
                                              order?.order?.orderStatus
                                            )?.title
                                          }}
                                        </div>
                                      </template>
                                    </div>
                                  </div>
                                  <div class="d-flex gap-1">
                                    <div style="font-weight: 600">Ngày đặt</div>
                                    <div>
                                      {{
                                        convertTime(order?.order?.createdStamp)
                                      }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div></div>
                            </div>
                            <div style="padding-top: 15px; padding-bottom: 15px; display: flex; flex-direction: column; gap: 1rem;">
                              <div
                                v-for="(item, index) in order?.lineItems"
                                :key="index"

                                :style="{
                                  'border-bottom': `${index + 1 < order?.lineItems?.length ? '1px dotted rgb(179, 175, 175)' : 'none'}`,
                                  'padding-bottom': `${index + 1 < order?.lineItems?.length ? '15px' : '0px'}`
                                }"
                              >
                                <div class="d-flex gap-4">
                                  <div class="col-1" style="padding: 0px 0px 0px 10px;">
                                    <div
                                      class="d-flex"
                                      style=""
                                    >
                                      <div style="width: 82px; height: 82px">
                                        <img
                                          v-if="getImage(item?.productDetails)"
                                          :src="getImage(item?.productDetails)"
                                          style="
                                            width: 100%;
                                            height: 100%;
                                            border-radius: 5px;
                                            margin: 0;
                                            object-fit: cover;
                                          "
                                        />
                                        <img
                                          v-else
                                          src="~/assets/img/No data-cuate.png"
                                          style="
                                            width: 100%;
                                            height: 100%;
                                            border-radius: 5px;
                                            margin: 0;
                                          "
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-11" style="padding: 0px 20px 0px 0px;">
                                    <div
                                      class="d-flex flex-column gap-2 justify-content-center align-items-start"
                                      style="
                                        padding-top: 10px;
                                        margin-right: 25px;
                                      "
                                    >
                                      <div
                                        style="
                                          font-size: 16px;
                                          font-weight: 500;
                                        "
                                      >
                                        {{ item?.productDetails?.title }}
                                      </div>
                                      <!-- <small>{{
                                        convertPrice(
                                          item?.productDetails?.price
                                        )
                                      }}</small> -->
                                      <div
                                        class="d-flex justify-content-between align-items-center"
                                        style="width: 100%"
                                      >
                                        <div>
                                          {{
                                            item?.productDetails?.priceType ==
                                            "RENT"
                                              ? "Thuê"
                                              : "Bán"
                                          }}
                                          {{ item?.orderLineItem?.quantity }}
                                          {{
                                            item?.productDetails?.unitDTO?.name
                                          }}
                                        </div>
                                        <div
                                          class="d-flex gap-4 justify-content-between align-items-center"
                                        >
                                          <div
                                            class="d-flex gap-2 align-items-center"
                                          >
                                            <del
                                              style="color: #ccc"
                                              v-if="
                                                item?.orderLineItem?.variant
                                                  ?.unitPrice?.amount !=
                                                item?.orderLineItem?.variant
                                                  ?.price?.amount
                                              "
                                            >
                                              {{
                                                convertPrice(
                                                  item?.orderLineItem?.variant
                                                    ?.unitPrice?.amount
                                                )
                                              }}
                                            </del>
                                            <div
                                              style="
                                                color: #44ce6f;
                                                font-weight: 500;
                                                font-size: 16px;
                                              "
                                            >
                                              {{
                                                convertPrice(
                                                  item?.orderLineItem?.variant
                                                    ?.price?.amount
                                                )
                                              }}
                                            </div>
                                          </div>
                                          <div
                                            class="d-flex gap-2 align-items-center"
                                          >
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="28"
                                              height="28"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                fill="#44ce6f"
                                                d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m3.1 5.07c.14 0 .28.05.4.16l1.27 1.27c.23.22.23.57 0 .78l-1 1l-2.05-2.05l1-1c.1-.11.24-.16.38-.16m-1.97 1.74l2.06 2.06l-6.06 6.06H7.07v-2.06z"
                                              />
                                            </svg>
                                            <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              width="24"
                                              height="24"
                                              viewBox="0 0 26 26"
                                            >
                                              <g fill="none">
                                                <defs>
                                                  <mask
                                                    id="pepiconsPopTimesCircleFilled0"
                                                  >
                                                    <path
                                                      fill="#fff"
                                                      d="M0 0h26v26H0z"
                                                    />
                                                    <g fill="#000">
                                                      <path
                                                        d="M10.172 17.243a1 1 0 1 1-1.415-1.415l7.071-7.07a1 1 0 1 1 1.415 1.414z"
                                                      />
                                                      <path
                                                        d="M8.757 10.172a1 1 0 0 1 1.415-1.415l7.07 7.071a1 1 0 1 1-1.414 1.415z"
                                                      />
                                                    </g>
                                                  </mask>
                                                </defs>
                                                <circle
                                                  cx="13"
                                                  cy="13"
                                                  r="13"
                                                  fill="red"
                                                  mask="url(#pepiconsPopTimesCircleFilled0)"
                                                />
                                              </g>
                                            </svg>
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
                        <div
                          style="
                            border-bottom-left-radius: 0.125rem;
                            border-bottom-right-radius: 0.125rem;
                            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
                            background: #fff;
                            padding-top: 25px;
                            padding-bottom: 25px;
                            padding-left: 5px;
                            padding-right: 5px;
                          "
                        >
                          <div class="d-flex" style="border-top: 1px dotted rgb(179, 175, 175); padding-top: 20px;">
                            <div class="col-9"></div>
                            <div class="col-3">
                              <div class="d-flex flex-column gap-3">
                                <div class="d-flex gap-2">
                                  <div class="d-flex align-items-center" style="font-weight: 500; min-width: 140px">
                                    Tổng tiền (chưa VAT):
                                  </div>
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
                                </div>
                                <div class="d-flex gap-2">
                                  <div class="d-flex align-items-center" style="font-weight: 500 ;min-width: 140px">VAT:</div>
                                  <div>
                                    {{
                                      convertPrice(
                                        order?.lineItems?.reduce(
                                          (total, item) =>
                                            total +
                                            (item.orderLineItem?.totalVAT
                                              ?.amount || 0),
                                          0
                                        )
                                      )
                                    }}
                                  </div>
                                </div>
                                <div class="d-flex gap-2">
                                  <div class="d-flex align-items-center" style="font-weight: 500; min-width: 140px">Thành tiền:</div>
                                  <div style="font-weight: 500; color: #44ce6f">
                                    {{
                                      convertPrice(
                                        order?.order?.currentTotalPrice?.amount
                                      )
                                    }}
                                  </div>
                                </div>
                                <div>Thanh toán</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 text-center" v-else>
                      <img
                        src="~/assets/img/No data-cuate.png"
                        width="260"
                        height="260"
                        class="img-fluid"
                      />
                      <h4>
                        <strong
                          >Không có sản phẩm nào trong giỏ hàng của bạn</strong
                        >
                      </h4>
                      <a 
                        href="/cua-hang"
                        class="btn btn-primary cart-btn-transform m-3"
                        data-abc="true"
                        >Tiếp tục mua hàng</a
                      >
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
</template>

<script>
import { formatDate } from "../../utils/dateUtils";

export default {
  name: "Cart",

  props: ["order"],

  data() {
    return {
      imageSrc: "~/assets/img/No data-cuate.png",
    };
  },

  mounted() {},

  methods: {
    convertTime(data) {
      return formatDate(data);
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
    getImage(item) {
      return item?.featuredImage || item?.images?.[0];
    },
    convertFinancialStatus(id) {
      let status = {
        class: "",
        title: "",
      };
      switch (id) {
        case "PENDING":
          status = {
            class: "new",
            title: "Chờ thanh toán",
          };
          break;

        case "PAID":
          status = {
            class: "success",
            title: "Thanh toán đủ",
          };
          break;
        case "AUTHORIZED":
          status = {
            class: "trial",
            title: "Được cho phép",
          };
          break;
        case "VOIDED":
          status = {
            class: "cancel",
            title: "Huỷ",
          };
          break;
        case "PARTIALLY_PAID":
          status = {
            class: "trial",
            title: "Đã thanh toán một phần",
          };
          break;
        case "PARTIALLY_REFUNDED":
          status = {
            class: "trial",
            title: "Đã hoàn tiền một phần",
          };
          break;
      }

      return status;
    },

    convertOrderStatus(id) {
      let status = {
        class: "",
        title: "",
      };

      switch (id) {
        case 10:
        case 1:
          status = {
            class: "new",
            title: "Tạo mới",
          };
          break;

        case 20:
        case 2:
          status = {
            class: "success",
            title: "Chính thức",
          };
          break;

        case 7:
        case 3:
          status = {
            class: "trial",
            title: "Dùng thử",
          };
          break;

        case 90:
        case 4:
          status = {
            class: "cancel",
            title: "Đã huỷ",
          };
          break;
      }

      return status;
    },
  },
};
</script>
