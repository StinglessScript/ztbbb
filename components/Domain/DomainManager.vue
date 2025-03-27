<template>
  <div class="item-Domain" :ref="'item-Domain'">
    <div
      v-if="loadding == true"
      style="
        position: fixed;
        background-color: rgba(155, 151, 151, 0.26);
        z-index: 999;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      "
    >
      <div class="logo-bg"></div>
      <div class="loader-bg"></div>
    </div>
    <div class="d-flex flex-column" style="gap: 2.5rem; padding-bottom: 30px">
      <div class="row h-100 justify-content-center align-items-center">
        <div class="col-lg-7 col-md-12 services-content">
          <div class="d-flex flex-column gap-3">
            <div>
              <div class="services-content-title">
                Chọn Tên Miền Đẹp - Khởi Đầu Mới Cho Thương Hiệu Của Bạn.
              </div>
              <p>
                Xây dựng một sự hiện diện mạnh mẽ trên Internet, kết nối với
                hàng triệu khách hàng tiềm năng và phát triển thương hiệu của
                bạn một cách bền vững.
              </p>
            </div>

            <div style="width: 100%; display: flex">
              <div
                style="
                  display: flex;
                  align-items: center;
                  background: white;
                  height: 50px;
                  width: 100%;
                "
              >
                <input
                  v-model="domainInput"
                  style="width: 100%"
                  type="text"
                  name="domain"
                  placeholder="Tên miền bạn cần tìm kiếm"
                  class="input-domain"
                  ref="domainInput"
                  @keydown.enter="handleCheckDomain"
                  :disabled="loadingCheck"
                />
                <!-- @click="handleInputClick"  @input="updateDomain" -->
              </div>
              <div style="height: 50px">
                <button
                  @click="!loadingCheck && handleCheckDomain()"
                  class="btn btn-primary"
                  type="submit"
                  style="
                    height: 50px;
                    border-top-left-radius: 0px;
                    border-bottom-left-radius: 0px;
                    width: 100px;
                  "
                >
                  <svg
                    v-if="!loadingCheck"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor">
                      <circle cx="11" cy="11" r="6" />
                      <path
                        stroke-linecap="round"
                        d="M11 8a3 3 0 0 0-3 3m12 9l-3-3"
                      />
                    </g>
                  </svg>
                  <div v-else>
                    <div class="spinner spinner-sm spinner-light nh-btn-loader">
                      <div class="rect1"></div>
                      <div class="rect2"></div>
                      <div class="rect3"></div>
                      <div class="rect4"></div>
                      <div class="rect5"></div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div v-if="product.length > 0">
              <div class="d-flex gap-3 flex-wrap">
                <div v-for="item in product" :key="item.id">
                  <div style="cursor: pointer; height: 100%">
                    <div class="d-flex flex-column gap-1 p-2">
                      <div class="d-flex gap-2 justify-content-center">
                        <img
                          :src="item?.featuredImage || item?.images[0]"
                          v-if="item?.featuredImage || item?.images?.length > 0"
                          style="
                            width: 80px;
                            height: 30px;
                            object-fit: cover;
                            margin: 0;
                          "
                        />
                        <div
                          v-else
                          class="d-flex justify-content-center align-items-center"
                          style="
                            text-transform: lowercase;
                            height: 30px;
                            font-weight: 500;
                          "
                        >
                          {{ item?.title }}
                        </div>
                      </div>
                      <div
                        class="d-flex flex-column"
                        v-if="item?.type == 'RENT'"
                      >
                        <span
                          class="fontSize"
                          style="
                            color: #44ce6f;
                            font-weight: 500;
                            text-align: center;
                          "
                          >{{
                            convertPrice(
                              formatRenderPrice(item)?.price || item?.price
                            )
                          }}/{{ item?.unitDTO?.name }}
                        </span>
                        <span
                          v-if="formatRenderPrice(item)?.oldPrice"
                          class="fontSize"
                          style="
                            color: rgb(142, 142, 142);
                            font-weight: 400;
                            text-align: center;
                            text-decoration: line-through;
                            font-size: 13px;
                          "
                          >{{ convertPrice(formatRenderPrice(item)?.oldPrice) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-12 services-right-image is-pc">
          <img
            src="@/assets/img/banner_domain.png"
            style="width: 370px; height: 310px; object-fit: cover"
          />
        </div>
      </div>
      <div
        v-if="dataCheckDomain && !loadingCheck"
        class="d-flex flex-column"
        style="
          border-radius: 10px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
            0 3px 6px rgba(0, 0, 0, 0.23);
        "
      >
        <div
          style="
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 10px;
            color: white;
            font-weight: 600;
          "
          :style="{
            background: `${
              dataCheckDomain?.domain?.isAvailable == true
                ? '#44ce6f'
                : '#dc3636'
            }`,
          }"
        >
          <h6 class="mb-0" style="color: white; font-weight: normal">
            {{
              dataCheckDomain?.domain?.isAvailable == true
                ? "Tên miền hợp lệ!"
                : dataCheckDomain?.domain?.topDomain
                ? "Tên miền đã được sử dụng!"
                : `Tên miền `
            }}
            <strong
              v-if="
                !dataCheckDomain?.domain?.isAvailable &&
                !dataCheckDomain?.domain?.topDomain
              "
            >
              {{ dataCheckDomain?.domain?.domainName }}
            </strong>
            {{
              !dataCheckDomain?.domain?.isAvailable &&
              !dataCheckDomain?.domain?.topDomain
                ? " chưa được hỗ trợ! Vui lòng chọn tên miền khác."
                : ""
            }}
          </h6>
        </div>
        <div
          class="d-flex justify-content-between align-items-center"
          style="
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            background: #f7f7f7;
            padding: 20px;
          "
        >
          <div class="d-flex flex-column gap-1">
            <div class="d-flex gap-2 align-items-center">
              <div style="font-size: 16px; font-weight: 600">
                {{ dataCheckDomain?.domain?.domainName }}
              </div>
            </div>
            <!-- <small>
              {{
                dataCheckDomain?.product?.type == "RENT"
                  ? convertPrice(
                      parseInt(
                        formatRenderPrice(dataCheckDomain?.product)
                          ?.displayPrice || dataCheckDomain?.product?.price
                      )
                    )
                  : ""
              }}{{
                dataCheckDomain?.product?.unitDTO?.name
                  ? `/${dataCheckDomain?.product?.unitDTO?.name}`
                  : ""
              }}
            </small> -->

            <div class="d-flex flex-column">
              <small
                style="color: #e74c3c"
                v-if="formatRenderPrice(dataCheckDomain?.product)?.hint"
                >{{ formatRenderPrice(dataCheckDomain?.product)?.hint }}</small
              >
              <small
                style="color: #e74c3c"
                v-if="formatRenderPrice(dataCheckDomain?.product)?.hint_old"
                >{{
                  formatRenderPrice(dataCheckDomain?.product)?.hint_old
                }}</small
              >
            </div>
          </div>
          <div class="d-flex gap-2 align-items-center justify-content-center">
            <div class="d-flex flex-column">
              <div style="font-size: 16px; font-weight: 600" class="is-pc">
                {{
                  dataCheckDomain?.product?.type == "RENT"
                    ? convertPrice(
                        parseInt(
                          formatRenderPrice(dataCheckDomain?.product)?.price ||
                            dataCheckDomain?.product?.price
                        )
                      )
                    : ""
                }}{{
                  dataCheckDomain?.product?.unitDTO?.name
                    ? `/${dataCheckDomain?.product?.unitDTO?.name}`
                    : ""
                }}
              </div>
              <span
                v-if="
                  formatRenderPrice(dataCheckDomain?.product)?.oldPrice &&
                  !formatRenderPrice(dataCheckDomain?.product)?.hint &&
                  !formatRenderPrice(dataCheckDomain?.product)?.hint_old
                "
                class="fontSize"
                style="
                  color: rgb(142, 142, 142);
                  font-weight: 400;
                  /* text-align: center; */
                  text-decoration: line-through;
                  font-size: 14px;
                "
                >{{
                  convertPrice(
                    formatRenderPrice(dataCheckDomain?.product)?.oldPrice
                  )
                }}
              </span>
            </div>
            <div
              v-if="dataCheckDomain?.domain?.isAvailable == true"
              class="btn btn-primary checkout-btn is-pc"
              style="padding: 12px 24px; cursor: default; min-width: 130px"
              @click="
                !loadding &&
                  addToCart(
                    dataCheckDomain?.product,
                    'thue',
                    dataCheckDomain?.domain?.domainName
                  )
              "
            >
              <div
                v-if="
                  loadding && loadingProduct?.id == dataCheckDomain?.product?.id
                "
                style="height: 18px; min-width: 106px"
              >
                <div class="spinner spinner-sm spinner-light nh-btn-loader">
                  <div class="rect1"></div>
                  <div class="rect2"></div>
                  <div class="rect3"></div>
                  <div class="rect4"></div>
                  <div class="rect5"></div>
                </div>
              </div>
              <div v-else>Đăng ký ngay</div>
            </div>
            <div v-else>
              <div
                @click="handleShow(true, dataCheckDomain?.infoDomain)"
                class="btn btn-warning checkout-btn"
                style="padding: 12px 24px; cursor: default; min-width: 130px"
              >
                Xem thông tin
              </div>
            </div>
            <div
              class="is-mobile"
              v-if="dataCheckDomain?.domain?.isAvailable == true"
              @click="
                !loadding &&
                  addToCart(
                    dataCheckDomain?.product,
                    'thue',
                    dataCheckDomain?.domain?.domainName
                  )
              "
            >
              <div
                v-if="
                  loadding && loadingProduct?.id == dataCheckDomain?.product?.id
                "
                style="position: relative"
              >
                <div
                  class="spinner spinner-sm spinner-light nh-btn-loader mobile"
                  style="width: 25px; left: -20px !important"
                >
                  <div class="rect1 mobile"></div>
                  <div class="rect2 mobile"></div>
                  <div class="rect3 mobile"></div>
                  <div class="rect4 mobile"></div>
                  <div class="rect5 mobile"></div>
                </div>
              </div>
              <svg
                v-else
                class="is-mobile"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#44ce6f"
                  d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="listDomainRelate?.length > 0 && !loadingCheck"
        class="d-flex flex-column"
      >
        <h6 style="color: black">Tên miền gợi ý</h6>
        <div style="">
          <div
            class="is-pc"
            v-for="item in listDomainRelate"
            style="
              border-radius: 10px;
              background: #f5f5f5;
              margin-bottom: 10px;
              padding-bottom: 15px;
              padding-left: 20px;
              padding-right: 20px;
              padding-top: 15px;
            "
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex gap-2">
                <div class="d-flex flex-column">
                  <span style="font-size: 16px"
                    >{{ item?.domain?.domainName?.split(".")[0]
                    }}<span style="font-weight: 600"
                      >.{{
                        item?.domain?.domainName?.split(".").slice(1).join(".")
                      }}</span
                    ></span
                  >
                  <small
                    style="color: #44ce6f"
                    v-if="formatRenderPrice(item?.product)?.hint"
                    >{{ formatRenderPrice(item?.product)?.hint }}</small
                  >
                  <small
                    style="color: #44ce6f"
                    v-if="formatRenderPrice(item?.product)?.hint_old"
                    >{{ formatRenderPrice(item?.product)?.hint_old }}</small
                  >
                </div>
              </div>
              <div
                class="d-flex gap-2 justify-content-center align-items-center"
              >
                <div class="d-flex flex-column">
                  <div style="font-size: 16px; font-weight: 600">
                    {{
                      item?.product?.type == "RENT"
                        ? convertPrice(
                            parseInt(
                              formatRenderPrice(item?.product)?.price ||
                                item?.product?.price
                            )
                          )
                        : ""
                    }}{{
                      item?.product?.unitDTO?.name
                        ? `/${item?.product?.unitDTO?.name}`
                        : ""
                    }}
                  </div>
                  <del
                    v-if="
                      formatRenderPrice(item?.product)?.oldPrice &&
                      !formatRenderPrice(item?.product)?.hint &&
                      !formatRenderPrice(item?.product)?.hint_old
                    "
                    class="fontSize"
                    style="
                      color: rgb(142, 142, 142);
                      font-weight: 400;
                      /* text-align: center; */
                      text-decoration: line-through;
                      font-size: 14px;
                    "
                    >{{
                      convertPrice(formatRenderPrice(item?.product)?.oldPrice)
                    }}
                  </del>
                </div>
                <div
                  v-if="item?.domain?.isAvailable == true"
                  class="btn btn-primary checkout-btn"
                  style="padding: 12px 24px; cursor: default; min-width: 130px"
                  @click="
                    !loadding &&
                      addToCart(item?.product, 'thue', item?.domain?.domainName)
                  "
                >
                  <div
                    v-if="loadding && loadingProduct?.id == item?.product?.id"
                    style="height: 18px; min-width: 106px"
                  >
                    <div class="spinner spinner-sm spinner-light nh-btn-loader">
                      <div class="rect1"></div>
                      <div class="rect2"></div>
                      <div class="rect3"></div>
                      <div class="rect4"></div>
                      <div class="rect5"></div>
                    </div>
                  </div>
                  <div v-else>Đăng ký ngay</div>
                </div>
                <div
                  v-else
                  class=""
                  style="
                    padding: 12px 0px;
                    cursor: default;
                    min-width: 130px;
                    color: red;
                    text-align: end;
                  "
                >
                  <div>Tên miền đã được đăng ký</div>
                  <div
                    @click="handleShow(true, item?.infoDomain)"
                    class="btn btn-warning checkout-btn"
                    style="
                      padding: 12px 24px;
                      cursor: default;
                      min-width: 130px;
                    "
                  >
                    Xem thông tin
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="is-mobile"
            v-for="item in listDomainRelate"
            style="
              border-radius: 10px;
              background: #f5f5f5;
              margin-bottom: 10px;
              padding-bottom: 15px;
              padding-left: 20px;
              padding-right: 20px;
              padding-top: 15px;
            "
          >
            <div class="d-flex justify-content-between align-items-center">
              <div class="flex-column gap-2">
                <div class="d-flex gap-2 align-items-center">
                  <span style="font-size: 16px"
                    >{{ item?.domain?.domainName?.split(".")[0]
                    }}<span style="font-weight: 600"
                      >.{{
                        item?.domain?.domainName?.split(".").slice(1).join(".")
                      }}</span
                    ></span
                  >
                </div>

                <div style="font-size: 12px; font-weight: 600">
                  {{
                    item?.product?.type == "RENT"
                      ? convertPrice(
                          parseInt(
                            formatRenderPrice(item?.product)?.price ||
                              item?.product?.price
                          )
                        )
                      : ""
                  }}{{
                    item?.product?.unitDTO?.name
                      ? `/${item?.product?.unitDTO?.name}`
                      : ""
                  }}
                </div>

                <small
                  style="color: #44ce6f"
                  v-if="formatRenderPrice(item?.product)?.hint"
                  >{{ formatRenderPrice(item?.product)?.hint }}</small
                >
                <small
                  style="color: #44ce6f"
                  v-if="formatRenderPrice(item?.product)?.hint_old"
                  >{{ formatRenderPrice(item?.product)?.hint_old }}</small
                >
              </div>
              <div>
                <div
                  v-if="item?.domain?.isAvailable == true"
                  style="width: 50px; justify-content: end; display: flex"
                  @click="
                    !loadding &&
                      addToCart(item?.product, 'thue', item?.domain?.domainName)
                  "
                >
                  <div
                    v-if="loadding && loadingProduct?.id == item?.product?.id"
                    style="position: relative"
                  >
                    <div
                      class="spinner spinner-sm spinner-light nh-btn-loader mobile"
                      style="width: 25px; left: -20px !important"
                    >
                      <div class="rect1 mobile"></div>
                      <div class="rect2 mobile"></div>
                      <div class="rect3 mobile"></div>
                      <div class="rect4 mobile"></div>
                      <div class="rect5 mobile"></div>
                    </div>
                  </div>
                  <div v-else>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#44ce6f"
                        d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                      />
                    </svg>
                  </div>
                </div>
                <div v-else>
                  <div class="fontSize" style="color: red; text-align: end">
                    Đã được đăng ký
                  </div>
                  <div
                    @click="handleShow(true, item?.infoDomain)"
                    class="btn btn-warning checkout-btn"
                    style="padding: 5px; cursor: default; min-width: 130px"
                  >
                    Xem thông tin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading">
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <div style="margin-right: 5px; color: #44ce6f">Đang lấy dữ liệu</div>
          <div class="dot-loader-domain"></div>
          <div class="dot-loader-domain"></div>
          <div class="dot-loader-domain"></div>
        </div>
      </div>
    </div>
    <ModalShowInfoDomain
      v-if="isShowInfoDomain"
      :handleShowModal="handleShow"
      :dataProduct="isDataInforDomain"
    />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Cookies from "js-cookie";
import ModalShowInfoDomain from "@/components/Modal/ModalShowInfoDomain";

import { AddItemInCart } from "@/utils/Order/AddItemInCart";

export default {
  props: {
    groupId: "",
  },

  components: {
    Swiper,
    SwiperSlide,
    ModalShowInfoDomain,
  },

  data() {
    return {
      swiperOptionTop: {
        slidesPerView: 2,
        spaceBetween: 10,
        // loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
      },

      product: [],
      chooseTypepPrefix: null,
      domainInput: this.$route.query.ten_mien || "",

      dataCheckDomain: null,
      loadingCheck: false,

      listDomainRelate: [],
      loadding: false,
      orderId_with_cart: Cookies.get("orderId_with_cart"),
      token_anonymous: Cookies.get(process.env.ACCESSTOKEN_NAME)
        ? Cookies.get(process.env.ACCESSTOKEN_NAME)
        : Cookies.get("token_anonymous"),

      loadingProduct: null,

      isShowInfoDomain: false,
      isDataInforDomain: null,

      isLoading: false,
    };
  },

  mounted() {
    this.handleGetDataDomain();
    if (this.domainInput != "") {
      this.handleCheckDomain();
    }
  },

  watch: {
    "this.$route.query.ten_mien"(newPath, oldPath) {
      if (newPath) {
        this.domainInput = this.$route.query.ten_mien;
        this.handleGetDataDomain();
        if (this.domainInput != "") {
          this.handleCheckDomain();
        }
      }
    },
  },

  // watch: {
  //   $route(newPath, oldPath) {
  //     console.log("🚀 ~ newPath:", newPath, oldPath);
  //   },
  // },

  methods: {
    handleShow(isBoolean, data) {
      this.isShowInfoDomain = isBoolean;
      this.isDataInforDomain = data;
    },

    formatRenderPrice(item) {
      if (item?.type == "RENT") {
        // lấy giá mặc định
        const dataDefault = item?.discountPrice?.find(
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
            oldPrice: dataDefault?.oldPrice[0]?.priceDiscount,
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

          const data = dataQuantity?.find((c) => c?.defaultPrice);

          return data
            ? {
                displayPrice: data?.priceDiscount,
                price: data?.price,
                quantity: data?.time || 1,
                type: data?.type,
                hint: data?.hint,
              }
            : dataQuantity?.length > 0
            ? {
                displayPrice: dataQuantity[0]?.priceDiscount,
                price: dataQuantity[0]?.price,
                quantity: dataQuantity[0]?.time || 1,
                type: dataQuantity[0]?.type,
                hint: dataQuantity[0]?.hint,
              }
            : {
                displayPrice: 0,
                price: 0,
                quantity: item?.time || 1,
                type: item?.type,
                hint: null,
              };
        }
      } else {
        const dataDefault = item?.discountPrice?.find(
          (c) => c?.defaultPrice == true
        );
        return {
          displayPrice: dataDefault?.priceDiscount,
          price: dataDefault?.price,
          type: "SELL",
          hint: dataDefault?.hint,
        };
      }
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
        return "0" + "đ";
      }
    },

    async handleGetDataDomain() {
      const param = {
        category: this.groupId || process.env.DOMAIN_CATEGORY,
        display: "PUBLIC",
        subType: "CONFIG,SIMPLE,VARIABLE",
        status: "ON_SELL",
      };
      try {
        const response = await this.$sdk.product.getProducts(
          param,
          this.$route.query.store
        );

        if (response.data.length > 0) {
          let dataProduct = await Promise.all(
            response.data.slice(0, 5)?.map(async (c) => {
              let arrId = [c.id];
              try {
                let data = await this.handleGetListPrice(arrId);
                //console.log("🚀 ~ response.data.slice ~ data:", data);

                if (data && data[c.id]) {
                  return {
                    ...c,
                    type: data[c.id]?.type,
                    discountPrice: data[c.id]?.data || [],
                  };
                } else {
                  return {
                    ...c,
                    discountPrice: [],
                  };
                }
              } catch (error) {
                console.error("Error fetching list price for id:", c.id, error);
                return {
                  ...c,
                  discountPrice: [],
                };
              }
            })
          );

          this.product = dataProduct;
          //console.log("🚀 ~ handleGetDataDomain ~ dataProduct:", dataProduct);
          this.chooseTypepPrefix =
            this.product?.find((c) => c.sku == ".COM") || this.product[0];
          //this.updateDomain();
        }
      } catch (error) {
        console.log("🚀 ~ handleGetDataDomain ~ error:", error);
        this.$toast.error(error);
      }
    },

    async handleGetListPrice(arrayID) {
      try {
        const response = await this.$sdk.product.getListPrice(arrayID);
        if (response) {
          // Duyệt qua các key (id sản phẩm) trong response và thực hiện xử lý
          const formattedData = Object.keys(response).map((productId) => {
            const productData = response[productId]; // Dữ liệu sản phẩm với productId
            const newItem = { ...productData[0] }; // Chỉ lấy phần tử đầu tiên của mảng (tương ứng với 1 sản phẩm)

            // Khởi tạo discountPrice nếu chưa tồn tại
            if (!newItem.discountPrice) {
              newItem.discountPrice = [];
            }

            // Duyệt qua các mục của sản phẩm (có thể có nhiều subPrices)
            let listPrice = productData.flatMap((d) => {
              // Nếu không có subPrices, trả về 1 đối tượng mặc định
              if (!d?.subPrices || d?.subPrices.length === 0) {
                return [
                  {
                    time: d?.quantity || 1,
                    type: d?.type,
                    percentDiscount: d?.discountPercent || 0,
                    price: d?.price || 0,
                    hint: d?.hint || null,
                    priceDiscount:
                      d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                    unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                    unitDTO_name: newItem.unitDTO?.name || "default", // Default name if not available
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
                    c?.displayPrice || c?.price * (c?.quantity || 1) || 0, // Calculating priceDiscount
                  unitDTO_id: newItem.unitDTO?.id, // Unit DTO ID
                  unitDTO_name: newItem.unitDTO?.name, // Unit DTO Name
                  defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
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
                    d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                  unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                  unitDTO_name: newItem.unitDTO?.name || "Tháng", // Default name if not available
                  defaultPrice: d?.defaultPrice
                    ? d?.defaultPrice == d?.id
                      ? true
                      : false
                    : true, // Default to true when subPrices exist
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

            // Tiếp tục xử lý filterData và updatedDataDiscount như bạn đã làm trước đó
            let filterData = [...listPrice];
            const updatedDataDiscount = [];

            filterData
              .filter((item) => item.type === "PROMOTION")
              .forEach((promotion) => {
                const matchingRentData = filterData.filter(
                  (rent) =>
                    (rent.type === "RENT" || rent.type === "SELL") &&
                    rent.time === promotion.time
                );

                if (matchingRentData.length > 0) {
                  promotion.oldPrice = matchingRentData;
                  updatedDataDiscount.push(promotion);

                  matchingRentData.forEach((rent) => {
                    const rentIndex = filterData.indexOf(rent);
                    if (rentIndex !== -1) {
                      filterData.splice(rentIndex, 1);
                    }
                  });
                } else {
                  updatedDataDiscount.push(promotion);
                }
              });

            filterData.forEach((item) => {
              if (item.type === "RENT" || item.type === "SELL") {
                updatedDataDiscount.push(item);
              }
            });

            updatedDataDiscount.forEach((price, index) => {
              price.number = index + 1;
            });

            updatedDataDiscount.forEach((discount) => {
              if (discount.oldPrice) {
                let defaultPriceFound = false;
                discount.oldPrice.forEach((oldItem) => {
                  if (oldItem.defaultPrice) {
                    defaultPriceFound = true;
                    oldItem.defaultPrice = false;
                  }
                });

                if (defaultPriceFound) {
                  discount.defaultPrice = true;
                }
              }
            });

            newItem.discountPrice.push(...updatedDataDiscount);

            let dataDefault = updatedDataDiscount?.find(
              (c) => c.defaultPrice == true
            );

            // return {
            //   ...newItem,
            // type:
            //   dataDefault?.type != "PROMOTION"
            //     ? dataDefault?.type
            //     : dataDefault?.oldPrice[0]?.type,
            //   discountPrice:
            //     updatedDataDiscount.length > 0 ? updatedDataDiscount : null,
            // };
            return {
              productId,
              data: updatedDataDiscount.length > 0 ? updatedDataDiscount : null,
              type:
                dataDefault?.type != "PROMOTION"
                  ? dataDefault?.type
                  : dataDefault?.oldPrice[0]?.type,
            };
          });
          //console.log("formattedData", formattedData);
          // Trả về dữ liệu đã được format lại với key là id và giá trị là object thông tin
          return formattedData.reduce((acc, item) => {
            //console.log("🚀 ~ returnformattedData.reduce ~ item:", item);
            acc[item.productId] = {
              type: item?.type,
              data: item?.data,
            }; // Key là productId, value là thông tin sản phẩm đã format
            return acc;
          }, {});
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetListPrice ~ error:", error);
        this.$toast.error(error);
      }
    },

    async handleCheckDomain() {
      try {
        this.loadingCheck = true;
        const fullUrl = this.$route.params.slug;
        console.log("🚀 ~ handleCheckDomain ~ fullUrl:", fullUrl);
        if (fullUrl != "domain") {
          if (this.domainInput) {
            this.$router.push(`/domain?ten_mien=${this.domainInput}`);
          }
        } else {
          this.isLoading = true;
          const response = await this.$sdk.cloud.checkDomainNameAvailable(
            this.formatText(
              this.domainInput?.includes(".")
                ? this.domainInput
                : this.domainInput +
                    (this.$route.query.suffix
                      ? this.$route.query.suffix
                      : ".vn")
            )
          );
          if (response) {
            const param = {
              sku: response?.topDomain,
              display: "PUBLIC",
              subType: "CONFIG,SIMPLE,VARIABLE",
              status: "ON_SELL",
            };
            let responseProduct = null;
            let responseInfo = null;
            if (response?.isAvailable == true) {
              const data = await this.$sdk.product.getProducts(
                param,
                this.$route.query.store
              );
              //console.log("🚀 ~ handleCheckDomain ~ data:", data)

              if (data.data[0]) {
                const listPrice = await this.handleGetListPrice([
                  data.data[0]?.id,
                ]);
                //console.log("🚀 ~ handleCheckDomain ~ listPrice:", listPrice)
                if (listPrice[data.data[0]?.id]) {
                  responseProduct = {
                    ...data.data[0],
                    type: listPrice[data.data[0]?.id]?.type,
                    discountPrice: listPrice[data.data[0]?.id]?.data || [],
                  };
                } else {
                  responseProduct = {
                    ...data.data[0],
                  };
                }
              }
            } else {
              const data = await this.handleGetWhoisDomainInfo(
                this.formatText(
                  this.domainInput?.includes(".")
                    ? this.domainInput
                    : this.domainInput +
                        (this.$route.query.suffix
                          ? this.$route.query.suffix
                          : ".vn")
                )
              );
              responseInfo = data || null;
            }

            this.dataCheckDomain = {
              domain: response,
              product: responseProduct,
              infoDomain: responseInfo,
            };
            this.loadingCheck = false;
          }
          await this.handleListDomainRelate(
            this.formatText(this.domainInput?.split(".")[0]),
            response?.topDomain
          );
        }
      } catch (error) {
        console.log("🚀 ~ handleCheckDomain ~ error:", error);
        this.$toast.error(error);
        this.loadingCheck = false;
        this.isLoading = false;
      }
    },

    async handleGetWhoisDomainInfo(domainName) {
      try {
        const response = await this.$sdk.cloud.getWhoisDomainInfo(domainName);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetWhoisDomainInfo ~ error:", error);
        this.$toast.error(error);
      }
    },

    formatText(text) {
      return text
        .normalize("NFD") // Tách dấu khỏi chữ cái
        .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
        .replace(/đ/g, "d") // Thay thế "đ" thành "d"
        .replace(/Đ/g, "D") // Thay thế "Đ" thành "D"
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, ""); // Xóa khoảng trắng và thêm "ai"
    },

    async handleListDomainRelate(domainInput, topDomain) {
      // console.log("🚀 ~ handleListDomainRelate ~ topDomain:", topDomain);
      // console.log("🚀 ~ handleListDomainRelate ~ domainInput:", domainInput);
      try {
        this.listDomainRelate = [];
        let formatData = this.product?.filter(
          (c) => c.sku.toLowerCase() != topDomain
        );
        // Sử dụng for...of để xử lý bất đồng bộ từng phần tử trong product
        for (const c of formatData) {
          const formatDomain = (domainInput + c.title.toLowerCase()).toString();
          //console.log("🚀 ~ data ~ formatDomain:", formatDomain);

          const response = await this.$sdk.cloud.checkDomainNameAvailable(
            formatDomain
          );

          if (response) {
            const param = {
              sku: response?.topDomain,
              display: "PUBLIC",
              subType: "CONFIG,SIMPLE,VARIABLE",
              status: "ON_SELL",
            };
            let responseProduct = null;
            let responseInfo = null;
            if (response?.isAvailable == true) {
              const data = await this.$sdk.product.getProducts(
                param,
                this.$route.query.store
              );
              //console.log("🚀 ~ handleCheckDomain ~ data:", data)

              if (data.data[0]) {
                const listPrice = await this.handleGetListPrice([
                  data.data[0]?.id,
                ]);
                //console.log("🚀 ~ handleCheckDomain ~ listPrice:", listPrice)
                if (listPrice[data.data[0]?.id]) {
                  responseProduct = {
                    ...data.data[0],
                    type: listPrice[data.data[0]?.id]?.type,
                    discountPrice: listPrice[data.data[0]?.id]?.data || [],
                  };
                } else {
                  responseProduct = {
                    ...data.data[0],
                  };
                }
              }
            } else {
              const data = await this.handleGetWhoisDomainInfo(formatDomain);
              responseInfo = data || null;
            }

            this.listDomainRelate.push({
              domain: response,
              product: responseProduct,
              infoDomain: responseInfo,
            });
          }
        }

        this.isLoading = false;
      } catch (error) {
        console.log("🚀 ~ handleListDomainRelate ~ error:", error);
        this.$toast.error(error);
        this.loadingCheck = false;
        this.isLoading = false;
      }
    },

    async addToCart(product, type, domainName) {
      try {
        this.loadding = true;
        this.loadingProduct = product;
        // const store = this.$route.query.store;

        // const linkOrder = `/san-pham/${product?.handle}/dat-hang?type=${type}${
        //   domainName ? `&domain=${domainName}` : ""
        // }${store ? `&store=${store}` : ""}`;

        // this.$router.push(linkOrder);

        const data = await AddItemInCart?.handleAddItemsInOrder(
          product,
          domainName,
          this,
          type
        );
        //console.log("🚀 ~ mounted ~ data:", data);
      } catch (error) {
        console.log("🚀 ~ addToCart ~ error:", error);
        this.$toast.error(error);
      } finally {
        //this.loadding = false;
        //this.loadingProduct = null;
      }

      // const store = this.$route.query.store;

      // const linkOrder = `/san-pham/${product?.handle}/dat-hang?type=${type}${
      //   domainName ? `&domain=${domainName}` : ""
      // }${store ? `&store=${store}` : ""}`;

      // this.$router.push(linkOrder);
    },
  },
};
</script>

<style lang="scss">
.dot-loader-domain {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #44ce6f !important;
  position: relative;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader-domain:nth-child(2) {
  margin: 0 2px;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader-domain:nth-child(3) {
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

.services-content {
  .services-content-title {
    font-size: 30px;
    font-weight: 700;
    color: #44ce6f;
    margin-bottom: 10px;
  }

  p {
    font-size: 15px;
    margin-bottom: 15px;
    color: #3d3d3d;
  }
  .textInBox{
    margin-bottom: 0;
    p {
      margin-bottom: 0;
    }
  }
}

.input-domain {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;

  height: 50px;
  padding: 0 10px;
  padding-right: 10px;
  padding-left: 10px;
  border: 0;
  line-height: 50px;
  font-size: 16px;

  color: #495057;

  font-weight: 400;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #cfcfcf;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  outline: none;

  &:focus {
    border: 1px solid #44ce6f;
  }
}

.button-domain {
  //padding: 5px;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
}

.button-domain.active {
  border: 1px solid #44ce6f;
}

.nh-btn-loader.spinner {
  display: flex;
  width: 100%;
  text-align: center;
  position: absolute;
  top: calc(50% - 10px);
  justify-content: center;
  left: 0;
}

.nh-btn-loader.spinner.mobile {
  display: flex;
  width: 100%;
  text-align: center;
  position: absolute;
  justify-content: center;
}

.nh-btn-loader.spinner div {
  width: 2px;
  height: 20px;
  background-color: #fff;
  margin: 0 1px;
  display: inline-block;
  animation: sk-stretchdelay 1.5s ease-in-out infinite;
  display: flex;
}

.nh-btn-loader.spinner div.mobile {
  background-color: #44ce6f;
}

.nh-btn-loader.spinner .rect2 {
  animation-delay: -1.1s;
}

.nh-btn-loader.spinner .rect3 {
  animation-delay: -1s;
}

.nh-btn-loader.spinner .rect4 {
  animation-delay: -0.9s;
}

.nh-btn-loader.spinner .rect5 {
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
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
</style>
