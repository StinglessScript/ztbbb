<template>
  <div class="shop-details-area ptb-80">
    <Loader :loading="showLoader" />
    <CoolLightBox :items="product?.images" :index="index" @close="index = null">
    </CoolLightBox>
    <div class="container" @click="isShowOptions = fasle">
      <div class="row g-0 product">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="thumb-example">
            <swiper
              class="swiper gallery-top"
              :options="swiperOptionTop"
              ref="swiperTop"
            >
              <swiper-slide
                class="image"
                v-for="(imgUrl, i) in product?.images"
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
                v-for="(imgUrl, i) in product?.images"
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
                v-if="product.images?.length > 4"
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
              <div
                v-if="product.images?.length > 4"
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div>
            </swiper>
          </div>
        </div>

        <div class="col-lg-8 col-md-12 col-sm-12">
          <div class="product-detail">
            <div class="wrapper-product">
              <h1>{{ product.title }}</h1>
              <!-- <div class="product-gift" v-if="checkId">
                GIÁ MUA KHI ĐẶT CHỖ 12 THÁNG
              </div> -->
              <div
                v-for="item in productOption"
                :key="productOption.id"
                class="options"
              >
                <span class="name-option">
                  {{ item.name }}
                </span>
                <template v-for="option in item.groupItemDTOS">
                  <div
                    v-if="option.primary"
                    :key="option.id"
                    class="value-option"
                  >
                    {{ option.title }}
                  </div>
                </template>
              </div>
              <!-- <div class="product-shortDes" v-if="product.short_description">
                <span v-html="product.short_description"></span>
              </div> -->
              <div class="product-policy" v-if="checkId">
                <div class="product-policy-title">
                  Chính sách hỗ trợ & bảo hành
                </div>
                <div class="product-policy-content">Hỗ trợ 24x7</div>
                <div class="product-policy-content">
                  Bảo hành miễn phí trong suốt thời gian thuê
                </div>
                <div class="product-policy-content">
                  Chuyển đổi giữa hình thức THUÊ và MUA linh hoat miễn phí.
                </div>
              </div>
              <div class="product-policy" v-else>
                <div class="product-policy-title">
                  Chính sách hỗ trợ & bảo hành
                </div>
                <div class="product-policy-content">Hỗ trợ 24x7</div>
              </div>
              <!-- <div class="product-contact">
                <img width="20px" src="~/assets/img/phone.svg" />
                Liên hệ <a href="tel:18006070"> 1800.6070 </a> để được tư vấn,
                hỗ trợ thay đổi cấu hình
              </div> -->
              <!-- <div class="product-options">
                <div
                  v-for="(productItem, index) in handleProductVariant"
                  class="product-variant"
                  :class="{ active: productItem.id == id }"
                  :key="index"
                  @click="
                    // history.pushState({}, null, this.defaultProduct.slug)

                    $router.push(
                      '/san-pham/' +
                        productItem.handle +
                        '?targetID=' +
                        targetID
                    )
                  "
                >
                  <div class="product-variant-title">
                    {{ productItem.option1 }}
                  </div>
                  <div class="group-price">
                    <div
                      class="product-variant-compare_at_price"
                      v-if="productItem.compare_at_price"
                    >
                      {{ convertPrice(productItem.compare_at_price)
                      }}{{ product.currency_code }}
                    </div>
                    <div
                      class="product-variant-discount"
                      v-if="productItem.compare_at_price"
                    >
                      {{
                        hanldeSale(
                          productItem.price,
                          productItem.compare_at_price
                        )
                      }}
                    </div>
                    <div class="product-variant-price">
                      {{ convertPrice(productItem.price)
                      }}{{ product.currency_code }}
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="product-body-button">
                <div
                  class="product-button"
                  @click="addToCart(product.handle, 0)"
                  :class="{ active: index == 1 }"
                >
                  <div class="product-button-left">
                    <div>Mua ngay</div>
                    <p v-if="checkId">Đặt chỗ tối thiểu 12 tháng</p>
                  </div>
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
                </div>
                <div
                  v-if="checkId"
                  class="product-button active"
                  @click="addToCart(product.handle, 1)"
                  :class="{ active: index == 1 }"
                >
                  <div class="product-button-left">
                    <div>Trả góp</div>
                    <p v-if="checkId">Đặt chỗ tối thiểu 12 tháng</p>
                  </div>
                  <div class="product-button-right">
                    <div class="product-button-right_top">
                      {{ convertPrice(product.price / 12) }}
                    </div>
                    <div class="product-button-right_bottom">
                      <span class="price active"> x12 kỳ </span>
                      <span> </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-0 products-description">
        <div class="description-header">Thông số kĩ thuật</div>
        <div class="description-body">
          <span v-html="product.description" class="text"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Loader from "../Common/Loader.vue";
import Reviews from "./Reviews.vue";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "ProductDetailBareMetal",
  props: ["product", "id", "targetID", "productOption"],
  components: {
    Loader,
    Reviews,
    Swiper,
    SwiperSlide,
    CoolLightBox,
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

      itemVariantsByid: [],
    };
  },
  beforeMount() {
    this.handleImagesProduct();
  },
  computed: {
    checkId() {
      return this.product.qualify == "BARE_METAL" ? true : false;
    },
  },
  mounted() {
    // this.handleShow();

    this.currentUrl = window.location.pathname;
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
    if (this.$store.getters.isAuthenticated) {
      this.checkFavorite(this.id);
    }
    this.defaultProduct.price = this.product.price;
    this.defaultProduct.title = this.product.title;
    this.defaultProduct.slug = this.product.handle;
    this.defaultProduct.id = this.product.id;
  },

  methods: {
    hanldeSale(price, compare_at_price) {
      return (100 - (price / compare_at_price) * 100).toFixed() + "%";
    },
    onThumbnailChange(id) {
      this.isActiveThum = id;
      this.$refs.swiperTop.$swiper.slideTo(id);
      this.$refs.swiperBot.$swiper.slideTo(id);
    },
    handleImagesProduct() {
      if (this.product.images?.indexOf(this.product.featured_image) === -1) {
        this.product.images?.unshift(this.product.featured_image);
      }
      if (this.product.variants?.length > 1) {
        let item = this.product.variants; // get variants of product
        for (let index = 0; index < item?.length; index++) {
          const element = item[index];

          if (this.product.images?.indexOf(element.featured_image) === -1) {
            this.product.images?.push(element.featured_image);
          } else {
          }
        }
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
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
          this.product.currency_code
        );
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
    addToWishlist(id) {
      this.$store
        .dispatch("addFavoriteProduct", id)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {});
              this.$store.commit("setLengthFavorite", +1);
              this.checkFavorite(id);
              break;
            case 0:
              this.$router.push("/dang-nhap");
              break;
          }
        })
        .catch((error) => {
          this.$toast.error("Đăng nhập để thêm sản phẩm vào mục yêu thích", {});
          this.$router.push("/dang-nhap");
        });
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
    addToCart(slug, number) {
      this.checkId;
      const isBaremetal = `&isBaremetal=${this.checkId}`;
      const type = number == 0 ? "mua" : "tra-gop";
      this.$router.push(slug + "/dat-hang?&type=" + type + isBaremetal);
    },
    // addToCartBackup(id) {
    //   console.log(
    //     "🚀 ~ file: ProductDetail.vue:441 ~ addToCart ~ this.$store.getters.isAuthenticated:"
    //   );

    //   let product = {
    //     id: id,
    //     quantity: this.quantity,
    //     allow_delete: true,
    //     supplier_id: this.product.supplier_id,
    //     // cart_child: cart_child,
    //   };
    //   this.$store
    //     .dispatch("addToCart", product)
    //     .then((data) => {
    //       switch (data.status) {
    //         case 1:
    //           this.$store.commit("setCountItem", +1);
    //           this.$store.commit("setSessionId");
    //           if (!this.$store.getters.isAuthenticated) {
    //             this.$router.push(
    //               "/dang-ky?redirectUrl=" + "xac-nhan-dat-hang"
    //             );
    //           } else {
    //             this.$router.push("/xac-nhan-dat-hang");
    //           }
    //           Cookies.set("sessionId", this.$store.getters.getSessionId);
    //           break;
    //         case 0:
    //           break;
    //       }
    //     })
    //     .catch((error) => {
    //       this.$toast.error(error.message, {});
    //     });

    //   // if (this.product.type == "SIMPLE") {
    //   //   this.isSuccess = true;
    //   // }
    //   // //check success
    // },
    // addToCart() {
    //   const cart_child = this.carts.filter(Boolean || {});
    //   let product = {
    //     id: this.idVar ? this.idVar : this.product.id,
    //     quantity: this.quantity,
    //     allow_delete: true,
    //     supplier_id: this.product.supplier_id,
    //     cart_child: cart_child,
    //   };
    //   if (this.product.type == "SIMPLE") {
    //     this.isSuccess = true;
    //   }
    //   //check success
    //   this.$store
    //     .dispatch("addToCart", product)
    //     .then((data) => {
    //       switch (data.status) {
    //         case 1:
    //           this.$toast.success(data.message, {});
    //           this.isBuyNow
    //             ? this.$router.push("/gio-hang")
    //             : this.$modal.hide("modal-variant");
    //           this.$store.commit("setCountItem", +1);
    //           this.$store.commit("setSessionId");
    //           Cookies.set("sessionId", this.$store.getters.getSessionId);
    //           break;
    //         case 0:
    //           break;
    //       }
    //     })
    //     .catch((error) => {
    //       this.$toast.error(error.message, {});
    //     });
    // },
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
  },
};
</script>
<style lang="scss" scoped>
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
</style>
<style>
:root {
  --swiper-navigation-size: 20px;
}
</style>
