<template>
  <div class="shop-details-area ptb-80">
    <Loader :loading="showLoader" />
    <CoolLightBox :items="productImages" :index="index" @close="index = null">
    </CoolLightBox>
    <div class="container" @click="isShowOptions = false">
      <div class="row g-0 product">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="thumb-example" v-if="productImages?.length > 0">
            <swiper
              class="swiper gallery-top"
              :options="swiperOptionTop"
              ref="swiperTop"
            >
              <swiper-slide
                class="image"
                v-for="(imgUrl, i) in productImages"
                :key="i"
              >
                <img :src="imgUrl" alt="" srcset="" @click="index = i"
              /></swiper-slide>
            </swiper>
            <swiper
              class="swiper gallery-bottom"
              :options="swiperOption"
              ref="swiperBot"
            >
              <swiper-slide
                class="image"
                v-for="(imgUrl, i) in productImages"
                :key="i"
                :class="{ active: isActiveThum === i }"
              >
                <img
                  :src="imgUrl"
                  alt=""
                  srcset=""
                  @mouseover="onThumbnailChange(i)"
              /></swiper-slide>
              <div
                v-if="productImages?.length > 4"
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
              <div
                v-if="productImages?.length > 4"
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div>
            </swiper>
          </div>
          <template v-else-if="productImages.length <= 0">
            <div class="thumb-example">
              <img src="~/assets/img/Nodata.svg" />
            </div>
          </template>
        </div>

        <div class="col-lg-8 col-md-12 col-sm-12">
          <div class="product-detail">
            <div class="wrapper-product">
              <h1>{{ product.title }}</h1>
              <div class="product-shortDes" v-if="product.shortDescription">
                <span v-html="product.shortDescription"></span>
              </div>
              <div class="product-policy" v-if="policyValue">
                <div class="product-policy-title" v-html="policyValue"></div>
              </div>
              <template
                v-else-if="
                  policy[0]?.attributes?.qualify &&
                  product?.qualify &&
                  policy[0]?.attributes?.qualify == product?.qualify
                "
              >
                <div class="product-policy">
                  <div class="product-policy-title">
                    Chính sách hỗ trợ & bảo hành
                  </div>
                  <template v-for="item in policy[0]?.attributes?.items">
                    <div
                      class="product-policy-content"
                      :key="item.id"
                      v-if="item.isVisible == true"
                    >
                      {{ item.title }}
                    </div>
                  </template>
                </div>
              </template>
              <div v-else style="margin-top: 32px"></div>
              <div
                v-if="product?.discountPrice?.length > 0"
                style="margin-bottom: 24px; position: relative"
              >
                <div
                  style="position: absolute; top: 1px; right: -1px; z-index: 10"
                  v-if="is_discount"
                >
                  <img
                    src="~/assets/img/discount.png"
                    alt="image"
                    style="width: 45px; height: 45px"
                  />
                </div>
                <div
                  style="border: 1px solid rgb(22, 179, 100)"
                  v-if="
                    !product?.categories?.some(
                      (c) => c.id == category_marketplace
                    )
                  "
                ></div>
                <div class="header_pannel_money_sell d-flex gap-1" v-else>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#FFD700"
                        d="M9.075 16.25L12 14.475l2.925 1.775l-.775-3.325l2.6-2.25l-3.425-.275L12 7.25l-1.325 3.15l-3.425.275l2.6 2.25zM12 23.3L8.65 20H4v-4.65L.7 12L4 8.65V4h4.65L12 .7L15.35 4H20v4.65L23.3 12L20 15.35V20h-4.65zm0-2.8l2.5-2.5H18v-3.5l2.5-2.5L18 9.5V6h-3.5L12 3.5L9.5 6H6v3.5L3.5 12L6 14.5V18h3.5zm0-8.5"
                      />
                    </svg>
                  </span>
                  <span class="">Áp dụng với</span>
                </div>
                <div
                  class="product-body-button-money"
                  style="padding: 15px !important"
                  v-if="
                    !product?.categories?.some(
                      (c) => c.id == category_marketplace
                    )
                  "
                >
                  <div class="pannel_money_sell"></div>
                  <div class="d-flex gap-1 flex-column">
                    <div>
                      <div
                        class="d-flex"
                        :style="{
                          color: formatRenderPrice(product)?.oldPrice
                            ? '#16b364'
                            : 'black',
                        }"
                      >
                        <div
                          style="font-size: 20px; font-weight: 500"
                          class="d-flex gap-2"
                          v-if="formatRenderPrice(product)?.price > 0"
                        >
                          <span>
                            Giá:
                            {{
                              convertPrice(
                                formatRenderPrice(product)?.price
                                  ? formatRenderPrice(product)?.price
                                  : 0
                              )
                            }}
                          </span>
                        </div>
                        <div
                          v-if="formatRenderPrice(product)?.price > 0"
                          class="d-flex align-items-center"
                          style="font-size: 20px; font-weight: 500"
                        >
                          <!-- /{{
                            ((product?.type == "RENT" ||
                            product?.type == "PROMOTION") && formatRenderPrice(product)?.quantity > 1)
                              ? `${formatRenderPrice(product)?.quantity} `
                              : ""
                          }} -->
                          /{{ product?.unitDTO?.name }}
                        </div>
                      </div>
                      <div
                        style="font-size: 25px; font-weight: 500"
                        v-if="formatRenderPrice(product)?.price == 0"
                      >
                        Miễn phí
                      </div>
                    </div>
                    <span
                      v-if="
                        formatRenderPrice(product)?.oldPrice &&
                        !formatRenderPrice(product)?.hint &&
                        !formatRenderPrice(product)?.hint_old
                      "
                      style="
                        text-decoration: line-through;
                        font-size: 16px;
                        color: #8f8e8e;
                        font-weight: 500;
                      "
                    >
                      Giá gốc:
                      {{
                        convertPrice(
                          formatRenderPrice(product)?.oldPrice
                            ? formatRenderPrice(product)?.oldPrice
                            : 0
                        )
                      }}
                    </span>
                    <div
                      style="color: #e74c3c; margin-top: 5px"
                      v-if="formatRenderPrice(product)?.hint"
                    >
                      {{ formatRenderPrice(product)?.hint }}
                    </div>
                    <div
                      style="color: #e74c3c; margin-top: 5px"
                      v-if="formatRenderPrice(product)?.hint_old"
                    >
                      {{ formatRenderPrice(product)?.hint_old }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="product-body-button">
                <div
                  v-if="
                    !product?.categories?.some(
                      (c) => c.id == category_marketplace
                    )
                  "
                  class="d-flex justify-content-center"
                >
                  <div
                    v-if="product?.discountPrice?.length > 0"
                    style="
                      display: flex;
                      flex-direction: column;
                      gap: 0.25rem;
                      width: 100%;
                    "
                    class="d-flex flex-column gap-1 w-full w-data-100"
                  >
                    <template>
                      <div
                        @click="
                          addToCart(
                            product,
                            formatRenderPrice(product)?.type != 'SELL' ? 'thue' : 'mua',
                            product.id,
                            formatRenderPrice(product)?.price != null
                              ? 'Order'
                              : 'Ticket',
                            product.qualify
                          )
                        "
                        class="button-action sell-button"
                      >
                        <div
                          style="font-size: 20px"
                          v-if="formatRenderPrice(product)?.price != null"
                        >
                          Đăng ký ngay
                        </div>
                        <div
                          style="font-size: 20px"
                          v-else-if="formatRenderPrice(product)?.price == 0"
                        >
                          Miễn phí
                        </div>
                        <div style="font-size: 20px" v-else>Liên hệ</div>
                      </div>
                    </template>
                  </div>
                  <div
                    v-else-if="product?.discountPrice?.length <= 0"
                    style="width: 100%"
                  >
                    <div
                      @click="
                        addToCart(
                          product,
                          formatRenderPrice(product)?.type != 'SELL' ? 'thue' : 'mua',
                          product.id,
                          formatRenderPrice(product)?.price != null
                            ? 'Order'
                            : 'Ticket',
                          product.qualify
                        )
                      "
                      class="button-action sell-button"
                    >
                      <div style="font-size: 20px">Liên hệ</div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div
                    v-if="productRelate?.length > 0"
                    class="d-flex flex-column gap-1"
                  >
                    <div v-for="item in productRelate">
                      <!-- <div v-for="item2 in item?.discountPrice"> -->
                      <div
                        v-if="formatRenderPrice(item)?.price > 0"
                        class="product-button product-button-bg-gradient flex-column flex-lg-row product-button-mobile"
                        :style="{
                          opacity: loadding && '50%',
                        }"
                        @click="
                          addToCart(
                            item,
                            formatRenderPrice(item)?.type != 'SELL' ? 'thue' : 'mua',
                            item.id,
                            'Order',
                            item.qualify
                          )
                        "
                      >
                        <div class="">
                          <div
                            style="font-size: 16px"
                            class="text-center text-lg-start"
                          >
                            Đăng ký ngay
                          </div>
                          <div
                            style="
                              color: #fff;
                              font-size: 22px;
                              font-weight: 500;
                            "
                          >
                            {{ item?.categories[0]?.title }}
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-end"
                          style="height: 100%"
                        >
                          <div class="d-flex flex-column">
                            <span
                              class="d-flex align-items-end"
                              v-if="formatRenderPrice(item)?.oldPrice"
                              style="
                                text-decoration: line-through;
                                font-size: 16px;
                                color: #e2e2e2;
                                font-weight: 300;
                              "
                            >
                              Giá gốc:
                              {{
                                convertPrice(
                                  formatRenderPrice(item)?.oldPrice
                                    ? formatRenderPrice(item)?.oldPrice
                                    : 0
                                )
                              }}
                            </span>
                            <div class="d-flex align-items-end">
                              <div class="product-button-right_top_relate">
                                Chỉ từ
                                {{
                                  convertPrice(
                                    formatRenderPrice(item)?.price
                                      ? formatRenderPrice(item)?.price
                                      : 0
                                  )
                                }}
                              </div>
                              <span
                                class="product-button-right_top_relate"
                                style="color: #fff"
                              >
                                /{{
                                  (product?.type == "RENT" ||
                                    product?.type == "PROMOTION") &&
                                  formatRenderPrice(item)?.quantity > 1
                                    ? `${formatRenderPrice(item)?.quantity} `
                                    : ""
                                }}{{ item?.unitDTO?.name?.toLowerCase() }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else-if="formatRenderPrice(item)?.price == 0"
                        class="product-button product-button-bg-gradient flex-column flex-lg-row product-button-mobile"
                        :style="{
                          opacity: loadding && '50%',
                        }"
                        @click="
                          addToCart(
                            item,
                            formatRenderPrice(item)?.type != 'SELL' ? 'thue' : 'mua',
                            item.id,
                            'Order',
                            item.qualify
                          )
                        "
                      >
                        <div class="">
                          <div
                            style="font-size: 16px"
                            class="text-center text-lg-start"
                          >
                            Áp dụng với
                          </div>
                          <div
                            style="
                              color: #fff;
                              font-size: 22px;
                              font-weight: 500;
                            "
                          >
                            {{ item?.categories[0]?.title }}
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-end"
                          style="height: 100%"
                        >
                          <div class="d-flex align-items-end">
                            <div class="product-button-right_top_relate">
                              Miễn phí
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="product-button product-button-bg-gradient flex-column flex-lg-row product-button-mobile"
                        :style="{
                          opacity: loadding && '50%',
                        }"
                        @click="
                          addToCart(
                            item,
                            formatRenderPrice(item)?.type != 'SELL' ? 'thue' : 'mua',
                            item.id,
                            'Ticket',
                            item.qualify
                          )
                        "
                      >
                        <div class="">
                          <div
                            style="font-size: 16px"
                            class="text-center text-lg-start"
                          >
                            Áp dụng với
                          </div>
                          <div
                            style="
                              color: #fff;
                              font-size: 22px;
                              font-weight: 500;
                            "
                          >
                            {{ item?.groups[0]?.name }}
                          </div>
                        </div>
                        <div
                          class="d-flex align-items-end"
                          style="height: 100%"
                        >
                          <div class="d-flex align-items-end">
                            <div class="product-button-right_top_relate">
                              Liên hệ
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- </div> -->
                  </div>
                </div>

                <div
                  class="d-flex flex-wrap gap-1 align-self-baseline mt-2"
                  v-if="tags?.length > 0"
                >
                  <span style="font-weight: bold"> Tags: </span>
                  <span v-for="tag in tags" :key="tag.id">
                    <a :href="handleLinkTag(tag.slug)" class="tag-link">
                      {{ tag.name }}
                    </a>
                    ,
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0 products-description">
        <div class="description-header">Mô tả chi tiết</div>
        <div class="description-body">
          <div v-html="product.description" class="text"></div>
          <!-- <div
            class="description-body-parameter"
            v-for="item in product.options_full"
            :key="item.id"
            v-if="item.type == 'PARAMETER'"
          >
            <div class="description-body-product">
              <div class="description-body-product-name">{{ item.name }}:</div>
              <div v-for="(item2, index) in item?.value_parameter" :key="index">
                {{ index > 0 ? ", " : "" }}{{ item2 }}
              </div>
            </div>
          </div> -->
        </div>
      </div>
      <div id="target-section-relate">
        <RelateToInfor
          v-if="
            !product?.categories?.some((c) => c.id == category_marketplace) &&
            slidesData?.some((c) => c.typeRelate == 'Product')
          "
          :header="'Sản phẩm liên quan'"
          :slidesData="slidesData.filter((c) => c.typeRelate == 'Product')"
        />

        <RelateToInfor
          v-if="articalRelate.length > 0"
          :header="'Bài viết liên quan'"
          :slidesData="articalRelate"
        />
      </div>
    </div>
    <SeoProduct :block="dataSeo" />
    <div
      v-if="loadding == true"
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
  </div>
</template>

<script>
import { AddItemInCart } from "@/utils/Order/AddItemInCart";
import Cookies from "js-cookie";
import Loader from "../Common/Loader.vue";
import Reviews from "./Reviews.vue";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import SeoProduct from "../../components/Seo/SeoProduct";
import RelateToInfor from "../../components/Relate/RelateToInfor.vue";
const qs = require("qs");
export default {
  name: "ProductDetailBareMetal",
  props: ["product", "id", "targetID", "productOption", "slidesData"],
  components: {
    Loader,
    Reviews,
    Swiper,
    SwiperSlide,
    CoolLightBox,
    SeoProduct,
    RelateToInfor,
  },

  data() {
    return {
      titleDynamic: "",
      name: "",
      phone: "",
      email: "",
      checkShowModal: false,
      index: null,
      asNavFor1: [],
      asNavFor2: [],
      swiperOptionTop: {
        spaceBetween: 10,
      },
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      idVar: null,
      autoPlay: true,
      page: null,
      quantity: 1,
      selectedOption: [],
      favorite: false,
      image: "",
      comment: "",
      isBuyNow: false,
      showLoader: false,
      isSelete: 1,
      test: [],
      // productOption: {},
      selected: [],
      activeIndex: null,
      activeI: null,
      options_relationship1: {},
      isSuccess: false,
      defaultProduct: {
        price: "",
        title: "",
        slug: "",
        id: "",
      },
      currentUrl: "",
      idOption: [],
      parsedobj: null,
      options_relationshipSub: {},
      selectedOptionSub: [],
      carts: [],
      cartsNOrq: [],
      count: 0,
      isShowOptions: false,
      isLine: false,
      toggleSubProuct: false,
      details: null,
      isActiveThum: 0,
      priceOptions: [],
      selectedOptionsView: null,
      itemVariantsByid: [],
      totalPriceOption: 0,
      totalPrice: 0,

      policy: [],
      tags: null,
      policyValue: null,

      dataSeo: null,

      arrayProductOrder: [],
      loadding: false,
      productImages: [],
      orderId_with_cart: Cookies.get("orderId_with_cart"),
      token_anonymous: Cookies.get(process.env.ACCESSTOKEN_NAME)
        ? Cookies.get(process.env.ACCESSTOKEN_NAME)
        : Cookies.get("token_anonymous"),
      rent_default: process.env.TIME_RENT_DEFAULT,
      is_discount: false,
      category_marketplace: process.env.MARKETPLACE,
    };
  },
  beforeMount() {
    this.handleImagesProduct();
  },
  computed: {
    productRelate() {
      return this.slidesData.filter((c) => c.typeRelate == "Product") || [];
    },
    articalRelate() {
      return this.slidesData.filter((c) => c.typeRelate == "Article") || [];
    },
    checkId() {
      return this.product.qualify == "BARE_METAL" ? true : false;
    },
    price() {
      return this.totalPriceOption || 0;
    },
  },
  mounted() {
    this.getPolicy();
    this.getSeoByIdProduct();
    this.getTags();

    this.currentUrl = window.location.pathname;
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
    this.defaultProduct.price = this.product.price;
    this.defaultProduct.title = this.product.title;
    this.defaultProduct.slug = this.product.handle;
    this.defaultProduct.id = this.product.id;

    if (this.product?.groups?.length > 0) {
      this.handlePolicyValue(this.product?.groups[0]?.id);
    }

    this.arrayProductOrder = process.env.ARRAY_PRODUCT_ORDER.split(",");

    document.querySelectorAll("table").forEach((table) => {
      let wrapper = document.createElement("div");
      wrapper.style.overflow = "auto";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    //console.log("this.product", this.product);
  },

  methods: {
    async getSeoByIdProduct() {
      const payload = {
        id: this.product.id,
        type: "PRODUCT",
      };
      const res = await this.$store.dispatch("getSeoByIDProduct", payload);
      this.dataSeo = res.data;
      console.log("res", res);
    },

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
            displayPrice: dataDefault?.priceDiscount,
            price: dataDefault?.price,
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

          //const data = dataQuantity?.find((c) => c?.defaultPrice);

          return dataDefault
            ? {
                displayPrice: dataDefault?.priceDiscount,
                price: dataDefault?.price,
                quantity: dataDefault?.time || 1,
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

    async createOrder() {
      try {
      } catch (error) {
        console.log("error", error);
        this.$toast.error(error, {});
      }
    },

    scrollToSection() {
      // Tìm phần tử theo id
      const section = document.getElementById("target-section-relate");

      if (section) {
        // Tính toán vị trí cuộn
        const offset = 100; // Khoảng cách bạn muốn điều chỉnh (px)
        const sectionPosition =
          section.getBoundingClientRect().top + window.pageYOffset;

        // Cuộn đến vị trí đã điều chỉnh
        window.scrollTo({
          top: sectionPosition - offset,
          behavior: "smooth",
        });
      }
    },

    checkArrayProductOrder(qualify) {
      const data = this.arrayProductOrder?.some((c) => c == qualify);
      return data;
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
    async handlePolicyValue(groupID) {
      try {
        const data = await this.$sdk.product.getPolicy(groupID);
        this.policyValue = data?.value;
      } catch (err) {
        this.$toast.error(err);
      }
    },
    extractNumberFromTypeName(typeName) {
      //console.log("typeName", typeName);
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

    isShow(items) {
      // Lặp qua từng sản phẩm trong danh sách
      for (const product of items.groupItemDTOS) {
        // Kiểm tra xem thuộc tính "primary" có tồn tại và có giá trị là true hay không
        if (product.primary === true) {
          return true; // Nếu có ít nhất một sản phẩm có "primary" là true, trả về true
        }
      }
      // Nếu không có sản phẩm nào có "primary" là true, trả về false
      return false;
    },

    hanldeSale(price, compare_at_price) {
      return (100 - (price / compare_at_price) * 100).toFixed() + "%";
    },
    onThumbnailChange(id) {
      this.isActiveThum = id;
      this.$refs.swiperTop.$swiper.slideTo(id);
      this.$refs.swiperBot.$swiper.slideTo(id);
    },
    handleImagesProduct() {
      // Đảm bảo `images` là một mảng hợp lệ
      if (!Array.isArray(this.product.images)) {
        this.productImages = [];
      } else {
        // Tạo biến `productImages` và sao chép dữ liệu từ `images`
        let productImage = [...this.product.images];

        // Kiểm tra và thêm `featuredImage` vào `productImages` nếu chưa có
        if (
          this.product.featuredImage &&
          !productImage.includes(this.product.featuredImage)
        ) {
          productImage.unshift(this.product.featuredImage);
        }

        // Cập nhật `productImages` nếu cần
        this.productImages = productImage || [];
      }
    },

    disbleModal() {
      this.checkShowModal = false;
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
    checkFavorite(id) {
      this.$store
        .dispatch("checkFavoriteProduct", id)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.favorite = data.data;
              break;
            case 0:
              this.$router.push("/dang-nhap");
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    buyNow() {
      this.isBuyNow = true;
    },

    removeFavoriteProduct(id) {
      this.$store
        .dispatch("removeFavoriteProduct", id)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {});
              this.$store.commit("setLengthFavorite", -1);
              this.checkFavorite(id);
              break;
            case 0:
              this.$router.push("/dang-nhap");
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async addToCart(slug, type, id, typeCart, qualify) {
      this.loadding = true;
      const store = this.$route.query.store;

      //const res = await this.$store.dispatch("createConnector");
      const build_type = this.$route.query.build_type;

      const linkOrder = `/san-pham/${slug.handle}/dat-hang?type=${type}${
        build_type ? "&build_type=" + build_type : ""
      }${
        this.product?.categories?.some((c) => c.id == this.category_marketplace)
          ? `&os=${this.product.id}`
          : ""
      }${store ? `&store=${store}` : ""}`;

      const linkAdviseOrder = `/dang-ky-tu-van?from=${
        slug.handle
      }&productType=${
        qualify == "BARE_METAL" ? "SendTickedByBarebone" : "SendTickedByNormal"
      }&type=${type}${store ? `&store=${store}` : ""}`;
      // //console.log("🚀 ~ addToCart ~ link:", link);
      // if (typeCart == "Order") {
      //   this.$router.push(linkOrder);
      // } else {
      //   this.$router.push(linkAdviseOrder);
      // }

      try {
        if (typeCart == "Order") {
          if (
            this.product?.categories?.some(
              (c) => c.id == this.category_marketplace
            )
          ) {
            const data = await AddItemInCart?.handleAddItemsInOrder(
              slug,
              this.product?.categories?.some(
                (c) => c.id == this.category_marketplace
              )
                ? this.product.id
                : "",
              this,
              type
            );
          } else {
            const data = await AddItemInCart?.handleAddItemsInOrder(
              slug,
              "",
              this,
              type
            );
          }
        } else {
          this.$router.push(linkAdviseOrder);
        }
      } catch (error) {
        console.log("🚀 ~ addToCart ~ error:", error);
        this.$toast.error(error);
      } finally {
        //this.loadding = false;
      }
    },

    updateQuantity(value) {
      this.$store.dispatch("updateQuantity", value);
    },

    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async getPolicy() {
      const query = qs.stringify(
        { populate: "deep" },
        { encodeValuesOnly: true }
      );
      // console.log(
      //   "🚀 ~ getPolicy ~ this.product.qualify:",
      //   this.product.qualify
      // );

      const response = await this.$strapi.find(
        "policies",
        `?filters[qualify][$eq]=${this.product.qualify}&${query}`
      );

      this.policy = response.data;
      console.log("🚀 ~ getPolicy ~  this.policy:", this.policy);
    },
    getTags() {
      this.$store
        .dispatch("getTagsFlowProduct", this.product.id)
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.tags = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleLinkTag(slug) {
      // this.$router.push({
      //   path: "/cua-hang",
      //   query: {
      //     tags: slug,
      //   },
      // });
      return `/cua-hang?tags=${slug}`;
    },
  },
  // async asyncData({ $strapi, store, dataSeo }) {
  //   try {
  //     const [getSeo] = await Promise.all([
  //       store.dispatch("getSeoByIDProduct", {
  //         id: "117002",
  //         type: "PRODUCT",
  //       }),
  //     ]);

  //     console.log("getSeo", getSeo);
  //     dataSeo = getSeo.data;
  //     return dataSeo;
  //   } catch (e) {}
  // },
};
</script>
<style lang="scss" scoped>
.tag-link {
  color: #364152; /* Default text color */
  transition: color 0.3s; /* Transition for smooth color change */
  cursor: pointer;
}

.tag-link:hover {
  color: #44ce6f /* Your hover text color here */;
}
.list-option-grid {
  display: grid;
  //grid-template-rows: repeat(3, minmax(0, 1fr));
}
.product-config {
  display: flex;
  gap: 0.75rem;
}

.description-body {
  .description-body-parameter {
    padding: 0.75rem;

    &:nth-child(odd) {
      background-color: #f5f5f5;
    }

    &:nth-child(even) {
      background-color: #fff;
    }

    .description-body-product {
      display: flex;
      gap: 0.5rem;

      .description-body-product-name {
        font-weight: 500;
        width: 200px;
        //color: #44ce6f;
      }
    }
  }
}

.custom-product {
  padding-top: 12px;
  cursor: pointer;
  color: var(--44-ce-6-f-100, #44ce6f);
  font-family: Roboto;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  text-decoration-line: underline;
}
.send-contact {
  color: #44ce6f;
  text-decoration: underline;
  cursor: pointer;
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: max-content;
    object-fit: contain;
    aspect-ratio: 1/1;
    padding: 2px;
    img {
      width: 100%;
      height: max-content;
      object-fit: contain;
      aspect-ratio: 1/1;
    }
  }
  .swiper-button-next {
    color: #44ce6f;
    font-size: 8px !important;
  }
  .swiper-button-prev {
    color: #44ce6f;
    font-size: 8px !important;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
    .image {
      border-radius: 6px;
      cursor: zoom-in;
    }
  }
  &.gallery-bottom {
    overflow: hidden;
    height: 20%;
    box-sizing: border-box;
    padding: 2px 0;

    @media only screen and (max-width: 767px) {
      padding: 5px !important;
    }

    .image {
      border: 1px solid #eee;
      border-radius: 6px;
      &.active {
        border-color: #44ce6f;
      }
    }
  }
}

@media (max-width: 768px) {
  .product-detail {
    padding: 20px 8px;
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

.product-body-button-money {
  background: #fafafa;
  padding: 15px 20px;
  position: relative;
  z-index: 2;
  .pannel_money_rent {
    background: linear-gradient(to left, #2563d6, white);
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .pannel_money_sell {
    background: linear-gradient(to left, rgb(14, 146, 80), white);
    height: 100%;
    left: 0;
    opacity: 0.1;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: -1;
  }
}

.header_pannel_money_rent {
  background: linear-gradient(to right, #00a5e3, #61c0e3);
  align-items: center;
  display: flex;
  height: 38px;
  padding: 0 20px;

  color: white;
  font-weight: 600;
  font-size: 18px;
}

.header_pannel_money_sell {
  background: linear-gradient(to right, rgb(22, 179, 100), rgb(145, 246, 195));
  align-items: center;
  display: flex;
  height: 38px;
  padding: 0 20px;

  color: white;
  font-weight: 600;
  font-size: 18px;
}

.button-action {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  align-items: center;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: center;
  outline: 0;
  text-transform: capitalize;

  color: #fff;
  outline: 0;
  overflow: visible;
  position: relative;

  // padding: 0 20px;
  height: 48px;
}

.rent-button {
  background: #00a5e3;

  &:hover {
    background: #3bbceb;
  }
}

.sell-button {
  background: rgb(22, 179, 100);

  &:hover {
    background: #2ba351;
    transition: background 0.3s ease;
  }
}
</style>
<style>
:root {
  --swiper-navigation-size: 20px;
}

.product-button-right_top_relate {
  font-weight: 500;
  font-size: 22px;
  line-height: 34px;
  text-align: right;
  color: #fff;
}

.product-button-bg-gradient {
  background: linear-gradient(to right, #17b365, #4abab9) !important;
}

.product-button-bg-gradient:hover {
  background: linear-gradient(to right, #15894f, #1cb0ae) !important;
  transition: background 0.3s ease;
}

.w-data-100 {
  width: 100% !important;
}
</style>
